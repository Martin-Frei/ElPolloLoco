import { MovableObject } from "./movable-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObjects } from "./background-objects.class.js";
import { Air } from "./air.class.js"

/**
 * World-Klasse - Zentrale Spielwelt-Verwaltung
 * 
 * @class World
 * @description Verwaltet die gesamte Spielwelt: Character, Enemies, Background, Clouds.
 * Koordiniert Rendering (draw-Loop) und hält Referenzen zu allen Spiel-Objekten.
 * Fungiert als Vermittler zwischen game.js und den einzelnen Klassen.
 * 
 * @property {HTMLCanvasElement} canvas - Das Canvas-Element aus dem DOM
 * @property {CanvasRenderingContext2D} ctx - Der 2D-Rendering-Context
 * @property {Keyboard} keyboard - Referenz zur Keyboard-Instanz (für Character-Steuerung)
 * @property {Character} character - Der spielbare Character (Pepe)
 * @property {Cloud[]} clouds - Array mit allen Wolken (3 Layer, verschiedene Geschwindigkeiten)
 * @property {BackgroundObjects[]} backgroundObjects - Array mit Background-Layern
 * @property {Chicken[]} enemies - Array mit allen Gegnern (Chickens)
 * @property {Air} air - Der Himmel/Luftebene (hinterste Ebene)
 * 
 * @example
 * // In game.js:
 * let keyboard = new Keyboard();
 * let world = new World(canvas, keyboard);
 * 
 * @author Martin
 * @version 1.0.0
 * @since 2025-01-13
 */
export class World {
  
  /**
   * Canvas-Element
   * @type {HTMLCanvasElement}
   * @description Das HTML Canvas-Element auf dem gezeichnet wird
   */
  canvas;
  
  /**
   * Canvas 2D-Rendering-Context
   * @type {CanvasRenderingContext2D}
   * @description Der Context zum Zeichnen auf dem Canvas
   */
  ctx;
  
  /**
   * Keyboard-Instanz
   * @type {Keyboard}
   * @description Referenz zur Keyboard-Klasse für Tastatur-Steuerung.
   * Wird von game.js übergeben und an Character weitergegeben.
   */
  keyboard;
  
  /**
   * Wolken-Array (3 Layer)
   * @type {Cloud[]}
   * @description Enthält 7 Wolken in 3 verschiedenen Layern:
   * - Layer 1 (hinten): Klein, langsam (speed 0.05)
   * - Layer 2 (mitte): Mittel, mittelschnell (speed 0.1)
   * - Layer 3 (vorne): Groß, schnell (speed 0.15-0.2)
   */
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

  /**
   * Background-Objekte (3 Layer á 2 Bilder)
   * @type {BackgroundObjects[]}
   * @description Hintergrund-Layer für Parallax-Effekt.
   * Je 2 Bilder pro Layer für seamless Scrolling.
   */
  backgroundObjects = [
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/2.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 0),
  ];

  /**
   * Gegner-Array (Chickens)
   * @type {Chicken[]}
   * @description Enthält alle Chickens mit zufälligen Geschwindigkeiten (0.15-0.4)
   */
  enemies = [
    new Chicken(0.15 + Math.random() * 0.25),
    new Chicken(0.15 + Math.random() * 0.25),
    new Chicken(0.15 + Math.random() * 0.25)
  ];

  /**
   * Himmel/Luft-Ebene
   * @type {Air}
   * @description Hinterste Ebene (Himmel), füllt gesamten Canvas
   */
  air = new Air("img/5_background/layers/air.png");
  
  /**
   * Spielbarer Character
   * @type {Character}
   * @description Wird im Constructor erstellt und erhält Referenz zu this (world)
   */
  character;

  /**
   * Erstellt eine neue World-Instanz
   * 
   * @constructor
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element aus dem DOM
   * @param {Keyboard} keyboard - Die Keyboard-Instanz für Steuerung
   * @description Initialisiert die Spielwelt:
   * - Setzt Canvas und Context
   * - Speichert Keyboard-Referenz
   * - Erstellt Character
   * - Startet Rendering-Loop (draw)
   * 
   * @example
   * // In game.js:
   * let canvas = document.getElementById('canvas');
   * let keyboard = new Keyboard();
   * let world = new World(canvas, keyboard);
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    
    // Character erstellen und world-Referenz übergeben
    this.character = new Character(this);
    
    // Rendering-Loop starten
    this.draw();
  }

  /**
   * Hauptrender-Schleife
   * 
   * @method draw
   * @description Zeichnet alle Spiel-Objekte auf dem Canvas.
   * Wird kontinuierlich mit requestAnimationFrame aufgerufen (ca. 60 FPS).
   * 
   * Zeichen-Reihenfolge (von hinten nach vorne):
   * 1. Air (Himmel)
   * 2. Background-Objekte (Berge, Bäume)
   * 3. Clouds (Wolken)
   * 4. Enemies (Chickens)
   * 5. Character (Pepe)
   * 
   * @private
   */
  draw() {
    // Canvas leeren (Bereich löschen)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Zeichen-Reihenfolge: Von hinten nach vorne!
    this.addToMap(this.air);
    this.backgroundObjects.forEach((obj) => this.addToMap(obj));
    this.clouds.forEach((obj) => this.addToMap(obj));
    this.enemies.forEach((obj) => this.addToMap(obj));
    this.addToMap(this.character);
    
    // Nächster Frame
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Zeichnet ein MovableObject auf das Canvas
   * 
   * @method addToMap
   * @param {MovableObject} mo - Das zu zeichnende Objekt
   * @description Prüft ob Objekt und Bild existieren und vollständig geladen sind.
   * Zeichnet das Objekt nur wenn alle Bedingungen erfüllt sind.
   * 
   * @example
   * this.addToMap(this.character);
   * this.clouds.forEach(cloud => this.addToMap(cloud));
   */
  addToMap(mo) {
    // Prüfe ob Objekt existiert UND Bild geladen ist
    if (mo && mo.img && mo.img.complete) {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
  }
}