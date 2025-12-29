// js/game.js

import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { AudioManager } from "../models/audio-manager.class.js";
import { createLevel1 } from "../levels/level1.js";
import { createLevel2 } from "../levels/level2.js";
import { SettingsManager } from "./settings.js";
import { SupabaseClient } from './supabase-client.js';

let canvas;
let keyboard = new Keyboard();
let world;
let currentLevel = 1;
let settings;
let supabase;
let gameStartTime = 0;

function init() {
  canvas = document.getElementById("canvas");

  if (world) {
    world.stop();
  }

  let level = currentLevel === 1 ? createLevel1() : createLevel2();
  world = new World(canvas, keyboard, level);

  if (settings) {
    let s = settings.getSettings();
    world.audio.updateVolumes(s.musicVolume, s.soundVolume, s.muteAll);
  }

  window.world = world;
  console.log("🎮 World erstellt mit Level", currentLevel);
}

function startGame() {
  console.log("🎮 Spiel startet!");

  currentLevel = 1;
  gameStartTime = Date.now();

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("canvasContainer").classList.add("active");

  setTimeout(() => {
    init();
    world.audio.playMusic("background", 0.5);
  }, 100);
}

function restartLevel() {
  console.log("🔄 Restart Level", currentLevel);
  gameStartTime = Date.now();

  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("lostScreen").classList.add("hidden");
  document.getElementById("scoreScreen").classList.add("hidden");

  init();
  world.audio.playMusic("background", 0.5);
}

function nextLevel() {
  console.log("➡️ Next Level!");

  currentLevel = 2;
  gameStartTime = Date.now();

  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("scoreScreen").classList.add("hidden");

  init();
  world.audio.playMusic("background", 0.5);
}

// Score-Berechnung
function calculateScore(timeSeconds) {
  let score = 0;
  
  // 1. BASIS-PUNKTE (Addition)
  score += world.collectedCoins * 50;              // Max: 1.100
  score += world.character.health * 3;             // Max: 300
  score += world.character.bottleInventory * 20;   // Max: 200
  score += Math.max(0, 600 - timeSeconds);         // Max: 540
  
  // 2. MULTIPLIKATIONS-BONUS
  let coinPercent = world.collectedCoins / 22;     // 0-1
  let healthPercent = world.character.health / 100; // 0-1
  let timeBonus = timeSeconds < 180 ? 1.5 : 1.0;   // Schnell = x1.5
  
  let multiplier = 1 + (coinPercent * healthPercent * timeBonus * 0.5);
  
  score = Math.round(score * multiplier);
  
  // 3. LEVEL-BONUS
  score += 500;
  
  return score;
}

// Score-Screen anzeigen
function showScoreScreen(timeSeconds) {
  // Berechne Breakdown
  let coinsScore = world.collectedCoins * 50;
  let healthScore = world.character.health * 3;
  let bottlesScore = world.character.bottleInventory * 20;
  let timeScore = Math.max(0, 600 - timeSeconds);
  let subtotal = coinsScore + healthScore + bottlesScore + timeScore;
  
  let coinPercent = world.collectedCoins / 22;
  let healthPercent = world.character.health / 100;
  let timeBonus = timeSeconds < 180 ? 1.5 : 1.0;
  let multiplier = 1 + (coinPercent * healthPercent * timeBonus * 0.5);
  
  let afterMultiplier = Math.round(subtotal * multiplier);
  let finalScore = afterMultiplier + 500;
  
  // Fülle UI
  document.getElementById('scoreCoins').textContent = `${world.collectedCoins}/22 × 50 = ${coinsScore}`;
  document.getElementById('scoreHealth').textContent = `${world.character.health}/100 × 3 = ${healthScore}`;
  document.getElementById('scoreBottles').textContent = `${world.character.bottleInventory}/10 × 20 = ${bottlesScore}`;
  document.getElementById('scoreTime').textContent = `${Math.round(timeScore)}`;
  document.getElementById('scoreSubtotal').textContent = subtotal;
  document.getElementById('scoreMultiplier').textContent = `×${multiplier.toFixed(2)} = ${afterMultiplier}`;
  document.getElementById('scoreTotal').textContent = finalScore;
  
  // Zeige Screen
  document.getElementById('scoreScreen').classList.remove('hidden');
  
  // Focus auf Input
  setTimeout(() => {
    document.getElementById('playerNameInput').focus();
  }, 100);
  
  // Event Listeners (entferne alte zuerst)
  let submitBtn = document.getElementById('submitScore');
  let skipBtn = document.getElementById('skipScore');
  let nameInput = document.getElementById('playerNameInput');
  
  // Clone & replace um alte Listener zu entfernen
  let newSubmitBtn = submitBtn.cloneNode(true);
  let newSkipBtn = skipBtn.cloneNode(true);
  let newNameInput = nameInput.cloneNode(true);
  
  submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
  skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);
  nameInput.parentNode.replaceChild(newNameInput, nameInput);
  
  // Submit Score
  newSubmitBtn.addEventListener('click', async () => {
    let name = newNameInput.value.trim();
    if (name) {
      console.log('💾 Saving highscore...');
      await supabase.saveHighscore(name, finalScore, currentLevel, world.collectedCoins, timeSeconds);
      await showHighscores();
      document.getElementById('scoreScreen').classList.add('hidden');
      newNameInput.value = '';
    } else {
      alert('Please enter your name!');
    }
  });
  
  // Skip
  newSkipBtn.addEventListener('click', () => {
    document.getElementById('scoreScreen').classList.add('hidden');
    newNameInput.value = '';
  });
  
  // Enter zum Submit
  newNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      newSubmitBtn.click();
    }
  });
}

// Highscore-Liste Console + UI
async function showHighscores() {
  let top10 = await supabase.getTop10();
  
  console.log('🏆 TOP 10 HIGHSCORES:');
  top10.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.player_name}: ${entry.score} pts (Level ${entry.level})`);
  });
  
  // Zeige auch UI
  await showHighscoresUI();
}

// Highscore-Liste UI anzeigen
async function showHighscoresUI() {
  document.getElementById('highscoreScreen').classList.remove('hidden');
  
  let list = document.getElementById('highscoreList');
  list.innerHTML = '<div class="loading">Loading...</div>';
  
  let top10 = await supabase.getTop10();
  
  if (top10.length === 0) {
    list.innerHTML = '<div class="loading">No scores yet. Be the first!</div>';
    return;
  }
  
  let html = '';
  top10.forEach((entry, index) => {
    let rank = index + 1;
    let rankClass = rank <= 3 ? `rank-${rank}` : '';
    
    html += `
      <div class="highscore-entry ${rankClass}">
        <div class="highscore-rank">${rank}.</div>
        <div class="highscore-name">${entry.player_name}</div>
        <div class="highscore-score">${entry.score.toLocaleString()}</div>
        <div class="highscore-details">
          Level ${entry.level} • ${entry.coins_collected} coins • ${entry.time_seconds}s
        </div>
      </div>
    `;
  });
  
  list.innerHTML = html;
}

// Controls Screen anzeigen
function showControlsUI() {
  document.getElementById('controlsScreen').classList.remove('hidden');
}

// Event Listeners
window.addEventListener("load", () => {
  console.log("🎮 Seite geladen - Start Screen bereit");

  settings = new SettingsManager();
  supabase = new SupabaseClient();

  // Game Buttons
  document.getElementById("startButton").addEventListener("click", startGame);
  document.getElementById("restartButton").addEventListener("click", restartLevel);
  document.getElementById("restartLostButton").addEventListener("click", restartLevel);
  document.getElementById("nextLevelButton").addEventListener("click", nextLevel);
  
  // Highscores
  document.getElementById("showHighscores").addEventListener("click", showHighscoresUI);
  document.getElementById("closeHighscores").addEventListener("click", () => {
    document.getElementById('highscoreScreen').classList.add('hidden');
  });
  
  // Controls
  document.getElementById("showControls").addEventListener("click", showControlsUI);
  document.getElementById("closeControls").addEventListener("click", () => {
    document.getElementById('controlsScreen').classList.add('hidden');
  });
});



function showWinScreen() {
  console.log("🎉 YOU WIN!");

  world.audio.playMusic("winning", 1.0);

  let gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
  
  console.log('⏱️ Time:', gameTime, 'seconds');
  
  // Zeige Score-Screen nach 1.5 Sekunden
  setTimeout(() => {
    showScoreScreen(gameTime);
  }, 1500);

  document.getElementById("winScreen").classList.remove("hidden");
}

function showLostScreen() {
  console.log("💀 YOU LOST!");

  world.audio.playMusic("gameOver", 1.0);

  document.getElementById("lostScreen").classList.remove("hidden");
}


window.showWinScreen = showWinScreen;
window.showLostScreen = showLostScreen;