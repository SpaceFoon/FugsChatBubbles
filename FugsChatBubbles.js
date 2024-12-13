//=============================================================================
// Fugs Chatter and Speech Bubbles
//=============================================================================

/*:
 * @target MV 1.63
 * @plugindesc Speech Bubbles that follow events and stack.
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
 * @desc lineHeight of the bubble text in pixels
 * @type number
 * @default 6
 *
 *
 * @param Font WordWrap
 * @desc lineHeight of the bubble text in pixels
 * @type boolean
 * @default true
 *
 * @param Font Word Wrap Width
 * @desc lineHeight of the bubble text in pixels
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
 * @desc The canvas rendering context.
 * @type string
 * @default ctx
 *
 * @param Bubble Offset X
 * @desc
 * @type number
 * @default -4
 *
 * @param Bubble Offset Y
 * @desc
 * @type number
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
 * @param Bubble Colors
 * @desc
 * @type array
 * @default ["#990000", "#cc0000", "#000000"]
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
 * - Works with MBS Maps zoom and presumed others as well
 * - Text and bubbles can use gradients with as many colors as you want.
 * - That sweet sweet ff7 look with a theme.
 *
 * ============================================================================
 * Future plans
 * ============================================================================
 *
 * - Fix minor issues stated below
 * - Add remove all bubbles plugin command
 * - Add plugin commands to change all styles on the fly for each event or all
 * - Stacking bubbles from other events ie actors talking
 * - Add text code support. Hook into rmmv window system
 * - Port to MZ. I wrote this plugin with the most modern js I could.
 * - Make work for battles?
 * - Add arrows
 * - Added ability to change y value in bubble command
 * - Add window skin from image
 * - X and Y bubble placement
 *
 * ============================================================================
 *  Plugin Parameters
 * ============================================================================
 *
 * Debug Mode - Enable for log spam
 *
 * Theme - There are many themes to choose but only custom will allow the
 * parameters for any color to be used. Otherwise the theme chooses colors.
 *
 * ============================================================================
 *  Plugin Commands
 * ============================================================================
 *
 * You may leave event or event and duration blank for default values.
 * 1 = event 1, 0 = player, -1 = first follower.
 * ShowChatBubble [event][duration/seconds][message]
 * ShowChatBubble 1 8 My new chat bubble! Show bubble on event one for 8 seconds:
 * ShowChatBubble 1.5 My new chat bubble! Show bubble on this event for 1.5 seconds
 *
 * These changes will effect the next bubble drawn
 * ChatBubble [task][duration ms][parameters]
 * ChatBubble [changeColor][100][theme: ff7]
 * ChatBubble [changeFont][0][gameFont]
 *
 *
 * ============================================================================
 * Known issues
 * ============================================================================
 *
 * When zooming to extremes you can tell the window is not perfectly centered
 *
 * When a message is all short lowercase letter the text look off center
 *
 * Will error when selected follower or event that doesn't exist.
 * stays open when battles started Scene_Map.prototype.startEncounterEffect
 * ============================================================================
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
 * die in her sleep tonight! All protections nulled!
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
 * 1.0 - [3/30/2024]: Initial release
 *
 * ============================================================================
 */

// var Imported = Imported || {};
// Imported.Fugs = true;
// var Fugs = Fugs || {};
// Fugs.Bubbles = {};
// Fugs.Parameters = PluginManager.parameters("FugsChatBubbles");
// Fugs.Bubbles.Debug = Fugs.Parameters["Debug Mode"];
// Fugs.Bubbles.theme = Fugs.Parameters["Theme"];
(() => {
  const pluginName = "FugsChatBubbles";
  const params = PluginManager.parameters(pluginName);
  const debugMode = params["Debug Mode"] === "true";
  const pluginParams = PluginManager.parameters("FugsChatBubbles");

  // Font Parameters
  const fontFamily = String(pluginParams["Font Family"] || "GameFont");
  const fontSize = Number(pluginParams["Font Size"] || 28);
  const fontColors = pluginParams["Font Colors"]
    ? pluginParams["Font Colors"].split(",")
    : ["#FFFFFF"];
  const fontAlpha = Number(pluginParams["Font Alpha"] || 1);
  const fontLineHeight = Number(pluginParams["Font Line Height"] || 32);
  const fontPadding = Number(pluginParams["Font Padding"] || 6);
  const fontWordWrap = pluginParams["Font WordWrap"] === "true";
  const fontWordWrapWidth = Number(pluginParams["Font Word Wrap Width"] || 500);

  // Bubble Parameters
  const bubbleColors = pluginParams["Bubble Colors"]
    ? pluginParams["Bubble Colors"].split(",")
    : ["#000000"];
  const bubbleAlpha = Number(pluginParams["Bubble Alpha"] || 0.7);
  const bubbleShape = String(pluginParams["Bubble Shape"] || "Round");
  const bubbleRadius = Number(pluginParams["Bubble Radius"] || 10);
  const bubbleOffsetX = Number(pluginParams["Bubble Offset X"] || -4);
  const bubbleOffsetY = Number(pluginParams["Bubble Offset Y"] || -10);
  const bubbleWidthMargin = Number(pluginParams["Bubble Width Margin"] || 16);
  const bubbleHeightMargin = Number(pluginParams["Bubble Height Margin"] || 8);
  const bubbleBorderWidth = Number(pluginParams["Bubble Border Width"] || 3);
  const bubbleBorderColor = String(
    pluginParams["Bubble Border Color"] || "#FFFFFF"
  );

  // Canvas Rendering
  const canvasRenderingContext = String(
    pluginParams["Canvas Rendering"] || "ctx"
  );

  // Bubble Colors Array
  const bubbleColorsArray = pluginParams["Bubble Colors Array"]
    ? JSON.parse(pluginParams["Bubble Colors Array"])
    : ["#990000", "#cc0000", "#000000"];

  function Window_Bubbles() {
    this.initialize.apply(this, arguments);
  }
  // Theme presets
  const THEMES = {
    WhiteBlack: {
      bubbleColors: ["#FFFFFF"],
      textColors: ["#000000"],
      bubbleAlpha: Number(Fugs.Parameters["Bubble Alpha"]) || 0.9,
    },
    BlackWhite: {
      bubbleColors: ["#000000"],
      textColors: ["#FFFFFF"],
      bubbleAlpha: Number(Fugs.Parameters["Bubble Alpha"]) || 0.7,
    },
    Custom: {
      bubbleColors: (Fugs.Parameters["Bubble Colors"] || "#000000")
        .split(",")
        .map((c) => c.trim()),
      textColors: (Fugs.Parameters["Text Colors"] || "#FFFFFF")
        .split(",")
        .map((c) => c.trim()),
      bubbleAlpha: Number(Fugs.Parameters["Bubble Alpha"]) || 0.8,
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

  Window_Bubbles.prototype = Object.create(Window_Base.prototype);
  Window_Bubbles.prototype.constructor = Window_Bubbles;

  Window_Bubbles.prototype.initialize = function (time, message, eventId) {
    Window_Base.prototype.initialize.call(
      this,
      0,
      0,
      Graphics.width,
      Graphics.height
    );
    this._time = time;
    this._message = message;
    this._eventId = eventId;
    this._createdAt = Date.now();
    this.createBubble();
  };
  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createBubble = function () {
    // try {
    const eventId = this._eventId;
    const followerIndex = eventId < 0 ? Math.abs(eventId) - 1 : null;

    const targetEvent =
      eventId === 0
        ? $gamePlayer
        : eventId < 0
        ? $gamePlayer._followers.follower(followerIndex)
        : $gameMap.event(eventId);

    if (!targetEvent) return;

    Fugs.Bubbles[eventId] ??= [];

    const bubble = {
      eventId: eventId,
      message: this._message,
      time: this._time,
      createdAt: this._createdAt,
      show: true,
      targetEvent: targetEvent,
    };

    Fugs.Bubbles[eventId].unshift(bubble);
    this.createChatBubble(bubble);
    this.updateBubbleStack(eventId);
    // } catch (error) {
    //   console.error(`[ChatBubbles] Error creating bubble:`, error);
    // }
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.drawBackground = function (
    textWidth,
    textHeight,
    bubble
  ) {
    // const zoom = $gameMap.zoom ?? { x: 1, y: 1 };
    let offsetX = -4;
    let offsetY = -10;
    let radius = 10;
    let widthMargin = 16;
    let heightMargin = 8;
    let borderWidth = 3;
    let borderColor = 0xffffff;
    let gradientColors = ["#990000", "#cc0000", "#000000"];

    const gradientCanvas = this.createGradientCanvas(
      textWidth + widthMargin,
      textHeight + heightMargin,
      gradientColors,
      radius,
      borderColor,
      borderWidth
    );
    console.log("Gradient Canvas Valid:", gradientCanvas);
    console.log(
      "Canvas Dimensions:",
      gradientCanvas.width,
      gradientCanvas.height
    );
    // console.log("Canvas Data URL:", gradientCanvas.toDataURL());

    const bubbleBackground = new PIXI.Graphics();
    bubbleBackground.lineStyle(borderWidth, borderColor);
    bubbleBackground.beginFill("#000000");
    bubbleBackground.drawRoundedRect(
      offsetX,
      offsetY,
      textWidth + widthMargin,
      textHeight + heightMargin,
      radius
    );
    bubbleBackground.alpha = 0.1;
    bubbleBackground.endFill();

    const gradientTexture = PIXI.Texture.from(gradientCanvas);
    const gradientSprite = new PIXI.Sprite(gradientTexture);
    gradientSprite.position.set(offsetX, offsetY);
    // gradientSprite.zIndex = 100;

    SceneManager._scene.addChild(gradientSprite);
    SceneManager._scene.addChild(bubbleBackground);
    console.log(gradientSprite);
    console.log(
      "Canvas Dimensions:",
      gradientCanvas.width,
      gradientCanvas.height
    );
    console.log("Gradient Texture Valid:", gradientTexture);
    console.log("Canvas Gradient Output:", gradientCanvas.toDataURL());

    bubbleBackground.alpha = 0.7;
    bubble.bubbleBackground = bubbleBackground;
    bubble.gradientSprite = gradientSprite;
    console.log("Bubble Container Children:", bubble.children);
    console.log("Scene Children:", SceneManager._scene.children);
  };

  Window_Bubbles.prototype.createGradientCanvas = function (
    width,
    height,
    colors,
    radius,
    borderColor,
    borderWidth
  ) {
    console.log(width, height, colors, radius, borderColor, borderWidth);
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.alpha = 1;
    let ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas 2D context");
      return null;
    }
    let gradient = ctx.createLinearGradient(0, 0, width, height);
    let step = 1 / (colors.length - 1);
    colors.forEach((color, index) => {
      gradient.addColorStop(index * step, color);
    });
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(width, 0, width, height, radius);
    ctx.arcTo(width, height, 0, height, radius);
    ctx.arcTo(0, height, 0, 0, radius);
    ctx.arcTo(0, 0, width, 0, radius);
    ctx.closePath();
    ctx.fill();
    // ctx.fillRect(0, 0, width, height);

    if (borderWidth > 0) {
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }

    let texture = PIXI.Texture.from(canvas);
    if (!texture) {
      console.error("Failed to create texture from canvas");
      return null;
    }

    return canvas;
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.createChatBubble = function (bubble) {
    const textStyle = new PIXI.TextStyle({
      fontFamily: "GameFont",
      fontSize: 28,
      fill: ["#8f8f8f", "#947171", "#6b5252", "#cea1a1"],
      fillGradientStops: [1],
      lineHeight: 32,
      padding: 6,
      wordWrap: true,
      wordWrapWidth: 500,
    });

    const bubbleText = new PIXI.Text(bubble.message, textStyle);
    bubble.textWidth = bubbleText.width;
    bubble.textHeight = bubbleText.height;
    bubble.bubbleText = bubbleText;

    this.drawBackground(bubble.textWidth, bubble.textHeight, bubble);

    [bubbleText, bubble.bubbleBackground, bubble.gradientSprite].forEach(
      (el) => {
        el.scale.set(0.5);
        el.alpha = 0;
      }
    );

    SceneManager._scene.addChild(bubbleText);

    const animateScaleAndFadeIn = () => {
      const startTime = Date.now();
      const duration = 300;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const bounceProgress = this.easeOutBounce(progress);

        [bubbleText, bubble.bubbleBackground, bubble.gradientSprite].forEach(
          (el) => el.scale.set(bounceProgress)
        );
        bubbleText.alpha = progress;
        bubble.bubbleBackground.alpha = progress * 0.7;
        bubble.gradientSprite.alpha = progress;
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    };

    const fadeOutBubble = () => {
      const fadeStartTime = Date.now();
      const fadeDuration = 500;

      const fadeAnimate = () => {
        const elapsed = Date.now() - fadeStartTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        const fadeProgress = 1 - progress;

        bubbleText.alpha = fadeProgress;
        bubble.bubbleBackground.alpha = fadeProgress * 0.7;
        bubble.gradientSprite.alpha = fadeProgress;
        if (progress < 1) {
          requestAnimationFrame(fadeAnimate);
        } else {
          bubble.show = false;
          this.removeBubble(bubble);
          this.updateBubbleStack(bubble.eventId);
        }
      };

      requestAnimationFrame(fadeAnimate);
    };

    animateScaleAndFadeIn();

    bubble.timeoutId = setTimeout(fadeOutBubble, bubble.time);
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.updateBubbleStack = function (eventId) {
    const bubbles = Fugs.Bubbles[eventId];

    if (!bubbles?.length) return;

    const zoom = $gameMap.zoom ?? { x: 1, y: 1 };
    const baseY = bubbles[0].targetEvent.screenY() * zoom.y - 48 * zoom.y;
    let currentY = baseY;

    for (const bubble of bubbles) {
      if (!bubble.show) continue;

      const x = Math.round(
        bubble.targetEvent.screenX() * zoom.x - bubble.textWidth / 2
      );
      currentY -= bubble.textHeight + 12;
      // console.log(
      //   "Gradient Sprite Position:",
      //   bubble.gradientSprite.x,
      //   bubble.gradientSprite.y
      // );
      // console.log(
      //   "bubble.bubbleText Position:",
      //   bubble.bubbleText.x,
      //   bubble.bubbleText.y
      // );

      Object.assign(bubble.bubbleText || {}, { x, y: currentY });
      Object.assign(bubble.bubbleBackground || {}, {
        x: x - 5,
        y: currentY - 2,
      });
      Object.assign(bubble.gradientSprite || {}, {
        x: x - 8,
        y: currentY - 12,
      });
    }
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.easeOutBounce = function (t) {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) {
      t -= 1.5 / 2.75;
      return 7.5625 * t * t + 0.75;
    }
    if (t < 2.5 / 2.75) {
      t -= 2.25 / 2.75;
      return 7.5625 * t * t + 0.9375;
    }
    t -= 2.625 / 2.75;
    return 7.5625 * t * t + 0.984375;
  };

  //----------------------------------------------------------------------//
  Window_Bubbles.prototype.removeBubble = function (bubble) {
    if (!bubble) return;

    bubble.timeoutId && clearTimeout(bubble.timeoutId);

    ["bubbleText", "bubbleBackground", "gradientSprite"].forEach((key) => {
      if (bubble[key]) {
        SceneManager._scene.removeChild(bubble[key]);
        bubble[key].destroy();
      }
    });

    const bubbles = Fugs.Bubbles[bubble.eventId];
    if (bubbles) {
      const index = bubbles.indexOf(bubble);
      if (index > -1) bubbles.splice(index, 1);
      if (!bubbles.length) delete Fugs.Bubbles[bubble.eventId];
    }
  };

  //----------------------------------------------------------------------//
  //----------------------------------------------------------------------//
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);
    this.updateChatBubbles();
  };

  Scene_Map.prototype.updateChatBubbles = function () {
    for (let eventId in Fugs.Bubbles) {
      if (Fugs.Bubbles[eventId].length > 0) {
        Window_Bubbles.prototype.updateBubbleStack(parseInt(eventId));
      }
    }
  };

  const _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "ShowChatBubble") {
      let eventId, time, message;

      if (
        args.length >= 3 &&
        !isNaN(parseFloat(args[0])) &&
        !isNaN(parseFloat(args[1]))
      ) {
        eventId = parseFloat(args[0]);
        time = parseFloat(args[1]) * 1000;
        message = args.slice(2).join(" ");
      } else if (args.length >= 2 && !isNaN(parseFloat(args[0]))) {
        eventId = this._eventId || $gameMap._selectedEventId;
        time = parseFloat(args[0]) * 1000;
        message = args.slice(1).join(" ");
      } else {
        eventId = this._eventId || $gameMap._selectedEventId;
        time = 5000;
        message = args.join(" ");
      }

      new Window_Bubbles(time, message, eventId);
    }
  };
})();
