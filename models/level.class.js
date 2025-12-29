export class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    endboss;
    levelStart_x;
    levelEnd_x;
    maxBottles;
    
    constructor(enemies, clouds, backgroundObjects, bottles, coins, endboss, levelStart_x, levelEnd_x, maxBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
        this.levelStart_x = levelStart_x;
        this.levelEnd_x = levelEnd_x;
        this.maxBottles = maxBottles;
    }
}