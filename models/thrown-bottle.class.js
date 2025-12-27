// models/thrown-bottle.class.js

import { MovableObject } from "./movable-object.class.js";

export class ThrownBottle extends MovableObject {
  speedY = 20;
  speedX = 10;
  throwInterval = null;
  rotationInterval = null;
  readyToRemove = false;
  hasSplashed = false;

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, otherDirection) {
    super();

    this.x = x + 50;
    this.y = y + 100;
    this.width = 60;
    this.height = 60;

    this.offsetX = 10;
    this.offsetY = 10;
    this.offsetWidth = 10;
    this.offsetHeight = 10;

    this.loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);

    if (otherDirection) {
      this.speedX = -10;
    }

    this.throw();
  }

  throw() {
    this.throwInterval = setInterval(() => {
      if (!this.isAboveGround() && !this.hasSplashed) {
        clearInterval(this.throwInterval);
        this.splash();
      } else if (!this.hasSplashed) {
        this.x += this.speedX;
      }
    }, 1000 / 60);

    this.animateRotation();
    this.applyGravity();
  }

  animateRotation() {
    this.rotationInterval = setInterval(() => {
      if (this.isAboveGround() && !this.hasSplashed) {
        this.playAnimation(this.IMAGES_ROTATION);
      } else {
        clearInterval(this.rotationInterval);
      }
    }, 100);
  }

  splash() {
    if (this.hasSplashed) return;

    this.hasSplashed = true;
    console.log('💥 Flasche zerschellt bei y:', this.y);

    if (this.throwInterval) {
         console.log('🛑 Stoppe X-Bewegung');
      clearInterval(this.throwInterval);
    }

    if (this.rotationInterval) {
         console.log('🛑 Stoppe Gravity'); 
      clearInterval(this.rotationInterval);
    }

    if (this.gravityInterval) {  // gravity stoppen
      clearInterval(this.gravityInterval);
    }else {
        console.log('❌ Kein gravityInterval gefunden!');
    }

    this.speedY = 0;

    this.currentImage = 0;

    let splashInterval = setInterval(() => {
      if (this.currentImage < this.IMAGES_SPLASH.length) {
        this.img = this.imageCache[this.IMAGES_SPLASH[this.currentImage]];
        this.currentImage++;
      } else {
        clearInterval(splashInterval);
        this.img = new Image();
        this.readyToRemove = true;
      }
    }, 50);
  }

  hitsTarget(target, onHit) {
    if (!this.hasSplashed && this.isColliding(target)) {
      onHit();
      this.splash();
      return true;
    }
    return false;
  }

  isAboveGround() {
    return this.y < 360;
  }
}
