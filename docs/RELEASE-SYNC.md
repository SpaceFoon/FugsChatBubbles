# Verified release synchronization and website deployment

Verified 2026-10-31 against the committed Sitebase deployment script, the public site, repository history, and local integration changes.

| Role | Repository and path | Verified behavior |
| --- | --- | --- |
| Website deployer | `SpaceFoon/sitebase`, `scripts/deploy-sites.sh` | Clones the two frontend repos below and activates static files through nginx. Only Darren accesses the VPS and performs production deployments. |
| Main website source | `SpaceFoon/fugs-plugins`, branch `master` | Sitebase uses `artifacts/rpg-plugins/dist/public` for `fugsplugins.com`. |
| Audio product subsite | `SpaceFoon/fugg-audio-plugin-site`, branch `master` | Sitebase uses `artifacts/fugs-audio-sales/dist/public` for `/FugsAudioEx`. |
| Shared plugin directory | `SpaceFoon/RPG-Maker-MV-MZ-plugins`, branch `main`, `plugins.json` | Structured plugin metadata and release downloads; this repo does not deploy the website. |
| Release producer | `SpaceFoon/FugsChatBubbles` | Windows Task Scheduler runs the watcher and local updater with the current Windows user's GitHub CLI credentials. |

Deployment evidence: Sitebase's `SITE4_DOMAIN`, `SITE4_REPO`, `SITE4_BRANCH`, `SITE4_DIST_PATH`, and `SITE4_SUBAPP_*` variables identify the domain, source repos, and output directories. Its `main()` calls `deploy_frontend_repo` and `deploy_frontend_subpath_repo` with those variables. The public `https://fugsplugins.com/healthz` returned build `a8977af`, matching `SpaceFoon/fugs-plugins` commit `a8977af4e4c0b46514884a393cb20a138e1c410c`. A public request does not establish the private server's current configuration; no VPS access was performed.

## Directory update

`Release-Plugin.ps1 -SyncOnly` verifies the existing ZIP asset, clones the shared directory's default branch, and invokes `Sync-PluginDirectory.js` locally. The helper updates the Chat Bubbles entry, pins its JavaScript URL to the release tag, calculates SHA-256 from the tagged bytes, and refreshes the generated README table. It preserves maturity, refuses downgrades, and makes repeated matching updates a no-op. For releases 1.1.0 onward, versioned `release-metadata.json` at the same tag explicitly supplies engine compatibility, description, features, and installation steps. Older releases without that file retain existing editorial metadata. The normal release command validates metadata before publishing, and sync validates it again against the tag. The PowerShell script pushes a normal commit with `[skip ci]`; it never dispatches an Actions event or opens a PR in the website repo. Push conflicts fail safely and the watcher retries.

The shared manifest was prepared from the existing `codex/shared-plugin-directory-20261031` migration data. Its data publication is independent of frontend deployment and game integration work. The pending directory updater workflow was not imported or invoked.

## Website integration boundary

The website consumer is complete and pushed to `SpaceFoon/fugs-plugins/master` at `88a63dc`, including the compiled frontend used by Sitebase. Its build marker identifies source commit `91981ee`. The home catalog, detail pages, and forum picker fetch the shared JSON; the parser validates entries, requests time out after 15 seconds, and unavailable states offer Retry. The MultiTrack playbook remains local editorial content.

Verification covered the real manifest, search and engine filters, desktop and narrow-screen rendering, an unknown plugin, the playbook, and a tagged download with a matching SHA-256. Controlled localhost responses tested HTTP and malformed-data failures, recovery, changed metadata without rebuilding, and the forum picker. Directory tests, workspace typechecking, and the production build passed.

These checks do not establish live deployment. Darren deploys the committed frontend through Sitebase; after that activation, directory metadata updates require no frontend rebuild (subject to GitHub CDN propagation). Release sync itself does not access or deploy the VPS.

The earlier PR #5 in `SpaceFoon/fugs-plugins` updated the website's old static catalog data. It was not a shared-directory update. Future Chat Bubbles releases use the shared JSON directly.

*Last updated: 2026-10-31 — record the verified, pushed website consumer and retain the owner deployment boundary.*
