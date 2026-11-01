//=============================================================================
// Fugs Chatter and Speech Bubbles
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.1.0 MV/MZ speech bubbles, including the next Show Text.
 * @version 1.1.0
 *
 * @author Fugahagen
 *
 * @command nextText
 * @text Next Show Text as Bubble
 * @desc Convert the next Show Text in this interpreter to a nonblocking map bubble.
 * @arg target
 * @text Target event ID
 * @desc current, 0 for player, positive event ID, or negative follower ID.
 * @type string
 * @default current
 * @arg duration
 * @text Duration (seconds)
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 5
 *
 * @command cancelNextText
 * @text Cancel Next Text Conversion
 * @desc Leave the next Show Text as normal dialogue.
 *
 * @param Debug Mode
 * @desc Enable debug logging and testing features
 * @type boolean
 * @default false
 *
 * @param Theme
 * @desc Choose a theme for the chat bubbles. Predefined options include light, dark, and custom themes.
 * @type select
 * @option custom
 * @option BlackWhite
 * @option WhiteBlack
 * @option Light
 * @option Dark
 * @option CrimsonAndBlue
 * @option FieryCrimson
 * @option ShadowedViolet
 * @option RoyalGold
 * @option EmeraldDream
 * @option SapphireGlimmer
 * @option EtherealGlow
 * @option TwilightSky
 * @option FrostedTeal
 * @option SunsetBloom
 * @option AutumnHearth
 * @option SoftRose
 * @default Dark
 *
 * @param Font Family
 * @desc Font family to use for bubble text
 * @type string
 * @default GameFont
 *
 * @param Font Size
 * @desc Size of the bubble text in pixels
 * @type number
 * @default 28
 *
 * @param Font Colors
 * @desc List any number of colors for text gradient (comma-separated hex codes)
 * @type string
 * @default #FFFFFF
 *
 * @param Font Alpha
 * @desc Opacity of the text (0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 *
 * @param Font Line Height
 * @desc lineHeight of the bubble text in pixels
 * @type number
 * @default 32
 *
 *
 * @param Font Padding
 * @desc Padding around the visible text
 * @type number
 * @default 6
 *
 *
 * @param Font WordWrap
 * @desc Wrap text within the configured width
 * @type boolean
 * @default true
 *
 * @param Font Word Wrap Width
 * @desc Maximum text width in pixels, limited to the viewport
 * @type number
 * @default 500
 *
 *
 *
 * @param Bubble Colors
 * @desc List any number of colors for background gradient (comma-separated hex codes)
 * @type string
 * @default #000000
 *
 * @param Bubble Alpha
 * @desc Opacity of the bubble background (0-1)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.7
 *
 * @param Bubble Shape
 * @desc Shape of the bubble corners
 * @type select
 * @option Round
 * @option Square
 * @default Round
 *
 * @param Bubble Radius
 * @desc Radius of rounded corners (if Round shape selected)
 * @type number
 * @min 0
 * @max 30
 * @default 10
 *
 *
 *
 * @param Canvas Rendering
 * @desc Deprecated compatibility setting; bubbles always use a 2D canvas.
 * @type string
 * @default ctx
 *
 * @param Bubble Offset X
 * @desc Horizontal offset from the character center
 * @type number
 * @min -8192
 * @default 0
 *
 * @param Bubble Offset Y
 * @desc
 * @type number
 * @min -8192
 * @default -10
 *
 * @param Bubble Width Margin
 * @desc
 * @type number
 * @default 16
 *
 * @param Bubble Height Margin
 * @desc
 * @type number
 * @default 8
 *
 * @param Bubble Border Width
 * @desc
 * @type number
 * @default 3
 *
 * @param Bubble Border Color
 * @desc
 * @type string
 * @default 0xffffff
 *
 *
 *
 * @param Legacy Direct Commands
 * @desc Use the original direct ShowChatBubble renderer and escape-code behavior.
 * @type boolean
 * @default false
 *
 * @param Text Vertical Offset
 * @desc Fine-tune text vertical alignment inside bubble
 * @type number
 * @default 8
 *
 * @param Keep Bubbles On Screen
 * @desc Prevent bubbles from going off-screen edges
 * @type boolean
 * @on YES
 * @off NO
 * @default true
 *
 * @param Screen Boundary Threshold
 * @desc Minimum distance from screen edges in pixels
 * @type number
 * @min 0
 * @default 8
 *
 * @param Show Actor Name
 * @desc Prefix actor's name on a separate line in ShowBattlerBubble
 * @type boolean
 * @default false
 *
 * @param Arrow Size
 * @desc Size of the arrow pointer in pixels
 * @type number
 * @min 0
 * @max 50
 * @default 10
 *
 * @param Arrow Wait
 * @desc Wait for player to press a button before arrow bubble disappears
 * @type boolean
 * @default false
 *
 * @param Custom Bubble Colors
 * @desc CUSTOM THEME ONLY: Bubble gradient colors
 * (comma-separated hex codes, e.g. #000000,#333333)
 * @type string
 * @default #000000,#333333
 *
 * @param Custom Text Colors
 * @desc CUSTOM THEME ONLY: Text gradient colors
 * (comma-separated hex codes, e.g. #FFFFFF,#CCCCCC)
 * @type string
 * @default #FFFFFF,#CCCCCC
 *
 * @param Custom Bubble Alpha
 * @desc CUSTOM THEME ONLY: Bubble opacity
 * (0.0 = transparent, 1.0 = solid)
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.8
 *
 * @param Custom Border Color
 * @desc CUSTOM THEME ONLY: Border color
 * (hex code, e.g. #FFFFFF)
 * @type string
 * @default #FFFFFF
 *
 * @param Custom Border Width
 * @desc CUSTOM THEME ONLY: Border thickness in pixels
 * @type number
 * @default 3
 *
 * @param Custom Border Radius
 * @desc CUSTOM THEME ONLY: Corner rounding in pixels
 * (0 = sharp corners)
 * @type number
 * @min 0
 * @max 30
 * @default 10
 *
 * @param Custom Gradient Direction
 * @desc CUSTOM THEME ONLY: Gradient direction
 * @type select
 * @option vertical
 * @option horizontal
 * @option diagonal
 * @option radial
 * @default vertical
 *
 * @param Choice Font Size
 * @desc Font size for choice text in FF7-style choice bubbles
 * @type number
 * @default 22
 *
 * @param Choice Cursor Type
 * @desc Visual style of the selection cursor for choices
 * @type select
 * @option arrow
 * @option hand
 * @option highlight
 * @default arrow
 *
 * @param Choice Variable ID
 * @desc Default game variable ID to store choice results (1-indexed)
 * @type variable
 * @default 1
 *
 * @param Choice Spacing
 * @desc Vertical spacing between choice options in pixels
 * @type number
 * @default 6
 *
 * @param Choice Padding
 * @desc Inner padding for choice boxes in pixels
 * @type number
 * @default 8
 *
 * @param Choice Lock Movement
 * @desc Lock player/event movement when choices are active
 * @type boolean
 * @default true
 *
 * @param Character Height Offset
 * @desc Vertical offset to account for character sprite height in pixels
 * (adjusts bubble position above character)
 * @type number
 * @default 48
 *
 * @param Collision Separation
 * @desc Distance in pixels to separate colliding bubbles
 * @type number
 * @min 0
 * @max 20
 * @default 2
 *
 * @help
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Requires RPG Maker MV 1.6.1+ or MZ. For an older existing MV project,
 * update its runtime/core files before using this plugin.
 *
 * I wanted chat windows like ff7 so I made this.
 *
 * Some conversion is better suited to bubbles that don't interfere with the
 * rest of the game. NPC chatter in the city is one example. Maybe you want
 * all your text in bubbles can spawn anywhere, move around, not interfere
 * with the game or other bubbles.
 *
 * This doesn't really replace simpler plugins but does fill a niche the others
 * don't. Yanflys Gab text is more like a text window. Galvs Timed popups are
 * pretty close but don't stack or handle MBS Map zoom well. Although you can
 * use a picture fore the background to give a gradient effect its not a
 * scalable gradient like this plugin.
 *
 *
 * ============================================================================
 *  Features
 * ============================================================================
 *
 * - Parallel chat bubbles using Pixi only.
 * - Bubble stacking for multiple bubbles.
 * - Bubble animations: Bounce in and fade out.
 * - Fully customizable style with built in themes.
 * - Bubbles can follow events, the player or even followers.
 * - Legacy map zoom scale support; playtest external camera plugins.
 * - Text and bubbles can use gradients with as many colors as you want.
 * - That sweet sweet ff7 look with a theme.
 *
 * ============================================================================
 * Future plans
 * ============================================================================
 *
 * - Expand third-party zoom integration coverage
 * - Add remove all bubbles plugin command
 * - Add per-event style overrides
 * - Stacking bubbles from other events ie actors talking
 * - Expand third-party message-plugin compatibility
 * - Make work for battles?
 * - Add arrows
 * - Per-bubble placement options
 * - Add window skin from image
 * - X and Y bubble placement
 *
 * ============================================================================
 *  Plugin Parameters
 * ============================================================================
 *
 * Debug Mode - Warn about missing targets
 *
 * Theme - There are many themes to choose but only custom will allow the
 * parameters for any color to be used. Otherwise the theme chooses colors.
 *
 * ============================================================================
 *  Plugin Commands
 * ============================================================================
 *
 * ShowChatBubble eventId seconds message
 * ChatBubble next event:current duration:5
 * Follow with a normal Show Text command. ChatBubble cancel cancels the marker.
 * MZ: select Next Show Text as Bubble in the plugin command picker.
 * ShowChatBubble seconds message (current event, otherwise player)
 * ShowChatBubble message (5 seconds)
 * For numeric text: ShowChatBubble event:0 duration:5 -- 2 enemies left
 * Or: ShowChatBubble -- 2 enemies left
 * Legacy flag form: ShowChatBubble PERSIST ARROW_LEFT TRANSPARENT 1 5 Hello
 * Interactive choice: ShowChatBubbleWithChoices 1 6 20 Choose | One | Two
 * Screen: ShowScreenBubble 100 100 5 Hello
 * Battle: ShowBattlerBubble ACTOR 1 5 Hello
 * Old project settings select legacy direct commands automatically; set
 * Legacy Direct Commands explicitly to choose the legacy or modern renderer.
 * ChatBubble changeColor delayMs theme: Dark
 * ChatBubble changeFont delayMs GameFont
 * Changes affect new bubbles. delayMs defaults to 0.
 * Legacy bracket syntax works; ff7 = CrimsonAndBlue.
 * Bubbles clear on map exit, encounters, and transfers.
 * Duration includes fading. See README.md for limitations.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * See the repository LICENSE for GNU GPL-3.0 terms covering use, modification, and redistribution.
 *
 * ============================================================================
 * License: GNU General Public License v3.0
 * ============================================================================
 *
 * Copyright 2024 Fugahagen
 * This plugin is released under the terms in the repository LICENSE.
   *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * Credit "Fugahagen" in your game if you feel like it.
 *
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * 1.1.0 - [10/31/2026]: Next Show Text conversion, native text codes, MZ command/font adapters.
 * 1.0.2 - [10/31/2026]: Camera anchoring, target visibility, color validation, and dialogue fixes.
 * 1.0.1 - [10/31/2026]: Runtime, styling, layout, lifetime, and cleanup fixes.
 * 1.0 - [3/30/2024]: Initial release
 *
 * ============================================================================
 */


(function () {
  "use strict";
  let params = PluginManager.parameters("FugsChatBubbles");
  let debugMode = params["Debug Mode"] === "true";
  let Fugs = window.Fugs = window.Fugs || {};
  let bubbles = Fugs.Bubbles = {};
  let pending = [];
  let colorContext = document.createElement("canvas").getContext("2d");
  function number(value, fallback, min, max) {
    let n = value === "" || value == null ? fallback : Number(value);
    if (!isFinite(n)) n = fallback;
    return Math.max(min, Math.min(max, n));
  }
  function colors(value, fallback) {
    let result;
    try { result = JSON.parse(value); } catch (ignore) {}
    if (!Array.isArray(result)) {
      // Commas inside rgba()/hsl() belong to that color, not the list.
      result = [];
      let input = String(value || fallback), depth = 0, start = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "(") depth++;
        else if (input[i] === ")") depth = Math.max(0, depth - 1);
        else if (input[i] === "," && depth === 0) {
          result.push(input.slice(start, i)); start = i + 1;
        }
      }
      result.push(input.slice(start));
    }
    result = result.map(function (c) { return cssColor(String(c).trim()); })
      .filter(validColor);
    return result.length ? result : [fallback];
  }
  function validColor(value) {
    if (!value || !colorContext) return false;
    // An invalid assignment leaves the old style unchanged. Use two sentinels
    // so the sentinel itself is still accepted as a valid color.
    colorContext.fillStyle = "#010203";
    colorContext.fillStyle = value;
    if (colorContext.fillStyle !== "#010203") return true;
    colorContext.fillStyle = "#040506";
    colorContext.fillStyle = value;
    return colorContext.fillStyle !== "#040506";
  }
  function cssColor(value) {
    return String(value).replace(/^0x([a-f0-9]{6})$/i, "#$1");
  }
  let THEMES = {
    WhiteBlack: {
      bubbleColors: ["#FFFFFF"],
      textColors: ["#000000"],
      bubbleAlpha: 0.9,
    },
    BlackWhite: {
      bubbleColors: ["#000000"],
      textColors: ["#FFFFFF"],
      bubbleAlpha: 0.7,
    },
    Custom: {},
    Light: {
      bubbleColors: ["#ffffff", "#e6e6e6"], // White tones
      textColors: ["#000000", "#4d4d4d"], // Black tones
      bubbleAlpha: 0.9,
    },
    Dark: {
      bubbleColors: ["#000000", "#333333"], // Black tones
      textColors: ["#FFFFFF", "#CCCCCC"], // White tones
      bubbleAlpha: 0.7,
    },
    CrimsonAndBlue: {
      bubbleColors: ["#3b0000", "#5e0a0a", "#130f3b"], // Dark red and blue
      textColors: ["#d9d9d9", "#ffffff"], // White tones
      bubbleAlpha: 0.85,
    },
    FieryCrimson: {
      bubbleColors: ["#990000", "#cc0000", "#000000"], // Vivid red to black
      textColors: ["#ffcccc", "#ff6666"], // Light pinkish tones
      bubbleAlpha: 0.9,
    },
    ShadowedViolet: {
      bubbleColors: ["#1a0033", "#332266", "#5c5c8a"], // Deep purple to gray
      textColors: ["#e0e0e0", "#ccccff"], // Soft white to lavender
      bubbleAlpha: 0.75,
    },
    RoyalGold: {
      bubbleColors: ["#332b00", "#665500", "#cc9900"], // Brown to golden yellow
      textColors: ["#ffffff", "#ffffcc"], // White to pale yellow
      bubbleAlpha: 0.85,
    },
    EmeraldDream: {
      bubbleColors: ["#004d1a", "#006622", "#00b359"], // Deep green to bright green
      textColors: ["#ccffdd", "#ffffff"], // Soft green to white
      bubbleAlpha: 0.8,
    },
    SapphireGlimmer: {
      bubbleColors: ["#001f4d", "#003366", "#0059b3"], // Dark blue to bright blue
      textColors: ["#cce6ff", "#ffffff"], // Pale blue to white
      bubbleAlpha: 0.9,
    },
    EtherealGlow: {
      bubbleColors: ["#330033", "#660066", "#cc00cc"], // Dark purple to vibrant magenta
      textColors: ["#ffe6ff", "#ffffff"], // Light pink to white
      bubbleAlpha: 0.75,
    },
    TwilightSky: {
      bubbleColors: ["#000033", "#001a66", "#003366"], // Midnight blue shades
      textColors: ["#ffffff", "#cce6ff"], // White to soft blue
      bubbleAlpha: 0.8,
    },
    FrostedTeal: {
      bubbleColors: ["#004d4d", "#007f7f", "#00cccc"], // Cool teal tones
      textColors: ["#e6ffff", "#ffffff"], // Pale teal to white
      bubbleAlpha: 0.85,
    },
    SunsetBloom: {
      bubbleColors: ["#cc3300", "#ff6600", "#ff9966"], // Orange to soft peach
      textColors: ["#ffffff", "#fff2e6"], // White to cream
      bubbleAlpha: 0.9,
    },
    AutumnHearth: {
      bubbleColors: ["#663300", "#cc6600", "#ff9933"], // Brown to bright orange
      textColors: ["#fff5e6", "#ffffff"], // Light beige to white
      bubbleAlpha: 0.85,
    },
    SoftRose: {
      bubbleColors: ["#660033", "#99004d", "#cc3366"], // Deep rose to pink
      textColors: ["#ffe6f2", "#ffffff"], // Light pink to white
      bubbleAlpha: 0.75,
    },
  };


  let settings = {
    theme: params.Theme || "Dark", fontFamily: params["Font Family"] ||
      (typeof Utils !== "undefined" && Utils.RPGMAKER_NAME === "MZ" ? "rmmz-mainfont" : "GameFont"),
    fontSize: number(params["Font Size"], 28, 1, 256),
    fontColors: colors(params["Font Colors"], "#FFFFFF"),
    fontAlpha: number(params["Font Alpha"], 1, 0, 1),
    lineHeight: number(params["Font Line Height"], 32, 1, 512),
    padding: number(params["Font Padding"], 6, 0, 128),
    wrap: params["Font WordWrap"] !== "false",
    wrapWidth: number(params["Font Word Wrap Width"], 500, 1, 8192),
    bubbleColors: colors(params["Bubble Colors"], "#000000"),
    bubbleAlpha: number(params["Bubble Alpha"], 0.7, 0, 1),
    shape: params["Bubble Shape"] || "Round",
    radius: number(params["Bubble Radius"], 10, 0, 128),
    offsetX: number(params["Bubble Offset X"], 0, -8192, 8192),
    offsetY: number(params["Bubble Offset Y"], -10, -8192, 8192),
    widthMargin: number(params["Bubble Width Margin"], 16, 0, 1024),
    heightMargin: number(params["Bubble Height Margin"], 8, 0, 1024),
    borderWidth: number(params["Bubble Border Width"], 3, 0, 128),
    borderColor: cssColor(params["Bubble Border Color"] || "#FFFFFF")
  };
  if (!validColor(settings.borderColor)) settings.borderColor = "#FFFFFF";
  function themeName(name) {
    if (String(name).toLowerCase() === "ff7") return "CrimsonAndBlue";
    return Object.keys(THEMES).filter(function (key) {
      return key.toLowerCase() === String(name).toLowerCase();
    })[0];
  }
  function applyPending() {
    let now = Date.now();
    pending = pending.filter(function (change) {
      if (change.at > now) return true;
      change.apply(); return false;
    });
  }
  function style() {
    applyPending();
    let preset = THEMES[themeName(settings.theme)];
    let custom = String(settings.theme).toLowerCase() === "custom";
    return {
      fill: custom || !preset ? settings.bubbleColors : preset.bubbleColors,
      text: custom || !preset ? settings.fontColors : preset.textColors,
      alpha: custom || !preset ? settings.bubbleAlpha : preset.bubbleAlpha
    };
  }
  // Use visible glyph bounds instead of the font's advance and line box.
  function inkBounds(text) {
    text.updateText(false);
    let canvas = text.canvas;
    let data = text.context.getImageData(0, 0, canvas.width, canvas.height).data;
    let left = canvas.width, right = -1, top = canvas.height, bottom = -1;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        if (data[(y * canvas.width + x) * 4 + 3]) {
          left = Math.min(left, x); right = Math.max(right, x);
          top = Math.min(top, y); bottom = Math.max(bottom, y);
        }
      }
    }
    let resolution = text.resolution || 1;
    if (right < left) return { width: 1, height: 1, x: 0, y: 0 };
    return { width: (right-left+1)/resolution, height: (bottom-top+1)/resolution,
      x: (canvas.width/2-(left+right+1)/2)/resolution,
      y: (canvas.height/2-(top+bottom+1)/2)/resolution };
  }
  function background(width, height, fill) {
    let canvas = document.createElement("canvas");
    canvas.width = Math.ceil(width); canvas.height = Math.ceil(height);
    let ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Chat bubbles require a 2D canvas context.");
    let border = Math.min(settings.borderWidth, width/2, height/2);
    let inset = border/2, w = width-inset, h = height-inset;
    let r = settings.shape === "Square" ? 0 :
      Math.min(settings.radius, (width-border)/2, (height-border)/2);
    ctx.beginPath(); ctx.moveTo(inset+r, inset);
    ctx.arcTo(w,inset,w,h,r); ctx.arcTo(w,h,inset,h,r);
    ctx.arcTo(inset,h,inset,inset,r); ctx.arcTo(inset,inset,w,inset,r);
    ctx.closePath();
    if (fill.length === 1) ctx.fillStyle = cssColor(fill[0]);
    else {
      let gradient = ctx.createLinearGradient(0,0,width,height);
      fill.forEach(function (color,i) {
        gradient.addColorStop(i/(fill.length-1),cssColor(color));
      });
      ctx.fillStyle = gradient;
    }
    ctx.fill();
    if (border) { ctx.lineWidth=border; ctx.strokeStyle=settings.borderColor; ctx.stroke(); }
    let sprite = new PIXI.Sprite(PIXI.Texture.from(canvas));
    sprite.anchor.set(0.5);
    return sprite;
  }
  // Use the game's conversion and escape handlers without creating another
  // Window_Message or touching $gameMessage. Layout is local to each bubble.
  function richText(message, appearance) {
    let bitmap = new Bitmap(1, 1);
    let win = Object.create(Window_Base.prototype);
    Object.defineProperty(win, "contents", {value: bitmap});
    Object.defineProperty(win, "windowskin", {value: ImageManager.loadSystem("Window")});
    let properties = ["fontFace", "fontSize", "fontBold", "fontItalic",
      "textColor", "outlineColor", "outlineWidth", "paintOpacity"];
    let rows = [], row = {runs: [], width: 0, height: settings.lineHeight};
    let limit = Math.max(1, Math.min(settings.wrapWidth,
      Graphics.width-settings.widthMargin-settings.padding*2-settings.borderWidth*2-8));
    function snapshot() {
      let result = {};
      properties.forEach(function (key) { result[key] = bitmap[key]; });
      return result;
    }
    function nextRow() {
      rows.push(row);
      row = {runs: [], width: 0, height: Math.max(settings.lineHeight, bitmap.fontSize+8)};
      if (rows.length >= 256) throw new Error("Bubble exceeds 256 lines.");
    }
    function add(run) {
      let previous = row.runs[row.runs.length-1];
      let merge = run.text !== undefined && previous && previous.text !== undefined &&
        properties.every(function (key) { return previous.style[key] === run.style[key]; });
      if (merge) run.width = bitmap.measureTextWidth(previous.text+run.text)-previous.width;
      if (settings.wrap && row.width && row.width+run.width > limit) nextRow();
      if (merge && row.runs[row.runs.length-1] === previous) {
        previous.text += run.text; previous.width += run.width;
      } else {
        if (run.text !== undefined) run.width = bitmap.measureTextWidth(run.text);
        row.runs.push(run);
      }
      row.width += run.width;
      row.height = Math.max(row.height, run.height);
      // Fail before repeatedly measuring a growing, unwrapped oversized line.
      if (row.width > 8184) throw new Error("Bubble line exceeds safe bitmap width.");
    }
    win.processDrawIcon = function (index, state) {
      let size = typeof ImageManager.iconWidth === "number" ? ImageManager.iconWidth : Window_Base._iconWidth;
      add({icon: index, width: size+4, height: size+4});
      state.x = row.width;
    };
    try {
      bitmap.fontFace = fontFamily(); bitmap.fontSize = settings.fontSize;
      bitmap.textColor = cssColor(appearance.text[0]); bitmap.outlineWidth = 0;
      let state = {text: win.convertEscapeCharacters(String(message)), index: 0, x: 0, y: 0, left: 0};
      if (state.text.length > 16384) throw new Error("Bubble exceeds 16384 characters.");
      while (state.index < state.text.length) {
        let c = state.text[state.index++];
        if (c === "\n" || c === "\f") nextRow();
        else if (c === "\x1b") {
          let match = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i.exec(state.text.slice(state.index));
          if (match) {
            state.index += match[0].length;
            state.x = row.width; state.y = 0;
            // Message waits/input have no meaning for simultaneous instant bubbles.
            if (!/^[\$\.\|\^!><]$/.test(match[0])) {
              let code = match[0].toUpperCase();
              let nativeSize = code === "FS" && typeof Utils !== "undefined" && Utils.RPGMAKER_NAME === "MZ";
              if (!/^(C|I|\{|\})$/.test(code) && !nativeSize) {
                throw new Error("Text code requires normal dialogue: " + code);
              }
              win.processEscapeCharacter(code, state);
              if (!isFinite(bitmap.fontSize) || bitmap.fontSize <= 0 || bitmap.fontSize > 512) {
                throw new Error("Text code font size exceeds safe range.");
              }
            }
          } else throw new Error("Unsupported text escape sequence.");
        } else {
          // Keep supplementary Unicode characters and combining marks together.
          if (/[\uD800-\uDBFF]/.test(c) && /[\uDC00-\uDFFF]/.test(state.text[state.index] || "")) {
            c += state.text[state.index++];
          }
          while (state.index < state.text.length &&
              /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe00-\ufe0f\ufe20-\ufe2f]/.test(state.text[state.index])) {
            c += state.text[state.index++];
          }
          // Keep words together; split words only when they exceed the line width.
          if (settings.wrap && !/\s/.test(c) &&
              (state.index === 1 || /[\s\]]/.test(state.text[state.index-2]))) {
            let word = c + (/^[^\s\x1b]*/.exec(state.text.slice(state.index)) || [""])[0];
            if (row.width && bitmap.measureTextWidth(word) <= limit &&
                row.width+bitmap.measureTextWidth(word) > limit) nextRow();
          }
          add({text: c, width: bitmap.measureTextWidth(c), height: bitmap.fontSize+8, style: snapshot()});
        }
      }
      rows.push(row);
      if (!rows.some(function (r) { return r.runs.some(function (run) {
        return run.icon !== undefined || /\S/.test(run.text || "");
      }); })) throw new Error("Bubble has no visible text.");
      let width = Math.ceil(rows.reduce(function (w, r) { return Math.max(w, r.width); }, 1))+8;
      let height = Math.ceil(rows.reduce(function (h, r) { return h+r.height; }, 0))+8;
      if (width > 8192 || height > 8192 || width*height > 4194304) {
        throw new Error("Bubble text exceeds safe bitmap size.");
      }
      bitmap.resize(width, height);
      let y = 4;
      rows.forEach(function (r) {
        let x = (width-r.width)/2;
        r.runs.forEach(function (run) {
          if (run.icon !== undefined) win.drawIcon(run.icon, x+2, y+2);
          else {
            properties.forEach(function (key) { bitmap[key] = run.style[key]; });
            bitmap.drawText(run.text, x, y, run.width+8, r.height, "left");
          }
          x += run.width;
        });
        y += r.height;
      });
      // Copy so the sprite owns its texture independently of the engine Bitmap.
      let canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d").drawImage(bitmap.canvas || bitmap._canvas, 0, 0);
      let sprite = new PIXI.Sprite(PIXI.Texture.from(canvas));
      sprite.canvas = canvas; sprite.context = canvas.getContext("2d");
      sprite.updateText = function () {};
      return sprite;
    } catch (error) {
      // The Show Text hook can preserve the original message; script callers
      // receive false instead of an uncaught rendering error.
      if (debugMode) console.warn("[ChatBubbles] Could not render formatted text: " + error.message);
      return null;
    } finally {
      if (bitmap.destroy) bitmap.destroy();
      else if (bitmap._baseTexture) bitmap._baseTexture.destroy();
    }
  }
  function target(id) {
    if (id === 0) return $gamePlayer;
    let character = id < 0 ? $gamePlayer.followers().follower(-id-1) : $gameMap.event(id);
    if (!character || character._erased ||
        (id < 0 && character.isVisible && !character.isVisible())) return null;
    return character;
  }
  function fontFamily() {
    if (settings.fontFamily === "GameFont" && typeof Utils !== "undefined" && Utils.RPGMAKER_NAME === "MZ") {
      return typeof $gameSystem !== "undefined" && $gameSystem.mainFontFace ?
        $gameSystem.mainFontFace() : "rmmz-mainfont";
    }
    return settings.fontFamily;
  }
  function headPosition(scene, character) {
    let sprites = scene._spriteset && scene._spriteset._characterSprites;
    let sprite = sprites && sprites.filter(function (entry) {
      return entry._character === character;
    })[0];
    if (sprite) {
      let height = sprite.patternHeight ? sprite.patternHeight() : 48;
      if (!isFinite(height) || height <= 0) height = 48;
      // Project from the actual sprite into the bubble layer. This includes
      // camera scale, translation, shake, and nested map-container transforms.
      return scene.toLocal(sprite.toGlobal(new PIXI.Point(0, -height)));
    }
    let zoom = $gameMap.zoom || { x: 1, y: 1 };
    return new PIXI.Point(character.screenX() * number(zoom.x,1,0.01,100),
      (character.screenY()-48) * number(zoom.y,1,0.01,100));
  }
  function remove(bubble) {
    if (bubble.container.parent) bubble.container.parent.removeChild(bubble.container);
    bubble.container.destroy({ children: true, texture: true, baseTexture: true });
    let stack = bubbles[bubble.eventId];
    if (stack) {
      let index = stack.indexOf(bubble);
      if (index >= 0) stack.splice(index,1);
      if (!stack.length) delete bubbles[bubble.eventId];
    }
  }
  let clearLegacy = function () {};
  function clear() {
    Object.keys(bubbles).forEach(function (id) { bubbles[id].slice().forEach(remove); });
    clearLegacy();
  }
  function show(id, duration, message, formatted) {
    let scene = SceneManager._scene;
    if (!(scene instanceof Scene_Map) || !message || !String(message).trim()) return;
    if (!isFinite(id) || Math.floor(id) !== id) return;
    let lifetime = duration == null ? 5000 : Number(duration);
    if (!isFinite(lifetime) || lifetime <= 0) return;
    let character = target(id);
    if (!character) {
      if (debugMode) console.warn("[ChatBubbles] No character for ID " + id);
      return;
    }
    let appearance = style();
    let text = formatted ? richText(message, appearance) : new PIXI.Text(String(message),new PIXI.TextStyle({
      fontFamily: fontFamily(), fontSize: settings.fontSize,
      fill: appearance.text.length === 1 ? appearance.text[0] : appearance.text,
      lineHeight: settings.lineHeight, padding: settings.padding,
      wordWrap: settings.wrap, breakWords: true, align: "center",
      wordWrapWidth: Math.max(1,Math.min(settings.wrapWidth,
        Graphics.width-settings.widthMargin-settings.padding*2-settings.borderWidth*2-8))
    }));
    if (!text) return false;
    let ink;
    try { ink = inkBounds(text); }
    catch (error) { text.destroy(true); throw error; }
    text.anchor.set(0.5); text.position.set(ink.x,ink.y); text.alpha=settings.fontAlpha;
    let width=Math.ceil(ink.width+settings.padding*2+settings.widthMargin+settings.borderWidth*2);
    let height=Math.ceil(ink.height+settings.padding*2+settings.heightMargin+settings.borderWidth*2);
    let container=new PIXI.Container(), bg;
    try { bg=background(width,height,appearance.fill); }
    catch (error) { text.destroy(true); throw error; }
    bg.alpha=appearance.alpha;
    container.addChild(bg); container.addChild(text);
    let bubble={ eventId:id, target:character, scene:scene, container:container,
      width:width, height:height, createdAt:Date.now(),
      duration:Math.min(lifetime,2147483647),
      offsetX:settings.offsetX, offsetY:settings.offsetY };
    if (!bubbles[id]) bubbles[id]=[];
    bubbles[id].unshift(bubble); scene.addChild(container); update(scene);
    return true;
  }
  function bounce(t) {
    if (t<1/2.75) return 7.5625*t*t;
    if (t<2/2.75) { t-=1.5/2.75; return 7.5625*t*t+0.75; }
    if (t<2.5/2.75) { t-=2.25/2.75; return 7.5625*t*t+0.9375; }
    t-=2.625/2.75; return 7.5625*t*t+0.984375;
  }
  function update(scene) {
    applyPending();
    let now=Date.now();
    Object.keys(bubbles).forEach(function (id) {
      bubbles[id].slice().forEach(function (bubble) {
        let currentTarget = target(bubble.eventId);
        if (bubble.scene!==scene || now-bubble.createdAt>=bubble.duration ||
            !currentTarget || currentTarget!==bubble.target) remove(bubble);
      });
      let stack=bubbles[id];
      if (!stack || !stack.length) return;
      let head=headPosition(scene,stack[0].target);
      // Fit and clamp the stack as a group; clamping each row would overlap
      // older bubbles at the top edge.
      let naturalHeight=stack.reduce(function (sum,bubble) {
        return sum+bubble.height;
      },12*(stack.length-1));
      let stackFit=Math.min(1,Math.max(1,Graphics.height-8)/naturalHeight);
      let gap=12*stackFit;
      let totalHeight=gap*(stack.length-1);
      stack.forEach(function (bubble) {
        bubble.fit=Math.min(stackFit,Math.max(1,Graphics.width-8)/bubble.width);
        totalHeight+=bubble.height*bubble.fit;
      });
      let bottom=head.y+stack[0].offsetY;
      let currentY=Math.max(totalHeight+4,Math.min(Graphics.height-4,bottom));
      stack.forEach(function (bubble) {
        let age=Math.max(0,now-bubble.createdAt);
        let fit=bubble.fit;
        let halfW=bubble.width*fit/2, halfH=bubble.height*fit/2;
        let x=head.x+bubble.offsetX;
        let y=currentY-halfH;
        bubble.container.position.set(
          Math.max(halfW+4,Math.min(Graphics.width-halfW-4,x)),
          Math.max(halfH+4,Math.min(Graphics.height-halfH-4,y)));
        currentY-=bubble.height*fit+gap;
        let entrance=Math.min(300,bubble.duration/2), fade=Math.min(500,bubble.duration/2);
        bubble.container.scale.set(fit*bounce(Math.min(age/entrance,1)));
        bubble.container.alpha=Math.min(1,age/entrance,(bubble.duration-age)/fade);
      });
    });
  }
  let mapUpdate=Scene_Map.prototype.update;
  Scene_Map.prototype.update=function () { mapUpdate.call(this); update(this); };
  ["stop","terminate","startEncounterEffect"].forEach(function (name) {
    let original=Scene_Map.prototype[name];
    Scene_Map.prototype[name]=function () {
      clear();
      if (original) return original.apply(this,arguments);
    };
  });
  let setupMap=Game_Map.prototype.setup;
  Game_Map.prototype.setup=function () { clear(); return setupMap.apply(this,arguments); };
  function numeric(token) {
    return typeof token==="string" && /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(token);
  }
  function commandShow(interpreter,args) {
    let id=interpreter._eventId || 0, seconds=5, message;
    let divider=args.indexOf("--");
    if (divider >= 0) {
      let prefix = args.slice(0,divider);
      let optionPrefix = prefix.every(numeric) || prefix.some(function (token) {
        return /^(event|duration):/.test(token);
      });
      if (!optionPrefix) divider = -1; // Ordinary dialogue may contain "--".
    }
    if (divider>=0) {
      let options=args.slice(0,divider);
      message=args.slice(divider+1).join(" ");
      let named=options.some(function (value) { return value.indexOf(":")>=0; });
      if (named) {
        for (let i=0;i<options.length;i++) {
          let pair=options[i].split(":");
          if (pair.length!==2 || !numeric(pair[1])) return;
          if (pair[0]==="event") id=Number(pair[1]);
          else if (pair[0]==="duration") seconds=Number(pair[1]);
          else return;
        }
      } else {
        if (options.length>2 || options.some(function (v) { return !numeric(v); })) return;
        if (options.length===2) { id=Number(options[0]); seconds=Number(options[1]); }
        else if (options.length===1) seconds=Number(options[0]);
      }
    } else if (args.length>=3 && numeric(args[0]) && numeric(args[1]) &&
        Math.floor(Number(args[0]))===Number(args[0])) {
      id=Number(args[0]); seconds=Number(args[1]); message=args.slice(2).join(" ");
    } else if (args.length>=2 && numeric(args[0])) {
      seconds=Number(args[0]); message=args.slice(1).join(" ");
    } else message=args.join(" ");
    if (seconds>0 && isFinite(seconds)) show(id,seconds*1000,message);
  }
  let setLegacyTheme = function () {};
  let setLegacyFont = function () {};
  function commandStyle(args) {
    let tokens=args.join(" ").replace(/\]\s*\[/g," ").replace(/[\[\]]/g,"").trim().split(/\s+/);
    let task=tokens.shift(), delay=0;
    if (numeric(tokens[0])) delay=number(tokens.shift(),0,0,2147483647);
    let value=tokens.join(" ").replace(/^theme:\s*/i,"").trim();
    if (task==="changeColor") {
      let name=themeName(value);
      if (!name) return;
      pending.push({at:Date.now()+delay,apply:function () { settings.theme=name; setLegacyTheme(name); }});
    } else if (task==="changeFont" && value) {
      if (value.toLowerCase()==="gamefont") value="GameFont";
      pending.push({at:Date.now()+delay,apply:function () { settings.fontFamily=value; setLegacyFont(value); }});
    }
    applyPending();
  }
  function armNext(interpreter, targetId, seconds) {
    let id = targetId === "current" || targetId == null ? interpreter._eventId || 0 : Number(targetId);
    let duration = seconds == null ? 5 : Number(seconds);
    interpreter._fugsNextBubble = null;
    if (!isFinite(id) || Math.floor(id) !== id || !isFinite(duration) || duration <= 0) return;
    interpreter._fugsNextBubble = {id:id, duration:duration*1000, mapId:$gameMap.mapId()};
    ImageManager.loadSystem("Window"); ImageManager.loadSystem("IconSet");
  }
  let command101 = Game_Interpreter.prototype.command101;
  Game_Interpreter.prototype.command101 = function () {
    let marker = this._fugsNextBubble;
    if (!marker) return command101.apply(this, arguments);
    if (!(SceneManager._scene instanceof Scene_Map) || marker.mapId !== $gameMap.mapId()) {
      this._fugsNextBubble = null;
      return command101.apply(this, arguments);
    }
    // Retry without consuming the marker while normal dialogue or assets are busy.
    if ($gameMessage.isBusy() || !ImageManager.isReady()) return false;
    let params101 = arguments[0] || this._params;
    let end = this._index+1, lines = [];
    while (this._list[end] && this._list[end].code === 401) {
      lines.push(this._list[end].parameters[0]); end++;
    }
    this._fugsNextBubble = null;
    let following = this._list[end] && this._list[end].code;
    // Preserve interactive dialogue and face/speaker presentation intact.
    if (params101[0] || params101[4] || following === 102 || following === 103 || following === 104) {
      return command101.apply(this, arguments);
    }
    try {
      if (show(marker.id,marker.duration,lines.join("\n"),true)) {
        this._index = end-1; // The engine advances past the last consumed line.
        return true;
      }
    } catch (error) {
      if (debugMode) console.warn("[ChatBubbles] Using normal Show Text: " + error.message);
    }
    return command101.apply(this, arguments);
  };
  ["setup","terminate"].forEach(function (name) {
    let original = Game_Interpreter.prototype[name];
    Game_Interpreter.prototype[name] = function () {
      this._fugsNextBubble = null;
      if (original) return original.apply(this,arguments);
    };
  });

  /*
 * Terms of Use
 * ============================================================================
 *
 * Free for commercial and non-commercial use.
 *
 * ============================================================================
 * License: The MIT License
 * ============================================================================
 *
 * Copyright 2024 Fugahagen
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 * If you violate the license agreement your mother will
 * die in her sleep tonight
 * die in her sleep tonight! All protections nulled!
 *
 * ============================================================================

   */
  // Compatibility code from the original game plugin.
  let legacyInstalled=false;
  const legacyMarkerKeys = ["Choice Font Size", "Choice Cursor Type", "Choice Variable ID", "Character Height Offset"];
  const legacyMarkerCount = legacyMarkerKeys.filter(function (key) { return Object.prototype.hasOwnProperty.call(params,key); }).length;
  const legacyDirect = params["Legacy Direct Commands"] === "true" ||
    (params["Legacy Direct Commands"] == null && legacyMarkerCount >= 2);
  if (params["Legacy Direct Commands"] == null && legacyMarkerCount === 1 && typeof console !== "undefined") {
    console.warn("[ChatBubbles] One legacy-only parameter was found; set Legacy Direct Commands explicitly if needed.");
  }
  function hasLegacyFlags(args) { return !!args && args.length > 1 && /^(PERSIST|TRANSPARENT|ARROW_(LEFT|RIGHT|UP|DOWN))$/i.test(args[0] || ""); }
  function legacyShow(args) {
    const named = (args || []).some(function (arg) { return /^(event|duration):/i.test(arg); });
    return hasLegacyFlags(args) || (legacyDirect && !named && (args || []).indexOf('--') < 0);
  }
  function isLegacyCommand(command,args) { return command==='ShowChatBubbleWithChoices'||command==='ShowBattlerBubble'||command==='ShowScreenBubble'||(command==='ShowChatBubble'&&legacyShow(args)); }
  function installLegacy() { if (legacyInstalled) return; legacyInstalled=true;
var Imported = Imported || {};
Imported.Fugs = true;
var Fugs = window.Fugs = window.Fugs || {};
Fugs.LegacyBubbles = {};
Fugs.Parameters = PluginManager.parameters("FugsChatBubbles");
Fugs.LegacyBubbles.Debug = Fugs.Parameters["Debug Mode"];
Fugs.LegacyBubbles.theme = Fugs.Parameters["Theme"];
(() => {
  const pluginName = "FugsChatBubbles";
  const params = PluginManager.parameters(pluginName);
  const debugMode = params["Debug Mode"] === "true";
  const pluginParams = PluginManager.parameters("FugsChatBubbles");
  const persistBubblesByDefault =
    String(pluginParams["Persist Bubbles Default"] || "false") === "true";
  const showActorName = String(pluginParams["Show Actor Name"] || "false") === "true";

  function colorParam(key, fallbackArray) {
    const raw = String(pluginParams[key] || "").trim();
    if (!raw) return fallbackArray.slice();

    const list = raw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    return list.length ? list : fallbackArray.slice();
  }

  function numParam(key, fallback) {
    const v = Number(pluginParams[key]);
    return Number.isNaN(v) ? fallback : v;
  }

  const customBubbleColors = colorParam("Custom Bubble Colors", ["#000000", "#333333"]);
  const customTextColors = colorParam("Custom Text Colors", ["#FFFFFF", "#CCCCCC"]);
  const customBubbleAlpha = numParam("Custom Bubble Alpha", 0.8);
  const customBorderColor = pluginParams["Custom Border Color"] || "#FFFFFF";
  const customBorderWidth = numParam("Custom Border Width", 3);
  const customBorderRadius = numParam("Custom Border Radius", 10);
  const customGradientDirection = pluginParams["Custom Gradient Direction"] || "vertical";

  // Font Parameters
  let fontFamily = String(pluginParams["Font Family"] || "GameFont");
  const fontSize = numParam("Font Size", 28);
  const fontAlpha = numParam("Font Alpha", 1);
  const fontLineHeight = numParam("Font Line Height", 32);
  const fontPadding = numParam("Font Padding", 6);
  const fontWordWrap = Boolean(pluginParams["Font WordWrap"] === "true");
  const fontWordWrapWidth = numParam("Font Word Wrap Width", 500);

  // Bubble Parameters
  const bubbleShape = String(pluginParams["Bubble Shape"] || "Round");
  const bubbleOffsetX = numParam("Bubble Offset X", -4);
  const bubbleOffsetY = numParam("Bubble Offset Y", -10);
  const bubbleWidthMargin = numParam("Bubble Width Margin", 16);
  const bubbleHeightMargin = numParam("Bubble Height Margin", 8);

  // Canvas Rendering
  const canvasRenderingContext = String(pluginParams["Canvas Rendering"] || "ctx");

  // Screen boundary settings
  const keepBubblesOnScreen = String(pluginParams["Keep Bubbles On Screen"] || "true") === "true";
  const screenBoundaryThreshold = numParam("Screen Boundary Threshold", 10);

  const textVerticalOffset = numParam("Text Vertical Offset", 4);
  const arrowSize = numParam("Arrow Size", 10);

  // Choice Parameters
  const choiceFontSize = numParam("Choice Font Size", 22);
  const choiceCursorType = String(pluginParams["Choice Cursor Type"] || "arrow");
  const choiceVariableId = numParam("Choice Variable ID", 1);
  const choiceSpacing = numParam("Choice Spacing", 6);
  const choicePadding = numParam("Choice Padding", 8);
  const choiceLockMovement = String(pluginParams["Choice Lock Movement"] || "true") === "true";

  // Position & Collision Parameters
  const characterHeightOffset = numParam("Character Height Offset", 48);
  const collisionSeparation = numParam("Collision Separation", 2);

  //----------------------------------------------------------------------//
  // Internal Constants
  // Magic numbers extracted to constants for easier tweaking and maintenance
  //----------------------------------------------------------------------//
  const BUBBLE_CONFIG = {
    // Stacking layout
    STACK_GAP_FIRST: 10, // Gap in pixels above character for first bubble
    STACK_GAP_SUBSEQUENT: 6, // Gap in pixels between stacked bubbles

    // Collision resolution
    COLLISION_CHECK_INTERVAL: 10, // Frames between collision checks (60fps / 10 = 6 checks/sec)
    COLLISION_EASE_SPEED: 0.15, // Exponential ease out speed (15% of remaining distance per frame)
    COLLISION_THRESHOLD: 0.1, // Snap to target when within this many pixels (stops micro-movements)
    COLLISION_SEPARATION: collisionSeparation, // Pixels to separate colliding bubbles (plugin param)
    COLLISION_MAX_PASSES: 10, // Maximum collision resolution iterations

    // Animation durations
    APPEAR_DURATION: 300, // Milliseconds for bounce-in animation
    FADE_DURATION: 500, // Milliseconds for fade-out animation

    // Position offsets
    CHARACTER_HEIGHT_OFFSET: characterHeightOffset, // Vertical offset for character sprite height (plugin param)

    // Arrow settings
    ARROW_CORNER_RADIUS: 6, // Rounded corners on arrow sprites in pixels
    ARROW_FLASH_MIN_ALPHA: 0.4, // Minimum alpha when arrow is flashing
    ARROW_FLASH_AMPLITUDE: 0.3, // Alpha variation amplitude for flash effect

    // Choice selection
    CHOICE_SELECTED_BORDER_MULTIPLIER: 2, // Multiply border width when choice is selected
  };

  function Window_Bubbles() {
    this.initialize.apply(this, arguments);
  }

  function convertBubbleText(text) {
    if (text == null) return "";
    text = String(text);

    // MV-style escape handling (variables, names, etc., plus Yanfly extensions)
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");

    const base = Object.create(Window_Base.prototype);
    return base.convertEscapeCharacters(text);
  }

  function composeBubbleMessage(bubble) {
    let raw = bubble.message;

    // For battler bubbles, optionally prepend the actor name.
    if (bubble.targetType === "battler" && showActorName && bubble.battlerType === "ACTOR") {
      const index = bubble.battlerIndex || 1;
      const nameCode = "\\N[" + index + "]";
      raw = nameCode + "\n" + raw;
    }

    return convertBubbleText(raw);
  }

  function getCurrentScene() {
    return SceneManager._scene;
  }

  // Theme presets

  const THEMES = {
    WhiteBlack: {
      bubbleColors: ["#FFFFFF"],
      textColors: ["#000000"],
      bubbleAlpha: 0.9,
      borderColor: "#000000",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    BlackWhite: {
      bubbleColors: ["#000000"],
      textColors: ["#FFFFFF"],
      bubbleAlpha: 0.7,
      borderColor: "#333333",
      borderWidth: 2,
      borderRadius: 8,
      gradientDirection: "vertical",
    },
    Custom: {
      bubbleColors: customBubbleColors,
      textColors: customTextColors,
      bubbleAlpha: customBubbleAlpha,
      borderColor: customBorderColor,
      borderWidth: customBorderWidth,
      borderRadius: customBorderRadius,
      gradientDirection: customGradientDirection,
    },
    Light: {
      bubbleColors: ["#ffffff", "#e6e6e6", "#f2f2f2"], // White tones
      textColors: ["#000000", "#4d4d4d"], // Black tones
      bubbleAlpha: 0.9,
      borderColor: "#cccccc",
      borderWidth: 2,
      borderRadius: 12,
      gradientDirection: "vertical",
    },
    Dark: {
      bubbleColors: ["#000000", "#333333", "#1a1a1a"], // Black tones
      textColors: ["#FFFFFF", "#CCCCCC"], // White tones
      bubbleAlpha: 0.7,
      borderColor: "#4d4d4d",
      borderWidth: 2,
      borderRadius: 8,
      gradientDirection: "vertical",
    },
    CrimsonAndBlue: {
      bubbleColors: ["#3b0000", "#5e0a0a", "#130f3b"], // Dark red and blue
      textColors: ["#d9d9d9", "#ffffff"], // White tones
      bubbleAlpha: 0.85,
      borderColor: "#8b0000",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    FieryCrimson: {
      bubbleColors: ["#990000", "#cc0000", "#000000"], // Vivid red to black
      textColors: ["#ffcccc", "#ff6666"], // Light pinkish tones
      bubbleAlpha: 0.9,
      borderColor: "#ff0000",
      borderWidth: 3,
      borderRadius: 8,
      gradientDirection: "vertical",
    },
    ShadowedViolet: {
      bubbleColors: ["#1a0033", "#332266", "#5c5c8a"], // Deep purple to gray
      textColors: ["#e0e0e0", "#ccccff"], // Soft white to lavender
      bubbleAlpha: 0.75,
      borderColor: "#6a5acd",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    RoyalGold: {
      bubbleColors: ["#332b00", "#665500", "#cc9900"], // Brown to golden yellow
      textColors: ["#ffffff", "#ffffcc"], // White to pale yellow
      bubbleAlpha: 0.85,
      borderColor: "#ffd700",
      borderWidth: 3,
      borderRadius: 8,
      gradientDirection: "vertical",
    },
    EmeraldDream: {
      bubbleColors: ["#004d1a", "#006622", "#00b359"], // Deep green to bright green
      textColors: ["#ccffdd", "#ffffff"], // Soft green to white
      bubbleAlpha: 0.8,
      borderColor: "#00ff00",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    SapphireGlimmer: {
      bubbleColors: ["#001f4d", "#003366", "#0059b3"], // Dark blue to bright blue
      textColors: ["#cce6ff", "#ffffff"], // Pale blue to white
      bubbleAlpha: 0.9,
      borderColor: "#0080ff",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    EtherealGlow: {
      bubbleColors: ["#330033", "#660066", "#cc00cc"], // Dark purple to vibrant magenta
      textColors: ["#ffe6ff", "#ffffff"], // Light pink to white
      bubbleAlpha: 0.75,
      borderColor: "#ff00ff",
      borderWidth: 2,
      borderRadius: 12,
      gradientDirection: "vertical",
    },
    TwilightSky: {
      bubbleColors: ["#000033", "#001a66", "#003366"], // Midnight blue shades
      textColors: ["#ffffff", "#cce6ff"], // White to soft blue
      bubbleAlpha: 0.8,
      borderColor: "#4169e1",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    FrostedTeal: {
      bubbleColors: ["#004d4d", "#007f7f", "#00cccc"], // Cool teal tones
      textColors: ["#e6ffff", "#ffffff"], // Pale teal to white
      bubbleAlpha: 0.85,
      borderColor: "#00ffff",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    SunsetBloom: {
      bubbleColors: ["#cc3300", "#ff6600", "#ff9966"], // Orange to soft peach
      textColors: ["#ffffff", "#fff2e6"], // White to cream
      bubbleAlpha: 0.9,
      borderColor: "#ff8c00",
      borderWidth: 2,
      borderRadius: 10,
      gradientDirection: "vertical",
    },
    AutumnHearth: {
      bubbleColors: ["#663300", "#cc6600", "#ff9933"], // Brown to bright orange
      textColors: ["#fff5e6", "#ffffff"], // Light beige to white
      bubbleAlpha: 0.85,
      borderColor: "#ff7f00",
      borderWidth: 2,
      borderRadius: 8,
      gradientDirection: "vertical",
    },
    SoftRose: {
      bubbleColors: ["#660033", "#99004d", "#cc3366"], // Deep rose to pink
      textColors: ["#ffe6f2", "#ffffff"], // Light pink to white
      bubbleAlpha: 0.75,
      borderColor: "#ff69b4",
      borderWidth: 2,
      borderRadius: 12,
      gradientDirection: "vertical",
    },
    FF7: {
      bubbleColors: ["#000080", "#0000B3", "#0000FF"], // Classic FF7 blue gradient
      textColors: ["#FFFFFF"], // Pure white text
      bubbleAlpha: 0.95,
      borderColor: "#FFFFFF",
      borderWidth: 5,
      borderRadius: 4, // Cut size for angled corners
      gradientDirection: "radial",
      bubbleShape: "angled", // FF7-style angled corners
      bevelHighlight: "#ffffffff", // Light color for top-left (raised edge)
      bevelShadow: "#6b6b6bff", // Dark color for bottom-right (shadow edge)
      bevelInner: "#dad8d8ff", // White inner color for authentic FF7 look
    },
  };

  function normalizeTheme(themeConfig) {
    const theme = themeConfig || {};
    let direction = theme.gradientDirection || "vertical";
    direction = String(direction).toLowerCase();
    return {
      bubbleColors: theme.bubbleColors,
      textColors: theme.textColors,
      bubbleAlpha: theme.bubbleAlpha,
      borderColor: theme.borderColor,
      borderWidth: theme.borderWidth,
      borderRadius: theme.borderRadius,
      gradientDirection: direction,
      bubbleShape: theme.bubbleShape, // Allow themes to specify shape
      bevelHighlight: theme.bevelHighlight, // Light edge for beveled borders
      bevelShadow: theme.bevelShadow, // Dark edge for beveled borders
      bevelInner: theme.bevelInner, // Inner border color (defaults to black if not specified)
    };
  }

  let currentTheme = pluginParams["Theme"] || "Dark";
  currentTheme = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
  if (!THEMES[currentTheme]) {
    if (debugMode)
      console.warn("FugsChatBubbles: Unknown theme requested, defaulting to Dark:", currentTheme);
    currentTheme = "Dark";
  }
  const rawTheme = THEMES[currentTheme];
  const selectedTheme = normalizeTheme(rawTheme);
  setLegacyTheme = function (name) {
    const key = Object.keys(THEMES).filter(function (candidate) { return candidate.toLowerCase() === String(name).toLowerCase(); })[0];
    if (key) Object.assign(selectedTheme, normalizeTheme(THEMES[key]));
  };
  setLegacyFont = function (name) { fontFamily = String(name); };
  setLegacyTheme(settings.theme);
  setLegacyFont(settings.fontFamily);

  // Use theme's bubbleShape if defined, otherwise use plugin parameter
  const finalBubbleShape = selectedTheme.bubbleShape || bubbleShape;

  if (typeof finalBubbleShape === "string" && finalBubbleShape.toLowerCase() === "square") {
    selectedTheme.borderRadius = 0;
  }
  // Store bubble shape for use in drawing
  selectedTheme.bubbleShape = finalBubbleShape;
  if (debugMode) {
    console.log("Current Theme:", currentTheme);
    console.log("Selected Theme", selectedTheme);
  }

  Window_Bubbles.prototype = Object.create(Window_Base.prototype);
  Window_Bubbles.prototype.constructor = Window_Bubbles;

  Window_Bubbles.prototype.initialize = function (time, message, eventId, options) {
    this._time = time;
    this._message = message;
    this._eventId = eventId;
    this._createdAt = Date.now();
    this._options = options || {};
    this.createBubble();
  };
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createBubble = function () {
    const eventId = this._eventId;
    const followerIndex = eventId < 0 ? Math.abs(eventId) - 1 : null;

    const targetEvent =
      eventId === 0
        ? $gamePlayer
        : eventId < 0
          ? $gamePlayer._followers.follower(followerIndex)
          : $gameMap.event(eventId);

    if (!targetEvent) return;

    // Initialize storage for this event's bubbles (ES5-compatible)
    if (!Fugs.LegacyBubbles[eventId]) {
      Fugs.LegacyBubbles[eventId] = [];
    }

    const options = this._options || {};
    const bubble = {
      eventId: eventId,
      message: this._message,
      time: this._time,
      createdAt: this._createdAt,
      show: true,
      targetEvent: targetEvent,
      persistent: !!options.persistent,
      targetType: options.targetType || "map",
      battlerType: options.battlerType || null,
      battlerIndex: options.battlerIndex || 0,
      screenX: options.screenX || null,
      screenY: options.screenY || null,
      arrowDirection: options.arrowDirection || "none",
      transparent: !!options.transparent,
      // Choice properties
      choices: options.choices || null,
      choiceVariableId: options.choiceVariableId || choiceVariableId,
      selectedChoiceIndex: options.selectedChoiceIndex || 0,
      choiceActive: false,
      choiceSprites: [],
      choiceBackgrounds: [],
      choiceCursor: null,
      // Arrow flash animation for choices
      arrowFlashFrame: 0,
      arrowFlashAlpha: 1.0,
      // Arrow sprite (separate from bubble so it can extend beyond)
      arrowSprite: null,
      // Fade tracking
      _fading: false,
    };

    Fugs.LegacyBubbles[eventId].unshift(bubble);
    this.createChatBubble(bubble);
    this.createArrowSprite(bubble); // Create arrow sprite if bubble has arrow direction
    this.createChoiceSprites(bubble); // Create choice UI if bubble has choices
    this.updateBubbleStack(eventId);
  };

  //----------------------------------------------------------------------//
  // Create Choice Sprites
  // Renders choice options below the bubble with FF7-style boxes
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createChoiceSprites = function (bubble) {
    if (!hasValidChoices(bubble)) return;

    const scene = getCurrentScene();
    if (!scene || !scene.addChild) return;

    // Calculate max width for choices
    let maxChoiceWidth = 0;
    const choiceTextStyles = [];

    // Create text styles and measure widths
    bubble.choices.forEach((choiceText) => {
      const textStyle = new PIXI.TextStyle({
        fontFamily: fontFamily,
        fontSize: choiceFontSize,
        fill: selectedTheme.textColors.length > 0 ? selectedTheme.textColors : ["#FFFFFF"],
        align: "left",
        lineHeight: choiceFontSize,
        padding: 4,
      });
      choiceTextStyles.push(textStyle);

      const tempText = new PIXI.Text(choiceText, textStyle);
      const textWidth = tempText.width;
      tempText.destroy(true);
      if (textWidth > maxChoiceWidth) {
        maxChoiceWidth = textWidth;
      }
    });

    // Add padding to width
    const choiceBoxWidth = maxChoiceWidth + choicePadding * 2;
    const choiceBoxHeight = choiceFontSize + choicePadding * 2;

    // Pre-create textures for both states (normal and selected) to avoid redrawing
    bubble.choiceTextures = [];

    // Create background and text for each choice
    bubble.choices.forEach((choiceText, index) => {
      // Pre-create both normal and selected textures
      const normalCanvas = this.drawChoiceBox(choiceText, choiceBoxWidth, choiceBoxHeight, false);
      const selectedCanvas = this.drawChoiceBox(choiceText, choiceBoxWidth, choiceBoxHeight, true);
      const normalTexture = PIXI.Texture.from(normalCanvas);
      const selectedTexture = PIXI.Texture.from(selectedCanvas);

      // Store both textures
      bubble.choiceTextures[index] = {
        normal: normalTexture,
        selected: selectedTexture,
      };

      // Create background sprite with initial texture
      const isSelected = index === bubble.selectedChoiceIndex;
      const bgSprite = new PIXI.Sprite(isSelected ? selectedTexture : normalTexture);
      bgSprite.alpha = selectedTheme.bubbleAlpha;

      // Create choice text
      const textStyle = choiceTextStyles[index];
      const textSprite = new PIXI.Text(choiceText, textStyle);

      // Store references
      bubble.choiceBackgrounds.push(bgSprite);
      bubble.choiceSprites.push(textSprite);

      // Add to scene
      scene.addChild(bgSprite);
      scene.addChild(textSprite);
    });

    // Create cursor sprite (arrow type)
    if (choiceCursorType === "arrow") {
      const cursorText = new PIXI.Text(
        "►",
        new PIXI.TextStyle({
          fontFamily: fontFamily,
          fontSize: choiceFontSize,
          fill: selectedTheme.textColors.length > 0 ? selectedTheme.textColors : ["#FFFFFF"],
        })
      );
      bubble.choiceCursor = cursorText;
      scene.addChild(cursorText);
    }

    // Activate choices
    bubble.choiceActive = true;

    // Store dimensions for positioning
    bubble.choiceBoxWidth = choiceBoxWidth;
    bubble.choiceBoxHeight = choiceBoxHeight;
  };

  //----------------------------------------------------------------------//
  // Update Choice Positions
  // Positions choice boxes below the bubble text
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.updateChoicePositions = function (bubble, bubbleX, bubbleY) {
    if (!hasValidChoices(bubble)) return;
    if (bubble.choiceBackgrounds.length === 0) return;

    const bubbleHeight = bubble.textHeight + bubbleHeightMargin;
    let startY = bubbleY + bubbleHeight + choiceSpacing;

    bubble.choices.forEach((choiceText, index) => {
      const bgSprite = bubble.choiceBackgrounds[index];
      const textSprite = bubble.choiceSprites[index];

      if (!bgSprite || !textSprite) return;

      const choiceY = startY + index * (bubble.choiceBoxHeight + choiceSpacing);

      // Position background
      bgSprite.position.set(bubbleX, choiceY);

      // Position text (centered with padding)
      textSprite.position.set(bubbleX + choicePadding, choiceY + choicePadding);

      // Update cursor position if this is the selected choice
      if (index === bubble.selectedChoiceIndex && bubble.choiceCursor) {
        bubble.choiceCursor.position.set(
          bubbleX - bubble.choiceCursor.width - 5,
          choiceY + choicePadding
        );
      }
    });
  };

  //----------------------------------------------------------------------//
  // Update Choice Selection
  // Redraws choice backgrounds when selection changes
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.updateChoiceSelection = function (bubble) {
    if (!hasValidChoices(bubble)) return;
    if (bubble.choiceBackgrounds.length === 0) return;
    if (!bubble.choiceTextures) return; // Safety check

    // Simply switch between pre-created textures instead of redrawing
    bubble.choices.forEach((choiceText, index) => {
      const bgSprite = bubble.choiceBackgrounds[index];
      if (!bgSprite) return;

      const isSelected = index === bubble.selectedChoiceIndex;
      const textures = bubble.choiceTextures[index];
      if (!textures) return;

      // Switch to appropriate pre-created texture
      bgSprite.texture = isSelected ? textures.selected : textures.normal;
    });
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.drawBackground = function (width, height, bubble) {
    // Add padding to the bubble background
    width += bubbleWidthMargin;
    height += bubbleHeightMargin;

    // Get colors from the selected theme
    const colors = selectedTheme.bubbleColors;
    const alpha = selectedTheme.bubbleAlpha;
    const borderRadius = selectedTheme.borderRadius;
    const borderColor = selectedTheme.borderColor;
    const borderWidth = selectedTheme.borderWidth;

    // Get arrow and transparency settings from bubble options
    const arrowDirection = bubble.arrowDirection || "none";
    const transparent = bubble.transparent || false;

    // Create the gradient canvas
    const canvas = this.createGradientCanvas(
      width,
      height,
      colors,
      borderRadius,
      borderColor,
      borderWidth,
      arrowDirection,
      transparent
    );

    // Create a sprite from the canvas
    const texture = PIXI.Texture.from(canvas);
    const sprite = new PIXI.Sprite(texture);
    sprite.alpha = transparent ? 0 : alpha; // Fully transparent sprite if transparent flag is set

    // Initial position - will be updated in updateBubbleStack or per-frame
    sprite.position.set(0, 0);

    // Store the sprite and add it to the scene
    bubble.gradientSprite = sprite;
    addSpriteToScene(sprite);
  };

  //----------------------------------------------------------------------//
  // Draw FF7-style Beveled Border
  // Shared function for drawing the 3-layer FF7 border on angled corners
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.drawFF7Border = function (ctx, width, height, borderWidth, cutSize) {
    const halfBorder = borderWidth / 2;

    // Create the border path
    const createBorderPath = () => {
      ctx.beginPath();
      ctx.moveTo(cutSize + halfBorder, halfBorder);
      ctx.lineTo(width - cutSize - halfBorder, halfBorder);
      ctx.lineTo(width - halfBorder, cutSize + halfBorder);
      ctx.lineTo(width - halfBorder, height - cutSize - halfBorder);
      ctx.lineTo(width - cutSize - halfBorder, height - halfBorder);
      ctx.lineTo(cutSize + halfBorder, height - halfBorder);
      ctx.lineTo(halfBorder, height - cutSize - halfBorder);
      ctx.lineTo(halfBorder, cutSize + halfBorder);
      ctx.closePath();
    };

    // Stroke 1: Outer dark gray (full width = 5px)
    createBorderPath();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = selectedTheme.bevelShadow;
    ctx.stroke();

    // Stroke 2: Middle white (borderWidth - 3 for 3px dark gray band)
    createBorderPath();
    ctx.lineWidth = borderWidth - 3;
    ctx.strokeStyle = selectedTheme.bevelHighlight;
    ctx.stroke();

    // Stroke 3: Inner light gray (1px)
    createBorderPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = selectedTheme.bevelInner || "#F0F0F0";
    ctx.stroke();
  };

  //----------------------------------------------------------------------//
  // Create Arrow Sprite
  // Creates a separate PIXI sprite for the arrow so it can extend beyond bubble
  // Uses texture caching to avoid recreating identical arrows
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createArrowSprite = function (bubble) {
    if (!bubble.arrowDirection || bubble.arrowDirection === "none") return;
    if (arrowSize <= 0) return;

    const borderColor = selectedTheme.borderColor;
    const bubbleColors = selectedTheme.bubbleColors;
    const fillColor = Array.isArray(bubbleColors) ? bubbleColors[0] : bubbleColors;
    const size = arrowSize;
    const borderWidth = selectedTheme.borderWidth || 2;

    // Check cache for existing texture
    const cacheKey = `arrow_${bubble.arrowDirection}_${size}_${borderColor}_${fillColor}_${borderWidth}`;
    this._arrowTextureCache = this._arrowTextureCache || {};

    let texture = this._arrowTextureCache[cacheKey];

    if (!texture) {
      // Create canvas for arrow (larger to accommodate border and rounded corners)
      const canvas = document.createElement("canvas");
      canvas.width = size * 4;
      canvas.height = size * 4;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.save();

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cornerRadius = BUBBLE_CONFIG.ARROW_CORNER_RADIUS;

      // Draw arrow with rounded corners using helper function
      const pathDrawn = drawArrowPath(
        ctx,
        bubble.arrowDirection,
        centerX,
        centerY,
        size,
        cornerRadius
      );

      if (!pathDrawn) {
        ctx.restore();
        return;
      }

      // Fill with theme bubble color
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();

      ctx.restore();

      // Create PIXI texture and cache it
      texture = PIXI.Texture.from(canvas);
      this._arrowTextureCache[cacheKey] = texture;
    }

    // Create sprite from cached texture
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5, 0.5); // Center the sprite

    // Store sprite reference
    bubble.arrowSprite = sprite;

    // Add to scene
    addSpriteToScene(sprite);
  };

  //----------------------------------------------------------------------//
  // Draw Choice Box Function
  // Simple wrapper around createGradientCanvas() with modified border width
  // Returns a canvas ready to be converted to PIXI texture
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.drawChoiceBox = function (text, width, height, isSelected) {
    // Calculate border width (multiplied if selected)
    const borderWidth =
      selectedTheme.borderWidth *
      (isSelected ? BUBBLE_CONFIG.CHOICE_SELECTED_BORDER_MULTIPLIER : 1);

    // Delegate to shared gradient canvas function
    return this.createGradientCanvas(
      width,
      height,
      selectedTheme.bubbleColors,
      selectedTheme.borderRadius,
      selectedTheme.borderColor,
      borderWidth,
      "none", // arrowDirection (not used for choice boxes)
      false // transparent (choice boxes are always visible)
    );
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createGradientCanvas = function (
    width,
    height,
    colors,
    radius,
    borderColor,
    borderWidth,
    arrowDirection,
    transparent
  ) {
    // Get theme properties
    const themeBorderColor = borderColor;
    const themeBorderWidth = borderWidth;
    const themeBorderRadius = radius;
    const gradientDirection = selectedTheme.gradientDirection || "vertical";
    const bubbleShape = selectedTheme.bubbleShape || "round";

    // Create cache key from all parameters that affect rendering
    const colorKey = Array.isArray(colors) ? colors.join(",") : colors;
    const cacheKey = `bubble_${width}_${height}_${colorKey}_${radius}_${borderColor}_${borderWidth}_${gradientDirection}_${bubbleShape}_${transparent}`;

    // Check cache for existing canvas
    this._bubbleCanvasCache = this._bubbleCanvasCache || {};
    let canvas = this._bubbleCanvasCache[cacheKey];

    if (canvas) {
      return canvas; // Return cached canvas
    }

    // Create new canvas if not in cache
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.alpha = 1;
    let ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get canvas 2D context");
      return null;
    }

    // Create gradient based on direction
    let gradient;
    switch (gradientDirection) {
      case "horizontal":
        gradient = ctx.createLinearGradient(0, 0, width, 0);
        break;
      case "diagonal":
        gradient = ctx.createLinearGradient(0, 0, width, height);
        break;
      case "radial":
        gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) / 2
        );
        break;
      case "vertical":
      default:
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        break;
    }

    // Add color stops
    if (Array.isArray(colors) && colors.length > 1) {
      let step = 1 / (colors.length - 1);
      colors.forEach((color, index) => {
        gradient.addColorStop(index * step, color);
      });
    } else {
      // Handle single color case
      if (typeof gradient === "object") {
        // It's a gradient object
        gradient.addColorStop(0, Array.isArray(colors) ? colors[0] : colors);
        gradient.addColorStop(1, Array.isArray(colors) ? colors[0] : colors);
      } else {
        // It's a color string
        gradient = Array.isArray(colors) ? colors[0] : colors;
      }
    }

    ctx.fillStyle = gradient;

    // Draw rectangle with appropriate corners based on bubble shape
    if (!transparent) {
      // Inset the path by half the border width so the stroke stays inside the bubble bounds
      // This prevents the corners from appearing thicker than the edges
      const inset = themeBorderWidth / 2;
      const shape = selectedTheme.bubbleShape ? selectedTheme.bubbleShape.toLowerCase() : "round";

      ctx.beginPath();

      if (shape === "angled") {
        // FF7-style angled corners with 45-degree cuts
        const cutSize = themeBorderRadius || 8; // Use border radius as cut size

        // Start at top left, after the cut
        ctx.moveTo(cutSize + inset, inset);
        // Top edge to top-right cut
        ctx.lineTo(width - cutSize - inset, inset);
        // Top-right diagonal cut
        ctx.lineTo(width - inset, cutSize + inset);
        // Right edge to bottom-right cut
        ctx.lineTo(width - inset, height - cutSize - inset);
        // Bottom-right diagonal cut
        ctx.lineTo(width - cutSize - inset, height - inset);
        // Bottom edge to bottom-left cut
        ctx.lineTo(cutSize + inset, height - inset);
        // Bottom-left diagonal cut
        ctx.lineTo(inset, height - cutSize - inset);
        // Left edge to top-left cut
        ctx.lineTo(inset, cutSize + inset);
        // Close path back to start
        ctx.closePath();
      } else {
        // Round or Square corners (using arcTo with radius)
        ctx.moveTo(themeBorderRadius + inset, inset);
        ctx.arcTo(width - inset, inset, width - inset, height - inset, themeBorderRadius);
        ctx.arcTo(width - inset, height - inset, inset, height - inset, themeBorderRadius);
        ctx.arcTo(inset, height - inset, inset, inset, themeBorderRadius);
        ctx.arcTo(inset, inset, width - inset, inset, themeBorderRadius);
        ctx.closePath();
      }

      ctx.fill();

      // Draw border - use beveled style if bevel colors are defined
      if (themeBorderWidth > 0) {
        if (
          selectedTheme.bevelHighlight &&
          selectedTheme.bevelShadow &&
          shape === "angled" &&
          themeBorderWidth >= 3
        ) {
          // Use shared FF7 border drawing function
          const cutSize = themeBorderRadius;
          this.drawFF7Border(ctx, width, height, themeBorderWidth, cutSize);
        } else {
          // Normal border
          ctx.lineWidth = themeBorderWidth;
          ctx.strokeStyle = themeBorderColor;
          ctx.stroke();
        }
      }
    }

    // Cache the canvas before returning
    this._bubbleCanvasCache[cacheKey] = canvas;

    return canvas;
  };
  //----------------------------------------------------------------------//
  //--------------------Create Chat Bubble--------------------------------//
  //----------------------------------------------------------------------//
  //
  function currentMapScene() {
    const scene = SceneManager._scene;
    return scene && scene instanceof Scene_Map ? scene : null;
  }

  function getBattlerScreenPosition(bubble) {
    const scene = getCurrentScene();
    if (!scene || !(scene instanceof Scene_Battle) || !scene._spriteset) return null;

    const spriteset = scene._spriteset;
    let sprite = null;

    if (bubble.battlerType === "ACTOR") {
      if (!spriteset._actorSprites || !spriteset._actorSprites.length) return null;
      sprite = spriteset._actorSprites[bubble.battlerIndex - 1];
    } else if (bubble.battlerType === "ENEMY") {
      if (!spriteset._enemySprites || !spriteset._enemySprites.length) return null;
      sprite = spriteset._enemySprites[bubble.battlerIndex - 1];
    }

    if (!sprite || !sprite._battler) return null;

    return {
      x: sprite.x,
      y: sprite.y,
    };
  }

  Window_Bubbles.prototype.createChatBubble = function (bubble) {
    // Create text style
    const textFill = selectedTheme.textColors;
    const textStyle = new PIXI.TextStyle({
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: textFill,
      fillGradientStops: [1],
      lineHeight: fontLineHeight,
      padding: fontPadding,
      wordWrap: fontWordWrap,
      wordWrapWidth: fontWordWrapWidth,
    });

    // Build final message (optional actor name header + escape codes)
    const parsedMessage = composeBubbleMessage(bubble);

    // Create text
    const bubbleText = new PIXI.Text(parsedMessage, textStyle);
    bubbleText.alpha = fontAlpha || 1; // Apply font alpha
    bubble.textWidth = bubbleText.width;
    bubble.textHeight = bubbleText.height;
    bubble.bubbleText = bubbleText;

    // Draw background
    this.drawBackground(bubble.textWidth, bubble.textHeight, bubble);

    // Set initial scale for animation (only for elements that exist)
    if (bubbleText) bubbleText.scale.set(0.5);
    if (bubble.gradientSprite) bubble.gradientSprite.scale.set(0.5);

    // Add text to scene (map or battle)
    addSpriteToScene(bubbleText);

    // Debug output to check if keepBubblesOnScreen is working
    if (debugMode) {
      console.log("keepBubblesOnScreen setting:", keepBubblesOnScreen);
    }

    // Animate the bubble appearing
    this.animateBubbleAppear(bubble);

    // Set a timeout to remove the bubble after the specified time
    if (!hasValidChoices(bubble)) {
      bubble.timeoutId = setTimeout(() => {
        if (bubble.fadeOut) {
          bubble.fadeOut();
        } else {
          this.removeBubble(bubble);
        }
      }, bubble.time);
    }

    // Check for collisions with other bubbles
    this.checkBubbleCollisions();
  };

  //----------------------------------------------------------------------//
  // BUBBLE STACKING AND POSITIONING (called every frame)
  // =====================================================
  // This function positions bubbles for a single event, handling:
  // 1. Stacking multiple bubbles vertically above the character
  // 2. Storing base positions (where bubbles naturally want to be)
  // 3. Animating collision offsets toward targets (smooth easing)
  // 4. Applying final position = base + current offset
  //
  // See COLLISION SYSTEM ARCHITECTURE comment above for full details.

  Window_Bubbles.prototype.updateBubbleStack = function (eventId) {
    try {
      const bubbles = Fugs.LegacyBubbles[eventId];
      if (!bubbles || !Array.isArray(bubbles) || bubbles.length === 0) return;

      // Get only visible bubbles
      const visibleBubbles = bubbles.filter((bubble) => bubble && bubble.show);
      if (visibleBubbles.length === 0) return;

      // Get the target event
      const targetEvent = visibleBubbles[0].targetEvent;
      if (!targetEvent) return;

      // Calculate base position (where character is on screen)
      const zoom = $gameMap.zoom != null ? $gameMap.zoom : { x: 1, y: 1 };
      const baseX = targetEvent.screenX() * zoom.x;
      const baseY = targetEvent.screenY() * zoom.y - BUBBLE_CONFIG.CHARACTER_HEIGHT_OFFSET * zoom.y;

      // BUBBLE STACKING CALCULATION:
      // Start from character's head and stack upward
      let currentY = baseY + bubbleOffsetY;

      // Process bubbles from bottom to top (newest at bottom, oldest stacks upward)
      for (let i = 0; i < visibleBubbles.length; i++) {
        const bubble = visibleBubbles[i];

        // Center text horizontally over event and apply horizontal offset
        const textX = Math.round(baseX - bubble.textWidth / 2 + bubbleOffsetX);

        // Calculate full bubble height (text content + top/bottom margins)
        const bubbleHeight = bubble.textHeight + bubbleHeightMargin;

        // VERTICAL STACKING:
        // First bubble: Position above character with spacing
        // Subsequent bubbles: Stack above previous bubble with smaller gap
        if (i === 0) {
          currentY -= bubbleHeight + BUBBLE_CONFIG.STACK_GAP_FIRST;
        } else {
          currentY -= bubbleHeight + BUBBLE_CONFIG.STACK_GAP_SUBSEQUENT;
        }

        // COLLISION SYSTEM ARCHITECTURE:
        // ===============================
        // We use a two-offset system to prevent jitter and ensure smooth collision resolution:
        //
        // 1. BASE POSITIONS (baseTextX/Y, baseSpriteX/Y):
        //    - Where the bubble WANTS to be based on character position
        //    - Recalculated every frame to follow moving characters
        //    - Used by collision detection to determine WHERE bubbles should move
        //
        // 2. TARGET OFFSETS (targetOffsetX/Y):
        //    - Where collision detection says the bubble SHOULD move to avoid overlap
        //    - Recalculated every 10 frames by checkBubbleCollisions()
        //    - Deterministic: same base positions always produce same targets
        //
        // 3. CURRENT OFFSETS (collisionOffsetX/Y):
        //    - Where the bubble CURRENTLY is (smoothly animating toward target)
        //    - Updated every frame with easing
        //    - Creates smooth movement instead of instant snapping
        //
        // Why this works:
        // - Bubbles smoothly ease to collision-free positions and STOP (no oscillation)
        // - Collision only recalculates when needed (every 10 frames), not every frame
        // - Base positions ensure deterministic results (no back-and-forth fighting)

        // Store base positions (natural position following character, no collision applied)
        const baseTextX = textX;
        const baseTextY = currentY + textVerticalOffset;
        const baseSpriteX = textX - bubbleWidthMargin / 2;
        const baseSpriteY = currentY - bubbleHeightMargin / 2;

        bubble.baseTextX = baseTextX;
        bubble.baseTextY = baseTextY;
        bubble.baseSpriteX = baseSpriteX;
        bubble.baseSpriteY = baseSpriteY;

        // Initialize offset values
        initializeBubbleOffsets(bubble);

        // Smoothly animate current offset toward target offset (ease out)
        // This prevents instant snapping and creates smooth, natural movement
        const easeSpeed = BUBBLE_CONFIG.COLLISION_EASE_SPEED;
        const threshold = BUBBLE_CONFIG.COLLISION_THRESHOLD;

        const diffX = bubble.targetOffsetX - bubble.collisionOffsetX;
        const diffY = bubble.targetOffsetY - bubble.collisionOffsetY;

        if (Math.abs(diffX) > threshold) {
          bubble.collisionOffsetX += diffX * easeSpeed; // Ease toward target
        } else {
          bubble.collisionOffsetX = bubble.targetOffsetX; // Snap when close enough
        }

        if (Math.abs(diffY) > threshold) {
          bubble.collisionOffsetY += diffY * easeSpeed; // Ease toward target
        } else {
          bubble.collisionOffsetY = bubble.targetOffsetY; // Snap when close enough
        }

        // Position the background first
        if (bubble.gradientSprite) {
          bubble.gradientSprite.position.set(
            baseSpriteX + bubble.collisionOffsetX,
            baseSpriteY + bubble.collisionOffsetY
          );
        }

        // Position text in the center of the background
        if (bubble.bubbleText) {
          bubble.bubbleText.position.set(
            baseTextX + bubble.collisionOffsetX,
            baseTextY + bubble.collisionOffsetY
          );
        }

        // Position arrow sprite on the edge of the bubble (pushed out further)
        if (bubble.arrowSprite) {
          const bubbleWidth = bubble.textWidth + bubbleWidthMargin;
          const bubbleHeight = bubble.textHeight + bubbleHeightMargin;
          const finalX = baseSpriteX + bubble.collisionOffsetX;
          const finalY = baseSpriteY + bubble.collisionOffsetY;

          // Push arrow out slightly to extend beyond bubble edge
          const arrowOffset = arrowSize * 0.5;

          const arrowPos = calculateArrowPosition(
            bubble.arrowDirection,
            finalX,
            finalY,
            bubbleWidth,
            bubbleHeight,
            arrowOffset
          );
          bubble.arrowSprite.position.set(arrowPos.x, arrowPos.y);

          // Only update alpha if not fading (fade animation handles it during fadeOut)
          if (!bubble._fading) {
            // Animate arrow flash when choices are active
            if (bubble.choiceActive) {
              bubble.arrowFlashFrame = (bubble.arrowFlashFrame || 0) + 1;
              // Throb between min alpha and 1.0 over 60 frames (1 second at 60fps)
              const cycle = bubble.arrowFlashFrame % 60;
              const normalizedCycle = cycle / 60; // 0 to 1
              const minAlpha = BUBBLE_CONFIG.ARROW_FLASH_MIN_ALPHA;
              const amplitude = BUBBLE_CONFIG.ARROW_FLASH_AMPLITUDE;
              bubble.arrowFlashAlpha =
                minAlpha + (Math.sin(normalizedCycle * Math.PI * 2) * amplitude + amplitude);
              bubble.arrowSprite.alpha = bubble.arrowFlashAlpha;
            } else {
              bubble.arrowSprite.alpha = 1.0;
            }
          }
        }

        // Position choices below bubble if they exist
        if (bubble.choices && bubble.choices.length > 0) {
          this.updateChoicePositions(
            bubble,
            baseSpriteX + bubble.collisionOffsetX,
            baseSpriteY + bubble.collisionOffsetY
          );
        }
      }

      // Apply screen boundary constraints if needed
      if (keepBubblesOnScreen) {
        visibleBubbles.forEach((bubble) => {
          if (bubble && bubble.show) {
            this.constrainBubbleToScreen(bubble);
          }
        });
      }
    } catch (e) {
      console.error("Error in updateBubbleStack:", e);
    }
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.easeOutBounce = function (t) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.removeBubble = function (bubble) {
    if (!bubble) return;

    bubble._destroyed = true;
    if (bubble.timeoutId) {
      clearTimeout(bubble.timeoutId);
      bubble.timeoutId = null;
    }
    const scene = getCurrentScene();

    // Remove main bubble sprites
    ["bubbleText", "bubbleBackground", "gradientSprite"].forEach((key) => {
      cleanupSprite(scene, bubble[key], true);
      bubble[key] = null;
    });

    // Remove choice sprites
    cleanupSpriteArray(scene, bubble.choiceBackgrounds);
    bubble.choiceBackgrounds = [];

    cleanupSpriteArray(scene, bubble.choiceSprites, true);
    bubble.choiceSprites = [];

    cleanupSprite(scene, bubble.choiceCursor, true);
    bubble.choiceCursor = null;

    // Destroy pre-created choice textures
    if (bubble.choiceTextures && Array.isArray(bubble.choiceTextures)) {
      bubble.choiceTextures.forEach((textures) => {
        if (!textures) return;
        if (textures.normal && textures.normal.destroy) {
          textures.normal.destroy(true);
        }
        if (textures.selected && textures.selected.destroy) {
          textures.selected.destroy(true);
        }
      });
      bubble.choiceTextures = [];
    }

    // Remove arrow sprite
    cleanupSprite(scene, bubble.arrowSprite, true);
    bubble.arrowSprite = null;

    const bubbles = Fugs.LegacyBubbles[bubble.eventId];
    if (bubbles) {
      const index = bubbles.indexOf(bubble);
      if (index > -1) bubbles.splice(index, 1);
      if (!bubbles.length) delete Fugs.LegacyBubbles[bubble.eventId];
    }
  };

  clearLegacy = function () {
    Object.keys(Fugs.LegacyBubbles || {}).forEach(function (id) {
      const list = Fugs.LegacyBubbles[id];
      if (Array.isArray(list)) list.slice().forEach(function (bubble) { Window_Bubbles.prototype.removeBubble(bubble); });
    });
  };

  //----------------------------------------------------------------------//
  //--------------------------Scene Map-----------------------------------//
  //----------------------------------------------------------------------//
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    this.updateChatBubbles();
  };

  function preserveLegacyBubble(bubble) {
    if (!Fugs.PersistentBubbles) Fugs.PersistentBubbles = [];
    Fugs.PersistentBubbles.push({
      message: bubble.message, eventId: bubble.eventId, time: bubble.time,
      createdAt: bubble.createdAt, targetType: bubble.targetType,
      battlerType: bubble.battlerType, battlerIndex: bubble.battlerIndex,
      screenX: bubble.screenX, screenY: bubble.screenY,
      arrowDirection: bubble.arrowDirection, transparent: bubble.transparent,
      choices: bubble.choices, choiceVariableId: bubble.choiceVariableId,
      selectedChoiceIndex: bubble.selectedChoiceIndex,
    });
  }

  const _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function () {
    // Clean up all non-persistent bubbles before leaving the map.
    // Persistent bubbles will be logically preserved and recreated on the next map.
    if (Fugs && Fugs.LegacyBubbles) {
      if (!Fugs.PersistentBubbles) Fugs.PersistentBubbles = [];

      Object.keys(Fugs.LegacyBubbles).forEach((eventId) => {
        const list = Fugs.LegacyBubbles[eventId];
        if (!Array.isArray(list)) return;
        list.slice().forEach((bubble) => {
          if (bubble && bubble.persistent) {
            // Store lightweight data for recreation later
            preserveLegacyBubble(bubble);
            Window_Bubbles.prototype.removeBubble(bubble);
          } else {
            Window_Bubbles.prototype.removeBubble(bubble);
          }
        });
      });
      Fugs.LegacyBubbles = {};
    }
    _Scene_Map_terminate.call(this);
  };

  // Helper function to check if any choices are active
  function hasActiveChoices() {
    if (!Fugs || !Fugs.LegacyBubbles) return false;
    for (const eventId in Fugs.LegacyBubbles) {
      const list = Fugs.LegacyBubbles[eventId];
      if (!Array.isArray(list)) continue;
      for (let i = 0; i < list.length; i++) {
        const bubble = list[i];
        if (bubble && bubble.choiceActive && bubble.choices && bubble.choices.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  // Override player canMove to lock movement when choices are active (if enabled)
  if (choiceLockMovement) {
    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function () {
      if (hasActiveChoices()) {
        return false;
      }
      return _Game_Player_canMove.call(this);
    };
  }

  Scene_Map.prototype.updateChatBubbles = function () {
    let hasActiveBubbles = false;

    // HANDLE CHOICE INPUT
    // Check all bubbles for active choices and handle keyboard input
    for (const eventId in Fugs.LegacyBubbles) {
      const list = Fugs.LegacyBubbles[eventId];
      if (!Array.isArray(list)) continue;

      for (let i = 0; i < list.length; i++) {
        const bubble = list[i];
        if (!bubble || !bubble.choiceActive || !bubble.choices || bubble.choices.length === 0)
          continue;

        // Handle up/down navigation
        if (Input.isTriggered("up")) {
          bubble.selectedChoiceIndex =
            (bubble.selectedChoiceIndex - 1 + bubble.choices.length) % bubble.choices.length;
          Window_Bubbles.prototype.updateChoiceSelection(bubble);
          SoundManager.playCursor();
        } else if (Input.isTriggered("down")) {
          bubble.selectedChoiceIndex = (bubble.selectedChoiceIndex + 1) % bubble.choices.length;
          Window_Bubbles.prototype.updateChoiceSelection(bubble);
          SoundManager.playCursor();
        } else if (Input.isTriggered("ok")) {
          // Choice selected!
          const selectedIndex = bubble.selectedChoiceIndex;
          const variableId = bubble.choiceVariableId;

          // Store result in game variable (1-indexed for events)
          $gameVariables.setValue(variableId, selectedIndex + 1);

          // Play confirmation sound
          SoundManager.playOk();

          // Remove bubble and choices
          Window_Bubbles.prototype.removeBubble(bubble, eventId);
        }

        // Only handle input for the first active choice bubble found
        break;
      }
    }

    // EVERY FRAME: Update bubble positions to follow characters smoothly (60fps)
    // - Recalculates base positions based on character positions
    // - Animates current offsets toward target offsets (smooth easing)
    // - Applies final position = base + current offset
    for (const eventId in Fugs.LegacyBubbles) {
      const list = Fugs.LegacyBubbles[eventId];
      if (!Array.isArray(list) || !list.length) continue;

      // Map bubbles use stacking logic; others are handled in their own updates
      const hasMapBubbles = list.some((bubble) => bubble && bubble.targetType === "map");

      if (hasMapBubbles) {
        Window_Bubbles.prototype.updateBubbleStack(Number(eventId));
        hasActiveBubbles = true;
      }
    }

    // EVERY 10 FRAMES: Recalculate collision targets (~6 times per second at 60fps)
    // - Less frequent checks reduce CPU usage and prevent jitter
    // - Target offsets persist between checks, so bubbles stay stable
    // - Bubbles animate smoothly to targets, then stop (no oscillation)
    if (hasActiveBubbles && Graphics.frameCount % BUBBLE_CONFIG.COLLISION_CHECK_INTERVAL === 0) {
      Window_Bubbles.prototype.checkBubbleCollisions();
    }
  };

  // Update battler and screen bubbles during battle
  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);

    if (!Fugs || !Fugs.LegacyBubbles) return;

    const allBubbles = [];
    for (const id in Fugs.LegacyBubbles) {
      const list = Fugs.LegacyBubbles[id];
      if (!Array.isArray(list)) continue;
      allBubbles.push.apply(allBubbles, list);
    }

    allBubbles.forEach((bubble) => {
      if (!bubble || !bubble.show || !bubble.bubbleText) return;

      // Screen-targeted bubbles: fixed coordinates in the scene
      if (bubble.targetType === "screen") {
        const textX = bubble.screenX || 0;
        const textY = (bubble.screenY || 0) + textVerticalOffset;
        bubble.bubbleText.position.set(textX, textY);
        if (bubble.gradientSprite) {
          bubble.gradientSprite.x = textX - bubbleWidthMargin / 2;
          bubble.gradientSprite.y = textY - bubbleHeightMargin / 2;
        }
        return;
      }

      // Battler-targeted bubbles: follow actor/enemy sprites
      if (bubble.targetType === "battler") {
        const pos = getBattlerScreenPosition(bubble);
        if (!pos) return;

        const textX = Math.round(pos.x - bubble.textWidth / 2 + bubbleOffsetX);
        const textY = Math.round(
          pos.y -
            bubble.textHeight -
            BUBBLE_CONFIG.CHARACTER_HEIGHT_OFFSET +
            bubbleOffsetY +
            textVerticalOffset
        );

        bubble.bubbleText.position.set(textX, textY);
        if (bubble.gradientSprite) {
          bubble.gradientSprite.x = textX - bubbleWidthMargin / 2;
          bubble.gradientSprite.y = textY - bubbleHeightMargin / 2;
        }
      }
    });
  };

  const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    Object.keys(Fugs.LegacyBubbles || {}).forEach(function (id) {
      const list = Fugs.LegacyBubbles[id];
      if (!Array.isArray(list)) return;
      list.slice().forEach(function (bubble) {
        if (bubble.persistent) preserveLegacyBubble(bubble);
        Window_Bubbles.prototype.removeBubble(bubble);
      });
    });
    if (_Scene_Battle_terminate) _Scene_Battle_terminate.call(this);
  };

  // Recreate persistent map bubbles when a new map scene starts
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _Scene_Map_start.call(this);

    if (Fugs && Fugs.PersistentBubbles && Array.isArray(Fugs.PersistentBubbles)) {
      Fugs.PersistentBubbles.forEach(function (data) {
        new Window_Bubbles(data.time, data.message, data.eventId, {
          persistent: true,
          targetType: data.targetType || "map",
          battlerType: data.battlerType,
          battlerIndex: data.battlerIndex,
          screenX: data.screenX,
          screenY: data.screenY,
          arrowDirection: data.arrowDirection,
          transparent: data.transparent,
          choices: data.choices,
          choiceVariableId: data.choiceVariableId,
          selectedChoiceIndex: data.selectedChoiceIndex,
        });
      });
      Fugs.PersistentBubbles.length = 0;
    }
  };

  //----------------------------------------------------------------------//
  // Helper: Parse Optional Flags
  // Extracts PERSIST, ARROW_*, and TRANSPARENT flags from command arguments
  //----------------------------------------------------------------------//
  function parseOptionalFlags(args) {
    let persistent = persistBubblesByDefault;
    let arrowDirection = "none";
    let transparent = false;
    const localArgs = args.slice(0);

    // Parse flags at the beginning of arguments
    while (localArgs.length > 0 && typeof localArgs[0] === "string") {
      const flag = localArgs[0].toUpperCase();
      if (flag === "PERSIST") {
        persistent = true;
        localArgs.shift();
      } else if (
        flag === "ARROW_LEFT" ||
        flag === "ARROW_RIGHT" ||
        flag === "ARROW_UP" ||
        flag === "ARROW_DOWN"
      ) {
        arrowDirection = flag.replace("ARROW_", "").toLowerCase();
        localArgs.shift();
      } else if (flag === "TRANSPARENT") {
        transparent = true;
        localArgs.shift();
      } else {
        break; // Stop when we hit a non-flag argument
      }
    }

    return { persistent, arrowDirection, transparent, remaining: localArgs };
  }

  //----------------------------------------------------------------------//
  // Helper: Cleanup Sprite Array
  // Removes sprites from scene and destroys them
  //----------------------------------------------------------------------//
  function cleanupSpriteArray(scene, spriteArray, destroyTextures = false) {
    if (!spriteArray || !Array.isArray(spriteArray)) return;
    spriteArray.forEach((sprite) => {
      if (!sprite) return;
      if (scene && sprite.parent === scene) {
        scene.removeChild(sprite);
      }
      if (sprite.destroy) {
        sprite.destroy(destroyTextures);
      }
    });
  }

  //----------------------------------------------------------------------//
  // Helper: Cleanup Single Sprite
  // Removes sprite from scene and destroys it
  //----------------------------------------------------------------------//
  function cleanupSprite(scene, sprite, destroyTextures = false) {
    if (!sprite) return;
    if (scene && sprite.parent === scene) {
      scene.removeChild(sprite);
    }
    if (sprite.destroy) {
      sprite.destroy(destroyTextures);
    }
  }

  //----------------------------------------------------------------------//
  // Helper: Validate Choices
  // Checks if bubble has valid choices array
  //----------------------------------------------------------------------//
  function hasValidChoices(bubble) {
    return bubble.choices && Array.isArray(bubble.choices) && bubble.choices.length > 0;
  }

  //----------------------------------------------------------------------//
  // Helper: Initialize Collision Offsets
  // Sets up collision offset properties if they don't exist
  //----------------------------------------------------------------------//
  function initializeBubbleOffsets(bubble) {
    bubble.collisionOffsetX = bubble.collisionOffsetX || 0;
    bubble.collisionOffsetY = bubble.collisionOffsetY || 0;
    bubble.targetOffsetX = bubble.targetOffsetX || 0;
    bubble.targetOffsetY = bubble.targetOffsetY || 0;
  }

  //----------------------------------------------------------------------//
  // Helper: Add Sprite to Scene
  // Gets current scene and adds sprite to it
  //----------------------------------------------------------------------//
  function addSpriteToScene(sprite) {
    const scene = getCurrentScene();
    if (scene && scene.addChild) {
      scene.addChild(sprite);
    }
    return scene;
  }

  //----------------------------------------------------------------------//
  // Helper: Calculate Arrow Position
  // Returns {x, y} position for arrow based on direction and bubble bounds
  //----------------------------------------------------------------------//
  function calculateArrowPosition(direction, bubbleX, bubbleY, bubbleWidth, bubbleHeight, offset) {
    const positions = {
      left: { x: bubbleX - offset, y: bubbleY + bubbleHeight / 2 },
      right: { x: bubbleX + bubbleWidth + offset, y: bubbleY + bubbleHeight / 2 },
      up: { x: bubbleX + bubbleWidth / 2, y: bubbleY - offset },
      down: { x: bubbleX + bubbleWidth / 2, y: bubbleY + bubbleHeight + offset },
    };
    return positions[direction] || { x: bubbleX, y: bubbleY };
  }

  //----------------------------------------------------------------------//
  // Helper: Get Bubble Bounds
  // Returns {left, right, top, bottom} bounds for collision detection
  //----------------------------------------------------------------------//
  function getBubbleBounds(bubble, offsetX = 0, offsetY = 0) {
    const baseX = bubble.baseSpriteX || 0;
    const baseY = bubble.baseSpriteY || 0;
    return {
      left: baseX + offsetX,
      right: baseX + offsetX + bubble.textWidth + bubbleWidthMargin,
      top: baseY + offsetY,
      bottom: baseY + offsetY + bubble.textHeight + bubbleHeightMargin,
    };
  }

  //----------------------------------------------------------------------//
  // Helper: Draw Arrow Path
  // Draws arrow shape on canvas context for given direction
  //----------------------------------------------------------------------//
  function drawArrowPath(ctx, direction, centerX, centerY, size, cornerRadius) {
    ctx.beginPath();

    switch (direction) {
      case "left":
        // Arrow points left: tip at left, base at right
        ctx.moveTo(centerX - size, centerY);
        ctx.lineTo(centerX + size - cornerRadius, centerY - size);
        ctx.quadraticCurveTo(
          centerX + size,
          centerY - size,
          centerX + size,
          centerY - size + cornerRadius
        );
        ctx.lineTo(centerX + size, centerY + size - cornerRadius);
        ctx.quadraticCurveTo(
          centerX + size,
          centerY + size,
          centerX + size - cornerRadius,
          centerY + size
        );
        ctx.lineTo(centerX - size, centerY);
        break;

      case "right":
        // Arrow points right: tip at right, base at left
        ctx.moveTo(centerX + size, centerY);
        ctx.lineTo(centerX - size + cornerRadius, centerY + size);
        ctx.quadraticCurveTo(
          centerX - size,
          centerY + size,
          centerX - size,
          centerY + size - cornerRadius
        );
        ctx.lineTo(centerX - size, centerY - size + cornerRadius);
        ctx.quadraticCurveTo(
          centerX - size,
          centerY - size,
          centerX - size + cornerRadius,
          centerY - size
        );
        ctx.lineTo(centerX + size, centerY);
        break;

      case "up":
        // Arrow points up: tip at top, base at bottom
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX - size, centerY + size - cornerRadius);
        ctx.quadraticCurveTo(
          centerX - size,
          centerY + size,
          centerX - size + cornerRadius,
          centerY + size
        );
        ctx.lineTo(centerX + size - cornerRadius, centerY + size);
        ctx.quadraticCurveTo(
          centerX + size,
          centerY + size,
          centerX + size,
          centerY + size - cornerRadius
        );
        ctx.lineTo(centerX, centerY - size);
        break;

      case "down":
        // Arrow points down: tip at bottom, base at top
        ctx.moveTo(centerX, centerY + size);
        ctx.lineTo(centerX + size, centerY - size + cornerRadius);
        ctx.quadraticCurveTo(
          centerX + size,
          centerY - size,
          centerX + size - cornerRadius,
          centerY - size
        );
        ctx.lineTo(centerX - size + cornerRadius, centerY - size);
        ctx.quadraticCurveTo(
          centerX - size,
          centerY - size,
          centerX - size,
          centerY - size + cornerRadius
        );
        ctx.lineTo(centerX, centerY + size);
        break;

      default:
        return false; // Invalid direction
    }

    ctx.closePath();
    return true;
  }

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "ShowChatBubble" && legacyShow(args)) {
      if (!args || args.length === 0) return;

      // Parse optional flags using shared helper
      const {
        persistent,
        arrowDirection,
        transparent,
        remaining: localArgs,
      } = parseOptionalFlags(args);

      const hasEventAndTime =
        localArgs.length >= 3 && !isNaN(Number(localArgs[0])) && !isNaN(Number(localArgs[1]));
      const hasTimeOnly = localArgs.length >= 2 && !isNaN(Number(localArgs[0]));

      const eventId = hasEventAndTime ? Number(localArgs[0]) : this._eventId || 0; // 0 = player
      const time =
        hasEventAndTime || hasTimeOnly ? Number(localArgs[hasEventAndTime ? 1 : 0]) * 1000 : 5000;
      const message = hasEventAndTime
        ? localArgs.slice(2).join(" ")
        : hasTimeOnly
          ? localArgs.slice(1).join(" ")
          : localArgs.join(" ");

      if (!message) return;

      new Window_Bubbles(time, message, eventId, {
        persistent,
        targetType: "map",
        arrowDirection,
        transparent,
      });
    } else if (command === "ShowBattlerBubble") {
      if (!args || args.length < 4) return;

      // Parse optional flags using shared helper
      const {
        persistent,
        arrowDirection,
        transparent,
        remaining: localArgs,
      } = parseOptionalFlags(args);

      const battlerType = (localArgs[0] || "").toUpperCase();
      const index = parseInt(localArgs[1] || "1", 10);
      const seconds = Number(localArgs[2] || "0");
      const message = localArgs.slice(3).join(" ");
      if (!message || !seconds || Number.isNaN(seconds)) return;

      const time = seconds * 1000;
      const eventId = 0; // battler bubbles are not tied to a map event id

      new Window_Bubbles(time, message, eventId, {
        persistent,
        targetType: "battler",
        battlerType,
        battlerIndex: index,
        arrowDirection,
        transparent,
      });
    } else if (command === "ShowScreenBubble") {
      if (!args || args.length < 4) return;

      // Parse optional flags using shared helper
      const {
        persistent,
        arrowDirection,
        transparent,
        remaining: localArgs,
      } = parseOptionalFlags(args);

      const x = parseInt(localArgs[0] || "0", 10);
      const y = parseInt(localArgs[1] || "0", 10);
      const seconds = Number(localArgs[2] || "0");
      const message = localArgs.slice(3).join(" ");
      if (!message || !seconds || Number.isNaN(seconds)) return;

      const time = seconds * 1000;
      const eventId = 0;

      new Window_Bubbles(time, message, eventId, {
        persistent,
        targetType: "screen",
        screenX: x,
        screenY: y,
        arrowDirection,
        transparent,
      });
    } else if (command === "ShowChatBubbleWithChoices") {
      if (!args || args.length === 0) return;

      // Parse optional flags using shared helper
      const {
        persistent,
        arrowDirection,
        transparent,
        remaining: localArgs,
      } = parseOptionalFlags(args);

      // Parse parameters: eventId seconds variableId message | choice1 | choice2 | ...
      // OR: seconds variableId message | choice1 | choice2 | ...
      // OR: variableId message | choice1 | choice2 | ...

      const fullText = localArgs.join(" ");
      const parts = fullText.split("|").map((s) => s.trim());

      if (parts.length < 2) return; // Need at least message and 1 choice

      const firstPart = parts[0].split(" ");
      let eventId, time, variableId, message;

      // Try to parse numbers at the beginning
      const nums = [];
      for (let i = 0; i < firstPart.length && i < 3; i++) {
        const num = Number(firstPart[i]);
        if (!isNaN(num)) {
          nums.push(num);
        } else {
          break;
        }
      }

      // Determine format based on number of leading numbers
      if (nums.length === 3) {
        // eventId seconds variableId message | choices...
        eventId = nums[0];
        time = nums[1] * 1000;
        variableId = nums[2];
        message = firstPart.slice(3).join(" ");
      } else if (nums.length === 2) {
        // seconds variableId message | choices... (uses current event)
        eventId = this._eventId || 0;
        time = nums[0] * 1000;
        variableId = nums[1];
        message = firstPart.slice(2).join(" ");
      } else if (nums.length === 1) {
        // variableId message | choices... (uses defaults)
        eventId = this._eventId || 0;
        time = 0; // No timeout when choices are active
        variableId = nums[0];
        message = firstPart.slice(1).join(" ");
      } else {
        // No numbers, use all defaults
        eventId = this._eventId || 0;
        time = 0;
        variableId = choiceVariableId;
        message = parts[0];
      }

      const choices = parts.slice(1); // Everything after first | is choices

      if (!message || choices.length === 0) return;

      new Window_Bubbles(time, message, eventId, {
        persistent,
        targetType: "map",
        arrowDirection,
        transparent,
        choices: choices,
        choiceVariableId: variableId,
      });
    }
  };

  // COLLISION DETECTION SYSTEM
  // ==========================
  // This function calculates TARGET offsets for bubbles to avoid overlapping.
  // Called every 10 frames (see updateChatBubbles).
  //
  // KEY DESIGN DECISIONS:
  //
  // 1. TWO-PASS RESOLUTION:
  //    - Pass 1: Check overlaps from base positions, calculate initial targets
  //    - Pass 2: Check overlaps from base + targets, refine if still overlapping
  //    - Why: Complex 3+ bubble scenarios need multiple passes to fully resolve
  //
  // 2. DETERMINISTIC SORTING:
  //    - Sort by Y position, then eventId as tie-breaker
  //    - Why: Same input positions always produce same output targets (no oscillation)
  //
  // 3. BASE POSITION COLLISION:
  //    - Check collision from base positions + current target offsets
  //    - Why: Prevents accumulation and ensures multi-pass works correctly
  //
  // 4. TARGET OFFSETS (not direct positioning):
  //    - Calculate where bubbles SHOULD be, don't move them directly
  //    - Why: updateBubbleStack animates smoothly toward targets every frame

  Window_Bubbles.prototype.checkBubbleCollisions = function () {
    try {
      const allActiveBubbles = [];

      for (const eventId in Fugs.LegacyBubbles) {
        const bubbles = Fugs.LegacyBubbles[eventId];
        if (bubbles && Array.isArray(bubbles) && bubbles.length > 0) {
          const visibleBubbles = bubbles.filter((b) => b && b.show && b.bubbleText && b.textWidth);
          visibleBubbles.forEach((bubble) => {
            // Current offsets persist (bubbles maintain their animated position between checks)
            initializeBubbleOffsets(bubble);
            // Target offsets reset each check - will be recalculated fresh
            bubble.targetOffsetX = 0;
            bubble.targetOffsetY = 0;
            allActiveBubbles.push(bubble);
          });
        }
      }

      if (allActiveBubbles.length <= 1) return; // No collisions possible with 0-1 bubbles

      // DETERMINISTIC SORTING: Ensures same positions always resolve the same way
      // Primary: Y position (top to bottom)
      // Tie-breaker: eventId (prevents flip-flopping when bubbles are side-by-side)
      allActiveBubbles.sort((a, b) => {
        const yDiff = a.bubbleText.y - b.bubbleText.y;
        if (Math.abs(yDiff) < 0.1) {
          // Same vertical position - use eventId for consistent ordering
          return a.eventId - b.eventId;
        }
        return yDiff;
      });

      // MULTI-PASS COLLISION RESOLUTION
      // Pass 1: Resolve based on base positions
      // Pass 2: Refine using targets from pass 1 (handles complex 3+ bubble scenarios)
      let collisionsResolved = false;
      let passCount = 0;

      while (!collisionsResolved && passCount < BUBBLE_CONFIG.COLLISION_MAX_PASSES) {
        passCount++;
        collisionsResolved = true;

        // Check for collisions and adjust positions
        for (let i = 0; i < allActiveBubbles.length; i++) {
          const bubbleA = allActiveBubbles[i];

          for (let j = 0; j < allActiveBubbles.length; j++) {
            if (i === j) continue; // Skip self

            const bubbleB = allActiveBubbles[j];

            // Skip bubbles from the same event - they're handled by updateBubbleStack stacking
            if (bubbleA.eventId === bubbleB.eventId) continue;

            // COLLISION BOUNDS CALCULATION:
            // Use BASE positions + TARGET offsets calculated in previous passes
            // Why base positions? Ensures deterministic results (same base = same targets)
            // Why include target offsets? Allows multi-pass to refine without overshooting
            const aTargetX = bubbleA.targetOffsetX || 0;
            const aTargetY = bubbleA.targetOffsetY || 0;
            const bTargetX = bubbleB.targetOffsetX || 0;
            const bTargetY = bubbleB.targetOffsetY || 0;

            const a = getBubbleBounds(bubbleA, aTargetX, aTargetY);
            const b = getBubbleBounds(bubbleB, bTargetX, bTargetY);

            // Check if bubbles overlap
            if (a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom) {
              // Bubbles are colliding
              collisionsResolved = false;

              // Calculate overlap amounts
              const overlapX = Math.min(a.right - b.left, b.right - a.left);
              const overlapY = Math.min(a.bottom - b.top, b.bottom - a.top);

              // Calculate centers
              const aCenter = (a.left + a.right) / 2;
              const bCenter = (b.left + b.right) / 2;

              // COLLISION RESOLUTION STRATEGY:
              // - Choose direction with smallest overlap (vertical OR horizontal, not both)
              // - Move bubbles just enough to separate them + small gap
              // - Use DETERMINISTIC direction to prevent oscillation

              const moveAmount =
                (overlapY < overlapX ? overlapY : overlapX) + BUBBLE_CONFIG.COLLISION_SEPARATION;

              if (overlapY < overlapX) {
                // VERTICAL SEPARATION (less vertical overlap than horizontal)
                let direction;
                if (Math.abs(a.top - b.top) > 0.1) {
                  // Clear vertical ordering - use position
                  // Top bubble moves up (-1), bottom bubble moves down (+1)
                  direction = a.top < b.top ? -1 : 1;
                } else {
                  // DETERMINISTIC TIE-BREAKER: Same vertical position
                  // Always use eventId to decide (lower eventId moves up, higher moves down)
                  // This prevents flip-flopping when bubbles are exactly side-by-side
                  direction = bubbleA.eventId < bubbleB.eventId ? -1 : 1;
                }
                bubbleA.targetOffsetY += direction * moveAmount;
              } else {
                // HORIZONTAL SEPARATION (less horizontal overlap than vertical)
                let direction;
                if (Math.abs(aCenter - bCenter) > 0.1) {
                  // Clear horizontal ordering - use center position
                  // Left bubble moves left (-1), right bubble moves right (+1)
                  direction = aCenter < bCenter ? -1 : 1;
                } else {
                  // DETERMINISTIC TIE-BREAKER: Same horizontal position
                  // Lower eventId moves left, higher moves right
                  direction = bubbleA.eventId < bubbleB.eventId ? -1 : 1;
                }
                bubbleA.targetOffsetX += direction * moveAmount;
              }
            }
          }
        }
      }
    } catch (e) {
      console.error("Error in checkBubbleCollisions:", e);
    }
  };

  // Helper function to constrain a bubble to the screen boundaries
  Window_Bubbles.prototype.constrainBubbleToScreen = function (bubble) {
    if (!bubble || !bubble.gradientSprite) return;

    const screenWidth = Graphics.width;
    const screenHeight = Graphics.height;

    // Use actual background sprite bounds
    let leftEdge = bubble.gradientSprite.x;
    let rightEdge = bubble.gradientSprite.x + bubble.textWidth + bubbleWidthMargin;
    let topEdge = bubble.gradientSprite.y;
    let bottomEdge = bubble.gradientSprite.y + bubble.textHeight + bubbleHeightMargin;

    let deltaX = 0;
    let deltaY = 0;

    // Constrain X position
    if (leftEdge < screenBoundaryThreshold) {
      deltaX = screenBoundaryThreshold - leftEdge;
    } else if (rightEdge > screenWidth - screenBoundaryThreshold) {
      deltaX = screenWidth - screenBoundaryThreshold - rightEdge;
    }

    // Constrain Y position
    if (topEdge < screenBoundaryThreshold) {
      deltaY = screenBoundaryThreshold - topEdge;
    } else if (bottomEdge > screenHeight - screenBoundaryThreshold) {
      deltaY = screenHeight - screenBoundaryThreshold - bottomEdge;
    }

    // Apply deltas to both text and background
    if (deltaX !== 0 || deltaY !== 0) {
      bubble.bubbleText.x += deltaX;
      bubble.bubbleText.y += deltaY;
      bubble.gradientSprite.x += deltaX;
      bubble.gradientSprite.y += deltaY;
    }
  };

  // Bubble bounce in and fade out animations
  Window_Bubbles.prototype.animateBubbleAppear = function (bubble) {
    const bubbleText = bubble.bubbleText;
    const gradientSprite = bubble.gradientSprite;
    const themeBubbleAlpha = selectedTheme.bubbleAlpha;

    const startTime = Date.now();
    const duration = BUBBLE_CONFIG.APPEAR_DURATION;

    const animate = () => {
      if (!bubble || bubble._destroyed) return;
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const bounceProgress = this.easeOutBounce ? this.easeOutBounce(progress) : progress;

      if (bubbleText && bubbleText.scale) {
        bubbleText.scale.set(bounceProgress);
        bubbleText.alpha = progress;
      }

      if (gradientSprite && gradientSprite.scale) {
        gradientSprite.scale.set(bounceProgress);
        gradientSprite.alpha = progress * themeBubbleAlpha;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Set up fade out animation when time expires
    bubble.fadeOut = () => {
      bubble._fading = true;
      const fadeStartTime = Date.now();
      const fadeDuration = BUBBLE_CONFIG.FADE_DURATION;

      const fadeAnimate = () => {
        if (bubble._destroyed) return;
        const elapsed = Date.now() - fadeStartTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        const fadeProgress = 1 - progress; //what about when default alpha is less than 1?

        if (bubbleText) {
          bubbleText.alpha = fadeProgress;
        }

        if (gradientSprite) {
          gradientSprite.alpha = fadeProgress * themeBubbleAlpha;
        }

        if (bubble.arrowSprite) {
          bubble.arrowSprite.alpha = fadeProgress;
        }

        if (progress < 1) {
          requestAnimationFrame(fadeAnimate);
        } else {
          bubble.show = false;
          this.removeBubble(bubble);
        }
      };

      requestAnimationFrame(fadeAnimate);
    };
  };
})();

  }
  let pluginCommand=Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand=function (command,args) {
    if (pluginCommand) pluginCommand.call(this,command,args);
    if (isLegacyCommand(command,args)) { if (!legacyInstalled) { installLegacy(); return Game_Interpreter.prototype.pluginCommand.call(this,command,args); } return; }
    if (command==="ShowChatBubble") commandShow(this,args);
    else if (command==="ChatBubble") {
      if (args[0] === "cancel") this._fugsNextBubble = null;
      else if (args[0] === "next") {
        let id = "current", duration = "5", valid = true;
        args.slice(1).forEach(function (arg) {
          let pair = arg.split(":");
          if (pair.length !== 2) valid = false;
          else if (pair[0] === "event") id = pair[1];
          else if (pair[0] === "duration") duration = pair[1];
          else valid = false;
        });
        if (valid) armNext(this,id,duration);
        else this._fugsNextBubble = null;
      } else commandStyle(args);
    }
  };
  if (PluginManager.registerCommand) {
    PluginManager.registerCommand("FugsChatBubbles","nextText",function (args) {
      armNext(this,args.target,args.duration);
    });
    PluginManager.registerCommand("FugsChatBubbles","cancelNextText",function () {
      this._fugsNextBubble = null;
    });
  }
  Fugs.ChatBubbles={show:show,clear:clear};
})();
