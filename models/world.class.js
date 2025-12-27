import { Character } from "./character.class.js";
import { Air } from "./air.class.js";
import { level1 } from "../levels/level1.js";

export class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  level = level1;

  air = new Air("img/5_background/layers/air.png");
  character;
  
  debugMode = true;  // Debug-Boxen an/aus

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
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addToMap(this.character);
    
    // Debug-Boxen
    if (this.debugMode) {
      this.drawCollisionBoxes();
    }

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }
  
  // Kollisions-Boxen 
  drawCollisionBoxes() {
    // Pepe (Grün)
    this.drawBox(this.character, 'lime');
    
    // Flaschen (Blau)
    this.level.bottles.forEach(bottle => {
      this.drawBox(bottle, 'blue');
    });
    
    // Münzen (Gelb)
    this.level.coins.forEach(coin => {
      this.drawBox(coin, 'yellow');
    });
    
    // Hühner (Rot)
    this.level.enemies.forEach(enemy => {
      this.drawBox(enemy, 'red');
    });
    
    // Endboss (Magenta)
    this.drawBox(this.level.endboss, 'magenta');
  }
  
  // Einzelne Box
  drawBox(obj, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
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