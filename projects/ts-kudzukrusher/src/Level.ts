import CanvasRenderer from './CanvasRenderer.js';
import Flower from './Flower.js';
import Kudzu from './Kudzu.js';
import MouseListener from './MouseListener.js';
import Player from './Player.js';
import Scene from './Scene.js';
import SceneLose from './SceneLose.js';
import SceneWin from './SceneWin.js';
import ScoreItem from './ScoreItems/ScoreItem.js';

export default class Level extends Scene {
  private win: boolean;

  private player: Player;

  private scoreItems: ScoreItem[];

  private timeToNextItem: number;

  private currentScore: number;

  private flowerLost: number;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.player = new Player(0, 0);
    this.scoreItems = [];
    this.timeToNextItem = 500;
    this.currentScore = 0;
    this.flowerLost = 0;
    this.win = false;

    for (let i: number = 0; i < 100; i++) {
      this.scoreItems.push(new Flower(this.maxX, this.maxY));
    }
  }

  /**
   * @param mouseListener the button of my mouse
   * in thos method I am checking if I am clicking the button on a ScoreItem element.
   * If the clicked ScoreItem is instance of Kudzu then I am increasing the current points
   * If the cicked ScoreItem is instance of Flower then I am decreasing the current poitns.
   */
  public override processInput(mouseListener: MouseListener): void {
    this.player.move(mouseListener.getMousePosition().x, mouseListener.getMousePosition().y);
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      for (let i: number = 0; i < this.scoreItems.length; i++) {
        if (this.scoreItems[i] instanceof Kudzu) {
          if (this.scoreItems[i].isCollidingWithCursor(mouseListener.getMousePosition().x, mouseListener.getMousePosition().y)) {
            this.scoreItems.splice(i, 1);
            this.currentScore += this.scoreItems[i].getScore();
          }
        }
        if (this.scoreItems[i] instanceof Flower) {
          if (this.scoreItems[i].isCollidingWithCursor(mouseListener.getMousePosition().x, mouseListener.getMousePosition().y)) {
            this.scoreItems.splice(i, 1);
            this.currentScore -= this.scoreItems[i].getScore();
          }
        }
      }
    }
  }
  /**
   *
   * @param elapsed calls the value of 16 60 times per second
   */

  public override update(elapsed: number): void {
    this.timeToNextItem -= Math.floor(elapsed);
    console.log(0.001 * elapsed);
    const percentage: number = Math.floor(Math.random() * 10);
    // updating elements constantly
    for (let i: number = 0; i < this.scoreItems.length; i++) {
      this.scoreItems[i].update(elapsed);
    }
    // checks if there is no time left to create new element
    if (this.timeToNextItem <= 0) {
      if (percentage <= 5) {
        this.scoreItems.push(new Flower(this.maxX, this.maxY));
      }
      if (percentage >= 6) {
        this.scoreItems.push(new Kudzu(this.maxX, this.maxY));
      }
      this.timeToNextItem = 500;
    }

    // the i-element is always Kudzu and the j-element is always Flower
    for (let i: number = 0; i < this.scoreItems.length; i++) {
      for (let j: number = 0; j < this.scoreItems.length; j++) {
        if (j !== 1) {
          if (this.scoreItems[i] instanceof Kudzu && this.scoreItems[j] instanceof Flower) {
            if (this.scoreItems[i].isCollidingWithItem(this.scoreItems[j])) {
              this.flowerLost++;
              this.scoreItems.splice(j, 1);
            }
          }
        }
      }
    }
  }

  public override getNextScene(): Scene | null {
    if (this.currentScore >= 100) {
      return new SceneWin(this.maxX, this.maxY);
    }
    if (this.flowerLost >= 100) {
      return new SceneLose(this.maxX, this.maxY);
    }
    return null;
  }

  public override render(canvas: HTMLCanvasElement): void {
    this.player.render(canvas);
    CanvasRenderer.writeText(canvas, `Score: ${this.currentScore}`, 80, 50, 'center', 'Arial', 32, 'black');
    CanvasRenderer.writeText(canvas, `Flowers lost: ${this.flowerLost}`, 120, 90, 'center', 'Arial', 32, 'black');

    for (let i: number = 0; i < this.scoreItems.length; i++) {
      this.scoreItems[i].render(canvas);
    }
  }

}
