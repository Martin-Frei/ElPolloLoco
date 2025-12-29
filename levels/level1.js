// levels/level1.js

import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-objects.class.js";
import { Coin } from "../models/coin.class.js";
import { Bottle } from "../models/bottle.class.js";

// ========== LEVEL 1 CONFIGURATION ==========

const LEVEL1_SPEED = {
  chicken: 0.3,        // Normal Chickens
  chickenSmall: 0.5,   // Small Chickens
  endboss: 0.5         // Endboss
};

const LEVEL1_TIPS = [
  "Small chickens are faster than normal ones!",
  "Watch out for the small chickens - they're quick!",
  "The endboss appears at x=2000, prepare 10 bottles",
  "Jump on chickens to defeat them instantly",
  "Collect all 22 coins for maximum score",
  "Time under 180 seconds gives you a 1.5x multiplier bonus!",
  "Save at least 10 bottles for the endboss fight"
];

export function createLevel1() {
  let enemies = [
    // Normal Chickens
    new Chicken("normal", LEVEL1_SPEED.chicken, 500),
    new Chicken("normal", LEVEL1_SPEED.chicken, 800),
    new Chicken("normal", LEVEL1_SPEED.chicken, 1200),
    new Chicken("normal", LEVEL1_SPEED.chicken, 1600),
    
    // Small Chickens (schneller!)
    new Chicken("small", LEVEL1_SPEED.chickenSmall, 600),
    new Chicken("small", LEVEL1_SPEED.chickenSmall, 1000),
    new Chicken("small", LEVEL1_SPEED.chickenSmall, 1400),
    new Chicken("small", LEVEL1_SPEED.chickenSmall, 1800),
  ];

  let clouds = [
    new Cloud(0),
    new Cloud(720),
    new Cloud(1440),
    new Cloud(2160),
  ];

  let backgroundObjects = [
    // Layer 1: Air
    new BackgroundObjects("img/5_background/layers/air.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/air.png", 719 * 3, 0),

    // Layer 2: 3rd layer
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 3, 0),

    // Layer 3: 2nd layer
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719 * 3, 0),

    // Layer 4: 1st layer
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719 * 2, 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 3, 0),
  ];

  let bottles = [
    new Bottle(-53, 150),
    new Bottle(-53, 100),
    new Bottle(200, 360),
    new Bottle(450, 250),
    new Bottle(650, 360),
    new Bottle(850, 360),
    new Bottle(1050, 120),
    new Bottle(1250, 360),
    new Bottle(1400, 220),
    new Bottle(1550, 360),
    new Bottle(1750, 360),
    new Bottle(1950, 360),
    new Bottle(2150, 360),
  ];

  let coins = [
    // Screen 0: 3 Coins
    new Coin(-85, 220),
    new Coin(-80, 220),
    new Coin(-90, 220),

    // Screen 1: 6 Coins
    new Coin(150, 220),
    new Coin(200, 200),
    new Coin(250, 220),
    new Coin(500, 150),
    new Coin(550, 130),
    new Coin(600, 150),

    // Screen 2: 7 Coins
    new Coin(800, 200),
    new Coin(850, 180),
    new Coin(900, 200),
    new Coin(1080, 100),
    new Coin(1120, 80),
    new Coin(1160, 100),
    new Coin(1350, 180),

    // Screen 3: 6 Coins
    new Coin(1500, 220),
    new Coin(1550, 200),
    new Coin(1600, 220),
    new Coin(1850, 160),
    new Coin(1900, 140),
    new Coin(1950, 160),
  ];

  let endboss = new Endboss(2400, LEVEL1_SPEED.endboss);

  let levelStart_x = -100;
  let levelEnd_x = 2300;
  let maxBottles = 10;

  let level = new Level(
    enemies,
    clouds,
    backgroundObjects,
    bottles,
    coins,
    endboss,
    levelStart_x,
    levelEnd_x,
    maxBottles
  );
  
  level.tips = LEVEL1_TIPS;
  
  console.log('📋 Level 1 created with', LEVEL1_TIPS.length, 'tips');
  
  return level;
}