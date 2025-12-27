// models\coin.class.js

import { MovableObject } from "./movable-object.class.js";

export class Coin extends MovableObject {
  width = 50;
  height = 50;

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(x, y) {
    super();

    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);

    this.x = x;
    this.y = y;

    // Hitbox individuell verkleinern
    this.offsetX = 20;
    this.offsetY = 20;
    this.offsetWidth = 35;
    this.offsetHeight = 35;

    this.animate();
  }

  animate() {
    // Animation zwischen 2 Münz-Bildern
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 300); 
  }
}
