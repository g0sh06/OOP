import CanvasRenderer from './CanvasRenderer.js';
import Game from './Game.js';
import Gem from './Gem.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Potion from './Potion.js';
import Skull from './SKull.js';

export default class WizardsHat extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private score: number;

  private timeToNextItem: number;

  private chance: number;

  private gems: Gem[];

  private skulls: Skull[];

  private potions: Potion[];

  private caughtSkulls: number;

  private gameFinished: boolean;

  private collidedWithPotion: boolean;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player();
    this.score = 0;
    this.timeToNextItem = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    this.gems = [];
    this.caughtSkulls = 0;
    this.skulls = [];
    this.potions = [];
    this.gameFinished = false;
    this.collidedWithPotion = false;
  }

  /**
   * moving our player
   */
  public processInput(): void {
    if (!this.gameFinished) {
      if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
        this.player.moveUp();
      }
      if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
        this.player.moveDown();
      }
      if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
        this.player.moveRIght();
      }
      if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
        this.player.moveLeft();
      }
    }
  }

  /**
   * all of the updates in the game
   * @param elapsed time elapsed
   * @returns true
   */
  public update(elapsed: number): boolean {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.chance = Math.floor(Math.random() * (100 - 1 + 1) + 1);
      if (this.chance <= 55) {
        this.skulls.push(new Skull());
      }
      if (this.chance > 60) {
        this.gems.push(new Gem());
      } else {
        if (this.potions.length === 0) {
          this.potions.push(new Potion());
        }
      }
      this.timeToNextItem = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    }

    for (let i: number = 0; i < this.gems.length; i++) {
      this.gems[i].update(elapsed);
      if (this.gems[i].shouldremove()) {
        this.gems.splice(i, 1);
      }
      if (this.player.collidesWithGem(this.gems[i])) {
        this.score += this.gems[i].getScore();
        this.gems.splice(i, 1);
      }
    }

    for (let i: number = 0; i < this.skulls.length; i++) {
      this.skulls[i].update(elapsed);
      if (this.skulls[i].shouldremove()) {
        this.skulls.splice(i, 1);
      }
      if (this.player.collidesWithSkull(this.skulls[i])) {
        this.score -= this.skulls[i].getScore();
        this.caughtSkulls++;
        this.skulls.splice(i, 1);
      }
    }

    for (let i: number = 0; i < this.potions.length; i++) {
      this.potions[i].update(elapsed);
      if (this.player.collidesWithPotion(this.potions[i])) {
        for (let i: number = 0; i < this.skulls.length; i++) {
          this.score += this.skulls[i].getScore();
          this.skulls.splice(i, 1);
        }
        this.caughtSkulls = 0;
        this.potions.splice(i, 1);
      }
    }

    for (let i: number = 0; i < this.potions.length; i++) {
      this.potions[i].update(elapsed);
      if (this.potions[i].getPosX() <= 0
        || this.potions[i].getPosX() >= window.innerWidth
        || this.potions[i].getPosY() <= 0
        || this.potions[i].getPosY() >= window.innerHeight) {
        this.potions.splice(i, 1);
      }
    }

    if (this.score < 0 || this.caughtSkulls >= 3) {
      this.gameFinished = true;
      this.timeToNextItem = 999999999999999;
      for (let i: number = 0; i < this.gems.length; i++) {
        this.gems[i].setTimeToLive(9999999);
      }
      for (let i: number = 0; i < this.skulls.length; i++) {
        this.skulls[i].setTimeToLive(9999999);
      }
    }
    return true;
  }

  /**
   * rendering every element in your game
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.player.render(this.canvas);
    for (let i: number = 0; i < this.gems.length; i++) {
      this.gems[i].render(this.canvas);
    }
    for (let i: number = 0; i < this.skulls.length; i++) {
      this.skulls[i].render(this.canvas);
    }
    for (let i: number = 0; i < this.potions.length; i++) {
      this.potions[i].render(this.canvas);
    }

    CanvasRenderer.writeText(this.canvas, `Score: ${this.score}`, 80, 40, 'center', 'Ariel', 36, 'lightblue');
    CanvasRenderer.writeText(this.canvas, `Skulls: ${this.caughtSkulls}`, 82, 80, 'center', 'Ariel', 36, 'lightblue');
    if (this.gameFinished) {
      CanvasRenderer.writeText(this.canvas, 'GAME OVER', window.innerWidth / 2, window.innerHeight / 2, 'center', 'Ariel', 56, 'red');
    }
  }
}
