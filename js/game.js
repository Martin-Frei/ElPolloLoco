import { World } from '../models/world.class.js';
import { Character } from '../models/character.class.js';
import { Chicken } from '../models/chicken.class.js';







let canvas;


let world;




function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    
    window.world = world;
    console.log("World erstellt:", world);

    

    
}


window.addEventListener('load', init);
  