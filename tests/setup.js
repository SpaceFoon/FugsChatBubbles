var fs = require("fs");
var clock = 100000;
Date.now = function () { return clock; };
var checks = 0;
var diagnosticCalls = 0;
console.log = console.warn = function () { diagnosticCalls++; };
function finish(error) {
  fs.writeFileSync(window.testResultPath, JSON.stringify({
    passed: !error, checks: checks, chromium: process.versions.chromium,
    pixi: window.PIXI && PIXI.VERSION, error: error && String(error.stack || error)
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
var PluginManager = { parameters: function () { return {
  Theme: "custom", "Font Family": "Arial", "Font Size": "24",
  "Font Colors": "#112233", "Font Alpha": "0.4",
  "Font Word Wrap Width": "160", "Bubble Colors": '["#ff0000"]',
  "Bubble Alpha": "0.25", "Bubble Shape": "Square",
  "Bubble Offset X": "0", "Bubble Offset Y": "0",
  "Bubble Border Width": "0"
}; } };
var Graphics = { width: 816, height: 624 };
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
var follower = character(300, 400);
var $gamePlayer = character(408, 500);
$gamePlayer.followers = function () {
  return { follower: function (index) { return index === 0 ? follower : undefined; } };
};
var event = character(600, 500);
var $gameMap = new Game_Map();
$gameMap.event = function (id) { return id === 1 ? event : undefined; };
var SceneManager = { _scene: new Scene_Map() };
function Game_Interpreter() { this._eventId = 0; }
Game_Interpreter.prototype.pluginCommand = function () {};
