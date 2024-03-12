import CanvasRenderer from './CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class ScoreItem extends GameItem {

  private percentage1: number;
  public constructor(posX: number) {
    super();
    this.posX = posX;
    this.posY = 0;
    this.speed = 0.2;
    this.percentage1 = Math.floor(Math.random() * 9);

    if (this.percentage1 <= 1) {
      const percentage2 = Math.floor(Math.random() * 9);
      if (percentage2 === 2 || percentage2 === 3) {
        this.image = CanvasRenderer.loadNewImage('./assets/skullGreen.png');
        this.score = -50;
      } else if (percentage2 === 0 || percentage2 === 1) {
        this.image = CanvasRenderer.loadNewImage('./assets/skullRed.png');
        this.score = -100;
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/skullBlue.png');
        this.score = -5;
      }
    } else {
      const percentage3 = Math.floor(Math.random() * 9);
      if (percentage3 === 2 || percentage3 === 3) {
        this.image = CanvasRenderer.loadNewImage('./assets/gemGreen.png');
        this.score = 50
      } else if (percentage3 === 0 || percentage3 === 1) {
        this.image = CanvasRenderer.loadNewImage('./assets/gemRed.png');
        this.score = 100;
      } else {
        this.image = CanvasRenderer.loadNewImage('./assets/gemBlue.png');
        this.score = 5;
      }

    }
  }

  public getPercentage(): number {
    return this.percentage1;
  }
}
