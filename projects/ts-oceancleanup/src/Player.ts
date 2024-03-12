import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import Fish from './Fish.js';
import Waste from './Waste.js';

export default class Player extends CanvasItem {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = window.innerWidth - 200;
    this.posY = window.innerWidth / 2;
  }

  /**
   * moving player up
   */
  public moveUp(): void {
    this.posY -= 10;
  }

  /**
   *moving player down
   */
  public moveDown(): void {
    this.posY += 10;
  }

  /**
   *
   * @param fish current fish element
   * @returns true or false if collides with fish
   */
  public collidesWithFish(fish: Fish): boolean {
    if(this.getPosX() < fish.getPosX() + fish.getWidth()
    && this.getPosX() + this.getWidth() > fish.getPosX()
    && this.getPosY() + this.getHeight() > fish.getPosY()
    && this.getPosY() < fish.getPosY() + fish.getHeight()){
      return true;
    }
    return false;
  }

  /**
   *
   * @param waste current waste element
   * @returns true or false if collides with waste
   */
  public collidesWithWaste(waste: Waste): boolean {
    if(this.getPosX() < waste.getPosX() + waste.getWidth()
    && this.getPosX() + this.getWidth() > waste.getPosX()
    && this.getPosY() + this.getHeight() > waste.getPosY()
    && this.getPosY() < waste.getPosY() + waste.getHeight()) {
      return true;
    }
    return false;
  }
}
