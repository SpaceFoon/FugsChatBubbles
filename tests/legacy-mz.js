Promise.all([document.fonts.load('24px GameFont'),textAssetsReady]).then(function(){try{
 window.$dataSystem={locale:'en',advanced:{fallbackFonts:'sans-serif'}};window.$gameSystem=new Game_System();$gameSystem.windowTone=function(){return [0,0,0,0]};$gameSystem.mainFontFace=function(){return 'GameFont'};
 window.Scene_Battle=function Scene_Battle(){};Scene_Battle.prototype.update=function(){};Scene_Map.prototype.start=function(){};
 $gamePlayer._followers=$gamePlayer.followers();$gameVariables.setValue=function(id,value){this.last={id:id,value:value}};
 let modern=new Game_Interpreter();modern._eventId=1;modern._index=0;modern._params=['',0,0,2,''];modern._list=[{code:101,parameters:modern._params},{code:401,parameters:['hello']},{code:0,parameters:[]}];
 registeredCommands.nextText.call(modern,{target:'1',duration:'2'});assert(modern.command101()===true,'MZ registered next-text conversion: '+String(window.lastWarning));assert(Fugs.Bubbles[1][0].duration===2000,'MZ duration');Fugs.ChatBubbles.clear();
 let interpreter=new Game_Interpreter();interpreter.pluginCommand('ShowChatBubbleWithChoices',['PERSIST','ARROW_LEFT','TRANSPARENT','1','6','20','choose','|','one','|','two']);
 let bubble=Fugs.LegacyBubbles[1]&&Fugs.LegacyBubbles[1][0];assert(!!bubble,'MZ choice bubble created');assert(bubble.persistent&&bubble.transparent&&bubble.arrowDirection==='left','MZ flags');assert(bubble.choices.length===2,'MZ choices');
 window.SoundManager={playCursor:function(){},playOk:function(){}};Input.isTriggered=function(key){return key==='down'};SceneManager._scene.updateChatBubbles();assert(bubble.selectedChoiceIndex===1,'MZ choice navigation');Input.isTriggered=function(key){return key==='ok'};SceneManager._scene.updateChatBubbles();assert($gameVariables.last.id===20&&$gameVariables.last.value===2,'MZ choice result');assert(!Fugs.LegacyBubbles[1],'MZ bubble cleanup');
 Input.isTriggered=function(){return false};interpreter.pluginCommand('ShowChatBubble',['PERSIST','ARROW_RIGHT','TRANSPARENT','0','10','stay']);bubble=Fugs.LegacyBubbles[0][0];assert(bubble.persistent&&bubble.arrowDirection==='right','MZ legacy map bubble');
 SceneManager._scene.terminate();SceneManager._scene=new Scene_Map();SceneManager._scene.start();bubble=Fugs.LegacyBubbles[0][0];assert(bubble.persistent&&bubble.transparent&&bubble.arrowDirection==='right','MZ persistent appearance');
 interpreter.pluginCommand('ShowScreenBubble',['TRANSPARENT','100','100','5','screen']);assert(Fugs.LegacyBubbles[0][0].targetType==='screen','MZ screen bubble');
 interpreter.pluginCommand('ShowBattlerBubble',['ARROW_UP','ACTOR','1','5','battle']);assert(Fugs.LegacyBubbles[0][0].targetType==='battler','MZ battler bubble');
 let modern2=new Game_Interpreter();modern2.pluginCommand('ShowChatBubble',['normal']);assert(!!Fugs.Bubbles[0],'MZ modern bubble after legacy');Fugs.ChatBubbles.clear();finish();
}catch(e){finish(e)}},finish);
