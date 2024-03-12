import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import Orb from './Orb.js';
import Monster from './Monster.js';
import Cloak from './Cloak.js';

export default class TheFalling extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private orbs: Orb[];

  private monsters: Monster[];

  private timeToNextItem: number;

  private chance: number;

  private lightForce: number;

  private monstersCaught: number;

  private isGameOver: boolean;

  private timeToDropLightForce: number;

  private time: number;

  private cloaks: Cloak[];

  private cloakEffect: boolean;

  private timeEffect: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.player = new Player();
    this.orbs = [];
    this.timeToNextItem = Math.floor(Math.random() * (600 - 300 + 1) + 300);
    this.lightForce = 10;
    this.monstersCaught = 0;
    this.monsters = [];
    this.isGameOver = false;
    this.timeToDropLightForce = 1;
    this.time = 0.001;
    this.cloaks = [];
    this.timeEffect = 15;
  }

  /**
   * Process the input from the user
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
  }

  /**
   * Update state of the game
   *
   * @param elapsed milliseconds since last update
   * @returns whether the game is still running
   */
  public update(elapsed: number): boolean {
    this.timeToDropLightForce -= this.time * elapsed;

    if (this.timeToDropLightForce <= 0) {
      this.lightForce -= 1;
      this.timeToDropLightForce = 1;
    }

    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem < 0) {
      this.chance = Math.floor(Math.random() * 99);
      // if (this.chance <= 69) {
      //   this.orbs.push(new Orb());}
      if (this.chance < 50) {
        this.monsters.push(new Monster());
      }
      if (this.chance >= 50) {
        this.cloaks.push(new Cloak());
      }
      this.timeToNextItem = Math.floor(Math.random() * (600 - 300 + 1) + 300);
    }

    for (let i: number = 0; i < this.cloaks.length; i++) {
      this.cloaks[i].update(elapsed);
      if (this.player.isCollidingWithCloaks(this.cloaks[i])) {
        this.cloakEffect = true;
        this.timeEffect += this.cloaks[i].getTimeEffect();
        this.cloaks.splice(i, 1);
      }
    }

    if (this.cloakEffect) {
      this.timeEffect -= this.time * elapsed;
      if (this.timeEffect <= 0) {
        this.cloakEffect = false;
      }
    }

    for (let i: number = 0; i < this.orbs.length; i++) {
      this.orbs[i].update(elapsed);
      if (this.player.isCollidingWithOrb(this.orbs[i])) {
        this.lightForce += this.orbs[i].getLightForce();
        this.orbs.splice(i, 1);
      }
    }

    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].update(elapsed);
      if (this.monsters[i].getPosY() < 300) {
        this.chance = Math.floor(Math.random() * 9);
        // if (this.chance <= 1) {
        //   this.monsters[i].setPosX(Math.floor(Math.random() * window.innerWidth));
        //   this.monsters[i].setPosY(Math.floor(Math.random() * ((window.innerHeight - this.monsters[i].getHeight()) - (this.player.getHeight() + 20) + 1) + (this.player.getHeight() + 20)));
        // }
      }
      if (!this.cloakEffect) {
        if (this.player.isCollidingWithMonster(this.monsters[i])) {
          this.monstersCaught++;
          this.lightForce -= this.monsters[i].getLightForce();
          this.monsters.splice(i, 1);
        }
      }
    }


    if (this.lightForce <= 0 || this.monstersCaught >= 10) {
      this.isGameOver = true;
      this.timeToNextItem = 10000000000000000;
      this.time = 0;
      for (let i: number = 0; i < this.orbs.length; i++) {
        this.orbs[i].setSpeed(0);
      }
      for (let i: number = 0; i < this.monsters.length; i++) {
        this.monsters[i].setSpeed(0);
      }
    }
    console.log(this.cloaks);

    return true;
  }

  /**
   * Render the game
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    this.player.render(this.canvas);
    for (let i: number = 0; i < this.orbs.length; i++) {
      this.orbs[i].render(this.canvas);
    }
    for (let i: number = 0; i < this.monsters.length; i++) {
      this.monsters[i].render(this.canvas);
    }
    for (let i: number = 0; i < this.cloaks.length; i++) {
      this.cloaks[i].render(this.canvas);
    }
    CanvasRenderer.writeText(this.canvas, `LightForce: ${this.lightForce}`, 130, 60, 'center', 'Ariel', 36, 'lightblue');
    CanvasRenderer.writeText(this.canvas, `Monsters caught: ${this.monstersCaught}`, 160, 100, 'center', 'Ariel', 36, 'lightblue');
    if (this.isGameOver) {
      CanvasRenderer.writeText(this.canvas, `GAME OVER`, window.innerWidth / 2, window.innerHeight / 2, 'center', 'Ariel', 60, 'darkred');
    }
    if (this.cloakEffect) {
      CanvasRenderer.writeText(this.canvas, `Time left from the effect of the cloak: ${this.timeEffect}`, 160, 300, 'center', 'Ariel', 36, 'lightblue');
    }
  }
}
