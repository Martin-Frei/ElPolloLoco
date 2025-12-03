import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    
    constructor(imagePath, x, y, width, height, speed) {
        super();
        this.loadImage(imagePath);
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.moveLeft();
            
            // Respawn rechts wenn links raus
            if (this.x < -this.width) {
                this.x = 2876 + Math.random() * 200;  // ← Level-Ende bei 2160 + 0-200px
            }
        }, 1000 / 60);
    }
}