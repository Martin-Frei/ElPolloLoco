
import { MovableObject } from './movable-object.class.js';

export class Air extends MovableObject{

        width = 2880;   // Canvas-Breite
        height = 400;  // Bild Höhe

    constructor(imagePath, x){
        super();
        this.loadImage(imagePath)

        this.x = 0;     // bleibt immer gleich
        this.y = 0;     // bleint immer gleich
    }



}
