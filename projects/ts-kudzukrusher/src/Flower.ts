import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItems/ScoreItem.js';

export default class Flower extends ScoreItem {

  private timeToNextChange: number;

  private changeValue: number;

  private randomTIme: number;


  public constructor(maxX: number, maxY: number) {
    super();
    this.randomTIme = Math.floor(Math.random() * 5) + 10;
    const randomX: number = Math.random() * maxX;
    const randomY: number = Math.random() * maxY;
    this.changeValue = 0;
    this.score = 1;

    this.timeToNextChange = this.randomTIme;
    this.image = CanvasRenderer.loadNewImage('./assets/flower_0.png');
    this.posX = randomX;
    this.posY = randomY;
  }

  public override update(elapsed: number): void {
    this.timeToNextChange -= 0.001 * elapsed;
    if (this.timeToNextChange <= 0 && this.changeValue === 0) {
      this.image = CanvasRenderer.loadNewImage('./assets/flower_1.png');
      this.changeValue += 1;
      this.score = 3;
      this.timeToNextChange = this.randomTIme;
    }
    else if (this.timeToNextChange <= 0 && this.changeValue === 1) {
      this.image = CanvasRenderer.loadNewImage('./assets/flower_2.png');
      this.changeValue += 1;
      this.score = 5;
      this.timeToNextChange = this.randomTIme;
    }
    else if (this.timeToNextChange <= 0 && this.changeValue === 2) {
      this.image = CanvasRenderer.loadNewImage('./assets/flower_3.png');
      this.changeValue += 1;
      this.score = 7;
      this.timeToNextChange = this.randomTIme;
    }
  }

  public override getScore(): number {
    return this.score;
  }
}
