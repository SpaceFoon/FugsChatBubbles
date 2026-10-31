(function () {
const fs = require("fs");
let clock = 100000;
Date.now = function () { return clock; };
let checks = 0;
let diagnosticCalls = 0;
const checkedRenderers = ["Canvas"];
// MV's tilemap Canvas plugin lacks destroy(); tests explicitly destroy renderers.
PIXI.tilemap.CanvasTileRenderer.prototype.destroy = function () {};
console.log = console.warn = function () { diagnosticCalls++; };
function finish(error) {
  fs.writeFileSync(window.testResultPath, JSON.stringify({
    passed: !error, checks: checks, chromium: process.versions.chromium,
    pixi: window.PIXI && PIXI.VERSION, renderers: checkedRenderers,
    error: error && String(error.stack || error)
  }, null, 2));
  nw.Window.get().close(true);
}
window.onerror = function (message, source, line, column, error) {
  finish(error || new Error(message + " at " + source + ":" + line));
};
function assert(value, message) {
  checks++;
  if (!value) throw new Error(message);
}
const registeredCommands = {};
const PluginManager = { registerCommand: function (plugin, name, handler) {
  registeredCommands[name] = handler;
}, parameters: function () { return {
  Theme: "custom", "Font Family": "Arial", "Font Size": "24",
  "Font Colors": "#112233", "Font Alpha": "0.4",
  "Font Word Wrap Width": "160", "Bubble Colors": '["#ff0000"]',
  "Bubble Alpha": "0.25", "Bubble Shape": "Square",
  "Bubble Offset X": "0", "Bubble Offset Y": "0",
  "Bubble Border Width": "0"
}; } };
const Graphics = { width: 816, height: 624 };
function Scene_Map() { PIXI.Container.call(this); }
Scene_Map.prototype = Object.create(PIXI.Container.prototype);
Scene_Map.prototype.constructor = Scene_Map;
Scene_Map.prototype.update = function () {};
Scene_Map.prototype.stop = function () {};
Scene_Map.prototype.terminate = function () {};
Scene_Map.prototype.startEncounterEffect = function () {};
function Game_Map() {}
Game_Map.prototype.setup = function () {};
function character(x, y) {
  return { screenX: function () { return x; }, screenY: function () { return y; } };
}
const follower = character(300, 400);
let $gamePlayer = character(408, 500);
$gamePlayer.followers = function () {
  return { follower: function (index) { return index === 0 ? follower : undefined; } };
};
const event = character(600, 500);
const $gameMap = new Game_Map();
$gameMap.event = function (id) { return id === 1 ? event : undefined; };
$gameMap.mapId = function () { return 1; };
let $gameMessage = { isBusy: function () { return false; } };
const $gameVariables = { value: function () { return 42; } };
const $gameActors = { actor: function () { return {name:function () { return 'Harold'; }}; } };
const $gameParty = { members: function () { return [{name:function () { return 'Therese'; }}]; } };
const TextManager = { currencyUnit: 'G' };
const systemImages = {Window:Bitmap.load('Window.png'), IconSet:Bitmap.load('IconSet.png')};
const ImageManager = {
  loadSystem: function (name) { return systemImages[name]; },
  isReady: function () { return Object.keys(systemImages).every(function (key) { return systemImages[key].isReady(); }); }
};
const textAssetsReady = Promise.all(Object.keys(systemImages).map(function (key) {
  return new Promise(function (resolve) { systemImages[key].addLoadListener(resolve); });
}));
const SceneManager = { _scene: new Scene_Map() };
function Game_Interpreter() { this._eventId = 0; }
Game_Interpreter.prototype.pluginCommand = function () {};
Game_Interpreter.prototype.command101 = function () { this.normalMessages=(this.normalMessages||0)+1; return false; };
Game_Interpreter.prototype.setup = function () {};
Game_Interpreter.prototype.terminate = function () {};
const engineHooks = {
  update: Scene_Map.prototype.update, stop: Scene_Map.prototype.stop,
  terminate: Scene_Map.prototype.terminate,
  startEncounterEffect: Scene_Map.prototype.startEncounterEffect,
  setup: Game_Map.prototype.setup,
  pluginCommand: Game_Interpreter.prototype.pluginCommand,
  command101: Game_Interpreter.prototype.command101,
  interpreterSetup: Game_Interpreter.prototype.setup,
  interpreterTerminate: Game_Interpreter.prototype.terminate
};
// Expose test fixtures as window properties so engine globals can be replaced
// without introducing global-scoped declarations or conflicting with core scripts.
Object.assign(window, {
  fs:fs, registeredCommands:registeredCommands, PluginManager:PluginManager,
  Graphics:Graphics, Scene_Map:Scene_Map, Game_Map:Game_Map, character:character,
  follower:follower, event:event, $gameVariables:$gameVariables, $gameActors:$gameActors,
  $gameParty:$gameParty, TextManager:TextManager, systemImages:systemImages,
  ImageManager:ImageManager, textAssetsReady:textAssetsReady,
  SceneManager:SceneManager, Game_Interpreter:Game_Interpreter, engineHooks:engineHooks
});
Object.defineProperty(window, "$gamePlayer", {
  configurable:true, get:function () {return $gamePlayer;},
  set:function (value) {$gamePlayer=value;}
});
Object.defineProperty(window, "$gameMap", {configurable:true,value:$gameMap});
Object.defineProperty(window, "$gameMessage", {
  configurable:true, get:function () {return $gameMessage;},
  set:function (value) {$gameMessage=value;}
});
[
  ["clock",function () {return clock;},function (value) {clock=value;}],
  ["checks",function () {return checks;},function (value) {checks=value;}],
  ["diagnosticCalls",function () {return diagnosticCalls;},function (value) {diagnosticCalls=value;}]
].forEach(function (entry) {
  Object.defineProperty(window,entry[0],{
    configurable:true,get:entry[1],set:entry[2]
  });
});
Object.assign(window,{finish:finish,assert:assert});
})();
