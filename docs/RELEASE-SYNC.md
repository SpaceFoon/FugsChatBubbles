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

`Release-Plugin.ps1 -SyncOnly` verifies the existing ZIP asset, clones the shared directory's default branch, and invokes `Sync-PluginDirectory.js` locally. The helper updates the Chat Bubbles entry, pins its JavaScript URL to the release tag, calculates SHA-256 from the tagged bytes, and refreshes the generated README table. It preserves maturity and editorial fields, refuses downgrades, and makes repeated matching updates a no-op. The PowerShell script pushes a normal commit with `[skip ci]`; it never dispatches an Actions event or opens a PR in the website repo. Push conflicts fail safely and the watcher retries.

The shared manifest was prepared from the existing `codex/shared-plugin-directory-20261031` migration data. Its data publication is independent of the pending website consumer and game integration work. The pending directory updater workflow was not imported or invoked.

## Website integration boundary

The local website checkout contains an uncommitted migration whose `src/data/plugins.ts` fetches the shared manifest from GitHub and whose `use-plugin-directory.ts` hook loads it for the pages. That code is not evidence of a live deployment. At verification, the production site reported the older build above. The currently served app must be rebuilt and deployed by Darren through Sitebase before that browser integration is live. Release sync updates the shared directory only; it does not deploy the website.

The earlier PR #5 in `SpaceFoon/fugs-plugins` updated the website's old static catalog data. It was not a shared-directory update. Future Chat Bubbles releases use the shared JSON directly.
