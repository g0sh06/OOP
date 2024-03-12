import CanvasRenderer from './CanvasRenderer.js';

export default class Meteor {
  private image: HTMLImageElement;

  private score: number;

  private posX: number;

  private posY: number;

  public constructor(maxY: number) {
    const random: number = Math.floor(Math.random() * 10);
    if (random === 0) {
      this.image = CanvasRenderer.loadNewImage('./assets/meteor_grey_big.png');
      this.score = 5;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/meteor_grey_small.png');
      this.score = 1;
    }
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
