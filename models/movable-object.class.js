// models/movable-object.class.js

export class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 5;
  speedY = 0;
  acceleration = 1.0;

  // Hitbox-Offsets
  offsetX = 0;
  offsetY = 0;
  offsetWidth = 0;
  offsetHeight = 0;

  gravityInterval = null;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth > obj.x + obj.offsetX &&
      this.x + this.offsetX < obj.x + obj.width - obj.offsetWidth &&
      this.y + this.offsetY + this.height - this.offsetHeight > obj.y + obj.offsetY &&
      this.y + this.offsetY < obj.y + obj.height - obj.offsetHeight
    );
  }

  applyGravity() {
    this.gravityInterval = setInterval(() => {
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