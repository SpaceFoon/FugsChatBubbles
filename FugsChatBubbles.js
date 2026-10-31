//=============================================================================
// Fugs Chatter and Speech Bubbles
//=============================================================================

/*:
 * @target MV
 * @plugindesc v1.0.1 Speech bubbles that follow events and stack.
 * @version 1.0.1
 *
 * @author Fugahagen
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
 * - Add text code support. Hook into rmmv window system
 * - Port to MZ.
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
 * 1.0.1 - [10/31/2026]: Runtime, styling, layout, lifetime, and cleanup fixes.
 * 1.0 - [3/30/2024]: Initial release
 *
 * ============================================================================
 */


(function () {
  "use strict";
  var params = PluginManager.parameters("FugsChatBubbles");
  var debugMode = params["Debug Mode"] === "true";
  var Fugs = window.Fugs = window.Fugs || {};
  var bubbles = Fugs.Bubbles = {};
  var pending = [];
  function number(value, fallback, min, max) {
    var n = value === "" || value == null ? fallback : Number(value);
    if (!isFinite(n)) n = fallback;
    return Math.max(min, Math.min(max, n));
  }
  function colors(value, fallback) {
    var result;
    try { result = JSON.parse(value); } catch (ignore) {}
    if (!Array.isArray(result)) result = String(value || fallback).split(",");
    result = result.map(function (c) { return String(c).trim(); }).filter(Boolean);
    return result.length ? result : [fallback];
  }
  function cssColor(value) {
    return String(value).replace(/^0x([a-f0-9]{6})$/i, "#$1");
  }
  var THEMES = {
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
    Custom: {
      bubbleColors: (params["Bubble Colors"] || "#000000")
        .split(",")
        .map((c) => c.trim()),
      textColors: (params["Font Colors"] || "#FFFFFF")
        .split(",")
        .map((c) => c.trim()),
      bubbleAlpha: Number(params["Bubble Alpha"]) || 0.8,
    },
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


  var settings = {
    theme: params.Theme || "Dark", fontFamily: params["Font Family"] || "GameFont",
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
  function themeName(name) {
    if (String(name).toLowerCase() === "ff7") return "CrimsonAndBlue";
    return Object.keys(THEMES).filter(function (key) {
      return key.toLowerCase() === String(name).toLowerCase();
    })[0];
  }
  function applyPending() {
    var now = Date.now();
    pending = pending.filter(function (change) {
      if (change.at > now) return true;
      change.apply(); return false;
    });
  }
  function style() {
    applyPending();
    var preset = THEMES[themeName(settings.theme)];
    var custom = String(settings.theme).toLowerCase() === "custom";
    return {
      fill: custom || !preset ? settings.bubbleColors : preset.bubbleColors,
      text: custom || !preset ? settings.fontColors : preset.textColors,
      alpha: custom || !preset ? settings.bubbleAlpha : preset.bubbleAlpha
    };
  }
  // Use visible glyph bounds instead of the font's advance and line box.
  function inkBounds(text) {
    text.updateText(false);
    var canvas = text.canvas;
    var data = text.context.getImageData(0, 0, canvas.width, canvas.height).data;
    var left = canvas.width, right = -1, top = canvas.height, bottom = -1;
    for (var y = 0; y < canvas.height; y++) {
      for (var x = 0; x < canvas.width; x++) {
        if (data[(y * canvas.width + x) * 4 + 3]) {
          left = Math.min(left, x); right = Math.max(right, x);
          top = Math.min(top, y); bottom = Math.max(bottom, y);
        }
      }
    }
    var resolution = text.resolution || 1;
    if (right < left) return { width: 1, height: 1, x: 0, y: 0 };
    return { width: (right-left+1)/resolution, height: (bottom-top+1)/resolution,
      x: (canvas.width/2-(left+right+1)/2)/resolution,
      y: (canvas.height/2-(top+bottom+1)/2)/resolution };
  }
  function background(width, height, fill) {
    var canvas = document.createElement("canvas");
    canvas.width = Math.ceil(width); canvas.height = Math.ceil(height);
    var ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Chat bubbles require a 2D canvas context.");
    var border = Math.min(settings.borderWidth, width/2, height/2);
    var inset = border/2, w = width-inset, h = height-inset;
    var r = settings.shape === "Square" ? 0 :
      Math.min(settings.radius, (width-border)/2, (height-border)/2);
    ctx.beginPath(); ctx.moveTo(inset+r, inset);
    ctx.arcTo(w,inset,w,h,r); ctx.arcTo(w,h,inset,h,r);
    ctx.arcTo(inset,h,inset,inset,r); ctx.arcTo(inset,inset,w,inset,r);
    ctx.closePath();
    if (fill.length === 1) ctx.fillStyle = cssColor(fill[0]);
    else {
      var gradient = ctx.createLinearGradient(0,0,width,height);
      fill.forEach(function (color,i) {
        gradient.addColorStop(i/(fill.length-1),cssColor(color));
      });
      ctx.fillStyle = gradient;
    }
    ctx.fill();
    if (border) { ctx.lineWidth=border; ctx.strokeStyle=settings.borderColor; ctx.stroke(); }
    var sprite = new PIXI.Sprite(PIXI.Texture.from(canvas));
    sprite.anchor.set(0.5);
    return sprite;
  }
  function target(id) {
    if (id === 0) return $gamePlayer;
    if (id < 0) return $gamePlayer.followers().follower(-id-1);
    return $gameMap.event(id);
  }
  function remove(bubble) {
    if (bubble.container.parent) bubble.container.parent.removeChild(bubble.container);
    bubble.container.destroy({ children: true, texture: true, baseTexture: true });
    var stack = bubbles[bubble.eventId];
    if (stack) {
      var index = stack.indexOf(bubble);
      if (index >= 0) stack.splice(index,1);
      if (!stack.length) delete bubbles[bubble.eventId];
    }
  }
  function clear() {
    Object.keys(bubbles).forEach(function (id) { bubbles[id].slice().forEach(remove); });
  }
  function show(id, duration, message) {
    var scene = SceneManager._scene;
    if (!(scene instanceof Scene_Map) || !message || !String(message).trim()) return;
    if (!isFinite(id) || Math.floor(id) !== id) return;
    var character = target(id);
    if (!character) {
      if (debugMode) console.warn("[ChatBubbles] No character for ID " + id);
      return;
    }
    var appearance = style();
    var text = new PIXI.Text(String(message),new PIXI.TextStyle({
      fontFamily: settings.fontFamily, fontSize: settings.fontSize,
      fill: appearance.text.length === 1 ? appearance.text[0] : appearance.text,
      lineHeight: settings.lineHeight, padding: settings.padding,
      wordWrap: settings.wrap, breakWords: true, align: "center",
      wordWrapWidth: Math.max(1,Math.min(settings.wrapWidth,
        Graphics.width-settings.widthMargin-settings.padding*2-settings.borderWidth*2-8))
    }));
    var ink = inkBounds(text);
    text.anchor.set(0.5); text.position.set(ink.x,ink.y); text.alpha=settings.fontAlpha;
    var width=Math.ceil(ink.width+settings.padding*2+settings.widthMargin+settings.borderWidth*2);
    var height=Math.ceil(ink.height+settings.padding*2+settings.heightMargin+settings.borderWidth*2);
    var container=new PIXI.Container(), bg;
    try { bg=background(width,height,appearance.fill); }
    catch (error) { text.destroy(true); throw error; }
    bg.alpha=appearance.alpha;
    container.addChild(bg); container.addChild(text);
    var bubble={ eventId:id, target:character, scene:scene, container:container,
      width:width, height:height, createdAt:Date.now(),
      duration:number(duration,5000,1,2147483647),
      offsetX:settings.offsetX, offsetY:settings.offsetY };
    if (!bubbles[id]) bubbles[id]=[];
    bubbles[id].unshift(bubble); scene.addChild(container); update(scene);
  }
  function bounce(t) {
    if (t<1/2.75) return 7.5625*t*t;
    if (t<2/2.75) { t-=1.5/2.75; return 7.5625*t*t+0.75; }
    if (t<2.5/2.75) { t-=2.25/2.75; return 7.5625*t*t+0.9375; }
    t-=2.625/2.75; return 7.5625*t*t+0.984375;
  }
  function update(scene) {
    applyPending();
    var now=Date.now();
    Object.keys(bubbles).forEach(function (id) {
      bubbles[id].slice().forEach(function (bubble) {
        if (bubble.scene!==scene || now-bubble.createdAt>=bubble.duration) remove(bubble);
      });
      var stack=bubbles[id];
      if (!stack || !stack.length) return;
      var zoom=$gameMap.zoom || {x:1,y:1};
      var zx=number(zoom.x,1,0.01,100), zy=number(zoom.y,1,0.01,100);
      // Fit and clamp the stack as a group; clamping each row would overlap
      // older bubbles at the top edge.
      var naturalHeight=stack.reduce(function (sum,bubble) {
        return sum+bubble.height;
      },12*(stack.length-1));
      var stackFit=Math.min(1,Math.max(1,Graphics.height-8)/naturalHeight);
      var gap=12*stackFit;
      var totalHeight=gap*(stack.length-1);
      stack.forEach(function (bubble) {
        bubble.fit=Math.min(stackFit,Math.max(1,Graphics.width-8)/bubble.width);
        totalHeight+=bubble.height*bubble.fit;
      });
      var bottom=stack[0].target.screenY()*zy-48*zy+stack[0].offsetY;
      var currentY=Math.max(totalHeight+4,Math.min(Graphics.height-4,bottom));
      stack.forEach(function (bubble) {
        var age=Math.max(0,now-bubble.createdAt);
        var fit=bubble.fit;
        var halfW=bubble.width*fit/2, halfH=bubble.height*fit/2;
        var x=bubble.target.screenX()*zx+bubble.offsetX;
        var y=currentY-halfH;
        bubble.container.position.set(
          Math.max(halfW+4,Math.min(Graphics.width-halfW-4,x)),
          Math.max(halfH+4,Math.min(Graphics.height-halfH-4,y)));
        currentY-=bubble.height*fit+gap;
        var entrance=Math.min(300,bubble.duration/2), fade=Math.min(500,bubble.duration/2);
        bubble.container.scale.set(fit*bounce(Math.min(age/entrance,1)));
        bubble.container.alpha=Math.min(1,age/entrance,(bubble.duration-age)/fade);
      });
    });
  }
  var mapUpdate=Scene_Map.prototype.update;
  Scene_Map.prototype.update=function () { mapUpdate.call(this); update(this); };
  ["stop","terminate","startEncounterEffect"].forEach(function (name) {
    var original=Scene_Map.prototype[name];
    Scene_Map.prototype[name]=function () {
      clear();
      if (original) return original.apply(this,arguments);
    };
  });
  var setupMap=Game_Map.prototype.setup;
  Game_Map.prototype.setup=function () { clear(); return setupMap.apply(this,arguments); };
  function numeric(token) {
    return typeof token==="string" && /^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(token);
  }
  function commandShow(interpreter,args) {
    var id=interpreter._eventId || 0, seconds=5, message;
    var divider=args.indexOf("--");
    if (divider>=0) {
      var options=args.slice(0,divider);
      message=args.slice(divider+1).join(" ");
      var named=options.some(function (value) { return value.indexOf(":")>=0; });
      if (named) {
        for (var i=0;i<options.length;i++) {
          var pair=options[i].split(":");
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
    var tokens=args.join(" ").replace(/\]\s*\[/g," ").replace(/[\[\]]/g,"").trim().split(/\s+/);
    var task=tokens.shift(), delay=0;
    if (numeric(tokens[0])) delay=number(tokens.shift(),0,0,2147483647);
    var value=tokens.join(" ").replace(/^theme:\s*/i,"").trim();
    if (task==="changeColor") {
      var name=themeName(value);
      if (!name) return;
      pending.push({at:Date.now()+delay,apply:function () { settings.theme=name; }});
    } else if (task==="changeFont" && value) {
      if (value.toLowerCase()==="gamefont") value="GameFont";
      pending.push({at:Date.now()+delay,apply:function () { settings.fontFamily=value; }});
    }
    applyPending();
  }
  var pluginCommand=Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand=function (command,args) {
    pluginCommand.call(this,command,args);
    if (command==="ShowChatBubble") commandShow(this,args);
    else if (command==="ChatBubble") commandStyle(args);
  };
  Fugs.ChatBubbles={show:show,clear:clear};
})();
