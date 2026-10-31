# Bug fix record

The findings from the 2026-10-31 review were addressed in version 1.0.1.

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

Verification: 89 assertions passed using the installed MV Chromium 65.0.3325.146, Pixi 4.5.4, and GameFont. These checks use real text/canvas rendering with game-state stubs; they do not launch a full game.

Remaining integration checks:

- Playtest MBS and other zoom/camera plugins in a complete game. The legacy zoom scale is retained, but external camera translations may need an adapter.
- Very large messages/dense stacks shrink to fit the viewport and may be hard to read.
- Fonts must be loaded before showing a bubble. Escape codes and battle targets remain outside the implemented feature set.
