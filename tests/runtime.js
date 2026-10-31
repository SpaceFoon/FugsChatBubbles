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
  command("ShowChatBubble -1 2 follower");
  assert(latest(-1).target===follower, "first follower");
  Fugs.ChatBubbles.clear();
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
  assert(diagnosticCalls===0, "debug disabled stays quiet");
  finish();
} catch (error) { finish(error); }
}, finish);
