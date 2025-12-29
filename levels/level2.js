// levels/level2.js

import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-objects.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

// ========== LEVEL 2 CONFIGURATION ==========

const LEVEL2_SPEED = {
  chicken: 0.5,        // +66% schneller
  chickenSmall: 0.8,   // +60% schneller
  endboss: 0.7         // +40% schneller
};

const LEVEL2_TIPS = [
  "Level 2 enemies are much faster - stay alert!",
  "Small chickens are now extremely fast!",
  "The endboss moves faster - keep your distance",
  "Perfect your jump timing to avoid damage",
  "Collect coins quickly before enemies catch you",
  "Speed is key - every second counts!",
  "More bottles scattered - you'll need them all!",
  "Practice makes perfect - Level 2 is the real challenge!"
];

export function createLevel2() {
  let enemies = [
    // Mehr Normal Chickens!
    new Chicken("normal", LEVEL2_SPEED.chicken, 400),
    new Chicken("normal", LEVEL2_SPEED.chicken, 700),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1000),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1300),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1600),
    new Chicken("normal", LEVEL2_SPEED.chicken, 1900),
    
    // Mehr Small Chickens!
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 500),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 800),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1100),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1400),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 1700),
    new Chicken("small", LEVEL2_SPEED.chickenSmall, 2000),
  ];

  let clouds = [
    new Cloud(0),
    new Cloud(720),
    new Cloud(1440),
    new Cloud(2160),
  ];

  let BackgroundObjectss = [
    // Gleiche wie Level 1...
    new BackgroundObjects("img/5_background/layers/air.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 3, 0),

    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),

    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),

    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
  ];

  let bottles = [
    // Mehr Bottles!
    new Bottle(100, 360),
    new Bottle(300, 250),
    new Bottle(500, 360),
    new Bottle(700, 150),
    new Bottle(900, 360),
    new Bottle(1100, 220),
    new Bottle(1300, 360),
    new Bottle(1500, 180),
    new Bottle(1700, 360),
    new Bottle(1900, 360),
    new Bottle(2100, 250),
    new Bottle(2300, 360),
  ];

  let coins = [
    // Mehr Coins! (30 total)
    new Coin(-400, 220),
    new Coin(-350, 200),
    new Coin(-300, 220),
    
    new Coin(100, 180),
    new Coin(150, 160),
    new Coin(200, 180),
    new Coin(400, 120),
    new Coin(450, 100),
    new Coin(500, 120),
    
    new Coin(700, 200),
    new Coin(750, 180),
    new Coin(800, 200),
    new Coin(950, 140),
    new Coin(1000, 120),
    new Coin(1050, 140),
    
    new Coin(1200, 190),
    new Coin(1250, 170),
    new Coin(1300, 190),
    new Coin(1450, 110),
    new Coin(1500, 90),
    new Coin(1550, 110),
    
    new Coin(1700, 210),
    new Coin(1750, 190),
    new Coin(1800, 210),
    new Coin(1950, 150),
    new Coin(2000, 130),
    new Coin(2050, 150),
    new Coin(2200, 180),
    new Coin(2250, 160),
    new Coin(2300, 180),
  ];

  let endboss = new Endboss(2400, LEVEL2_SPEED.endboss);

  let levelStart_x = -719;
  let levelEnd_x = 2300;
  let maxBottles = 10;

  let level = new Level(
    enemies,
    clouds,
    BackgroundObjects,
    bottles,
    coins,
    endboss,
    levelStart_x,
    levelEnd_x,
    maxBottles
  );
  
  level.tips = LEVEL2_TIPS;
  
  console.log('📋 Level 2 created with', LEVEL2_TIPS.length, 'tips');
  
  return level;
}