# Changelog

## 1.0.1 — 2026-10-31

- Fixed stock MV JavaScript compatibility and missing plugin state initialization.
- Connected theme, font, opacity, shape, border, wrapping, padding, and offset parameters.
- Added the documented style commands and explicit message separator.
- Centered visible glyphs and wrapped lines; kept the bounce animation centered.
- Kept bubbles/stacks inside the viewport, shrinking dense stacks as needed.
- Included fading in the requested lifetime and handled short lifetimes with one animation state.
- Cleared bubbles on map exit, encounters, and transfers; destroyed owned textures.
- Removed unconditional console/canvas dumps and unused window allocations.
- Added a regression harness for MV's installed runtime, Pixi, and GameFont.

Existing numeric command forms remain supported. Use -- for messages starting with numbers. The previously unimplemented style-command numeric field is now documented as a delay in milliseconds. New plugin configurations default Bubble Offset X to 0; saved parameter values are preserved.

## 1.0.0

Initial release.
