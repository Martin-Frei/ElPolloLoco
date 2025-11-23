import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";

let canvas;
let keyboard = new Keyboard();
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  window.world = world;
  console.log("World erstellt:", world);
}

window.addEventListener("load", init);
