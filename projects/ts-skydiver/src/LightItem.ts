import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default abstract class LightItem extends CanvasItem{
  protected lightForce: number;

  protected speed: number;

  public update(elapsed: number): void {};

  public getLightForce(): number {
    return this.lightForce;
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public setSpeed(speed: number) : void {
    this.speed = speed;
  }

}
