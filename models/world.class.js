import { MovableObject } from "./movable-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObjects } from "./background-objects.class.js";
import { Air } from "./air.class.js"

export class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  canvas;
  ctx;
  
  // ═══════════════════════════════════════════════
  // WOLKEN - 3 LAYER mit verschiedenen Geschwindigkeiten
  // ═══════════════════════════════════════════════
  // new Cloud(imagePath, x, y, width, height, speed)
  //        ↓             ↓  ↓     ↓      ↓       ↓
  //      Bild          100  20    300     150    0.1

  // imagePath = Welches Wolken-Bild
  // x = Startposition horizontal
  // y = Höhe (klein = oben/hinten, groß = unten/vorne)
  // width = Breite (klein = weit weg, groß = nah)
  // height = Höhe
  // speed = Geschwindigkeit (klein = langsam, groß = schnell)

  clouds = [
    // LAYER 1 - HINTEN (klein, langsam, weit weg)
    new Cloud('img/5_background/layers/4_clouds/1.png', 100, 20, 300, 150, 0.05),
    new Cloud('img/5_background/layers/4_clouds/2.png', 400, 30, 280, 140, 0.052),
    new Cloud('img/5_background/layers/4_clouds/1.png', 700, 25, 320, 160, 0.051),
    
    // LAYER 2 - MITTE (mittelgroß, mittelschnell)
    new Cloud('img/5_background/layers/4_clouds/2.png', 200, 80, 400, 200, 0.1),
    new Cloud('img/5_background/layers/4_clouds/1.png', 600, 90, 420, 210, 0.13),
    
    // LAYER 3 - VORNE (groß, schnell, nah)
    new Cloud('img/5_background/layers/4_clouds/1.png', 50, 120, 500, 250, 0.15),
    new Cloud('img/5_background/layers/4_clouds/2.png', 500, 130, 520, 260, 0.2),
  ];

  backgroundObjects = [
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 0),
  ];

  air = new Air("img/5_background/layers/air.png");

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw(); // Startet Animation
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.addToMap(this.air);
    this.backgroundObjects.forEach((obj) => this.addToMap(obj));
    this.clouds.forEach((obj) => this.addToMap(obj));
    this.enemies.forEach((obj) => this.addToMap(obj));
    this.addToMap(this.character);
    
    requestAnimationFrame(() => this.draw());
  }

  addToMap(mo) {
    if (mo && mo.img && mo.img.complete) {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
  }
}