import ScoreItem from './ScoreItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Waste extends ScoreItem {
  private maxHeight: number;

  private chance: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 99);
    this.speed = 0.3;
    if (this.chance <= 50) {
      this.image = CanvasRenderer.loadNewImage('./assets/waste1.png');
      this.score = 10;
    }
    if (this.chance > 50 && this.chance <= 80) {
      this.image = CanvasRenderer.loadNewImage('./assets/waste2.png');
      this.score = 20;
    }
    if (this.chance > 80) {
      this.image = CanvasRenderer.loadNewImage('./assets/waste3.png');
      this.score = 30;
    }

    this.posX = 25;
    this.maxHeight = window.innerHeight - 50;
    this.posY = Math.floor(Math.random() * this.maxHeight);
  }

  /**
   *
   * @param elapsed time elapsed
   */
  public override update(elapsed: number): void {
    this.posX += elapsed * this.speed;
  }

  public setImage(): void {
    this.image = CanvasRenderer.loadNewImage('/assets/toxic.png');
  }
}
