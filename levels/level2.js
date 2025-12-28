// levels/level2.js

import { Level } from "../models/level.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Cloud } from "../models/cloud.class.js";
import { BackgroundObjects } from "../models/background-objects.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Bottle } from "../models/bottle.class.js";
import { Coin } from "../models/coin.class.js";

// TEMPORÄR: Level 2 = Level 1 mit 5 Flaschen Limit
export function createLevel2() {
  return new Level(
  [
    // Screen 1
    new Chicken("small", 0.15, 250),
    new Chicken("normal", 0.2, 400),
    new Chicken("small", 0.18, 550),
    new Chicken("normal", 0.22, 680),

    // Screen 2
    new Chicken("normal", 0.15, 850),
    new Chicken("small", 0.25, 1000),
    new Chicken("small", 0.2, 1150),
    new Chicken("normal", 0.18, 1300),

    // Screen 3
    new Chicken("small", 0.22, 1550),
    new Chicken("normal", 0.15, 1700),
    new Chicken("normal", 0.2, 1850),
    new Chicken("small", 0.18, 2000),
  ],
  [
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      -600,
      50,
      300,
      150,
      0.05
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      -300,
      80,
      280,
      140,
      0.08
    ),

    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      100,
      20,
      300,
      150,
      0.05
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      400,
      60,
      350,
      180,
      0.07
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      600,
      100,
      280,
      140,
      0.1
    ),

    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      850,
      40,
      320,
      160,
      0.06
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      1100,
      90,
      400,
      200,
      0.09
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      1350,
      30,
      300,
      150,
      0.05
    ),

    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      1600,
      70,
      350,
      180,
      0.08
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      1850,
      110,
      380,
      190,
      0.12
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      2100,
      50,
      300,
      150,
      0.07
    ),

    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      2300,
      60,
      320,
      160,
      0.06
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      2550,
      100,
      400,
      200,
      0.1
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      2750,
      40,
      350,
      180,
      0.08
    ),

    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      2800,
      60,
      320,
      160,
      0.06
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/1.png",
      3050,
      100,
      400,
      200,
      0.1
    ),
    new Cloud(
      "img/5_background/layers/4_clouds/2.png",
      3250,
      40,
      350,
      180,
      0.08
    ),
  ],
  [
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObjects(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 2
    ),
    new BackgroundObjects(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 2
    ),
    new BackgroundObjects(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 2
    ),

    new BackgroundObjects(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 3
    ),
    new BackgroundObjects(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 3
    ),
    new BackgroundObjects(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 3
    ),

    new BackgroundObjects(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 4
    ),
    new BackgroundObjects(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 4
    ),
    new BackgroundObjects(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 4
    ),
  ],
  new Endboss(),
  [
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
  ],

  [
    // ═══ COINS ═══

    // ═══ SCREEN 0 (-500 bis 0): 3 Coins ═══
    new Coin(-350, 250),
    new Coin(-300, 230),
    new Coin(-250, 250),

    // ═══ SCREEN 1 (0 bis 720): 6 Coins ═══
    new Coin(150, 220),
    new Coin(200, 200),
    new Coin(250, 220),

    new Coin(500, 150),
    new Coin(550, 130),
    new Coin(600, 150),

    // ═══ SCREEN 2 (720 bis 1440): 7 Coins ═══
    new Coin(800, 200),
    new Coin(850, 180),
    new Coin(900, 200),

    new Coin(1080, 100),
    new Coin(1120, 80),
    new Coin(1160, 100),

    new Coin(1350, 180),

    // ═══ SCREEN 3 (1440 bis 2300): 6 Coins ═══
    new Coin(1500, 220),
    new Coin(1550, 200),
    new Coin(1600, 220),

    new Coin(1850, 160),
    new Coin(1900, 140),
    new Coin(1950, 160),

    // ═══ BOSS-ZONE (2300+): KEINE Coins ═══
  ],

  13  // maxBottles = 13 (unbegrenzt für Level 1)

);
}

export const level2 = createLevel2()