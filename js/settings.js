// js/settings.js

export class SettingsManager {
    constructor() {
        this.loadSettings();
        this.initEventListeners();
    }
    
    loadSettings() {
        // Lade aus LocalStorage (mit Defaults)
        this.musicVolume = parseInt(localStorage.getItem('musicVolume') || '100');
        this.soundVolume = parseInt(localStorage.getItem('soundVolume') || '30');
        this.muteAll = localStorage.getItem('muteAll') === 'true';
        
        // Setze UI-Werte
        this.updateUI();
        
        console.log('⚙️ Settings geladen:', this.musicVolume, this.soundVolume, this.muteAll);
    }
    
    updateUI() {
        document.getElementById('musicVolume').value = this.musicVolume;
        document.getElementById('musicVolumeValue').textContent = this.musicVolume + '%';
        
        document.getElementById('soundVolume').value = this.soundVolume;
        document.getElementById('soundVolumeValue').textContent = this.soundVolume + '%';
        
        document.getElementById('muteAll').checked = this.muteAll;
    }
    
    saveSettings() {
        // Lese UI-Werte
        this.musicVolume = parseInt(document.getElementById('musicVolume').value);
        this.soundVolume = parseInt(document.getElementById('soundVolume').value);
        this.muteAll = document.getElementById('muteAll').checked;
        
        // Speichere in LocalStorage
        localStorage.setItem('musicVolume', this.musicVolume);
        localStorage.setItem('soundVolume', this.soundVolume);
        localStorage.setItem('muteAll', this.muteAll);
        
        console.log('✅ Settings gespeichert!', this.musicVolume, this.soundVolume, this.muteAll);
    }
    
    initEventListeners() {
        // Open Settings
        document.getElementById('openSettings').addEventListener('click', () => {
            document.getElementById('settingsScreen').classList.remove('hidden');
        });
        
        // Save & Close
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
            document.getElementById('settingsScreen').classList.add('hidden');
            
            // Update AudioManager (wenn World existiert)
            if (window.world && window.world.audio) {
                window.world.audio.updateVolumes(
                    this.musicVolume / 100,
                    this.soundVolume / 100,
                    this.muteAll
                );
            }
        });
        
        // Cancel
        document.getElementById('cancelSettings').addEventListener('click', () => {
            this.loadSettings();  // Reset UI
            document.getElementById('settingsScreen').classList.add('hidden');
        });
        
        // Live Preview - Music Slider
        document.getElementById('musicVolume').addEventListener('input', (e) => {
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });
        
        // Live Preview - Sound Slider
        document.getElementById('soundVolume').addEventListener('input', (e) => {
            document.getElementById('soundVolumeValue').textContent = e.target.value + '%';
        });
    }
    
    // Getter für andere Module
    getSettings() {
        return {
            musicVolume: this.musicVolume / 100,  // 0-1
            soundVolume: this.soundVolume / 100,  // 0-1
            muteAll: this.muteAll
        };
    }
}