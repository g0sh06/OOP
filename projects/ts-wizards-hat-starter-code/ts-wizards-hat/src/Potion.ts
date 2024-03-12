import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Potion extends ScoreItem {
  private speed: number;

  private chanceForDirection: number;

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/potion.png');
    this.posX = Math.floor(Math.random() * window.innerWidth);
    this.posY = Math.floor(Math.random() * window.innerHeight);
    this.speed = 0.02;
    this.chanceForDirection = Math.floor(Math.random() * 3);
  }

  /**
   *
   * @param elapsed moving potion on random
   */
  public override update(elapsed: number): void {
    if(this.chanceForDirection === 0){
      this.posX += this.speed * elapsed;
      this.posY += this.speed * elapsed;
    }
    if(this.chanceForDirection === 1){
      this.posX -= this.speed * elapsed;
      this.posY += this.speed * elapsed;
    }
    if(this.chanceForDirection === 2){
      this.posX += this.speed * elapsed;
      this.posY -= this.speed * elapsed;
    }
    if(this.chanceForDirection === 3){
      this.posX -= this.speed * elapsed;
      this.posY -= this.speed * elapsed;
    }
  }

  /**
   * rendering the potion
   * @param canvas current canvas
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public override shouldremove(): boolean {
    throw new Error('Method not implemented.');
  }
}
