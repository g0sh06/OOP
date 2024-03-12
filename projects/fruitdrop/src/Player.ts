import CanvasRenderer from './CanvasRenderer.js';
import Fruit from './Fruit.js';
import Spider from './Spider.js';

export default class Player {
  private image: HTMLImageElement;

  private speed: number;

  private posX: number;

  private posY: number;

  private movingLeft: boolean;

  private movingRight: boolean;

  public constructor(maxX: number, maxY: number) {
    this.image = CanvasRenderer.loadNewImage('assets/basket.png');
    this.speed = 0;
    this.posX = Math.random() * maxX;
    this.posY = maxY - 100;
  }

  /**
   * moving the basket on the lft, when decreasing the Y coordinates
   */
  public moveLeft(): void {
    this.posX -= 10;
  }

  /**
   * moving the basket on the right, when increasing the X coordinates
   */
  public moveRight(): void {
    this.posX += 10;
  }

  /**
   *
   * @param fruit the element we will check if collides with our basket
   * @returns returns true if basket collides with a fruit
   * coor - coordinates
   *
   * for the left side of the basket
   * checks if(X coor of the fruit + the width of the photo >= the current position of the basket)
   *
   * for the right side of the basket
   * checks if(X coor <= current position of the basket + the width of the photo of the basket)
   *
   * for the top of the basket
   * checks if(current Y coor of the fruit + its height(the bottom of the fruit image)
   * >= the current Y coor of the basket)e
   */
  public isCollidingFruit(fruit: Fruit): boolean {
    if ((fruit.getPosX() + fruit.getWidth() >= this.posX
      && fruit.getPosX() <= this.posX + this.image.width)
      && fruit.getPosY() + fruit.getHeight() >= this.posY) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param spider the object we will check if collides
   * @returns returns true if collides
   * we use the same logic as the fruit object
   */
  public isCollidingSpider(spider: Spider): boolean {
    if ((spider.getPosX() + spider.getWidth() >= this.posX
      && spider.getPosX() <= this.posX + this.image.width)
      && spider.getPosY() + spider.getHeight() >= this.posY) {
      return true;
    }
    return false;
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

  /**
   *
   * @param canvas selecting canvas from FruitDrop class, where to visualize the basket
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
