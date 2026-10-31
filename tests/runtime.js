document.fonts.load("24px GameFont").then(function () {
try {
  var interpreter = new Game_Interpreter();
  function command(text) {
    var parts = text.split(" ");
    interpreter.pluginCommand(parts.shift(), parts);
  }
  function latest(id) { return Fugs.Bubbles[id][0]; }
  function textOf(bubble) { return bubble.container.children[1]; }
  function advance(ms) { clock += ms; SceneManager._scene.update(); }
  function checkInk(text) {
    var canvas = text.canvas;
    var pixels = text.context.getImageData(0, 0, canvas.width, canvas.height).data;
    var minX=canvas.width, maxX=-1, minY=canvas.height, maxY=-1;
    for (var y=0;y<canvas.height;y++) for (var x=0;x<canvas.width;x++) {
      if (pixels[(y*canvas.width+x)*4+3]) {
        minX=Math.min(minX,x); maxX=Math.max(maxX,x);
        minY=Math.min(minY,y); maxY=Math.max(maxY,y);
      }
    }
    assert(Math.abs(text.x+(minX+maxX+1-canvas.width)/2)<0.51, "ink horizontally centered");
    assert(Math.abs(text.y+(minY+maxY+1-canvas.height)/2)<0.51, "ink vertically centered");
  }
  command("ShowChatBubble -- iii");
  var first=latest(0), label=textOf(first), bg=first.container.children[0];
  assert(first.target===$gamePlayer, "common event defaults to player");
  assert(label.style.fontFamily==="Arial" && label.style.fontSize===24, "font parameters");
  assert(label.style.fill==="#112233" && label.alpha===0.4, "text color and alpha");
  assert(label.style.align==="center" && label.style.wordWrapWidth===160, "wrapping and alignment");
  assert(bg.alpha===0.25, "background alpha");
  var pixel=bg.texture.baseTexture.source.getContext("2d").getImageData(4,4,1,1).data;
  assert(pixel[0]===255 && pixel[1]===0 && pixel[2]===0, "single color JSON array and square background");
  checkInk(label);
  var centerX=first.container.x, centerY=first.container.y;
  advance(100);
  assert(first.container.x===centerX && first.container.y===centerY, "center fixed during bounce");
  advance(4650);
  assert(first.container.alpha===0.5, "fade occurs within total duration");
  advance(250);
  assert(!Fugs.Bubbles[0], "removed exactly at requested duration");

  ["hello","iii","gypsy","HELLO","a short line\nanother"].forEach(function (message) {
    Fugs.ChatBubbles.show(0,1000,message); checkInk(textOf(latest(0))); Fugs.ChatBubbles.clear();
  });
  command("ChatBubble changeFont 0 GameFont");
  ["iii","hello","gypsy","HELLO"].forEach(function (message) {
    command("ShowChatBubble -- "+message);
    checkInk(textOf(latest(0))); Fugs.ChatBubbles.clear();
  });
  command("ShowChatBubble event:1 duration:2 -- 2 enemies left");
  assert(textOf(latest(1)).text==="2 enemies left", "numeric-leading message with named options");
  assert(latest(1).duration===2000, "seconds converted");
  Fugs.ChatBubbles.clear();
  ["WhiteBlack","BlackWhite","Light","Dark","CrimsonAndBlue","FieryCrimson",
    "ShadowedViolet","RoyalGold","EmeraldDream","SapphireGlimmer","EtherealGlow",
    "TwilightSky","FrostedTeal","SunsetBloom","AutumnHearth","SoftRose","custom"].forEach(function (name) {
    command("ChatBubble changeColor 0 theme: "+name);
    command("ShowChatBubble theme");
    assert(Fugs.Bubbles[0].length===1, "theme creates: "+name);
    Fugs.ChatBubbles.clear();
  });
  command("ShowChatBubble 1 2 -- 1 8 enemies");
  assert(textOf(latest(1)).text==="1 8 enemies", "legacy options with delimiter");
  Fugs.ChatBubbles.clear();
  command("ShowChatBubble 2enemies left");
  assert(textOf(latest(0)).text==="2enemies left", "partial numbers remain text");
  Fugs.ChatBubbles.clear();
  command("ShowChatBubble Wait -- stop");
  assert(textOf(latest(0)).text==="Wait -- stop", "literal dashes remain dialogue");
  Fugs.ChatBubbles.clear();
  command("ShowChatBubble 2 Wait -- stop");
  assert(textOf(latest(0)).text==="Wait -- stop", "duration and literal dashes");
  Fugs.ChatBubbles.clear();
  interpreter._eventId=1;
  command("ShowChatBubble current event");
  assert(latest(1).target===event, "implicit map event target");
  Fugs.ChatBubbles.clear(); interpreter._eventId=0;
  follower.isVisible=function () { return false; };
  command("ShowChatBubble -1 2 invisible");
  assert(!Fugs.Bubbles[-1], "invisible follower ignored");
  follower.isVisible=function () { return true; };
  command("ShowChatBubble -1 2 follower");
  assert(latest(-1).target===follower, "first follower");
  follower.isVisible=function () { return false; };
  advance(1);
  assert(!Fugs.Bubbles[-1], "hidden follower bubble removed");
  follower.isVisible=function () { return true; };
  Fugs.ChatBubbles.clear();
  event._erased=true;
  command("ShowChatBubble 1 2 erased");
  assert(!Fugs.Bubbles[1], "erased event ignored");
  event._erased=false;
  command("ShowChatBubble 1 2 active");
  event._erased=true; advance(1);
  assert(!Fugs.Bubbles[1], "erasing event removes its bubble");
  event._erased=false;
  command("ShowChatBubble 999 2 missing");
  command("ShowChatBubble -99 2 missing");
  command("ShowChatBubble event:0 duration:-2 -- invalid");
  assert(Object.keys(Fugs.Bubbles).length===0, "invalid targets and duration ignored");

  command("ChatBubble changeColor 100 theme: Dark");
  command("ShowChatBubble before");
  assert(textOf(latest(0)).style.fill==="#112233", "delayed theme not early");
  Fugs.ChatBubbles.clear(); advance(100);
  command("ShowChatBubble after");
  assert(textOf(latest(0)).style.fill[0]==="#FFFFFF", "theme changes future bubbles");
  command("ChatBubble [changeColor][0][theme: ff7]");
  command("ChatBubble [changeFont][0][Georgia]");
  command("ShowChatBubble changed");
  assert(textOf(latest(0)).style.fontFamily==="Georgia", "bracket font command");
  assert(latest(0).container.children[0].alpha===0.85, "ff7 theme alias");
  assert(Fugs.Bubbles[0].length===2, "parallel stacking");
  assert(Fugs.Bubbles[0][1].container.y<latest(0).container.y, "older bubble above newer");
  Fugs.ChatBubbles.clear();

  var baseCount=Object.keys(PIXI.utils.BaseTextureCache).length;
  for (var i=0;i<40;i++) { command("ShowChatBubble resource"); Fugs.ChatBubbles.clear(); }
  assert(Object.keys(PIXI.utils.BaseTextureCache).length===baseCount, "canvas base textures released");
  ["stop","terminate","startEncounterEffect"].forEach(function (method) {
    command("ShowChatBubble transition"); SceneManager._scene[method]();
    assert(Object.keys(Fugs.Bubbles).length===0, method+" clears registry");
    assert(SceneManager._scene.children.length===0, method+" detaches sprites");
  });
  command("ShowChatBubble transfer");
  $gameMap.setup(2);
  assert(Object.keys(Fugs.Bubbles).length===0, "map setup clears");
  var oldScene=SceneManager._scene;
  command("ShowChatBubble owner");
  SceneManager._scene=new Scene_Map(); Fugs.ChatBubbles.clear();
  assert(oldScene.children.length===0, "cleanup detaches actual parent");

  $gamePlayer=character(0,0);
  $gamePlayer.followers=function () { return { follower: function () {} }; };
  command("ShowChatBubble edge");
  var edge=latest(0);
  advance(300);
  assert(edge.container.x-edge.width*edge.container.scale.x/2>=0, "left edge clamped");
  assert(edge.container.y-edge.height*edge.container.scale.y/2>=0, "top edge clamped");
  Fugs.ChatBubbles.clear();
  for (var row=0;row<16;row++) command("ShowChatBubble stacking at edge");
  advance(300);
  var rows=Fugs.Bubbles[0];
  for (var j=1;j<rows.length;j++) {
    var newer=rows[j-1], older=rows[j];
    assert(older.container.y+older.height*older.fit/2 <=
      newer.container.y-newer.height*newer.fit/2, "dense stack does not overlap");
  }
  var oldest=rows[rows.length-1];
  assert(oldest.container.y-oldest.height*oldest.fit/2>=3.99, "dense stack stays on screen");
  Fugs.ChatBubbles.clear();
  Fugs.ChatBubbles.show(0,1000,new Array(200).join("long message "));
  var tall=latest(0); advance(300);
  assert(tall.height*tall.container.scale.y<=Graphics.height, "oversize text fits screen");
  Fugs.ChatBubbles.clear();
  command("ShowChatBubble event:0 duration:0.1 -- short");
  advance(50);
  assert(latest(0).container.alpha===1, "short entrance and fade meet");
  advance(50);
  assert(Object.keys(Fugs.Bubbles).length===0, "short lifetime exact");

  // Real Pixi transforms, as used by MV character sprites and camera parents.
  var scene=SceneManager._scene, camera=new PIXI.Container();
  var mapLayer=new PIXI.Container(), characterSprite=new PIXI.Sprite(PIXI.Texture.EMPTY);
  scene.addChild(camera); camera.addChild(mapLayer); mapLayer.addChild(characterSprite);
  scene._spriteset=camera;
  camera._characterSprites=[characterSprite];
  characterSprite._character=$gamePlayer;
  characterSprite.patternHeight=function () { return 72; };
  characterSprite.position.set(300,400);
  camera.scale.set(1.5); camera.position.set(-100,-180);
  $gameMap.zoom={x:2,y:2};
  command("ShowChatBubble camera");
  var anchored=latest(0); advance(300);
  assert(Math.abs(anchored.container.x-350)<0.01, "camera translation and scale anchor X");
  assert(Math.abs(anchored.container.y+anchored.height*anchored.fit/2-312)<0.01,
    "actual character height and camera anchor Y");
  camera.x=-60; advance(1);
  assert(Math.abs(anchored.container.x-390)<0.01, "bubble follows camera movement");
  characterSprite.x=2000; characterSprite.y=2000; advance(1);
  assert(anchored.container.x+anchored.width*anchored.fit/2<=Graphics.width-3.99,
    "right edge clamp under camera");
  assert(anchored.container.y+anchored.height*anchored.fit/2<=Graphics.height-3.99,
    "bottom edge clamp under camera");
  Fugs.ChatBubbles.clear(); scene.removeChild(camera);
  camera.destroy({children:true}); delete scene._spriteset; delete $gameMap.zoom;

  // Reinitialize empty plugin instances to check independent parameter sets.
  var defaults=PluginManager.parameters("FugsChatBubbles");
  function reload(overrides, clean) {
    Fugs.ChatBubbles.clear();
    ["update","stop","terminate","startEncounterEffect"].forEach(function (name) {
      Scene_Map.prototype[name]=engineHooks[name];
    });
    Game_Map.prototype.setup=engineHooks.setup;
    Game_Interpreter.prototype.pluginCommand=engineHooks.pluginCommand;
    PluginManager.parameters=function () { return Object.assign({},clean ? {} : defaults,overrides); };
    window.eval(fs.readFileSync("FugsChatBubbles.js","utf8"));
  }
  reload({"Font Alpha":"0","Bubble Alpha":"0","Font Padding":"0",
    "Bubble Width Margin":"0","Bubble Height Margin":"0","Font WordWrap":"false"});
  command("ShowChatBubble transparent");
  var transparent=latest(0);
  assert(textOf(transparent).alpha===0 && transparent.container.children[0].alpha===0,
    "zero opacities preserved");
  assert(textOf(transparent).style.wordWrap===false && textOf(transparent).style.padding===0,
    "zero padding and wrapping disabled");
  advance(300);
  assert(diagnosticCalls===0, "plugin does not dump diagnostics");
  var renderer=new PIXI.CanvasRenderer(Graphics.width,Graphics.height,{transparent:true});
  var rendererDiagnostics=diagnosticCalls; // Pixi prints its own renderer banner.
  renderer.render(scene);
  var rendered=renderer.view.getContext("2d").getImageData(0,0,Graphics.width,Graphics.height).data;
  var visible=false;
  for (var k=3;k<rendered.length;k+=4) if (rendered[k]) { visible=true; break; }
  assert(!visible, "zero-opacity bubble renders transparent pixels");
  Fugs.ChatBubbles.clear();
  renderer.render(scene);
  renderer.destroy(true);

  reload({"Font Colors":"invalid-color","Font Size":"not-a-number",
    "Bubble Colors":'["invalid-color","#112233"]',
    "Bubble Shape":"Round","Bubble Border Width":"4",
    "Bubble Border Color":"0x00ff00","Bubble Alpha":"1"});
  command("ShowChatBubble rounded");
  var rounded=latest(0), canvas=rounded.container.children[0].texture.baseTexture.source;
  assert(textOf(rounded).style.fill==="#FFFFFF", "invalid text color falls back");
  assert(textOf(rounded).style.fontSize===28, "invalid number falls back");
  var ctx=canvas.getContext("2d");
  assert(ctx.getImageData(0,0,1,1).data[3]===0, "round corner transparent");
  var border=ctx.getImageData(Math.floor(canvas.width/2),1,1,1).data;
  assert(border[1]===255 && border[0]===0, "configured border rendered");
  var fill=ctx.getImageData(Math.floor(canvas.width/2),Math.floor(canvas.height/2),1,1).data;
  assert(fill[0]===17 && fill[1]===34 && fill[2]===51, "invalid gradient colors filtered");
  Fugs.ChatBubbles.clear();
  Fugs.ChatBubbles.show(0,-1,"invalid");
  Fugs.ChatBubbles.show(0,Infinity,"invalid");
  command("ShowChatBubble --");
  assert(Object.keys(Fugs.Bubbles).length===0, "API rejects invalid lifetime and empty text");
  reload({"Bubble Colors":"rgba(255,0,0,0.5), rgba(0,0,255,0.5)",
    "Font Colors":"rgb(20,30,40)", "Bubble Border Color":"bad"});
  command("ShowChatBubble css colors");
  assert(textOf(latest(0)).style.fill==="rgb(20,30,40)", "CSS function commas kept inside color");
  var cssCanvas=latest(0).container.children[0].texture.baseTexture.source;
  var cssPixel=cssCanvas.getContext("2d").getImageData(cssCanvas.width/2,cssCanvas.height/2,1,1).data;
  assert(cssPixel[0]>0 && cssPixel[2]>0 && cssPixel[3]>100 && cssPixel[3]<150,
    "rgba gradient rendered");
  Fugs.ChatBubbles.clear();
  reload({},true);
  command("ShowChatBubble defaults");
  assert(textOf(latest(0)).style.fontFamily==="GameFont" &&
    textOf(latest(0)).style.fontSize===28, "missing parameters use stock font defaults");
  assert(latest(0).container.children[0].alpha===0.7, "default Dark theme opacity");
  advance(300);
  var gameRenderer=PIXI.autoDetectRenderer(Graphics.width,Graphics.height,{transparent:true});
  rendererDiagnostics=diagnosticCalls;
  checkedRenderers.push(gameRenderer.type===PIXI.RENDERER_TYPE.WEBGL ? "WebGL" : "Canvas fallback");
  gameRenderer.render(scene);
  assert(gameRenderer.view.width===Graphics.width, "native selected renderer draws live bubble");
  Fugs.ChatBubbles.clear();
  gameRenderer.render(scene);
  gameRenderer.destroy(true);
  assert(Object.keys(PIXI.utils.BaseTextureCache).length===baseCount,
    "all configuration and renderer paths release bubble base textures");
  var mapScene=SceneManager._scene;
  SceneManager._scene=new PIXI.Container();
  Fugs.ChatBubbles.show(0,1000,"not on map");
  assert(Object.keys(Fugs.Bubbles).length===0, "non-map scene ignores show");
  SceneManager._scene=mapScene;
  assert(diagnosticCalls===rendererDiagnostics, "debug disabled stays quiet");
  reload({"Debug Mode":"true"},true);
  var beforeWarning=diagnosticCalls;
  command("ShowChatBubble 999 1 missing");
  assert(diagnosticCalls===beforeWarning+1, "debug mode warns once on missing target");
  finish();
} catch (error) { finish(error); }
}, finish);
