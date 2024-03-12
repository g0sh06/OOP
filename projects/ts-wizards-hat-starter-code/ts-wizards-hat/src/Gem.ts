import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Gem extends ScoreItem {
  private chance: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 9);
    this.posX = Math.floor(Math.random() * window.innerWidth);
    this.posY = Math.floor(Math.random() * window.innerHeight);
    if(this.chance <= 4) {
      this.image = CanvasRenderer.loadNewImage('./assets/gemBlue.png');
      this.score = 1;
      this.timeToLive = Math.floor(Math.random() * (900 - 200 + 1) + 200);
    }
    else if(this.chance > 4 && this.chance <= 7) {
      this.image = CanvasRenderer.loadNewImage('./assets/gemGreen.png');
      this.score = 3;
      this.timeToLive = Math.floor(Math.random() * (700 - 200 + 1) + 200);
    }
    else if(this.chance > 7){
      this.image = CanvasRenderer.loadNewImage('./assets/gemRed.png');
      this.score = 5;
      this.timeToLive = Math.floor(Math.random() * (400 - 200 + 1) + 200);
    }
  }

  /**
   * removing gem
   * @returns true/false
   */
  public override shouldremove(): boolean {
    if (this.getTimeToLive() <= 0){
      return true;
    }
    return false;
  }

  /**
   *
   * @param canvas the canvas we are using
   * rendering the gems
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
