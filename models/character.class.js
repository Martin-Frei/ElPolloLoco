import { MovableObject } from "./movable-object.class.js";

/**
 * Character-Klasse für den spielbaren Charakter (Pepe)
 *
 * @class Character
 * @extends MovableObject
 * @description Repräsentiert den spielbaren Hauptcharakter Pepe.
 * Verwaltet Bewegung (links/rechts), Animation, Springen und Interaktionen.
 * Reagiert auf Tastatur-Eingaben über die Keyboard-Klasse.
 *
 * @property {string[]} IMAGES_WALKING - Array mit Pfaden zu Lauf-Animations-Bildern
 * @property {string[]} IMAGES_JUMP - Array mit Pfaden zu Sprung-Animations-Bildern
 * @property {World} world - Referenz zur World-Instanz (für Keyboard-Zugriff)
 * @property {number} speed - Horizontale Laufgeschwindigkeit (5 Pixel pro Frame)
 * @property {number} speedY - Vertikale Geschwindigkeit für Sprung und Fall
 * @property {number} acceleration - Gravitations-Beschleunigung (2.5 Pixel pro Frame²)
 *
 * @example
 * // In world.class.js:
 * this.character = new Character(this);
 *
 * @author Martin
 * @version 1.2.0
 * @since 2025-01-13
 */
export class Character extends MovableObject {
  // ═══════════════════════════════════════════════════════════════
  // ANIMATIONS-BILDER
  // ═══════════════════════════════════════════════════════════════

  /**
   * Bild-Pfade für die Lauf-Animation
   * @type {string[]}
   * @description Array mit 6 Bildern die nacheinander abgespielt werden.
   * Erzeugt eine flüssige Lauf-Animation.
   */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Bild-Pfade für die Sprung-Animation (phasenbasiert)
   * @type {string[]}
   * @description
   * 5 Bilder für verschiedene Sprung-Phasen:
   * - Index 0 (J-33): Hocke - Vorbereitung (aktuell nicht genutzt)
   * - Index 1 (J-34): Absprung - Arme nach oben! (speedY > 20)
   * - Index 2 (J-35): Steigt/Peak (speedY > 0)
   * - Index 3 (J-36): Beginnt zu fallen (speedY -15 bis 0)
   * - Index 4 (J-37): Fällt schnell - Hut festhalten! (speedY < -15)
   */
  IMAGES_JUMP = [
    "img/2_character_pepe/3_jump/J-33.png", // Index 0 (Reserve)
    "img/2_character_pepe/3_jump/J-34.png", // Index 1 - Absprung!
    "img/2_character_pepe/3_jump/J-35.png", // Index 2 - Steigt/Peak
    "img/2_character_pepe/3_jump/J-36.png", // Index 3 - Beginnt fallen
    "img/2_character_pepe/3_jump/J-37.png", // Index 4 - Fällt schnell
  ];

  // ═══════════════════════════════════════════════════════════════
  // PROPERTIES
  // ═══════════════════════════════════════════════════════════════

  /**
   * Referenz zur World-Instanz
   * @type {World}
   * @description Ermöglicht Zugriff auf world.keyboard für Tastatur-Steuerung.
   * Wird im Constructor gesetzt.
   */
  world;

  /**
   * Horizontale Laufgeschwindigkeit
   * @type {number}
   * @default 5
   * @description 5 Pixel pro Frame bei 60 FPS = ca. 300 Pixel pro Sekunde.
   * Steuert wie schnell Pepe nach links/rechts läuft.
   */
  speed = 1.8;

  /**
   * Vertikale Geschwindigkeit (für Springen und Fallen)
   * @type {number}
   * @default 0
   * @description
   * Steuert die Bewegung in Y-Richtung (vertikal):
   * - Positiv (z.B. 30): Bewegung nach oben (springt)
   * - 0: Keine vertikale Bewegung (am Boden oder am Peak)
   * - Negativ (z.B. -20): Bewegung nach unten (fällt)
   *
   * Wird durch jump() auf 30 gesetzt (initialer Schub nach oben).
   * Wird durch applyGravity() kontinuierlich um acceleration verringert.
   *
   * Beispiel eines Sprungs:
   * - Frame 1: speedY = 30 (schnell nach oben)
   * - Frame 2: speedY = 27.5 (langsamer nach oben)
   * - Frame 3: speedY = 25 (noch langsamer)
   * - ...
   * - Frame 12: speedY = 0 (Peak - höchster Punkt)
   * - Frame 13: speedY = -2.5 (beginnt zu fallen)
   * - Frame 14: speedY = -5 (fällt schneller)
   * - ...
   * - Frame 24: speedY = -30 (fällt sehr schnell)
   * - Landung: y >= 140 (Boden erreicht)
   */
  speedY = 0;

  /**
   * Gravitations-Beschleunigung (Erdanziehung)
   * @type {number}
   * @default 2.5
   * @description
   * Konstante die jedes Frame von speedY abgezogen wird.
   * Simuliert die Erdanziehung - je länger Pepe in der Luft ist,
   * desto schneller fällt er nach unten.
   *
   * Wirkung:
   * - Kleinerer Wert (z.B. 1.0): Sanfte Gravitation (wie auf dem Mond)
   * - Größerer Wert (z.B. 5.0): Starke Gravitation (schwerer Fall)
   * - 2.5: Ausgewogener Wert für flüssiges Gameplay
   *
   * Physik-Analogie:
   * In der Realität: a = 9.81 m/s² (Erdbeschleunigung)
   * Im Spiel: a = 2.5 Pixel/Frame² (angepasst für Spielgefühl)
   */
  acceleration = 1.0;

  otherDirection = false;

  // ═══════════════════════════════════════════════════════════════
  // CONSTRUCTOR
  // ═══════════════════════════════════════════════════════════════

  /**
   * Erstellt einen neuen Character (Pepe)
   *
   * @constructor
   * @param {World} world - Referenz zur World-Instanz (enthält keyboard, canvas, etc.)
   * @description
   * Initialisiert den Character mit:
   * - Position und Größe
   * - Lädt alle Animations-Bilder vor
   * - Startet Bewegungs- und Animations-Loops
   * - Startet Gravitations-System
   *
   * Reihenfolge ist wichtig:
   * 1. super() - Ruft MovableObject Constructor auf
   * 2. world speichern - Für Keyboard-Zugriff
   * 3. Bilder laden - Für Animationen
   * 4. Position & Größe setzen - Für Rendering
   * 5. animate() - Startet Bewegung
   * 6. applyGravity() - Startet Physik
   */
  constructor(world) {
    super();

    this.world = world;

    // Lade erstes Bild (Startbild)
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");

    // Lade alle Animations-Bilder in den imageCache
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);

    // Größe und Position
    this.width = 200;
    this.height = 300;
    this.x = 0;
    this.y = 140;

    // Loops starten
    this.animate();
    this.applyGravity();
  }

  // ═══════════════════════════════════════════════════════════════
  // ANIMATIONS & BEWEGUNGS-LOOPS
  // ═══════════════════════════════════════════════════════════════

  /**
   * Startet die Animations- und Bewegungs-Loops
   *
   * @method animate
   * @description
   * Startet zwei separate setInterval-Loops für Bewegung und Animation:
   *
   * **Loop 1 - Bewegung (60 FPS):**
   * - Prüft Tastatur-Eingaben kontinuierlich
   * - Bewegt Character horizontal (LEFT/RIGHT)
   * - Löst Sprung aus (SPACE)
   * - Beachtet Canvas-Grenzen
   *
   * **Loop 2 - Animation (60 FPS):**
   * - Wählt Animation basierend auf Character-Zustand
   * - Sprung-Animation ist phasenbasiert (abhängig von speedY)
   * - Walking-Animation ist zeitbasiert (playAnimation Loop)
   *
   * **Prioritäten der Animation:**
   * 1. Sprung (wenn in der Luft) - phasenbasiert
   * 2. Walking (wenn Taste gedrückt) - zeitbasiert
   * 3. Idle (wenn nichts passiert) - später
   */
  animate() {
    // ═══════════════════════════════════════════════════════════
    // BEWEGUNGS-LOOP (60 FPS)
    // ═══════════════════════════════════════════════════════════
    /**
     * Bewegungs-Interval
     * @private
     * @description
     * Läuft 60x pro Sekunde (alle ~16.67ms) und prüft kontinuierlich
     * Tastatur-Eingaben. Bewegt den Character und achtet auf Grenzen.
     *
     * **Ablauf jedes Frames:**
     * 1. Prüfe RIGHT-Taste → moveRight() (x += speed)
     * 2. Prüfe LEFT-Taste → moveLeft() (x -= speed)
     * 3. Prüfe SPACE-Taste → jump() (nur am Boden!)
     * 4. Prüfe Canvas-Grenzen → Korrigiere Position
     *
     * **Horizontal-Bewegung (Air Control):**
     * LEFT/RIGHT funktioniert sowohl am Boden als auch in der Luft.
     * Das nennt sich "Air Control" und ist Standard in Jump & Run Games.
     * Ermöglicht präzise Steuerung während des Sprungs!
     */
    setInterval(() => {
      // RIGHT-Bewegung (Pfeil-Rechts oder D-Taste)
      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        this.otherDirection = false;
      }

      // LEFT-Bewegung (Pfeil-Links oder A-Taste)
      if (this.world.keyboard.LEFT) {
        this.moveLeft();
        this.otherDirection = true;
      }

      // SPRUNG (Leertaste oder Pfeil-Hoch)
      // Nur wenn am Boden (!isAboveGround())
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      // LINKE CANVAS-GRENZE
      if (this.x < 0) {
        this.x = 0;
      }

      // RECHTE CANVAS-GRENZE
      if (this.x > 720 - this.width) {
        this.x = 720 - this.width;
      }
    }, 1000 / 60);

    // ═══════════════════════════════════════════════════════════
    // ANIMATIONS-LOOP (60 FPS für flüssige Sprung-Animation)
    // ═══════════════════════════════════════════════════════════
    /**
     * Animations-Interval
     * @private
     * @description
     * Läuft 60x pro Sekunde und wählt Animation basierend auf Character-Zustand.
     *
     * **Besonderheit: Phasenbasierte Sprung-Animation!**
     *
     * Statt zeitbasiert (alle 200ms nächstes Bild) ist die Sprung-Animation
     * an die tatsächliche Sprung-Phase gebunden (speedY-Wert).
     *
     * **Vorteile phasenbasierte Animation:**
     * - Bild passt PERFEKT zur Sprung-Phase
     * - Absprung-Bild (Arme oben) zeigt sich länger
     * - Peak-Bild genau am höchsten Punkt
     * - Fall-Bild (Hut festhalten) bei schnellem Fallen
     * - Unabhängig von FPS und Timing
     * - Professioneller Look!
     *
     * **Sprung-Phasen und zugehörige Bilder:**
     *
     * Phase 1 - Starker Absprung (speedY > 20):
     * - J-34: Pepe springt ab, Arme nach oben!
     *
     * Phase 2 - Steigt hoch (speedY 10-20):
     * - J-35: Pepe steigt, Arme noch oben
     *
     * Phase 3 - Steigt langsamer (speedY 0-10):
     * - J-35: Gleich Peak, Arme noch oben
     *
     * Phase 4 - Peak / Beginnt zu fallen (speedY -15 bis 0):
     * - J-36: Höchster Punkt erreicht, beginnt zu fallen, Hut löst sich
     *
     * Phase 5 - Fällt schnell (speedY < -15):
     * - J-37: Fällt schnell nach unten, hält Hut fest!
     *
     * **Prioritäten (von hoch nach niedrig):**
     * 1. Sprung (in der Luft) - HÖCHSTE Priorität
     * 2. Walking (Taste gedrückt) - normale Priorität
     * 3. Idle (nichts passiert) - später implementiert
     */
    setInterval(() => {
      // ─────────────────────────────────────────────────────────
      // PRIORITÄT 1: SPRUNG-ANIMATION (phasenbasiert!)
      // ─────────────────────────────────────────────────────────
      /**
       * Sprung-Animation wird NUR angezeigt wenn Character in der Luft ist.
       *
       * Bedingung: isAboveGround() = true
       * → y < 140 (Character ist nicht am Boden)
       *
       * **Phasenbasierte Bild-Auswahl:**
       * Statt einfach durch Array zu loopen, wählen wir das Bild
       * basierend auf der aktuellen Sprung-Phase (speedY-Wert).
       *
       * **speedY Bedeutung:**
       * - speedY > 0: Bewegung nach oben (springt)
       * - speedY = 0: Peak (höchster Punkt)
       * - speedY < 0: Bewegung nach unten (fällt)
       */
      if (this.isAboveGround()) {
        /**
         * Wähle Sprung-Bild basierend auf speedY (Sprung-Phase)
         *
         * Array-Indices:
         * IMAGES_JUMP[0] = J-33 (Hocke, aktuell nicht genutzt)
         * IMAGES_JUMP[1] = J-34 (Absprung, Arme oben!)
         * IMAGES_JUMP[2] = J-35 (Steigt/Peak)
         * IMAGES_JUMP[3] = J-36 (Beginnt zu fallen, Hut löst sich)
         * IMAGES_JUMP[4] = J-37 (Fällt schnell, hält Hut fest)
         *
         * Die Schwellenwerte (20, 10, 0, -15) wurden durch Testen
         * ermittelt und passen optimal zur Sprung-Physik!
         */
        let jumpImage;

        /**
         * Phase 1: Starker Absprung (speedY > 20)
         *
         * Zeigt J-34: Pepe springt ab, Arme nach oben!
         *
         * Wann: Direkt nach jump() wenn speedY = 30
         * Dauer: Ca. 4-5 Frames (speedY: 30 → 27.5 → 25 → 22.5 → 20)
         *
         * Warum > 20?
         * - Bei jump() wird speedY = 30 gesetzt
         * - Gravitation zieht 2.5 pro Frame ab
         * - speedY > 20 bedeutet: Gerade frisch abgesprungen!
         * - Wichtigstes Bild: Zeigt klare Sprung-Aktion mit Armen!
         */
        if (this.speedY > 5) {
          jumpImage = this.IMAGES_JUMP[1]; // J-34
        } else if (this.speedY > 0          ) {

        /**
         * Phase 2: Steigt hoch (speedY 10-20)
         *
         * Zeigt J-35: Pepe steigt schnell, Arme oben
         *
         * Wann: Nach Absprung, steigt noch schnell
         * Dauer: Ca. 4 Frames (speedY: 20 → 17.5 → 15 → 12.5 → 10)
         */
          jumpImage = this.IMAGES_JUMP[2]; // J-35
        } else if (this.speedY > -5  ) {

        /**
         * Phase 3: Steigt langsamer / Fast am Peak (speedY 0-10)
         *
         * Zeigt J-35: Gleicher Frame wie Phase 2
         *
         * Wann: Kurz vor Peak, Aufwärts-Momentum wird schwächer
         * Dauer: Ca. 4 Frames (speedY: 10 → 7.5 → 5 → 2.5 → 0)
         */
          jumpImage = this.IMAGES_JUMP[2]; // J-35
        } else if (this.speedY >= -15) {

        /**
         * Phase 4: Peak / Beginnt zu fallen (speedY -15 bis 0)
         *
         * Zeigt J-36: Pepe am höchsten Punkt, Hut löst sich leicht
         *
         * Wann: Am Peak und erste Fall-Phase
         * Dauer: Ca. 6 Frames (speedY: 0 → -2.5 → -5 → -7.5 → -10 → -12.5 → -15)
         *
         * Warum -15 bis 0?
         * - speedY = 0: Peak (höchster Punkt)
         * - speedY < 0: Beginnt zu fallen
         * - Bis speedY = -15: Noch langsames Fallen
         * - Zeigt Übergang von Steigen zu Fallen
         */
          jumpImage = this.IMAGES_JUMP[3]; // J-36
        } else {

        /**
         * Phase 5: Fällt schnell (speedY < -15)
         *
         * Zeigt J-37: Pepe fällt schnell, hält Hut fest!
         *
         * Wann: Schnelle Fall-Phase
         * Dauer: Ca. 6-7 Frames bis Landung (speedY: -15 → -17.5 → -20 → ... → -30)
         *
         * Warum < -15?
         * - speedY < -15: Fällt jetzt richtig schnell!
         * - Gravitation hat voll eingesetzt
         * - Kurz vor Landung
         *
         * Warum J-37 passt perfekt:
         * - Zeigt Pepe wie er Hut festhält (Wind beim Fallen!)
         * - Dynamische Pose
         * - Vermittelt Geschwindigkeit
         */
          jumpImage = this.IMAGES_JUMP[4]; // J-37
        }

        // Setze ausgewähltes Bild
        this.img = this.imageCache[jumpImage];

        // Optional: Debug-Ausgabe (auskommentiert)
        // console.log("speedY:", this.speedY.toFixed(1), "Bild:", jumpImage);
      }

      // ─────────────────────────────────────────────────────────
      // PRIORITÄT 2: LAUF-ANIMATION (zeitbasiert)
      // ─────────────────────────────────────────────────────────
      /**
       * Walking-Animation
       *
       * Bedingungen:
       * - ELSE IF: Nur wenn NICHT in der Luft (Sprung hat Vorrang!)
       * - keyboard.RIGHT ODER keyboard.LEFT muss gedrückt sein
       *
       * playAnimation(IMAGES_WALKING):
       * - Durchläuft IMAGES_WALKING Array automatisch
       * - W-21 → W-22 → W-23 → W-24 → W-25 → W-26 → W-21 (Loop)
       */
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        // Zeige erstes Walking-Bild wenn am Boden steht
        this.img = this.imageCache[this.IMAGES_WALKING[0]]; // W-21 (steht)
      }

      // ─────────────────────────────────────────────────────────
      // PRIORITÄT 3: IDLE-ANIMATION (später implementiert)
      // ─────────────────────────────────────────────────────────
      /**
       * Idle-Animation (Pepe steht rum und langweilt sich)
       *
       * TODO: Implementieren wenn IMAGES_IDLE Array vorhanden
       */
      // else {
      //   this.playAnimation(this.IMAGES_IDLE);
      // }
    }, 150); // 60 FPS für flüssigen Übergang
  }

  // ═══════════════════════════════════════════════════════════════
  // SPRUNG-SYSTEM
  // ═══════════════════════════════════════════════════════════════

  /**
   * Lässt den Character springen
   *
   * @method jump
   * @description
   * Gibt dem Character einen initialen Schub nach oben.
   * Der Rest (Flugbahn, Peak, Fallen, Landen) wird automatisch
   * durch applyGravity() abgewickelt.
   *
   * Physik-Prinzip:
   * 1. Setze speedY auf positiven Wert (30)
   * 2. applyGravity() bewegt Character nach oben (y -= speedY)
   * 3. applyGravity() verringert speedY (speedY -= acceleration)
   * 4. speedY wird 0 (Peak erreicht)
   * 5. speedY wird negativ (fällt nach unten)
   * 6. Bis y >= 140 (landet am Boden)
   */
  jump() {
    this.speedY = 22;
  }

  /**
   * Wendet kontinuierlich Gravitation auf den Character an
   *
   * @method applyGravity
   * @description
   * Simuliert Erdanziehung durch kontinuierliche Anpassung von:
   * 1. Y-Position (bewegt Character vertikal)
   * 2. speedY (verringert vertikale Geschwindigkeit)
   *
   * Läuft 60x pro Sekunde (alle ~16.67ms).
   *
   * Ablauf jedes Frames:
   * 1. Ist Character in der Luft ODER hat Aufwärts-Momentum?
   * 2. JA → Bewege Character: y -= speedY
   * 3. JA → Ziehe Gravitation ab: speedY -= acceleration
   * 4. NEIN → Nichts tun (Character steht am Boden)
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  /**
   * Prüft ob der Character über dem Boden ist (in der Luft)
   *
   * @method isAboveGround
   * @returns {boolean} true wenn in der Luft, false wenn am Boden
   * @description
   * Vergleicht die aktuelle Y-Position mit der Boden-Position (140).
   *
   * Rückgabewerte:
   * - true: Character ist über dem Boden (springt oder fällt)
   * - false: Character steht am Boden
   *
   * Verwendung:
   * - Jump-Animation: Nur in Luft zeigen
   * - Sprung-Erlaubnis: Nur am Boden springen
   * - Gravitation: Nur in Luft wirken lassen
   */
  isAboveGround() {
    return this.y < 140;
  }
}
