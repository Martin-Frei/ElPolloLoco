export class Level {
  clouds;
  backgroundObjects;
  enemies;
  endboss;

  constructor(enemies, clouds, backgroundObjects, endboss){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.endboss = endboss;
    this.levelEnd_x = 2500;
    this.levelStart_x = -500;
  }
}
