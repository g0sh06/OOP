import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Fish extends ScoreItem {
  private maxHeight: number;

  private chance: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 99);
    this.speed = 0.2;
    if (this.chance <= 32) {
      this.image = CanvasRenderer.loadNewImage('./assets/fish1.png');
      this.score = -5;
    }
    if (this.chance > 32 && this.chance <= 65) {
      this.image = CanvasRenderer.loadNewImage('./assets/fish2.png');
      this.score = -10;
    }
    if (this.chance > 65) {
      this.image = CanvasRenderer.loadNewImage('./assets/fish3.png');
      this.score = -15;
    }

    this.posX = 25;
    this.maxHeight = window.innerHeight - 50;
    this.posY = Math.floor(Math.random() * this.maxHeight);
  }

  public override update(elapsed: number): void {
    this.posX += elapsed * this.speed;
  }

}
