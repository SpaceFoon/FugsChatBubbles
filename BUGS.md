# Bug fix record

The findings from the 2026-10-31 review were addressed in version 1.0.1 and rechecked with expanded coverage in 1.0.2.

| Finding | Resolution |
| --- | --- |
| Stock MV syntax failure | Removed optional chaining and nullish operators; executed on Chromium 65 |
| Missing Fugs globals | Plugin initializes its own namespace and registry |
| Parameters/themes ignored | Rendering uses configured settings and selected theme |
| Style commands missing | Implemented changeColor/changeFont, bracket syntax, and documented delay behavior |
| Wrong scene cleanup | Removes the actual owner container; clears on scene exit, encounter, and map setup |
| Numeric message prefixes | Added -- message delimiter and strict numeric tokens; legacy commands preserved |
| Common-event default target missing | Defaults to the player when no current map event exists |
| Canvas textures retained | Destroys each bubble's unique textures and base textures |
| Off-screen and overlapping stacks | Fits and clamps the stack as a group |
| Bounce shifts center | Scales one container around a centered local origin |
| Duration adds an extra fade | Entrance/fade share one total lifetime, including short messages |
| Debug logs run unconditionally | Removed dumps; only missing-target warnings run in Debug Mode |
| Short lowercase and wrapped alignment | Centers visible canvas glyph bounds and wrapped lines |
| Camera translations/scales | Anchors to the actual transformed character sprite head |
| Literal -- in normal dialogue | Preserved when the preceding text is not command options |
| Invalid colors | Filters invalid entries and uses valid defaults |
| Hidden followers/erased events | Rejects missing visual targets and removes their existing bubbles |

Verification: 119 assertions passed using the installed MV Chromium 65.0.3325.146, Pixi 4.5.4, and GameFont. These checks use real Pixi transforms, CanvasRenderer pixels, WebGL rendering, text/canvas rendering, and game-state stubs; they do not launch a full game. Expanded checks cover zero opacity, all theme choices, rounded borders, malformed colors, defaults, moving cameras, literal dashes in dialogue, erased events, and hidden followers.

Remaining integration checks:

Version 1.1.0 verification: 156 assertions pass in the same MV runtime, now also loading real engine Bitmap/Window_Base code and Window/IconSet assets. New checks cover native escape conversion/drawing, multiline/wrapped text, Unicode, interpreter isolation and one-shot consumption, busy/asset retries, input/face/speaker fallbacks, cancellation, termination/setup, invalid targets, map changes, oversized text, MZ registered-command callbacks, and MZ font mapping. The MZ adapter checks run inside MV; they do not establish full MZ runtime compatibility.

- Playtest MBS and other zoom/camera plugins in a complete game. Anchoring now follows the actual character sprite transform, with legacy zoom scale as a fallback.
- Very large messages/dense stacks shrink to fit the viewport and may be hard to read.
- Fonts must be loaded before showing a bubble. Battle targets remain outside the implemented feature set.
- Version 1.1.0 adds escape codes for converted Show Text; legacy direct text remains plain text. Rich text uses the first theme text color instead of a gradient. See README for fallback behavior and limits.
- MZ's registered commands and parameter adapter are covered in the MV harness; a full MZ runtime playtest is outstanding.
- Third-party Window_Message-only effects and custom escape drawing/positioning need individual integration. They are not guaranteed by the new conversion path.
