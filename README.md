# Fugs Chatter and Speech Bubbles

**Version:** 1.0.0 · **Engine:** RPG Maker MV 1.6.3 · **License:** GNU GPL-3.0 ([LICENSE](LICENSE)) · **File:** `FugsChatBubbles.js`

## Download

- [GitHub Releases](https://github.com/SpaceFoon/FugsChatBubbles/releases) — versioned install ZIPs will appear here.
- [Plugin source](https://github.com/SpaceFoon/FugsChatBubbles/blob/main/FugsChatBubbles.js)
- [Repository](https://github.com/SpaceFoon/FugsChatBubbles)

## Overview

**Fugs Chatter and Speech Bubbles** is a plugin for RPG Maker MV that enables customizable speech bubbles that follow events and stack. It allows for fully parallel chat bubbles using Pixi, bubble stacking, and animation effects such as bouncing in and fading out. With built-in themes and gradient support, it brings a unique, FF7-style chat experience to your game.

## Features

- Parallel chat bubbles using Pixi only.
- Bubble stacking for multiple bubbles.
- Bubble animations: Bounce in and fade out.
- Fully customizable style with built-in themes.
- Bubbles can follow events, the player, or even followers.
- Works with MBS Maps zoom and presumed others as well.
- Text and bubbles can use gradients with as many colors as you want.
- FF7-inspired theme look.
  
## Plugin Commands

You may leave event or event and duration blank for default values.  
1 = event 1, 0 = player, -1 = first follower.

### ShowChatBubble [event][duration/seconds][message]
Example:
- `ShowChatBubble 1 8 My new chat bubble!`  
  Show bubble on event one for 8 seconds.
- `ShowChatBubble 1.5 My new chat bubble!`  
  Show bubble on event one for 1.5 seconds.

### ChatBubble [task][duration ms][parameters]
Example:
- `ChatBubble [changeColor][100][theme: ff7]`  
- `ChatBubble [changeFont][0][gameFont]`  

## Known Issues
- When zooming to extremes, the window may not be perfectly centered.
- Short lowercase messages can cause the text to look off-center.
- Errors occur when selecting a follower or event that doesn’t exist.
- The bubble stays open when battles start (use `Scene_Map.prototype.startEncounterEffect`).

## License and credit

The repository's [LICENSE](LICENSE) applies: GNU GPL-3.0. Review it for the terms covering use, modification, and redistribution. Credit Fugahagen if you wish.

Mode
- **Type**: boolean  
- **Description**: Enable debug logging and testing features  
- **Default**: `false`

### Theme
- **Type**: select  
- **Description**: Choose a theme for the chat bubbles. Predefined options include light, dark, and custom themes.  
- **Options**:
  - custom
  - BlackWhite
  - WhiteBlack
  - Light
  - Dark
  - CrimsonAndBlue
  - FieryCrimson
  - ShadowedViolet
  - RoyalGold
  - EmeraldDream
  - SapphireGlimmer
  - EtherealGlow
  - TwilightSky
  - FrostedTeal
  - SunsetBloom
  - AutumnHearth
  - SoftRose  
- **Default**: `Dark`

### Font Family
- **Type**: string  
- **Description**: Font family to use for bubble text  
- **Default**: `GameFont`

### Font Size
- **Type**: number  
- **Description**: Size of the bubble text in pixels  
- **Default**: `28`

### Font Colors
- **Type**: string  
- **Description**: List any number of colors for text gradient (comma-separated hex codes)  
- **Default**: `#FFFFFF`

### Font Alpha
- **Type**: number  
- **Description**: Opacity of the text (0-1)  
- **Default**: `1`

### Font Line Height
- **Type**: number  
- **Description**: Line height of the bubble text in pixels  
- **Default**: `32`

### Font Padding
- **Type**: number  
- **Description**: Padding around the text in pixels  
- **Default**: `6`

### Font WordWrap
- **Type**: boolean  
- **Description**: Enable word wrap for text  
- **Default**: `true`

### Font Word Wrap Width
- **Type**: number  
- **Description**: Width of the word wrap for text in pixels  
- **Default**: `500`

### Bubble Colors
- **Type**: string  
- **Description**: List any number of colors for background gradient (comma-separated hex codes)  
- **Default**: `#000000`

### Bubble Alpha
- **Type**: number  
- **Description**: Opacity of the bubble background (0-1)  
- **Default**: `0.7`

### Bubble Shape
- **Type**: select  
- **Description**: Shape of the bubble corners  
- **Options**:
  - Round
  - Square  
- **Default**: `Round`

### Bubble Radius
- **Type**: number  
- **Description**: Radius of rounded corners (if Round shape selected)  
- **Default**: `10`

### Canvas Rendering
- **Type**: string  
- **Description**: The canvas rendering context  
- **Default**: `ctx`

### Bubble Offset X
- **Type**: number  
- **Description**: Horizontal offset of the bubble  
- **Default**: `-4`

### Bubble Offset Y
- **Type**: number  
- **Description**: Vertical offset of the bubble  
- **Default**: `-10`

### Bubble Width Margin
- **Type**: number  
- **Description**: Margin on the bubble's width  
- **Default**: `16`

### Bubble Height Margin
- **Type**: number  
- **Description**: Margin on the bubble's height  
- **Default**: `8`

### Bubble Border Width
- **Type**: number  
- **Description**: Width of the bubble border  
- **Default**: `3`

### Bubble Border Color
- **Type**: string  
- **Description**: Color of the bubble border  
- **Default**: `0xffffff`

