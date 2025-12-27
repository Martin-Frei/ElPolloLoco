// models\movable-object.class.js


/**
 * Basis-Klasse für alle beweglichen Objekte im Spiel
 * 
 * @class MovableObject
 * @description Diese Klasse stellt grundlegende Eigenschaften und Methoden
 * für alle Objekte bereit, die sich bewegen oder animiert werden können.
 * Wird von Character, Chicken, Cloud etc. erweitert (extends).
 * 
 * @property {number} x - Horizontale Position auf dem Canvas
 * @property {number} y - Vertikale Position auf dem Canvas
 * @property {Image} img - Aktuell anzuzeigendes Bild      
 * @property {number} height - Höhe des Objekts in Pixeln
 * @property {number} width - Breite des Objekts in Pixeln
 * @property {Object} imageCache - Speicher für vorgeladene Bilder (key: Pfad, value: Image)
 * @property {number} currentImage - Index des aktuellen Animations-Frames
 * @property {number} speed - Bewegungsgeschwindigkeit in Pixeln pro Frame
 * 
 * @author Martin
 * @version 1.1.0
 * @since 2025-01-13
 */


export class MovableObject {
  
    x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 5;
  
  // NEU: Hitbox-Offsets
  offsetX = 0;
  offsetY = 0;
  offsetWidth = 0;
  offsetHeight = 0;


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

 
  loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // NEU: ANIMATIONS-METHODE
  // ═══════════════════════════════════════════════════════════════
  
  /**
   * Spielt eine Animation ab (wechselt durch Bilder-Array)
   * 
   * @method playAnimation
   * @param {string[]} images - Array mit Bild-Pfaden zur Animation
   * @description 
   * Durchläuft ein Bilder-Array in einer endlosen Loop und wechselt
   * automatisch zum nächsten Bild bei jedem Aufruf.
   * 
   * Funktionsweise:
   * 1. Berechnet aktuellen Frame-Index mit Modulo-Operation
   * 2. Holt entsprechenden Bild-Pfad aus dem Array
   * 3. Setzt Bild aus dem imageCache als aktuelles Bild
   * 4. Erhöht currentImage-Index für nächsten Aufruf
   * 
   * Modulo-Operator (%) sorgt für automatische Loop:
   * - 0 % 6 = 0 (erstes Bild)
   * - 1 % 6 = 1 (zweites Bild)
   * - 2 % 6 = 2 (drittes Bild)
   * - ...
   * - 5 % 6 = 5 (letztes Bild)
   * - 6 % 6 = 0 (springt zurück zum ersten Bild!)
   * - 7 % 6 = 1 (zweites Bild)
   * - usw. (endlose Loop)
   * 
   * Beispiel mit 3 Bildern:
   * images = ['bild1.png', 'bild2.png', 'bild3.png']
   * 
   * Aufruf 1: currentImage=0 → i=0%3=0 → bild1 → currentImage=1
   * Aufruf 2: currentImage=1 → i=1%3=1 → bild2 → currentImage=2
   * Aufruf 3: currentImage=2 → i=2%3=2 → bild3 → currentImage=3
   * Aufruf 4: currentImage=3 → i=3%3=0 → bild1 (Loop!) → currentImage=4
   * Aufruf 5: currentImage=4 → i=4%3=1 → bild2 → currentImage=5
   * ...
   * 
   * @example
   * // In Character-Klasse:
   * 
   * // Walking-Animation (6 Bilder)
   * this.playAnimation(this.IMAGES_WALKING);
   * 
   * // Jump-Animation (4 Bilder)
   * this.playAnimation(this.IMAGES_JUMP);
   * 
   * @example
   * // Typische Verwendung in setInterval:
   * setInterval(() => {
   *     if (this.isMoving) {
   *         this.playAnimation(this.IMAGES_WALKING);
   *     }
   * }, 100);  // Ruft playAnimation alle 100ms auf → 10 FPS
   */
  playAnimation(images) {
    /**
     * Schritt 1: Berechne aktuellen Frame-Index
     * 
     * Modulo (%) teilt currentImage durch Anzahl der Bilder
     * und gibt den Rest zurück.
     * 
     * Beispiel mit 4 Bildern (images.length = 4):
     * currentImage = 0 → 0 % 4 = 0
     * currentImage = 1 → 1 % 4 = 1
     * currentImage = 2 → 2 % 4 = 2
     * currentImage = 3 → 3 % 4 = 3
     * currentImage = 4 → 4 % 4 = 0 ← Springt zurück!
     * currentImage = 5 → 5 % 4 = 1
     * currentImage = 6 → 6 % 4 = 2
     * 
     * So entsteht eine endlose Loop durch das Array!
     */
    let i = this.currentImage % images.length;
    
    /**
     * Schritt 2: Hole Bild-Pfad aus Array
     * 
     * images[0] = 'img/.../bild1.png'
     * images[1] = 'img/.../bild2.png'
     * images[2] = 'img/.../bild3.png'
     * 
     * i = 0 → path = images[0]
     * i = 1 → path = images[1]
     * i = 2 → path = images[2]
     */
    let path = images[i];
    
    /**
     * Schritt 3: Setze Bild aus Cache
     * 
     * imageCache wurde in loadImages() gefüllt:
     * imageCache['img/.../bild1.png'] = <Image-Objekt>
     * imageCache['img/.../bild2.png'] = <Image-Objekt>
     * 
     * Wir holen das vorgeladene Bild aus dem Cache
     * und setzen es als aktuelles Bild (this.img).
     * 
     * Das ist VIEL schneller als Bild neu zu laden!
     * Cache-Zugriff: ~0.1ms
     * Neu laden: ~100-500ms
     */
    this.img = this.imageCache[path];
    
    /**
     * Schritt 4: Erhöhe Index für nächsten Aufruf
     * 
     * currentImage wird kontinuierlich hochgezählt:
     * 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → ...
     * 
     * Modulo sorgt dafür dass i immer im gültigen Bereich bleibt:
     * i = currentImage % images.length
     * 
     * So läuft die Animation endlos weiter!
     */
    this.currentImage++;
  }

  /**
   * Bewegt das Objekt nach rechts
   * 
   * @method moveRight
   * @description Erhöht die X-Position um den Wert von this.speed.
   * Wird typischerweise in einem Interval aufgerufen (60 FPS).
   * 
   * @example
   * // In animate():
   * if (keyboard.RIGHT) {
   *     this.moveRight();  // x += speed
   * }
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Bewegt das Objekt nach links
   * 
   * @method moveLeft
   * @description Verringert die X-Position um den Wert von this.speed.
   * Wird typischerweise in einem Interval aufgerufen (60 FPS).
   * 
   * @example
   * // In animate():
   * if (keyboard.LEFT) {
   *     this.moveLeft();  // x -= speed
   * }
   */
  moveLeft() {
    this.x -= this.speed;
  }

   /**
   * Prüft ob dieses Objekt mit einem anderen kollidiert (AABB)
   */
isColliding(obj) {
  return this.x + this.offsetX + this.width - this.offsetWidth > obj.x + obj.offsetX &&
         this.x + this.offsetX < obj.x + obj.width - obj.offsetWidth &&  // ← obj.width hinzugefügt!
         this.y + this.offsetY + this.height - this.offsetHeight > obj.y + obj.offsetY &&
         this.y + this.offsetY < obj.y + obj.height - obj.offsetHeight;  // ← obj.height hinzugefügt!
}

}