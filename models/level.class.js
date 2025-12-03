export class Level {
  clouds;
  backgroundObjects;
  enemies;

  constructor(enemies, clouds, backgroundObjects){
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.levelEnd_x = 2500;
    this.levelStart_x = -500;
  }
}
