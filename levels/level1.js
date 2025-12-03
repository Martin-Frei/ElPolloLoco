import { Level } from '../models/level.class.js';
import { Chicken } from '../models/chicken.class.js';
import { Cloud } from '../models/cloud.class.js';
import { BackgroundObjects } from '../models/background-objects.class.js';
import { Endboss } from '../models/endboss.class.js';



export const level1 = new Level(
        [
    // Screen 1 
    new Chicken('small', 0.15, 250),
    new Chicken('normal', 0.20, 400),
    new Chicken('small', 0.18, 550),
    new Chicken('normal', 0.22, 680),
    
    // Screen 2 
    new Chicken('normal', 0.15, 850),
    new Chicken('small', 0.25, 1000),
    new Chicken('small', 0.20, 1150),
    new Chicken('normal', 0.18, 1300),
    
    // Screen 3 
    new Chicken('small', 0.22, 1550),
    new Chicken('normal', 0.15, 1700),
    new Chicken('normal', 0.20, 1850),
    new Chicken('small', 0.18, 2000),
  ],
   [
      new Cloud('img/5_background/layers/4_clouds/1.png', -600, 50, 300, 150, 0.05),
      new Cloud('img/5_background/layers/4_clouds/2.png', -300, 80, 280, 140, 0.08),
      
      new Cloud('img/5_background/layers/4_clouds/1.png', 100, 20, 300, 150, 0.05),
      new Cloud('img/5_background/layers/4_clouds/2.png', 400, 60, 350, 180, 0.07),
      new Cloud('img/5_background/layers/4_clouds/1.png', 600, 100, 280, 140, 0.1),
      
      new Cloud('img/5_background/layers/4_clouds/2.png', 850, 40, 320, 160, 0.06),
      new Cloud('img/5_background/layers/4_clouds/1.png', 1100, 90, 400, 200, 0.09),
      new Cloud('img/5_background/layers/4_clouds/2.png', 1350, 30, 300, 150, 0.05),
      
      new Cloud('img/5_background/layers/4_clouds/1.png', 1600, 70, 350, 180, 0.08),
      new Cloud('img/5_background/layers/4_clouds/2.png', 1850, 110, 380, 190, 0.12),
      new Cloud('img/5_background/layers/4_clouds/1.png', 2100, 50, 300, 150, 0.07),
      
      new Cloud('img/5_background/layers/4_clouds/2.png', 2300, 60, 320, 160, 0.06),
      new Cloud('img/5_background/layers/4_clouds/1.png', 2550, 100, 400, 200, 0.1),
      new Cloud('img/5_background/layers/4_clouds/2.png', 2750, 40, 350, 180, 0.08),
  
      new Cloud('img/5_background/layers/4_clouds/2.png', 2800, 60, 320, 160, 0.06),
      new Cloud('img/5_background/layers/4_clouds/1.png', 3050, 100, 400, 200, 0.1),
      new Cloud('img/5_background/layers/4_clouds/2.png', 3250, 40, 350, 180, 0.08),
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
      
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719*2),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719*2),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719*2),
      
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719*3),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719*3),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719*3),
  
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719*4),
      new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719*4),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719*4),
  ],
    new Endboss()
);