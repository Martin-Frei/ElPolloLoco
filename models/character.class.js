import { MovableObject } from './movable-object.class.js';


export class Character extends MovableObject {

    constructor(){
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png')

        this.width = 200;   // Canvas-Breite max 720
        this.height = 300;  // Canvas-Höhe max 400
        this.x = 0;         // von Links anstellen
        this.y = 140;       // von Oben anstellen
    }

    jump(){}

}
