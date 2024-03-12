import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Fish from './Fish.js';
import Waste from './Waste.js';

export default class OceanCleanup extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private timeToNextItem: number;

  private fish: Fish[];

  private waste: Waste[];

  private chance: number;

  private score: number;

  private fishCaught: number;

  private gameFinished: boolean;


  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player();
    this.timeToNextItem = Math.floor(Math.random() * (600 - 300 + 1) + 300);
    this.fish = [];
    this.waste = [];
    this.score = 10;
    this.fishCaught = 0;

  }

  /**
   * Process user input
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
      this.player.moveUp();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
      this.player.moveDown();
    }

  }

  /**
   * Update called from the game loop
   * @param elapsed ms since last update
   * @returns whether the game should continue
   */
  public update(elapsed: number): boolean {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem < 0) {
      this.chance = Math.floor(Math.random() * 99);
      if (this.chance < 70) {
        this.fish.push(new Fish());
        this.timeToNextItem = Math.floor(Math.random() * (600 - 300 + 1) + 300);
      }
      else {
        this.waste.push(new Waste());
      }
    }

    for (let i: number = 0; i < this.fish.length; i++) {
      this.fish[i].update(elapsed);
      if (this.player.collidesWithFish(this.fish[i])) {
        this.score += this.fish[i].getScore();
        this.fishCaught++;
        this.fish.splice(i, 1);
      }
    }

    for (let i: number = 0; i < this.waste.length; i++) {
      this.waste[i].update(elapsed);
      if(this.waste[i].getPosX() >= 400 || this.waste[i].getPosX() <= 450) {

      }
      if (this.player.collidesWithWaste(this.waste[i])) {
        this.score += this.waste[i].getScore();
        this.waste.splice(i, 1);
      }
    }

    if (this.score < 0 || this.fishCaught > 10) {
      this.gameFinished = true;
      for (let i: number = 0; i < this.fish.length; i++) {
        this.fish[i].setSpeed(0);
      }
      for (let i: number = 0; i < this.waste.length; i++) {
        this.waste[i].setSpeed(0);
      }
    }
    return true;
  }

  /**
   * Render called from the game loop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.player.render(this.canvas);
    for (let i: number = 0; i < this.fish.length; i++) {
      this.fish[i].render(this.canvas);
    }
    for (let i: number = 0; i < this.waste.length; i++) {
      this.waste[i].render(this.canvas);
    }
    CanvasRenderer.writeText(this.canvas, `Score: ${this.score}`, 80, 50, 'center', 'Ariel', 32, 'blue');
    CanvasRenderer.writeText(this.canvas, `Fish caught: ${this.fishCaught}`, 120, 100, 'center', 'Ariel', 32, 'blue');
    if (this.gameFinished) {
      CanvasRenderer.writeText(this.canvas, `GAME OVER`, window.innerWidth / 2, window.innerHeight / 2, 'center', 'Ariel', 56, 'black');
    }
  }
}
