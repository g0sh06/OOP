import { Game } from './GameLoop.js';

import CanvasRenderer from './CanvasRenderer.js';
import Shield from './Shield.js';
import Meteor from './Meteor.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class SpaceEscape extends Game {
  private canvas: HTMLCanvasElement;

  private shields: Shield[];

  private meteors: Meteor[];

  private player: Player;

  private keyListener: KeyListener;

  private shieldsLeft: number;

  private timeElapsed: number;

  private timeToNextItem: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(70, this.canvas.height);
    this.shields = [];
    this.meteors = [];

    this.shieldsLeft = 20;
    this.timeElapsed = 0;
    this.timeToNextItem = 500;
  }

  /**
   * Create a new item to fly through space.
   *
   * It can either be a new power up or a new meteor, depending on random chance.
   */
  private makeItem(): void {
    if (this.timeToNextItem <= 0) {
      const percentage: number = Math.floor(Math.random() * 10);
      if (percentage <= 1) {
        this.shields.push(new Shield(this.canvas.height));
      } else {
        this.meteors.push(new Meteor(this.canvas.height));
      }
      this.timeToNextItem = 500;
    }

  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    } else if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }
  }

  public isCollidingDownBorder(): boolean {
    // console.log(this.player.getPosY() + this.player.getHeight());
    if (this.player.getPosY() + this.player.getHeight() >= this.canvas.height) {
      return true;
    }
    return false;
  }

  public isCollidingUpBorder(): boolean {
    if (this.player.getPosY() <= 0) {
      return true;
    }
    return false;
  }

  public subOneShield(): number {
    return this.shieldsLeft--;
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.timeToNextItem -= elapsed;
    this.timeElapsed += 0.001 * elapsed;
    this.makeItem();
    this.player.update();

    if (Number((this.timeElapsed * 10).toFixed(1)) % 15 === 0) {
      this.shieldsLeft -= 1;
      console.log('Divisible by 1.5');
    }

    if (this.isCollidingDownBorder()) {
      this.player.setPosY(10);
    }

    if (this.isCollidingUpBorder()) {
      this.player.setPosY(this.canvas.height - this.player.getHeight() - 10);
    }

    for (let i: number = 0; i < this.shields.length; i++) {
      if (this.player.isCollidingShield(this.shields[i])) {
        this.shieldsLeft += this.shields[i].getScore();
        this.shields.splice(i, 1);
      }
      if (this.shields[i].getPosX() <= 0) {
        this.shields.splice(i, 1);
      }
      else {
        this.shields[i].update(elapsed);
      }
    }

    for (let i: number = 0; i < this.meteors.length; i++) {
      if (this.player.isCollidingMeteor(this.meteors[i])) {
        this.shieldsLeft -= this.meteors[i].getScore();
        this.meteors.splice(i, 1);
      }
      if (this.meteors[i].getPosX() <= 0) {
        this.meteors.splice(i, 1);
      }
      else {
        this.meteors[i].update(elapsed);
      }
    }
    return true;
  }

  /**
   * Tests conditions whether game is over. If time left is less than 0
   *
   * @returns True if game is over
   */
  private isGameOver(): boolean {
    if (this.shieldsLeft <= 0) {
      return true;
    }
    return false;
  }


  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    CanvasRenderer.writeText(this.canvas, `Shields: ${Math.floor(this.shieldsLeft)}`, 80, 40, 'center', 'Ariel', 36, 'white');
    CanvasRenderer.writeText(this.canvas, `Time: ${Math.floor(this.timeElapsed)}`, 80, 100, 'center', 'Ariel', 36, 'white');

    for (let i: number = 0; i < this.meteors.length; i++) {
      this.meteors[i].render(this.canvas);
    }

    for (let i: number = 0; i < this.shields.length; i++) {
      this.shields[i].render(this.canvas);
    }
    this.player.render(this.canvas);

    if (this.isGameOver()) {
      CanvasRenderer.clearCanvas(this.canvas);
      CanvasRenderer.writeText(this.canvas, 'GAME OVER', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Ariel', 200, 'red');
    }
  }
}
