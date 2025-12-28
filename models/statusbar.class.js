// models/statusbar.class.js

import { MovableObject } from './movable-object.class.js';

export class Statusbar extends MovableObject {
    
    type;
    currentValue = 0;
    maxValue = 100;
    IMAGES = [];
    
    constructor(x, y, type) {
        super();
        
        this.x = x;
        this.y = y;
        this.type = type;
        
        this.width = 150;
        this.height = 40;
        
        this.loadImagesForType(type);
        this.setPercentage(100);
    }
    
    loadImagesForType(type) {
        let basePath = 'img/7_statusbars/';
        
        // GEÄNDERT: Unterschiedliche Pfade für jeden Typ!
        switch(type) {
            case 'health':
                basePath += '1_statusbar/2_statusbar_health/blue/';
                this.maxValue = 100;
                break;
                
            case 'bottles':
                basePath += '1_statusbar/3_statusbar_bottle/blue/';
                this.maxValue = 5;
                break;
                
            case 'coins':
                basePath += '1_statusbar/1_statusbar_coin/blue/';
                this.maxValue = 22;
                break;
                
            case 'endboss':
                basePath += '2_statusbar_endboss/blue/';
                this.maxValue = 100;
                // ACHTUNG: Endboss hat andere Dateinamen!
                this.IMAGES = [
                    basePath + 'blue0.png',
                    basePath + 'blue20.png',
                    basePath + 'blue40.png',
                    basePath + 'blue60.png',
                    basePath + 'blue80.png',
                    basePath + 'blue100.png',
                ];
                this.loadImages(this.IMAGES);
                this.loadImage(this.IMAGES[5]);
                return;  // ← Früher Return wegen anderem Format!
        }
        
        // Für health, bottles, coins (normale Struktur)
        this.IMAGES = [
            basePath + '0.png',
            basePath + '20.png',
            basePath + '40.png',
            basePath + '60.png',
            basePath + '80.png',
            basePath + '100.png',
        ];
        
        this.loadImages(this.IMAGES);
        this.loadImage(this.IMAGES[5]);
    }
    
    setPercentage(percent) {
        percent = Math.max(0, Math.min(100, percent));
        
        let index = Math.floor(percent / 20);
        
        if (percent === 100) {
            index = 5;
        }
        
        this.img = this.imageCache[this.IMAGES[index]];
    }
    
    setValue(current, max = null) {
        this.currentValue = current;
        if (max !== null) {
            this.maxValue = max;
        }
        
        let percent = (current / this.maxValue) * 100;
        this.setPercentage(percent);
    }
    
    getText() {
        switch(this.type) {
            case 'health':
                return `${Math.round(this.currentValue)}`;
                
            case 'bottles':
                return `${this.currentValue}/${this.maxValue}`;
                
            case 'coins':
                return `${this.currentValue}/${this.maxValue}`;
                
            case 'endboss':
                return `Boss: ${Math.round(this.currentValue)}`;
        }
    }
}