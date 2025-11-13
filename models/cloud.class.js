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
            this.x -= this.speed;
            
            // Respawn rechts wenn links raus
            if(this.x < -this.width) {
                this.x = 720 + Math.random() * 200;  // Startet etwas rechts außerhalb
            }
        }, 1000 / 60);
    }
}