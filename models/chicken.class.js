import { MovableObject } from './movable-object.class.js';


export class Chicken extends MovableObject {

    constructor(){
        super()
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')

        
        this.width = 50;                           // Canvas-Breite max 720
        this.height = 60;                          // Canvas-Höhe max 400
        this.x = 350 + Math.random() * 300          // von Links anstellen
        this.y = 375;                               // von Oben anstellen
    }
    

}
