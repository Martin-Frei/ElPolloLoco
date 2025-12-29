// levels/level2.js

import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-objects.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

// ========== LEVEL 2 CONFIGURATION - HARDCORE! ==========

const LEVEL2_SPEED = {
  chicken: 0.6,        // +100% schneller als Level 1! (war 0.3)
  chickenSmall: 1.0,   // +100% schneller als Level 1! (war 0.5)
  endboss: 0.8         // +60% schneller als Level 1! (war 0.5)
};

const LEVEL2_TIPS = [
  "⚠️ WARNING: Enemies are TWICE as fast!",
  "Small chickens move at lightning speed!",
  "The endboss is aggressive - stay mobile!",
  "Jump timing is CRITICAL - one mistake costs health",
  "Collect coins FAST before enemies overwhelm you",
  "High coins require PERFECT jumps",
  "Save bottles - you'll need every single one!",
  "This is the REAL challenge - stay focused!",
  "Consider speed vs. collection - you can't get everything"
];

export function createLevel2() {
  let enemies = [
    // MEHR Normal Chickens - dichter platziert!
    new Chicken("normal", LEVEL2_SPEED.chicken, 300),    // ← Früher!
    new Chicken("normal", LEVEL2_SPEED.chicken, 550),    // ← Dichter!
    new Chicken("normal", LEVEL2_SPEED.chicken, 800),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1050),   // ← Dichter!
    new Chicken("normal", LEVEL2_SPEED.chicken, 1300),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1550),   // ← Dichter!
    new Chicken("normal", LEVEL2_SPEED.chicken, 1800),
    new Chicken("normal", LEVEL2_SPEED.chicken, 2050),   // ← Mehr!
    
    // VIEL MEHR Small Chickens - überall!
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 400),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 650),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 900),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1150),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1400),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1650),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1900),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 2150),  // ← Mehr!
  ];

  let clouds = [
    new Cloud(0),
    new Cloud(720),
    new Cloud(1440),
    new Cloud(2160),
  ];

  let backgroundObjects = [
    // Air
    new BackgroundObjects("img/5_background/layers/air.png", -719),
    new BackgroundObjects("img/5_background/layers/air.png", 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 3),

    // 3rd layer
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 3),

    // 2nd layer
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 3),

    // 1st layer
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 3),
  ];

 let bottles = [
  // Am Boden - EINFACH (5x)
  new Bottle(200, 360),
  new Bottle(750, 360),
  new Bottle(1350, 360),
  new Bottle(1900, 360),
  new Bottle(2300, 360),  
  
  // In der Luft - MITTEL-SCHWER (5x)
  new Bottle(450, 180),
  new Bottle(1000, 120),  
  new Bottle(1600, 150),
  new Bottle(2050, 200), 
  new Bottle(2200, 180),
];

  let coins = [
    // MEHR Coins aber HÖHER platziert! (35 total)
    
    // Start: 3 Coins - MITTEL
    new Coin(-400, 180),     // Höher als Level 1!
    new Coin(-350, 160),
    new Coin(-300, 180),
    
    // Screen 1: 9 Coins - SCHWER!
    new Coin(100, 140),      // Hoch
    new Coin(150, 120),      // SEHR HOCH!
    new Coin(200, 140),
    new Coin(400, 80),       // EXTREM HOCH!
    new Coin(450, 60),       // EXTREM HOCH!
    new Coin(500, 80),
    new Coin(650, 100),      // Sehr hoch
    new Coin(700, 80),
    new Coin(750, 100),
    
    // Screen 2: 9 Coins - SCHWER!
    new Coin(900, 160),
    new Coin(950, 140),
    new Coin(1000, 160),
    new Coin(1100, 90),      // Sehr hoch
    new Coin(1150, 70),      // EXTREM HOCH!
    new Coin(1200, 90),
    new Coin(1350, 120),
    new Coin(1400, 100),
    new Coin(1450, 120),
    
    // Screen 3: 9 Coins - MITTEL-SCHWER
    new Coin(1600, 150),
    new Coin(1650, 130),
    new Coin(1700, 150),
    new Coin(1850, 110),
    new Coin(1900, 90),
    new Coin(1950, 110),
    new Coin(2100, 140),
    new Coin(2150, 120),
    new Coin(2200, 140),
    
    // Vor Endboss: 5 BONUS Coins - SEHR HOCH!
    new Coin(2250, 80),      // Extrem hoch!
    new Coin(2280, 60),      // EXTREM HOCH!
    new Coin(2310, 40),      // ULTRA HOCH!
    new Coin(2340, 60),
    new Coin(2370, 80),
  ];

  let endboss = new Endboss(2400, LEVEL2_SPEED.endboss);

  let level = new Level(
    enemies,
    clouds,
    backgroundObjects,
    bottles,
    coins,
    endboss,
    -719,
    2300,
    10
  );
  
  level.tips = LEVEL2_TIPS;
  
  console.log('🔥 Level 2 created - HARDCORE MODE!');
  
  return level;
}