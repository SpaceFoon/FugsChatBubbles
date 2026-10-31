function runNextTextTests() {
  var a = new Game_Interpreter(), b = new Game_Interpreter();
  function prepare(interpreter, text, following, params) {
    interpreter._index=0; interpreter._params=params || ['',0,0,2];
    interpreter._list=[{code:101,parameters:interpreter._params}];
    text.split('\n').forEach(function (line) {
      interpreter._list.push({code:401,parameters:[line]});
    });
    interpreter._list.push({code:following || 0,parameters:[]});
  }
  function arm(interpreter, args) { interpreter.pluginCommand('ChatBubble',args || ['next']); }
  function last(id) { return Fugs.Bubbles[id] && Fugs.Bubbles[id][0]; }
  function clear() { Fugs.ChatBubbles.clear(); }
  var rendered=[], icons=0;
  var draw=Bitmap.prototype.drawText, icon=Window_Base.prototype.drawIcon;
  Bitmap.prototype.drawText=function (text,x,y,w,h,align) {
    rendered.push({text:text,color:this.textColor,size:this.fontSize,x:x,y:y});
    return draw.apply(this,arguments);
  };
  Window_Base.prototype.drawIcon=function () { icons++; return icon.apply(this,arguments); };
  try {
    prepare(a,'Hello \\N[1]!\n\\V[2] \\G \\P[1] \\C[2]red\\C[0] \\I[1] \\{BIG\\}');
    arm(a,['next','event:1','duration:2']);
    assert(a.command101()===true,'next Show Text becomes nonblocking bubble');
    assert(a._index===2 && !a._fugsNextBubble,'consumes every text line and clears marker');
    assert(last(1).duration===2000,'next text explicit target and seconds');
    var output=rendered.map(function (r) { return r.text; }).join('');
    assert(output.indexOf('Hello Harold!42 G Therese red')===0,'native substitutions for actor/variable/currency/party');
    assert(output.indexOf('\\N')<0 && output.indexOf('[2]')<0,'escape syntax not drawn literally');
    assert(icons===1,'native icon drawing');
    assert(rendered.some(function (r) { return r.text.indexOf('BIG')>=0 && r.size===36; }),'inline font size');
    assert(rendered.some(function (r) { return r.text==='red' && r.color===systemImages.Window.getPixel(96+2*12+6,150); }), 'native windowskin color');
    assert(rendered.some(function (r) { return r.y>4; }),'Show Text newlines preserved');
    var bubble=last(1), canvas=bubble.container.children[1].canvas;
    assert(canvas.width>10 && canvas.height>40,'rich text has rendered dimensions');
    assert(!a.normalMessages,'converted text never opens normal message');
    clear();
    prepare(a,'normal after bubble'); a.command101();
    assert(a.normalMessages===1 && !last(0),'conversion is one shot');
    prepare(a,'armed'); prepare(b,'independent'); arm(a); b.command101();
    assert(b.normalMessages===1 && a._fugsNextBubble,'marker isolated to interpreter');
    $gameMessage.isBusy=function () { return true; };
    assert(a.command101()===false && a._index===0 && a._fugsNextBubble,'busy normal dialogue retries intact');
    $gameMessage.isBusy=function () { return false; };
    a.command101(); assert(last(0),'retry creates bubble'); clear();
    [102,103,104].forEach(function (following) {
      prepare(a,'interactive',following); arm(a); var before=a.normalMessages;
      a.command101();
      assert(a.normalMessages===before+1 && !a._fugsNextBubble && !last(0),'input '+following+' falls back intact');
    });
    [['Actor1',0,0,2],['',0,0,2,'Harold']].forEach(function (params) {
      prepare(a,'face or name',0,params); arm(a); var before=a.normalMessages;
      a.command101(params);
      assert(a.normalMessages===before+1 && !last(0),'face/speaker uses normal dialogue');
    });
    prepare(a,'bad target'); arm(a,['next','event:999']); var before=a.normalMessages;
    a.command101(); assert(a.normalMessages===before+1,'missing target preserves dialogue');
    prepare(a,'cancelled'); arm(a); arm(a,['cancel']); a.command101();
    assert(!last(0),'explicit cancellation');
    arm(a); a.terminate(); assert(!a._fugsNextBubble,'termination clears pending marker');
    arm(a); a.setup(); assert(!a._fugsNextBubble,'setup clears reused interpreter marker');
    prepare(a,'other map'); arm(a); a._fugsNextBubble.mapId=2; a.command101();
    assert(!a._fugsNextBubble && !last(0),'marker cannot cross map transfer');
    prepare(a,'invalid duration'); arm(a,['next','duration:0']); assert(!a._fugsNextBubble,'reject invalid marker');
    prepare(a,'assets pending'); arm(a);
    var ready=ImageManager.isReady;
    ImageManager.isReady=function () {return false;};
    assert(a.command101()===false && a._fugsNextBubble && a._index===0,'asset wait preserves text and marker');
    ImageManager.isReady=ready; a.command101(); assert(last(0),'ready assets resume conversion'); clear();
    prepare(a,'outside map'); arm(a); var mapScene=SceneManager._scene;
    SceneManager._scene=new PIXI.Container(); a.command101(); SceneManager._scene=mapScene;
    assert(!a._fugsNextBubble && !last(0),'non-map text falls back and clears marker');
    prepare(a,Array(16386).join('x')); arm(a); var before=a.normalMessages;
    a.command101(); assert(a.normalMessages===before+1 && !last(0),'oversized text preserved as normal dialogue');
    prepare(a,'\\C[1]'); arm(a); var before=a.normalMessages;
    a.command101(); assert(a.normalMessages===before+1 && !last(0),'format-only text falls back');
    prepare(a,'MZ registered command');
    registeredCommands.nextText.call(a,{target:'1',duration:'3'});
    assert(a.command101(a._params)===true && last(1).duration===3000,'MZ registration callback and command101 params adapter');
    clear(); registeredCommands.nextText.call(a,{target:'current',duration:'5'});
    registeredCommands.cancelNextText.call(a,{}); assert(!a._fugsNextBubble,'MZ cancel callback');
    prepare(a,Array(50).join('wrapped words ')); arm(a); a.command101();
    assert(last(0).width<=200 && last(0).height>100,'rich text wraps within configured width'); clear();
    // Plugin conversion hooks are used; message-only processing is not invoked.
    var convert=Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters=function (text) { return convert.call(this,text.replace(/CUSTOM/g,'extended')); };
    prepare(a,'CUSTOM'); rendered=[]; arm(a); a.command101();
    Window_Base.prototype.convertEscapeCharacters=convert;
    assert(rendered.map(function (r) {return r.text;}).join('')==='extended','Window_Base conversion extension'); clear();
    prepare(a,'cafe\u0301 \ud83d\ude00 \\\\path'); rendered=[]; arm(a); a.command101();
    assert(rendered.map(function (r) {return r.text;}).join('')==='cafe\u0301 \ud83d\ude00 \\path','Unicode and escaped backslash preserved');
    clear();
    var engineName=Utils.RPGMAKER_NAME;
    Utils.RPGMAKER_NAME='MZ';
    try {
      a.pluginCommand('ChatBubble',['changeFont','0','GameFont']);
      Fugs.ChatBubbles.show(0,1000,'MZ font');
      assert(last(0).container.children[1].style.fontFamily==='rmmz-mainfont','MZ default font mapping');
    } finally {Utils.RPGMAKER_NAME=engineName; clear();}
    a.pluginCommand('ChatBubble',['changeFont','0','Arial']);
  } finally {
    Bitmap.prototype.drawText=draw; Window_Base.prototype.drawIcon=icon;
    $gameMessage.isBusy=function () { return false; }; clear();
  }
}

function runNativeInterpreterTests() {
  Fugs.ChatBubbles.clear();
  ["update","stop","terminate","startEncounterEffect"].forEach(function (name) {
    Scene_Map.prototype[name]=engineHooks[name];
  });
  Game_Map.prototype.setup=engineHooks.setup;
  Game_Interpreter=NativeInterpreter;
  $gameMessage=new NativeMessage();
  ImageManager.requestFace=function () {};
  SceneManager.isSceneChanging=function () { return false; };
  PluginManager.parameters=function () {return {'Font Family':'GameFont','Bubble Offset X':'0'};};
  window.eval(fs.readFileSync('FugsChatBubbles.js','utf8'));
  function event(code, params) {return {code:code,indent:0,parameters:params || []};}
  function list(text, after) {return [event(356,['ChatBubble next']),event(101,['',0,0,2]),
    event(401,[text])].concat(after || [event(0)]);}
  var interpreter=new Game_Interpreter();
  interpreter.setup(list('First line',[event(401,['Second line']),event(101,['',0,0,2]),
    event(401,['Normal afterwards']),event(0)]),1);
  assert(interpreter.executeCommand() && interpreter._index===1,'native engine executes arm command');
  assert(interpreter.executeCommand() && interpreter._index===4,'native engine advances past all converted lines');
  assert(!$gameMessage.hasText() && interpreter._waitMode==='','native converted text leaves shared dialogue free');
  assert(Fugs.Bubbles[1].length===1,'native current-event bubble target');
  assert(!interpreter.executeCommand() && interpreter._index===6,'native subsequent Show Text blocks normally');
  assert($gameMessage.allText()==='Normal afterwards' && interpreter._waitMode==='message','normal message content and wait preserved');
  $gameMessage.clear(); Fugs.ChatBubbles.clear();
  interpreter.setup(list('Pick one',[event(102,[['Yes','No'],1,0,2,0]),event(0)]),1);
  interpreter.executeCommand(); interpreter.executeCommand();
  assert($gameMessage.allText()==='Pick one' && $gameMessage.choices().length===2,'native fallback preserves prompt and choices');
  $gameMessage.onChoice(1);
  assert(interpreter._branch[0]===1 && interpreter._waitMode==='message','native choice callback and message wait preserved');
  assert(!Fugs.Bubbles[1],'interactive fallback does not create bubble');
  $gameMessage.clear();
  interpreter.setup(list('Unsupported \\CUSTOM[2] effect'),1);
  interpreter.executeCommand(); interpreter.executeCommand();
  assert($gameMessage.allText()==='Unsupported \\CUSTOM[2] effect' && !Fugs.Bubbles[1],
    'unknown text codes preserve entire original Show Text');
  $gameMessage.clear();
  interpreter.setup(list('Position \\PX[100] effect'),1);
  interpreter.update();
  assert($gameMessage.allText()==='Position \\PX[100] effect' && !Fugs.Bubbles[1],
    'unsupported positioning uses normal dialogue instead of corrupting layout');
  $gameMessage.clear();
  interpreter.setup(list('One',[event(356,['ChatBubble next']),event(101,['',0,0,2]),
    event(401,['Two']),event(0)]),1);
  interpreter.update();
  assert(!interpreter.isRunning() && !$gameMessage.isBusy() && Fugs.Bubbles[1].length===2,
    'native update loop completes sequential nonblocking bubbles');
  Fugs.ChatBubbles.clear();
  var baseCount=Object.keys(PIXI.utils.BaseTextureCache).length;
  var textureCount=Object.keys(PIXI.utils.TextureCache).length;
  for (var i=0;i<40;i++) {
    interpreter.setup(list('Hello \\N[1] \\C[2]red \\I[1]'),1);
    interpreter.update(); Fugs.ChatBubbles.clear();
  }
  assert(Object.keys(PIXI.utils.BaseTextureCache).length===baseCount &&
    Object.keys(PIXI.utils.TextureCache).length===textureCount,'formatted bubble repetitions release cached textures');
  interpreter.setup(list('Hello \\N[1]!',[event(401,['You have \\V[2] \\G. \\C[2]Red \\C[0]\\I[1]']),event(0)]),1);
  interpreter.update(); clock+=300; SceneManager._scene.update();
  var renderer=new PIXI.CanvasRenderer(Graphics.width,Graphics.height,{transparent:true});
  renderer.render(SceneManager._scene);
  var pixels=renderer.view.getContext('2d').getImageData(0,0,Graphics.width,Graphics.height).data;
  var visible=false;
  for (var p=3;p<pixels.length;p+=4) {if (pixels[p]) {visible=true;break;}}
  assert(visible,'native formatted bubble renders to actual scene pixels');
  if (process.env.FUGS_BUBBLE_REVIEW_IMAGE) {
    fs.writeFileSync(process.env.FUGS_BUBBLE_REVIEW_IMAGE,
      Buffer.from(renderer.view.toDataURL('image/png').split(',')[1],'base64'));
  }
  renderer.destroy(true); Fugs.ChatBubbles.clear();
}
