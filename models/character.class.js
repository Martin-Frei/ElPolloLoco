import { MovableObject } from "./movable-object.class.js";

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
  speedY = 0;
  acceleration = 1.0;
  otherDirection = false;

  constructor(world) {
    super();
    this.world = world;

     // DEBUG
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
    
    this.animate();
    this.applyGravity();
  }

  animate() {
    
    // BEWEGUNGS-LOOP (60 FPS)
    setInterval(() => {
      
      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        this.otherDirection = false;
      }
      
      if (this.world.keyboard.LEFT) {
        this.moveLeft();
        this.otherDirection = true;
      }
      
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      
      if (this.x < this.world.levelStart_x) {
        this.x = this.world.levelStart_x;
      }
      
      if (this.x > this.world.levelEnd_x) {
        this.x = this.world.levelEnd_x;
      }
      
    }, 1000 / 60);
    
    
    // ANIMATIONS-LOOP
    setInterval(() => {
      
      if (this.isAboveGround()) {
        
        let jumpImage;
        
        if (this.speedY > 5) {
          jumpImage = this.IMAGES_JUMP[1];
        } 
        else if (this.speedY > 0) {
          jumpImage = this.IMAGES_JUMP[2];
        }
        else if (this.speedY > -5) {
          jumpImage = this.IMAGES_JUMP[2];
        }
        else if (this.speedY >= -15) {
          jumpImage = this.IMAGES_JUMP[3];
        }
        else {
          jumpImage = this.IMAGES_JUMP[4];
        }
        
        this.img = this.imageCache[jumpImage];
      }
      
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } 
      else {
        this.img = this.imageCache[this.IMAGES_WALKING[0]];
      }
      
    }, 150);
  }

  jump() {
    this.speedY = 22;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    return this.y < 140;
  }
}