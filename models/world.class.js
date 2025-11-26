import { MovableObject } from "./movable-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObjects } from "./background-objects.class.js";
import { Air } from "./air.class.js"
import { Endboss } from "./endboss.class.js";

export class World {
  
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  
  clouds = [
    new Cloud('img/5_background/layers/4_clouds/1.png', 100, 20, 300, 150, 0.05),
    new Cloud('img/5_background/layers/4_clouds/2.png', 400, 30, 280, 140, 0.052),
    new Cloud('img/5_background/layers/4_clouds/1.png', 700, 25, 320, 160, 0.051),
    new Cloud('img/5_background/layers/4_clouds/2.png', 200, 80, 400, 200, 0.1),
    new Cloud('img/5_background/layers/4_clouds/1.png', 600, 90, 420, 210, 0.13),
    new Cloud('img/5_background/layers/4_clouds/1.png', 50, 120, 500, 250, 0.15),
    new Cloud('img/5_background/layers/4_clouds/2.png', 500, 130, 520, 260, 0.2),
  ];

  backgroundObjects = [
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 719*2),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 719*2),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 719*2),
  ];

  enemies = [
    // Screen 1 (0-720px)
    new Chicken('small', 0.15, 250),
    new Chicken('normal', 0.20, 400),
    new Chicken('small', 0.18, 550),
    new Chicken('normal', 0.22, 680),
    
    // Screen 2 (720-1440px)
    new Chicken('normal', 0.15, 850),
    new Chicken('small', 0.25, 1000),
    new Chicken('small', 0.20, 1150),
    new Chicken('normal', 0.18, 1300),
    
    // Screen 3 (1440-2160px)
    new Chicken('small', 0.22, 1550),
    new Chicken('normal', 0.15, 1700),
    new Chicken('normal', 0.20, 1850),
    new Chicken('small', 0.18, 2000),
  ];

  endboss = new Endboss(); 

  air = new Air("img/5_background/layers/air.png");
  character;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.camera_x = -this.character.x + 100;

    if (this.camera_x > 0) {
        this.camera_x = 0;
    }
    
    this.ctx.translate(this.camera_x, 0);
    
    this.addToMap(this.air);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    
    this.ctx.translate(-this.camera_x, 0);
    
    requestAnimationFrame(() => this.draw());
  }

  addObjectsToMap(objects) {
    objects.forEach(obj => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}