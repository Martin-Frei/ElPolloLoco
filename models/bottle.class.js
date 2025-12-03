import { MovableObject } from './movable-object.class.js';

export class Bottle extends MovableObject {
    
    width = 70;
    height = 80;
    
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
    constructor(x, y) {
        super();
        
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        
        this.x = x;
        this.y = y;
        
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }
}