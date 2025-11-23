/**
 * Keyboard-Klasse zur Erfassung und Verwaltung von Tastatureingaben
 * 
 * @class Keyboard
 * @description Diese Klasse registriert Tastatur-Events (keydown/keyup) und 
 * speichert den Status aller relevanten Tasten als Boolean-Properties.
 * Ermöglicht einfache Abfrage ob eine Taste aktuell gedrückt ist.
 * 
 * @example
 * // Keyboard-Instanz erstellen
 * const keyboard = new Keyboard();
 * 
 * // In Game-Loop prüfen
 * if (keyboard.RIGHT) {
 *     character.moveRight();
 * }
 * 
 * @author Martin
 * @version 1.0.0
 * @since 2025-01-13
 */
export class Keyboard {
    
    /**
     * Status der Links-Taste (Pfeil-Links oder A)
     * @type {boolean}
     * @default false
     */
    LEFT = false;
    
    /**
     * Status der Rechts-Taste (Pfeil-Rechts oder D)
     * @type {boolean}
     * @default false
     */
    RIGHT = false;
    
    /**
     * Status der Oben-Taste (Pfeil-Hoch oder W)
     * Wird für Springen verwendet
     * @type {boolean}
     * @default false
     */
    UP = false;
    
    /**
     * Status der Leertaste
     * Wird für Springen oder Werfen verwendet
     * @type {boolean}
     * @default false
     */
    SPACE = false;
    
    /**
     * Status der Unten-Taste (Pfeil-Runter oder S)
     * Optional für Ducken oder Schnell-Fall beim Springen
     * @type {boolean}
     * @default false
     */
    // DOWN = false;
    
    /**
     * Erstellt eine neue Keyboard-Instanz und registriert Event-Listener
     * @constructor
     */
    constructor() {
        this.bindKeyEvents();
    }
    
    /**
     * Registriert Event-Listener für Tastatur-Events (keydown und keyup)
     * 
     * @private
     * @method bindKeyEvents
     * @description Hört auf keydown (Taste gedrückt) und keyup (Taste losgelassen)
     * und aktualisiert die entsprechenden Boolean-Properties.
     * Unterstützt sowohl Pfeiltasten als auch WASD-Steuerung.
     * 
     * @fires window#keydown - Wenn eine Taste gedrückt wird
     * @fires window#keyup - Wenn eine Taste losgelassen wird
     */
    bindKeyEvents() {
        
        /**
         * Event-Handler für keydown (Taste gedrückt)
         * @param {KeyboardEvent} event - Das Keyboard-Event-Objekt
         */
        window.addEventListener('keydown', (event) => {
            
            // RECHTS (Pfeil-Rechts ODER D)
            if (event.key === 'ArrowRight') this.RIGHT = true;
            if (event.key === 'd' || event.key === 'D') this.RIGHT = true;
            
            // LINKS (Pfeil-Links ODER A)
            if (event.key === 'ArrowLeft') this.LEFT = true;
            if (event.key === 'a' || event.key === 'A') this.LEFT = true;
            
            // OBEN (Pfeil-Hoch ODER W) - für Springen
            if (event.key === 'ArrowUp') this.UP = true;
            if (event.key === 'w' || event.key === 'W') this.UP = true;
            
            // UNTEN (Pfeil-Runter ODER S)
            // if (event.key === 'ArrowDown') this.DOWN = true;
            // if (event.key === 's' || event.key === 'S') this.DOWN = true;
            
            // LEERTASTE (Springen oder Werfen)
            if (event.key === ' ') this.SPACE = true;
        });
        
        /**
         * Event-Handler für keyup (Taste losgelassen)
         * @param {KeyboardEvent} event - Das Keyboard-Event-Objekt
         */
        window.addEventListener('keyup', (event) => {
            
            // RECHTS
            if (event.key === 'ArrowRight') this.RIGHT = false;
            if (event.key === 'd' || event.key === 'D') this.RIGHT = false;
            
            // LINKS
            if (event.key === 'ArrowLeft') this.LEFT = false;
            if (event.key === 'a' || event.key === 'A') this.LEFT = false;
            
            // OBEN
            if (event.key === 'ArrowUp') this.UP = false;
            if (event.key === 'w' || event.key === 'W') this.UP = false;
            
            // UNTEN
            // if (event.key === 'ArrowDown') this.DOWN = false;
            // if (event.key === 's' || event.key === 'S') this.DOWN = false;
            
            // LEERTASTE
            if (event.key === ' ') this.SPACE = false;
        });
    }
}