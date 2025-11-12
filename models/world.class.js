import { MovableObject } from "./movable-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObjects } from "./background-objects.class.js";

export class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  canvas;
  ctx;
  clouds = [new Cloud(), new Cloud(), new Cloud()];
  backgroundObjects = [
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 0),
  ];

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw(); // Startet Animation
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.backgroundObjects.forEach((obj) => this.addToMap(obj));
    this.clouds.forEach((obj) => this.addToMap(obj));
    this.enemies.forEach((obj) => this.addToMap(obj));
    this.addToMap(this.character);
    requestAnimationFrame(() => this.draw());
  }

  addToMap(mo) {
    if (mo && mo.img && mo.img.complete) {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
  }
}
