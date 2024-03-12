import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class Player extends CanvasItem {
  private imageClosed: HTMLImageElement;

  private imageOpen: HTMLImageElement;

  private chestOpen: boolean;

  public constructor(startX: number, maxY: number) {
    super();
    this.imageClosed = CanvasRenderer.loadNewImage('./assets/chestClosed.png');
    this.imageOpen = CanvasRenderer.loadNewImage('./assets/chestOpen.png');
    this.chestOpen = true;
    this.posX = startX;
    this.posY = window.innerHeight - 100;
    this.image = this.imageOpen;
  }

  public toggleOpen(): void {
    if (this.chestOpen) {
      this.chestOpen = false;
      this.image = this.imageClosed;
    } else {
      this.chestOpen = true;
      this.image = this.imageOpen;
    }
  }

  public getChestOpen(): boolean {
    return this.chestOpen;
  }

  public move(newX: number): void {
    this.posX = newX;
  }

  public isCollidingLeftBorder(lanes: number[]): boolean {
    if(this.posX = lanes[0]){
      console.log(this.posX);
      console.log(lanes[0]);
      return true;
    }
    return false;
  }

  public isCollidingRightBorder(lanes: number[]): boolean {
    if(this.posX = lanes[lanes.length - 1]){
      console.log(this.posX);
      console.log(lanes[lanes.length - 1]);
      return true;
    }
    return false;
  }

  public isCollidingWithItem(item: GameItem): boolean {
    return (this.getPosX() < item.getPosX() + item.getWidth()
    && this.getPosX() + this.getWidth() > item.getPosX()
    && this.getPosY() + this.getHeight() > item.getPosY()
    && this.getPosY() < item.getPosY() + item.getHeight());
  }
}
