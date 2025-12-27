// models\chicken.class.js

import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
  isDead = false;

  constructor(type = "small", speed = 0.15, x = null) {
    // ← x hinzugefügt!
    super();

    if (type === "normal") {
      this.setupNormalChicken();
    } else {
      this.setupSmallChicken();
    }

    // X-Position: Entweder übergeben oder zufällig
    this.x = x !== null ? x : 200 + Math.random() * 500; // ← Nutzt x!

    this.speed = speed + Math.random() * 0.5;
    this.animationSpeed = 60 / this.speed;

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);

    this.animate();
  }

  setupSmallChicken() {
    this.width = 50;
    this.height = 60;
    this.y = 375;

    // Hitbox individuell verkleinern
    this.offsetX = 5;
    this.offsetY = 5;
    this.offsetWidth = 5;
    this.offsetHeight = 5;

    this.IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    this.IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  }

  setupNormalChicken() {
    this.width = 80;
    this.height = 80;
    this.y = 350;

    // Hitbox individuell verkleinern
    this.offsetX = 10;
    this.offsetY = 10;
    this.offsetWidth = 10;
    this.offsetHeight = 10;

    this.IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    this.IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) { 
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, this.animationSpeed);
  }

  die() {
    this.isDead = true;
    this.speed = 0;
    this.img = new Image();
    this.img.src = this.IMAGE_DEAD;
  }
}
