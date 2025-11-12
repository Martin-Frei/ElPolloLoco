
import { MovableObject } from './movable-object.class.js';

export class BackgroundObjects extends MovableObject{

        width = 720;   // Canvas-Breite
        height = 400;  // Bild Höhe

    constructor(imagePath, x){
        super();
        this.loadImage(imagePath)

        this.x = x;         // dynamisch die Bewegung erstellen
        this.y = this.screenX - this.height;  // um dynamisch die Bewegung erstellen
    }



}