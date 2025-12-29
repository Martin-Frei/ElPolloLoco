// models\world.class.js

import { Character } from "./character.class.js";
import { Air } from "./air.class.js";
import { AudioManager } from "./audio-manager.class.js";
import { ThrownBottle } from "./thrown-bottle.class.js";
import { Statusbar } from "./statusbar.class.js";

export class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  level;
  thrownBottles = [];

  audio = new AudioManager();

  air = new Air("img/5_background/layers/air.png");
  character;

  healthBar;
  bottleBar;
  coinBar;
  endbossBar;
  collectedCoins = 0;

  gameWon = false;
  gameLost = false;
  endbossMusicStarted = false;

  debugMode = true; // Debug-Boxen an/aus

  constructor(canvas, keyboard, level) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = level;
    this.character = new Character(this);
    this.level.endboss.world = this;
    this.createStatusbars();

    this.draw();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.camera_x = -this.character.x + 100;

    if (this.camera_x > 0) {
      this.camera_x = 0;
    }

    // ═══ KAMERA BEWEGT SICH ═══
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.air);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.thrownBottles.filter((b) => !b.readyToRemove));
    this.addToMap(this.character);

    // Debug-Boxen
    if (this.debugMode) {
      this.drawCollisionBoxes();
    }

    // ═══ KAMERA ZURÜCK ═══
    this.ctx.translate(-this.camera_x, 0);

    this.drawStatusbars();

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
    this.gameLoop = setInterval(() => {
      this.checkGameOver();

      if (!this.gameWon && !this.gameLost) {
        this.checkCollisions();
        this.cleanupBottles();
      }
    }, 1000 / 60);
  }

  checkGameOver() {
    // WIN
    if (this.level.endboss.health <= 0 && !this.gameWon) {
      this.gameWon = true;
      console.log("🎉 LEVEL GESCHAFFT!");
      setTimeout(() => {
        window.showWinScreen();
      }, 1000);
    }

    // LOST
    if (this.character.health <= 0 && !this.gameLost) {
      this.gameLost = true;
      console.log("💀 GAME OVER!");
      setTimeout(() => {
        window.showLostScreen();
      }, 1000);
    }
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
        if (this.character.bottleInventory >= this.level.maxBottles) {
          // Inventar voll ?
          console.log(
            "🚫 Inventar voll! Max",
            this.level.maxBottles,
            "Flaschen"
          );
          return true;
        }
        this.character.bottleInventory++;
        this.audio.play("collectBottle");
        console.log(
          "🍾 Flasche gesammelt! Inventar:",
          this.character.bottleInventory,
          "/",
          this.level.maxBottles
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
        this.collectedCoins++;
        this.audio.play("collectCoin");

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
    this.thrownBottles.forEach((bottle) => {
      if (bottle.readyToRemove) return; // Ignoriere Flaschen die schon am Verschwinden sind

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
        console.log("💥 Flasche trifft Huhn!");

        if (enemy.type === "small") {
          this.audio.play("chickenSmallHit");
        } else {
          this.audio.play("chickenHit");
        }

        enemy.die();
        setTimeout(() => {
          this.level.enemies.splice(index, 1);
        }, 500);

        bottle.splash();
      }
    });
  }

  // Flasche trifft Endboss
  checkBottleVsEndboss(bottle) {
    if (bottle.isColliding(this.level.endboss)) {
      console.log("💥 Flasche trifft Endboss!");

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

  checkBottleVsEndboss(bottle) {
    bottle.hitsTarget(this.level.endboss, () => {
      console.log("💥 Flasche trifft Endboss!");
      this.level.endboss.hit();
    });
  }

  createStatusbars() {
    this.healthBar = new Statusbar(10, 10, "health");
    this.bottleBar = new Statusbar(10, 50, "bottles");
    this.coinBar = new Statusbar(10, 90, "coins");
    this.endbossBar = new Statusbar(500, 10, "endboss");
  }

  drawStatusbars() {
    // Aktualisiere Werte
    this.healthBar.setValue(this.character.health, 100);
    this.bottleBar.setValue(
      this.character.bottleInventory || 0,
      this.level.maxBottles
    );
    this.coinBar.setValue(
      this.collectedCoins,
      this.level.coins.length + this.collectedCoins
    );
    this.endbossBar.setValue(this.level.endboss.health, 100);

    // Zeichne Health Bar
    this.addToMap(this.healthBar);
    this.drawStatusbarText(this.healthBar.getText(), 170, 30);

    // Zeichne Bottle Bar
    this.addToMap(this.bottleBar);
    this.drawStatusbarText(this.bottleBar.getText(), 170, 70);

    // Zeichne Coin Bar
    this.addToMap(this.coinBar);
    this.drawStatusbarText(this.coinBar.getText(), 170, 110);

    // Zeichne Endboss Bar (nur wenn nahe)
    if (this.isEndbossNear()) {
      this.addToMap(this.endbossBar);
      this.drawStatusbarText(this.endbossBar.getText(), 660, 30);
    }
  }

  isEndbossNear() {
    let distance = Math.abs(this.character.x - this.level.endboss.x);
    let isNear = distance < 600;

    if (isNear && !this.endbossMusicStarted) {
      this.endbossMusicStarted = true;

      this.audio.play("chickenAlarm");

      setTimeout(() => {
        this.audio.playMusic("endboss", 1.0);
      }, 1000); // 1 Sekunde nach 'chickenAlarm'

      console.log("🦖 BOSS FIGHT!");
    }

    return isNear; // => Statusbar
  }

  drawStatusbarText(text, x, y) {
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 3;

    this.ctx.strokeText(text, x, y);

    this.ctx.fillText(text, x, y);
  }

  stop() {
    // Stoppe Game Loop
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }

    // Stoppe Character
    if (this.character) {
      this.character.stop();
    }

    // Stoppe Endboss
    if (this.level && this.level.endboss) {
      this.level.endboss.stop();
    }

    // Stoppe alle Enemies (Chickens)
    if (this.level && this.level.enemies) {
      this.level.enemies.forEach((enemy) => {
        if (enemy.stop) {
          enemy.stop();
        }
      });
    }

    // Stoppe Audio
    if (this.audio) {
      this.audio.stopMusic();
    }
  }
}
