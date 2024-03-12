import CanvasRenderer from './CanvasRenderer.js';
import Dynamite from './Dynamite.js';
import Game from './Game.js';
import GameItem from './GameItem.js';
import Key from './Key.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import ScoreItem from './ScoreItem.js';

export default abstract class Level {
  protected player: Player;

  protected gameItems: GameItem[];

  protected lanes: number[];

  protected timeToNextItem: number;

  protected score: number;

  protected maxX: number;

  protected maxY: number;

  protected level: number;

  private currentLane: number;

  private randomTime: number;

  public constructor(maxX: number, maxY: number, startScore: number) {
    this.randomTime = Math.floor((Math.random() * (600 - 300) + 300));
    this.player = new Player(maxX, maxY);
    this.gameItems = [];
    this.lanes = [];

    this.timeToNextItem = this.randomTime;
    this.score = startScore;
    this.maxX = maxX;
    this.maxY = maxY - 100;
    this.level = 1;
  }

  public startLevel(): void {
    this.currentLane = 1;
    this.player = new Player(this.lanes[this.currentLane], this.maxY);
  }

  public getScore(): number {
    return this.score;
  }

  protected abstract spawnNewItem(): void;
  public abstract nextLevel(): Level | null;

  public processInput(keyListener: KeyListener) {
    if (keyListener.keyPressed(KeyListener.KEY_LEFT)) {
      if (this.currentLane === 0) {
        this.currentLane = this.lanes.length - 1;
      } else if (this.currentLane > 0) {
        this.currentLane -= 1;
      }
      const newPosX: number = this.lanes[this.currentLane];
      this.player.move(newPosX);
    }

    if (keyListener.keyPressed(KeyListener.KEY_RIGHT)) {
      if (this.currentLane === this.lanes.length - 1) {
        this.currentLane = 0;
      } else if (this.currentLane < this.lanes.length - 1) {
        this.currentLane += 1;
      }
      const newPosX: number = this.lanes[this.currentLane];
      this.player.move(newPosX);
    }
  }

  public update(elapsed: number) {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem <= 0) {
      this.spawnNewItem();
      this.timeToNextItem = this.randomTime;
    } else {
      for (let i = 0; i < this.gameItems.length; i++) {
        this.gameItems[i].update(elapsed);
        if (this.player.isCollidingWithItem(this.gameItems[i])) {
          if (this.gameItems[i] instanceof Key) {
            this.player.toggleOpen();
            this.gameItems.splice(i, 1);
          }
          if (this.gameItems[i] instanceof Dynamite) {
            this.score = 0;
          }
          if (this.player.getChestOpen()) {
            this.score += this.gameItems[i].getScore();
            this.gameItems.splice(i, 1);
          }
        }
      }

    }
  }

  public render(canvas: HTMLCanvasElement): void {
    this.player.render(canvas);
    CanvasRenderer.writeText(canvas, `Score:${this.score}`, 70, 70, 'center', 'Arial', 32, 'white');
    CanvasRenderer.writeText(canvas, `Level:${this.level}`, 500, 70, 'center', 'Arial', 32, 'white');
    for (let i = 0; i < this.gameItems.length; i++) {
      this.gameItems[i].render(canvas);
    }

  }
}

