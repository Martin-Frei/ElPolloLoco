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

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  speed = 3;
  otherDirection = false;
  isJumping = false;

  health = 100;
  lastHit = 0;
  lastThrow = 0;
  bottleInventory = 0;
  lastMovement = 0;

  constructor(world) {
    super();
    this.world = world;

    console.log("world:", this.world);
    console.log("world.level:", this.world.level);
    console.log("levelStart_x:", this.world.level?.levelStart_x);
    console.log("levelEnd_x:", this.world.level?.levelEnd_x);

    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);    
    this.loadImages(this.IMAGES_DEAD); 
    this.loadImages(this.IMAGES_IDLE); 
    this.loadImages(this.IMAGES_LONG_IDLE);

    this.width = 200;
    this.height = 300;
    this.x = 0;
    this.y = 140;

    this.offsetX = 30;
    this.offsetY = 115;
    this.offsetWidth = 80;
    this.offsetHeight = 115;

    this.lastMovement = Date.now();

    
    console.log("✅ ImageCache Keys:", Object.keys(this.imageCache).length, "Bilder");
    console.log("📋 IMAGES_IDLE definiert?", this.IMAGES_IDLE !== undefined);
    console.log("📋 IMAGES_LONG_IDLE definiert?", this.IMAGES_LONG_IDLE !== undefined);

    
    this.applyGravity();
    this.animate();
}

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        if (this.isAboveGround()) {
          this.x += 2;
        }
        this.otherDirection = false;
        this.lastMovement = Date.now();
      }

      if (this.world.keyboard.LEFT) {
        this.moveLeft();
        if (this.isAboveGround()) {
          this.x -= 1;
        }
        this.otherDirection = true;
        this.lastMovement = Date.now(); 
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastMovement = Date.now();
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
        this.lastMovement = Date.now();
      }

      // Grenzen
      if (this.x < this.world.level.levelStart_x) {
        this.x = this.world.level.levelStart_x;
      }

      if (this.x > this.world.level.levelEnd_x) {
        this.x = this.world.level.levelEnd_x;
      }
    }, 1000 / 60);


    // ANIMATIONS-LOOP (150ms)
setInterval(() => {
    if (this.isDead()) {
        this.playDeadAnimation();
    }
    else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
    }
    else if (this.isAboveGround()) {
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

        if (this.imageCache[jumpImage]) {
            this.img = this.imageCache[jumpImage];
        }
    } 
    else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
    } 
    else if (this.isLongIdle()) {        
        if (!this.IMAGES_LONG_IDLE) {
            console.error('❌ IMAGES_LONG_IDLE ist undefined!');
            return;
        }
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
    else {       
        if (!this.IMAGES_IDLE) {
            console.error('❌ IMAGES_IDLE ist undefined!');
            return;
        }
        this.playAnimation(this.IMAGES_IDLE);
    }
}, 150);
  }

  isLongIdle() {
    let timeSinceMovement = Date.now() - this.lastMovement;
    return timeSinceMovement > 5000; 
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

    
    if (now - this.lastHit > 1000) {
      this.health -= 10;
      this.lastHit = now;
      console.log("💔 Pepe verliert 10 Leben! Noch", this.health, "übrig");

      if (this.health <= 0) {
        this.health = 0;
        console.log("💀 GAME OVER!");
      }
    }
  }

  

  throwBottle() {
    let now = Date.now();

    if (this.bottleInventory <= 0) {
      console.log("❌ Keine Flaschen mehr!");
      return;
    }

    if (now - this.lastThrow > 500) {
      console.log("🍾 Flasche geworfen!");

      let bottle = new ThrownBottle(this.x, this.y, this.otherDirection);

      bottle.world = this.world;
      this.world.thrownBottles.push(bottle);

      this.bottleInventory--; 
      this.lastThrow = now;
    }
  }

  isDead() {
    return this.health <= 0;
  }

  isHurt() {
    let timePassed = Date.now() - this.lastHit;
    return timePassed < 1000;
  }

  isLongIdle() {
    let timeSinceMovement = Date.now() - this.lastMovement;
    return timeSinceMovement > 5000;
  }

  playDeadAnimation() {
    if (this.currentImage < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
      this.currentImage++;
    }
  }
}
