import { MovableObject } from './movable-object.class.js';

export class Chicken extends MovableObject {

    height = 60;
    width = 50;
    y = 375;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',    
    ];

    constructor(speed = 0.15) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = speed + Math.random() * 0.5;
        this.animationSpeed = 60 / this.speed;  // Schneller laufen = schnellere Animation
        
        this.animate();
    }

    animate() {
        // Bewegung nach links (60 FPS)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Bild-Animation (abhängig von speed)
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, this.animationSpeed);
    }
}