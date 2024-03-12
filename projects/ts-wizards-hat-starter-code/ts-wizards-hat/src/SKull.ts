import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class SKull extends ScoreItem {
  private chance: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 9);
    this.posX = Math.floor(Math.random() * window.innerWidth);
    this.posY = Math.floor(Math.random() * window.innerHeight);
    if (this.chance <= 4) {
      this.image = CanvasRenderer.loadNewImage('./assets/skullBlue.png');
      this.score = 10;
      this.timeToLive = Math.floor(Math.random() * (500 - 300 + 1) + 300);
    }
    else if (this.chance > 4 && this.chance <= 7) {
      this.image = CanvasRenderer.loadNewImage('./assets/skullGreen.png');
      this.score = 20;
      this.timeToLive = Math.floor(Math.random() * (700 - 300 + 1) + 300);
    }
    else if (this.chance > 7) {
      this.image = CanvasRenderer.loadNewImage('./assets/skullRed.png');
      this.score = 30;
      this.timeToLive = Math.floor(Math.random() * (1000 - 300 + 1) + 300);
    }
  }

  /**
   *
   * @returns removing skull
   */
  public override shouldremove(): boolean {
    if (this.getTimeToLive() <= 0) {
      return true;
    }
    return false;
  }


  /**
   * rendering the skulls
   * @param canvas the canvas we are using
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
