# Fugs Chatter and Speech Bubbles

**Version:** 1.0.2 · **Engine:** RPG Maker MV · **License:** [GNU GPL-3.0](LICENSE)

Map speech bubbles follow events, the player, or followers. Messages stack, bounce in, and fade out. Text and backgrounds support themes and gradients.

## Install

Copy FugsChatBubbles.js to your game's js/plugins directory, add it in Plugin Manager, and enable it. Keep the filename unchanged. Existing commands still work.

- [Releases](https://github.com/SpaceFoon/FugsChatBubbles/releases)
- [Source](https://github.com/SpaceFoon/FugsChatBubbles/blob/main/FugsChatBubbles.js)

## Show a bubble

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

Bubbles and stacks fit within the screen. Large messages or dense stacks shrink to fit, which can reduce readability. Bubbles clear on encounters, transfers, and when leaving the map, including opening a menu. They are map-only and do not persist through saving/loading.

When a rendered character sprite is available, its actual transformed head position anchors the bubble, including camera translation, scale, and shake. The legacy $gameMap.zoom.x/y coordinates are used only as a fallback. A complete game with MBS or other camera plugins still needs an integration check. RPG Maker escape codes and battle-character targets are not implemented.

For script calls, Fugs.ChatBubbles.show(eventId, durationMs, message) shows a map bubble and Fugs.ChatBubbles.clear() removes all bubbles.

## Verification

Run the regression harness with an installed MV SDK runtime:

    powershell -ExecutionPolicy Bypass -File tests/run-mv.ps1
    powershell -ExecutionPolicy Bypass -File tests/run-mv.ps1 -EnginePath "C:\path\to\RPG Maker MV"

The harness uses the installation's Chromium, Pixi, and GameFont with small game-state stubs. It checks real text/canvas geometry, commands, timing, stacking, and resource cleanup. Scratch files are removed afterward. It does not replace playtesting a complete game with other plugins.

See [CHANGELOG.md](CHANGELOG.md) and [BUGS.md](BUGS.md) for the fix record.

## License and credit

GNU GPL-3.0; see [LICENSE](LICENSE). Credit Fugahagen if you wish.
