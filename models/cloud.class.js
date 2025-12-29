// models/cloud.class.js

import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    
    constructor(
        x,  // ← Nur x ist required!
        imagePath = "img/5_background/layers/4_clouds/1.png",  // ← Default
        y = 20,           // ← Default
        width = 500,      // ← Default
        height = 250,     // ← Default
        speed = 0.15      // ← Default
    ) {
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
                this.x = 2876 + Math.random() * 200;
            }
        }, 1000 / 60);
    }
}