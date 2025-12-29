// models/endboss.class.js

import { MovableObject } from './movable-object.class.js'; 




export class Endboss extends MovableObject {
    
    width = 250;
    height = 400;
    y = 55;
    health = 100;
    
    hasBeenAlerted = false; 
    
    offsetX = 30;
    offsetY = 80;
    offsetWidth = 30;
    offsetHeight = 30;

    walkInterval = null;
    alertInterval = null; 
    
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    
    constructor() {
        super();
        
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        
        this.x = 2500;
        this.speed = 0.15;
        
        this.animate();
    }
    
    animate() {
        this.walkInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        this.alertInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation();
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.isAttacking()) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            else if (this.isAlert()) {
                this.playAlertOnce();
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200); 
    }
    
    // nah genug für Alert ??
    isAlert() {
        let distance = this.getDistanceToCharacter();
        return distance < 500 && !this.hasBeenAlerted;
    }
    
    // Attack-Range
    isAttacking() {
        let distance = this.getDistanceToCharacter();
        return distance < 300;
    }
    
    // Berechnet Abstand zu Pepe
    getDistanceToCharacter() {
        if (!this.world || !this.world.character) return 999999;
        return Math.abs(this.x - this.world.character.x);
    }
    
    // Spielt Alert
    playAlertOnce() {
        this.hasBeenAlerted = true;
        
        let alertFrame = 0;
        let alertInterval = setInterval(() => {
            if (alertFrame < this.IMAGES_ALERT.length) {
                this.img = this.imageCache[this.IMAGES_ALERT[alertFrame]];
                alertFrame++;
            } else {
                clearInterval(alertInterval);
            }
        }, 200);
    }
    
    isDead() {
        return this.health <= 0;
    }
    
    isHurt() {
        return this.health < 100 && this.health > 0;
    }
    
    playDeadAnimation() {
        if (this.currentImage < 10) {
            let i = this.currentImage % 2;
            this.img = this.imageCache[this.IMAGES_HURT[i + 1]];
        }
        else if (this.currentImage < 20) {
            this.img = this.imageCache[this.IMAGES_DEAD[0]];
        }
        else {
            let i = ((this.currentImage - 20) % 2);
            this.img = this.imageCache[this.IMAGES_DEAD[i + 1]];
        }
        this.currentImage++;
    }
    
    hit() {
        this.health -= 10;
        console.log('💥 Endboss getroffen! Noch', this.health, 'Leben');
        
        if (this.health <= 0) {
            this.health = 0;
            console.log('🎉 ENDBOSS BESIEGT!');
        }
    }

     stop() {
        if (this.walkInterval) {
            clearInterval(this.walkInterval);
        }
        if (this.alertInterval) {
            clearInterval(this.alertInterval);
        }
        console.log('🛑 Endboss gestoppt');
    }

    
}

