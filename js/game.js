// js/game.js

import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { createLevel1 } from "../levels/level1.js";  // ← GEÄNDERT
import { createLevel2 } from "../levels/level2.js";  // ← GEÄNDERT

let canvas;
let keyboard = new Keyboard();
let world;
let currentLevel = 1;

function init() {
  canvas = document.getElementById("canvas");
  
  if (world) {
    world.stop();
  }
  
  // NEU: Erstelle FRISCHES Level
  let level = currentLevel === 1 ? createLevel1() : createLevel2();
  //                                 ↑ Funktion aufrufen, nicht Konstante!
  
  world = new World(canvas, keyboard, level);
  
  window.world = world;
  console.log("🎮 World erstellt mit Level", currentLevel);
}

function startGame() {
  console.log('🎮 Spiel startet!');
  
  currentLevel = 1;
  
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('canvasContainer').classList.add('active');
  
  setTimeout(() => {
    init();
  }, 100);
}

function restartLevel() {
  console.log('🔄 Restart Level', currentLevel);
  
  document.getElementById('winScreen').classList.add('hidden');
  document.getElementById('lostScreen').classList.add('hidden');
  
  init();  // ← Erstellt frisches Level!
}

function nextLevel() {
  console.log('➡️ Next Level!');
  
  currentLevel = 2;
  
  document.getElementById('winScreen').classList.add('hidden');
  
  init();  // ← Erstellt Level 2!
}

// Event Listeners
window.addEventListener("load", () => {
  console.log('🎮 Seite geladen');
  
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('restartButton').addEventListener('click', restartLevel);
  document.getElementById('restartLostButton').addEventListener('click', restartLevel);
  document.getElementById('nextLevelButton').addEventListener('click', nextLevel);
});

window.showWinScreen = showWinScreen;
window.showLostScreen = showLostScreen;

function showWinScreen() {
  console.log('🎉 YOU WIN!');
  document.getElementById('winScreen').classList.remove('hidden');
}

function showLostScreen() {
  console.log('💀 YOU LOST!');
  document.getElementById('lostScreen').classList.remove('hidden');
}