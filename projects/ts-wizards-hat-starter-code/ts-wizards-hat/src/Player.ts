import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import Gem from './Gem.js';
import Potion from './Potion.js';
import SKull from './SKull.js';

export default class Player extends CanvasItem {
  private speed: number;

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = window.innerWidth / 2;
    this.posY = window.innerHeight / 2;
    this.speed = 0.2;
  }

  /**
   * decreasing the x coor to move left
   */
  public moveLeft(): void {
    this.posX -= 10;
  }

  /**
   * increasing the x coor to move right
   */
  public moveRIght(): void {
    this.posX += 10;
  }

  /**
   * decreasing the y coor to move up
   */
  public moveUp(): void {
    this.posY -= 10;
  }

  /**
   * increasing the y coor to move down
   */
  public moveDown(): void {
    this.posY += 10;
  }

  /**
   *
   * @param canvas rendering the player
   */
  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  /**
   *
   * @param gem current gem
   * @returns true, if colliding/ false, if not colliding
   */
  public collidesWithGem(gem: Gem): boolean {
    if (gem.getPosX() + gem.getWidth() >= this.posX
      && gem.getPosX() <= this.posX + this.getWidth()
      && gem.getPosY() + gem.getHeight() >= this.posY
      && gem.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param skull current skull
   * @returns true, if colliding/ false, if not colliding
   */
  public collidesWithSkull(skull: SKull): boolean {
    if (skull.getPosX() + skull.getWidth() >= this.posX
      && skull.getPosX() <= this.posX + this.getWidth()
      && skull.getPosY() + skull.getHeight() >= this.posY
      && skull.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param potion current potion
   * @returns true if colliding/ false, if not
   */
  public collidesWithPotion(potion: Potion): boolean {
    if (potion.getPosX() + potion.getWidth() >= this.posX
      && potion.getPosX() <= this.posX + this.getWidth()
      && potion.getPosY() + potion.getHeight() >= this.posY
      && potion.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }
}
