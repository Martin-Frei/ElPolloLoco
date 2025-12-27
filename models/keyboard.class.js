// models\keyboard.class.js

export class Keyboard {
    
    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    D = false;  // ← NEU für Flaschen werfen
    
    constructor() {
        this.bindKeyEvents();
    }
    
    bindKeyEvents() {
        
        window.addEventListener('keydown', (event) => {
            
            // RECHTS (Pfeil-Rechts ODER D)
            if (event.key === 'ArrowRight') this.RIGHT = true;
            
            // LINKS (Pfeil-Links ODER A)
            if (event.key === 'ArrowLeft') this.LEFT = true;
            if (event.key === 'a' || event.key === 'A') this.LEFT = true;
            
            // OBEN (Pfeil-Hoch ODER W)
            if (event.key === 'ArrowUp') this.UP = true;
            if (event.key === 'w' || event.key === 'W') this.UP = true;
            
            // LEERTASTE
            if (event.key === ' ') this.SPACE = true;
            
            // D-TASTE (Flasche werfen)
            if (event.key === 'd' || event.key === 'D') this.D = true;
        });
        
        window.addEventListener('keyup', (event) => {
            
            // RECHTS
            if (event.key === 'ArrowRight') this.RIGHT = false;
            
            // LINKS
            if (event.key === 'ArrowLeft') this.LEFT = false;
            if (event.key === 'a' || event.key === 'A') this.LEFT = false;
            
            // OBEN
            if (event.key === 'ArrowUp') this.UP = false;
            if (event.key === 'w' || event.key === 'W') this.UP = false;
            
            // LEERTASTE
            if (event.key === ' ') this.SPACE = false;
            
            // D-TASTE
            if (event.key === 'd' || event.key === 'D') this.D = false;
        });
    }
}            