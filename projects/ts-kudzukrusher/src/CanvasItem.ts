import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItems/ScoreItem.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

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

  /**
   *
   * @param item ScoreItem to check collision with
   * @returns whether this CanvasItem is colliding with the given ScoreItem
   */
  public isCollidingWithItem(item: ScoreItem): boolean {
    return (this.getPosX() < item.getPosX() + item.getWidth()
      && this.getPosX() + this.getWidth() > item.getPosX()
      && this.getPosY() + this.getHeight() > item.getPosY()
      && this.getPosY() < item.getPosY() + item.getHeight());
  }

  /**
   *
   * @param x x coordinated of the cursor
   * @param y y coordinates of the cursor
   * @returns true if colliding and false if it is not colliding
   */
  public isCollidingWithCursor(x: number, y: number): boolean {
    return (this.getPosX() < x
      && this.getPosX() + this.getWidth() > x
      && this.getPosY() + this.getHeight() > y
      && this.getPosY() < y);
  }

  /**
   * Render the item to the canvas
   * @param canvas canvas to render to
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
