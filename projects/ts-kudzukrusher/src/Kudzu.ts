import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItems/ScoreItem.js';

export default class Kudzu extends ScoreItem {

  private maxX: number;

  private maxY: number;

  private speedX: number;

  private speedY: number;

  private incrementX: number;

  private incrementY: number;

  public constructor(maxX: number, maxY: number) {
    super();
    const randomX: number = Math.random() * maxX;
    const randomY: number = Math.random() * maxY;
    this.posX = randomX;
    this.posY = randomY;
    this.image = CanvasRenderer.loadNewImage('./assets/kudzu.png');
    this.incrementX = (Math.random() - 0.5) * 2;
    this.incrementY = (Math.random() - 0.5) * 2;
    this.score = 5;
  }

  public override update(elapsed: number): void {
    this.posX += this.incrementX;
    this.posY += this.incrementY;
  }
}
