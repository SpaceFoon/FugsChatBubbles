# Fugs Chatter and Speech Bubbles

**Version:** 1.1.0 · **Engines:** RPG Maker MV / MZ · **License:** [GNU GPL-3.0](LICENSE)

Requires RPG Maker MV 1.6.1 or newer, or MZ. MV 1.6.1 updated NW.js to support ES2017. Existing games must have the matching updated runtime/core files in the game project; updating the editor alone does not update an older game's files. MV runtime verified. MZ command adapters are tested; a complete MZ runtime playtest is still required.

Map speech bubbles follow events, the player, or followers. Messages stack, bounce in, and fade out. Text and backgrounds support themes and gradients.

## Install

Copy FugsChatBubbles.js to your game's js/plugins directory, add it in Plugin Manager, and enable it. Keep the filename unchanged. Existing commands still work.

- [Releases](https://github.com/SpaceFoon/FugsChatBubbles/releases)
- [Source](https://github.com/SpaceFoon/FugsChatBubbles/blob/main/FugsChatBubbles.js)

## Convert the next Show Text (recommended)

In MV, add this Plugin Command immediately before a normal Show Text:

    ChatBubble next event:current duration:5

Then write the dialogue in Show Text's normal multiline editor. It appears as one nonblocking bubble, and the event continues immediately. Only that one Show Text command is converted; later Show Text commands are normal unless marked again.

In MZ, select **FugsChatBubbles → Next Show Text as Bubble** in the plugin command picker. Set the target and duration, then add Show Text. Use **Cancel Next Text Conversion** to cancel a pending marker. MV's cancellation command is `ChatBubble cancel`.

Targets: `current` means the event running the command (player for a common event without a map event), `0` means player, positive IDs mean map events, and negative IDs mean followers. Duration is seconds, including the fade.

The marker belongs to that event interpreter, not other parallel events or a called common event's child interpreter. It resets after use, interpreter termination/setup, or discovery of a changed map. Put it immediately before the intended Show Text, especially in branches and loops.

### Text codes and presentation

Converted Show Text uses the game's `Window_Base.convertEscapeCharacters` and supported inline escape handlers. Supported stock codes include `\V[n]`, `\N[n]`, `\P[n]`, `\G`, `\C[n]`, `\I[n]`, `\{`, and `\}`; MZ also allows `\FS[n]` for font sizes from 1 to 512. Write a single backslash in the editor. Use `\\` for a literal backslash. Explicit newlines are preserved; text wraps and lines are centered. MZ's `GameFont` setting resolves to the game's main font.

Converted text uses the configured font and first theme text color, then honors inline color/font changes. It does not use the legacy renderer's text gradient. Background gradients, opacity, borders, placement, stacking, and lifetime still apply.

Bubbles appear instantly and do not accept input. Message waits, pauses, fast-text controls, gold-window commands, and final input suppression (`\.`, `\|`, `\!`, `\>`, `\<`, `\$`, `\^`) are ignored. Faces, MZ speaker names, and Show Text followed immediately by choices, number input, or item selection keep the entire command as normal dialogue, consuming the marker. Missing targets, empty text, or rendering failures also fall back to normal Show Text instead of dropping dialogue. Text is limited to 16,384 converted characters, 256 wrapped lines, and a 4-megapixel bitmap; larger text falls back to normal dialogue.

Plugins extending `Window_Base` conversion can participate, as can extensions to the supported inline codes. Any remaining unsupported escape code (including custom drawing and text-positioning codes) keeps the entire Show Text as normal dialogue; it is not silently stripped. Plugins requiring `Window_Message`, animation, or additional window state need individual integration testing. The plugin does not instantiate another `Window_Message` or replace the game's shared message state.

## Legacy direct text commands (MV)

Event IDs: positive = map event, 0 = player, -1 = first follower, -2 = second follower.

    ShowChatBubble 1 8 Hello from event one!
    ShowChatBubble 1.5 Hello from this event!
    ShowChatBubble Hello for five seconds!

The second example supplies only the duration. When the event ID is omitted, the current map event is used; common events without a map event default to the player.

Duration is in seconds and includes the fade. Nonpositive durations, empty messages, and missing targets are ignored. Debug Mode warns about missing targets. Invisible followers and erased events are ignored; their existing bubbles are removed.

For a message starting with a number, use the explicit separator:

    ShowChatBubble -- 2 enemies left
    ShowChatBubble event:0 duration:8 -- 2 enemies left
    ShowChatBubble 1 8 -- 1 8 is part of the message

Text following -- is always the message. Before it, use named event:/duration: options or the existing numeric arguments. In ordinary dialogue, a -- after words is preserved as text. Without --, legacy numeric prefixes retain their original meaning. Tokens such as 2enemies are treated as text.

## Compatibility with existing LostAges commands

Existing projects that have at least two legacy-only choice or character-offset settings and no explicit `Legacy Direct Commands` setting use the original direct-command renderer. New installations default to the modern renderer; set `Legacy Direct Commands` explicitly to select either behavior. A single legacy-only setting is ambiguous and produces a warning. The explicit `--` and named `event:`/`duration:` forms use the modern renderer. `ChatBubble next` and the MZ Next Show Text command continue to use the modern renderer.

The older flag forms remain available in either mode:

```text
ShowChatBubble PERSIST ARROW_LEFT TRANSPARENT 1 5 Hello
ShowChatBubbleWithChoices PERSIST ARROW_LEFT TRANSPARENT 1 6 20 Choose | One | Two
ShowScreenBubble 100 100 5 Hello
ShowBattlerBubble ACTOR 1 5 Hello
```

Choices remain open until selected and write a one-based result to the configured variable. The compatibility paths have fixture coverage against MV engine scripts and MZ 1.9 engine scripts, but still need full LostAges and native MZ playthroughs. The compatibility code retains the original game plugin's license and terms notice alongside the repository's GPL-3.0 license. Review both notices before redistributing.
## Change the style of new bubbles

    ChatBubble changeColor 0 theme: Dark
    ChatBubble changeColor 0 theme: custom
    ChatBubble changeColor 100 theme: ff7
    ChatBubble changeFont 0 GameFont
    ChatBubble changeFont 0 Georgia

The numeric field is a delay in milliseconds before applying the setting, defaulting to 0. This defines the previously unimplemented command field; it is not a color tween. Existing bubbles keep their style. ff7 aliases CrimsonAndBlue; theme names are case insensitive.

The original bracket forms also work:

    ChatBubble [changeColor][100][theme: ff7]
    ChatBubble [changeFont][0][gameFont]

## Parameters

Preset themes supply the text colors, background colors, and background opacity. Select custom to use your color and background alpha parameters. Other font, shape, padding, border, wrapping, and offset settings apply to every theme.

| Parameter | Default | Meaning |
| --- | --- | --- |
| Debug Mode | false | Warn about missing targets; no image dumps |
| Theme | Dark | Preset or custom |
| Font Family | GameFont | Font must be loaded by the game |
| Font Size | 28 | Text size in pixels |
| Font Colors | #FFFFFF | Custom text gradient colors |
| Font Alpha | 1 | Text opacity from 0 to 1 |
| Font Line Height | 32 | Distance between wrapped lines |
| Font Padding | 6 | Padding around visible glyphs |
| Font WordWrap | true | Wrap text; long words may break |
| Font Word Wrap Width | 500 | Maximum text width, limited to the screen |
| Bubble Colors | #000000 | Custom background colors |
| Bubble Alpha | 0.7 | Custom background opacity from 0 to 1 |
| Bubble Shape | Round | Round or Square |
| Bubble Radius | 10 | Rounded corner radius |
| Bubble Offset X | 0 | Horizontal offset from character center |
| Bubble Offset Y | -10 | Vertical offset from above the character |
| Bubble Width Margin | 16 | Extra total horizontal space |
| Bubble Height Margin | 8 | Extra total vertical space |
| Bubble Border Width | 3 | Border width |
| Bubble Border Color | 0xffffff | Border color; #ffffff also works |
| Canvas Rendering | ctx | Deprecated; rendering always uses a 2D canvas |

Colors accept comma-separated CSS colors or an MV JSON color array. Commas inside rgba()/hsl() stay within that color. A single color gives a solid fill. Invalid entries are ignored; an empty/invalid list falls back to white text or a black background, and an invalid border color falls back to white.

Themes: custom, BlackWhite, WhiteBlack, Light, Dark, CrimsonAndBlue, FieryCrimson, ShadowedViolet, RoyalGold, EmeraldDream, SapphireGlimmer, EtherealGlow, TwilightSky, FrostedTeal, SunsetBloom, AutumnHearth, SoftRose.

## Placement and lifecycle

Visible glyph bounds are centered in the background, including short lowercase messages. Wrapped lines use centered alignment. The entire bubble scales around its center during entry.

Modern-rendered bubbles and stacks fit within the screen; dense stacks can shrink. They clear on encounters, transfers, and when leaving the map and do not persist through saving/loading. Legacy direct commands additionally support screen and battle targets and the PERSIST flag for scene transitions; persistence through saving/loading is not provided.

For modern-rendered map bubbles, the transformed character-sprite head position accounts for camera translation, scale, and shake, with $gameMap.zoom.x/y as fallback. Legacy direct commands use their original position logic and provide battle-character targets via ShowBattlerBubble. A complete game with MBS or other camera plugins still needs an integration check.

For script calls, `Fugs.ChatBubbles.show(eventId, durationMs, message)` shows a map bubble and `Fugs.ChatBubbles.clear()` removes all bubbles. An optional fourth argument `true` uses the formatted Show Text renderer; callers must ensure the Window and IconSet system images are loaded first. It returns `false` if formatted text cannot be rendered, such as when it exceeds a safety limit. Default script calls and modern direct commands use plain-text Pixi rendering; legacy direct commands use their original escape conversion.

## Releases and the shared plugin directory

The Windows watcher builds and publishes releases locally. It then clones [`SpaceFoon/RPG-Maker-MV-MZ-plugins`](https://github.com/SpaceFoon/RPG-Maker-MV-MZ-plugins), updates `plugins.json` and its generated README table locally, and pushes those two files directly. No workflow dispatch or website PR is part of this release path. Directory commits include `[skip ci]` so the directory repository's legacy push CI does not execute for these updates.

Install once under your normal Windows account:

    powershell -ExecutionPolicy Bypass -File .\scripts\Install-LocalReleaseAutomation.ps1

The installer reuses your saved GitHub CLI login, checks write access to the plugin and directory repositories, and registers the local Task Scheduler watcher. While the PC is on and you are signed in, it polls every five minutes. Push a version tag after committing and pushing the matching plugin version and changelog:

    git push origin v1.1.0

The PC packages the exact tagged source into `release-dist/FugsChatBubbles-v1.1.0.zip`. Directory updates pin the JavaScript URL to that tag, calculate SHA-256, preserve maturity and refuse version downgrades. Before each release, update `release-metadata.json` to match the plugin version and supported engines; compatibility, description, features, and installation steps are synchronized from that exact tag. Releases 1.1.0 onward require this metadata so an old engine label cannot silently persist. Failed updates remain pending for retry. Existing tagged releases are reconciled on the first run for this directory target. Progress and retry errors are in `.local-release-automation/watcher.log`.

To retry an existing release without rebuilding it:

    powershell -ExecutionPolicy Bypass -File .\scripts\Release-Plugin.ps1 -Version 1.0.2 -SyncOnly

The plugin directory and website deployment are separate. [`SpaceFoon/sitebase`](https://github.com/SpaceFoon/sitebase) deploys `fugsplugins.com` using `SpaceFoon/fugs-plugins` for the main site and `SpaceFoon/fugg-audio-plugin-site` for `/FugsAudioEx`. The website reader and compiled frontend are published in `fugs-plugins/master` at `88a63dc`, ready for Darren's VPS deployment. After that frontend is deployed, it fetches shared metadata on page open or Retry without another website build; GitHub CDN propagation can delay updates. A directory push does not deploy the website itself. See [the verified deployment and sync details](docs/RELEASE-SYNC.md).

Remove the local task with:

    powershell -ExecutionPolicy Bypass -File .\scripts\Uninstall-LocalReleaseAutomation.ps1

The removal preserves ZIPs, logs, and state. Manual releases remain available through `scripts/Release-Plugin.ps1`.

## Verification

Run the regression harness with an installed MV SDK runtime:

    powershell -ExecutionPolicy Bypass -File tests/run-mv.ps1
    powershell -ExecutionPolicy Bypass -File tests/run-mv.ps1 -EnginePath "C:\path\to\RPG Maker MV"

The harness uses the installation's Chromium, Pixi, GameFont, Bitmap, Window_Base, windowskin, and icons with small game-state stubs. It also loads the real MV Game_Interpreter and Game_Message to test event execution, normal-message waits, choices and callbacks, and unsupported-code fallback. The MV fixture passes 194 assertions, including Canvas/WebGL rendering, legacy choices and cleanup. A separate fixture exercises 13 assertions with MZ 1.9 engine scripts and Pixi 5 in the local NW runtime. Scratch files are removed afterward. Full LostAges and native MZ playthroughs and third-party message-plugin checks remain outstanding.

See [CHANGELOG.md](CHANGELOG.md) and [BUGS.md](BUGS.md) for the fix record.

## License and credit

GNU GPL-3.0; see [LICENSE](LICENSE). Credit Fugahagen if you wish.
