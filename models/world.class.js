// models\world.class.js

import { Character } from "./character.class.js";
import { Air } from "./air.class.js";
import { level1 } from "../levels/level1.js";
import { ThrownBottle } from "./thrown-bottle.class.js";

export class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  level = level1;
  thrownBottles = [];

  air = new Air("img/5_background/layers/air.png");
  character;

  debugMode = true; // Debug-Boxen an/aus

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.level.endboss.world = this;
    this.draw();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.camera_x = -this.character.x + 100;

    if (this.camera_x > 0) {
      this.camera_x = 0;
    }

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.air);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.thrownBottles);
    this.addObjectsToMap(this.thrownBottles.filter((b) => !b.readyToRemove));
    this.addToMap(this.character);

    // Debug-Boxen
    if (this.debugMode) {
      this.drawCollisionBoxes();
    }

    this.ctx.translate(-this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
  }

  // Kollisions-Boxen
  drawCollisionBoxes() {
    this.drawBox(this.character, "lime");

    this.level.bottles.forEach((bottle) => {
      this.drawBox(bottle, "blue");
    });

    this.level.coins.forEach((coin) => {
      this.drawBox(coin, "yellow");
    });

    // Hühner: Nur lebendige mit roter Box
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead) {
        this.drawBox(enemy, "red");
      }
    });

    this.drawBox(this.level.endboss, "magenta");

    this.thrownBottles.forEach((bottle) => {
      if (!bottle.readyToRemove) {
        this.drawBox(bottle, "cyan");
      }
    });
  }

  // Einzelne Box
  drawBox(obj, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(
      obj.x + obj.offsetX,
      obj.y + obj.offsetY,
      obj.width - obj.offsetWidth,
      obj.height - obj.offsetHeight
    );
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 1000 / 60);
  }

  checkCollisions() {
    this.checkBottleCollisions();
    this.checkCoinCollisions();
    this.checkEnemyCollisions();
    this.checkEndbossCollision();
    this.checkThrownBottleCollisions();
  }

  checkBottleCollisions() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        console.log(
          "🍾 Flasche gesammelt! Noch",
          this.level.bottles.length - 1,
          "übrig"
        );
        return false;
      }
      return true;
    });
  }

  checkCoinCollisions() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        console.log(
          "Münze gesammelt! Noch",
          this.level.coins.length - 1,
          "übrig"
        );
        return false;
      }
      return true;
    });
  }

  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && !enemy.isDead) {
        let pepeBottom =
          this.character.y +
          this.character.height -
          this.character.offsetHeight;
        let enemyTop = enemy.y + enemy.offsetY;

        // Alle 3 Bedingungen müssen erfüllt sein:
        // 1. Füße über Kopf
        // 2. Schnell fallend
        // 3. In der Luft

        if (
          pepeBottom < enemyTop + 30 &&
          this.character.speedY < -5 &&
          this.character.isAboveGround()
        ) {
          console.log("Huhn platt!");
          this.character.jump();

          enemy.die();
          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 500);
        } else {
          console.log("Huhn von Seite berührt!");
          this.character.hit();
        }
      }
    });
  }

  checkEndbossCollision() {
    let distance = Math.abs(this.character.x - this.level.endboss.x);

    if (distance < 150) {
      console.log("🦖 Abstand zum Endboss:", distance.toFixed(0));
    }

    if (this.character.isColliding(this.level.endboss)) {
      console.log("🦖🦖🦖 ENDBOSS BERÜHRT! 🦖🦖🦖");
    }
  }

  // Prüft ob geworfene Flaschen Gegner treffen
checkThrownBottleCollisions() {
    this.thrownBottles.forEach(bottle => {
        if (bottle.readyToRemove) return;  // Ignoriere Flaschen die schon am Verschwinden sind
        
        // Check gegen Hühner
        this.checkBottleVsEnemies(bottle);
        
        // Check gegen Endboss
        this.checkBottleVsEndboss(bottle);
    });
}

// Flasche trifft Huhn
checkBottleVsEnemies(bottle) {
    this.level.enemies.forEach((enemy, index) => {
        if (!enemy.isDead && bottle.isColliding(enemy)) {
            console.log('💥 Flasche trifft Huhn!');
            
            // Huhn stirbt
            enemy.die();
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 500);
            
            // Flasche zerschellt
            bottle.splash();
        }
    });
}

// Flasche trifft Endboss
checkBottleVsEndboss(bottle) {
    if (bottle.isColliding(this.level.endboss)) {
        console.log('💥 Flasche trifft Endboss!');
        
        // Endboss verliert Leben
        this.level.endboss.hit();
        
        // Flasche zerschellt
        bottle.splash();
    }
}

  cleanupBottles() {
    this.thrownBottles = this.thrownBottles.filter(
      (bottle) => !bottle.readyToRemove
    );
  }

  checkBottleVsEnemies(bottle) {
    this.level.enemies.forEach((enemy, index) => {
        if (!enemy.isDead) {
            bottle.hitsTarget(enemy, () => {
                console.log('💥 Flasche trifft Huhn!');
                enemy.die();
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 500);
            });
        }
    });
}

checkBottleVsEndboss(bottle) {
    bottle.hitsTarget(this.level.endboss, () => {
        console.log('💥 Flasche trifft Endboss!');
        this.level.endboss.hit();
    });
}
}
