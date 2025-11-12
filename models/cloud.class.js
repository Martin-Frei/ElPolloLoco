import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject{

    constructor(){
        super()
        this.loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 300;
        this.y = 50;
        this.width = 500;
        this.height = 250;
    }


    
}
