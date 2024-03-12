import CanvasRenderer from './CanvasRenderer.js';

export default class Shield {
  private image: HTMLImageElement;

  private score: number;

  private posX: number;

  private posY: number;

  public constructor(maxY: number) {
    this.image = CanvasRenderer.loadNewImage('./assets/shield_bolt.png');
    this.score = 3;
    this.posY = Math.random() * maxY;
    this.posX = window.innerWidth;
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getWidth(): number {
    return this.image.width;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public getScore(): number {
    return this.score;
  }

  public update(elapsed: number): void {
    this.posX -= 0.15 * elapsed;
  }

  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

}
