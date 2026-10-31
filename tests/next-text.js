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
