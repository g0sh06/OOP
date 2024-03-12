import { Game } from './GameLoop.js';

import CanvasRenderer from './CanvasRenderer.js';
import Spider from './Spider.js';
import Fruit from './Fruit.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private fruits: Fruit[];

  private spiders: Spider[];

  private keyListener: KeyListener;

  private score: number;

  private player: Player;

  private timeLeft: number;

  private timeToNextItem: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.fruits = [];
    this.spiders = [];
    this.score = 0;

    this.timeToNextItem = 300;
    this.timeLeft = 60;
  }

  /**
   * Make a new item that falls from the screen.
   */
  private makeItem(): void {
    if (this.timeToNextItem <= 0) {
      const percentage: number = Math.floor(Math.random() * 9);
      if (percentage <= 1) {
        this.spiders.push(new Spider(this.canvas.width));
      } else if (percentage <= 9) {
        this.fruits.push(new Fruit(this.canvas.width));
      }
      this.timeToNextItem = 200;
    }
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    this.timeToNextItem -= elapsed;
    this.timeLeft -= 0.001 * elapsed;
    this.makeItem();

    for (let i: number = 0; i < this.fruits.length; i++) {
      if (this.player.isCollidingFruit(this.fruits[i])) {
        this.fruits.splice(i, 1);
        this.score += this.fruits[i].getScore();
      }
      if (this.fruits[i].getPosY() >= this.canvas.height) {
        this.fruits.splice(i, 1);
      } else {
        this.fruits[i].update(elapsed);
      }
    }

    for (let i: number = 0; i < this.spiders.length; i++) {
      if (this.player.isCollidingSpider(this.spiders[i])) {
        this.score -= this.spiders[i].getScore();
        this.spiders.splice(i, 1);
      }
      if (this.spiders[i].getPosY() === this.canvas.height) {
        this.spiders.splice(i, 1);
      }
      this.spiders[i].update(elapsed);
    }
    return true;
  }

  /**
   * Tests conditions whether game is over. If time left is less than 0
   *
   * @returns True if game is over
   */
  private isGameOver(): boolean {
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      return true;
    }
    return false;
  }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    // Clear the canvas
    CanvasRenderer.clearCanvas(this.canvas);
    CanvasRenderer.writeText(this.canvas, `Time: ${Math.floor(this.timeLeft)}`, 80, 40, 'center', 'Ariel', 36, 'white');
    CanvasRenderer.writeText(this.canvas, `Score: ${this.score}`, 80, 100, 'center', 'Ariel', 36, 'white');

    for (let i: number = 0; i < this.fruits.length; i++) {
      this.fruits[i].render(this.canvas);
    }

    for (let i: number = 0; i < this.spiders.length; i++) {
      this.spiders[i].render(this.canvas);
    }
    this.player.render(this.canvas);
    if (this.isGameOver()) {
      CanvasRenderer.clearCanvas(this.canvas);
      CanvasRenderer.writeText(this.canvas, 'GAME OVER', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Ariel', 200, 'red');
    }
  }
}
