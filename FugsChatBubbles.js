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
  function clear() {
    Object.keys(bubbles).forEach(function (id) { bubbles[id].slice().forEach(remove); });
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
  function commandStyle(args) {
    let tokens=args.join(" ").replace(/\]\s*\[/g," ").replace(/[\[\]]/g,"").trim().split(/\s+/);
    let task=tokens.shift(), delay=0;
    if (numeric(tokens[0])) delay=number(tokens.shift(),0,0,2147483647);
    let value=tokens.join(" ").replace(/^theme:\s*/i,"").trim();
    if (task==="changeColor") {
      let name=themeName(value);
      if (!name) return;
      pending.push({at:Date.now()+delay,apply:function () { settings.theme=name; }});
    } else if (task==="changeFont" && value) {
      if (value.toLowerCase()==="gamefont") value="GameFont";
      pending.push({at:Date.now()+delay,apply:function () { settings.fontFamily=value; }});
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
  let pluginCommand=Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand=function (command,args) {
    if (pluginCommand) pluginCommand.call(this,command,args);
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
