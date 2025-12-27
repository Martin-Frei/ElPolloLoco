// models\level.class.js


export class Level {
    enemies;
    clouds;
    backgroundObjects;
    endboss;
    bottles;
    coins;
    levelStart_x;
    levelEnd_x;
    
    constructor(enemies, clouds, backgroundObjects, endboss, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
        this.levelStart_x = -100;
        this.levelEnd_x = 2500;
    }
}                