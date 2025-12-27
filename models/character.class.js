// models\character.class.js

import { MovableObject } from "./movable-object.class.js";
import { ThrownBottle } from "./thrown-bottle.class.js"; 

export class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];

  world;
  speed = 3;
  otherDirection = false;
  isJumping = false;

  health = 100;
  lastHit = 0;
  lastThrow = 0;

  constructor(world) {
    super();
    this.world = world;

    // DEBUG (später löschen)
    console.log("world:", this.world);
    console.log("world.level:", this.world.level);
    console.log("levelStart_x:", this.world.level?.levelStart_x);
    console.log("levelEnd_x:", this.world.level?.levelEnd_x);

    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);

    this.width = 200;
    this.height = 300;
    this.x = 0;
    this.y = 140;

    // Hitbox individuell verkleinern
    this.offsetX = 30;
    this.offsetY = 115;
    this.offsetWidth = 80 ;
    this.offsetHeight = 115;

    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {

      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        if (this.isAboveGround()) {
          this.x += 2;
        }
        this.otherDirection = false;
      }


      if (this.world.keyboard.LEFT) {
        this.moveLeft();
        if (this.isAboveGround()) {
          this.x -= 1;
        }
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }


      if (this.world.keyboard.SPACE && this.isJumping && this.speedY > 0) {
        this.speedY += 0.4;
        if (this.speedY > 35) {
          this.speedY = 35;
        }
      }

      if (!this.world.keyboard.SPACE) {
        this.isJumping = false;
      }

      if (this.world.keyboard.D) {
        this.throwBottle();
      }

      // Grenzen
      if (this.x < this.world.level.levelStart_x) {
        this.x = this.world.level.levelStart_x;
      }

      if (this.x > this.world.level.levelEnd_x) {
        this.x = this.world.level.levelEnd_x;
      }
    }, 1000 / 60);

    // ANIMATIONS-LOOP
    setInterval(() => {
      if (this.isAboveGround()) {
        let jumpImage;

        if (this.speedY > 5) {
          jumpImage = this.IMAGES_JUMP[1];
        } else if (this.speedY > 0) {
          jumpImage = this.IMAGES_JUMP[2];
        } else if (this.speedY > -5) {
          jumpImage = this.IMAGES_JUMP[2];
        } else if (this.speedY >= -15) {
          jumpImage = this.IMAGES_JUMP[3];
        } else {
          jumpImage = this.IMAGES_JUMP[4];
        }

        this.img = this.imageCache[jumpImage];
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
      }
    }, 150);
  }

  jump() {
    this.speedY = 18;
    this.isJumping = true;
  }

  isAboveGround() {
    return this.y < 140;
  }

   hit() {
    let now = Date.now();
    
    // Cooldown: Nur alle 1 Sekunde Schaden nehmen
    if (now - this.lastHit > 1000) {
      this.health -= 10;
      this.lastHit = now;
      console.log('💔 Pepe verliert 10 Leben! Noch', this.health, 'übrig');
      
      if (this.health <= 0) {
        this.health = 0;
        console.log('💀 GAME OVER!');
      }
    }
  }

  throwBottle() {
    let now = Date.now();
    
    if (now - this.lastThrow > 500) { //Cooldown alle 0,5 sec einen wurf
      console.log('🍾 Flasche geworfen!');
      
      let bottle = new ThrownBottle(
        this.x,              // Pepe's X-Position
        this.y,              // Pepe's Y-Position
        this.otherDirection  // Blickrichtung (true=links, false=rechts)
      );
      
      this.world.thrownBottles.push(bottle);
      this.lastThrow = now;
    }
}
}
