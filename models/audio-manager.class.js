// models/audio-manager.class.js

export class AudioManager {
  sounds = {
    jump: new Audio("audio/jump-1.mp3"),
    throw: new Audio("audio/throw.mp3"),
    bottleBreak: new Audio("audio/bottle-break.mp3"),
    collectBottle: new Audio("audio/collect-bottle.mp3"),
    collectCoin: new Audio("audio/collect-coin-2.mp3"),
    hit: new Audio("audio/hit.mp3"),
    chickenHit: new Audio("audio/chicken.mp3"),
    chickenSmallHit: new Audio("audio/chickenSmall.mp3"),
    chickenAlarm: new Audio("audio/chicken-alarm.mp3"),
    running: new Audio("audio/running.mp3"),
    snoring: new Audio("audio/snoring.mp3"),
  };

  music = {
    background: new Audio(
      "audio/2021-10-11_-_Country_Fireside_-_www.FesliyanStudios.com.mp3"
    ),
    endboss: new Audio("audio/endboss-music.mp3"),
    gameOver: new Audio("audio/game-over.mp3"),
    winning: new Audio("audio/winning.mp3"),
  };

  currentMusic = null; // Aktuell spielende Musik
  muted = false;
  soundVolume = 0.3; // 30% für Sound Effects
  musicVolume = 1.0; // 100% für Musik

  constructor() {
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.soundVolume;
    });

    Object.values(this.music).forEach((music) => {
      music.volume = this.musicVolume;
      music.loop = false;
    });

    this.music.background.loop = true;
    this.music.endboss.loop = true;
  }

  // Sound Effect abspielen
  play(soundName) {
    if (this.muted) return;

    let sound = this.sounds[soundName];

    if (!sound) {
      console.warn("Sound nicht gefunden:", soundName);
      return;
    }

    sound.currentTime = 0;
    sound.play().catch((err) => {
      console.warn("Sound konnte nicht abgespielt werden:", err);
    });
  }

  // Musik abspielen
  playMusic(musicName, volume = 1.0) {
    this.stopMusic();

    let music = this.music[musicName];

    if (!music) {
      console.warn("Music nicht gefunden:", musicName);
      return;
    }

    music.volume = volume * this.musicVolume;
    music.currentTime = 0;
    music.play().catch((err) => {
      console.warn("Music konnte nicht abgespielt werden:", err);
    });

    this.currentMusic = music;
    console.log(
      "🎵 Music:",
      musicName,
      "Volume:",
      Math.round(volume * 100) + "%"
    );
  }

  // Musik stoppen
  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
    }
  }

  // Musik Lautstärke ändern
  setMusicVolume(volume) {
    if (this.currentMusic) {
      this.currentMusic.volume = volume * this.musicVolume;
    }
  }

  // Mute Toggle
  toggleMute() {
    this.muted = !this.muted;

    if (this.muted) {
      this.stopMusic();
    }

    console.log(this.muted ? "🔇 Muted" : "🔊 Unmuted");
  }

  updateVolumes(musicVolume, soundVolume, muteAll) {
    this.musicVolume = musicVolume; // 0-1
    this.soundVolume = soundVolume; // 0-1
    this.muted = muteAll;

    // Update aktuell spielende Musik
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume;
    }

    // Update alle Sound Effects
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = this.soundVolume;
    });

    console.log(
      "🔊 Volumes updated:",
      Math.round(musicVolume * 100) + "%",
      Math.round(soundVolume * 100) + "%",
      muteAll ? "(MUTED)" : ""
    );
  }
}
