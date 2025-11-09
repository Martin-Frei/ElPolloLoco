import { MovableObject } from './movable-object.class.js';


export class Character extends MovableObject {

    constructor(){
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png')
    }

    jump(){}

}
