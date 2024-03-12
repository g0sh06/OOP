import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';
import Cloak from './Cloak.js';
import Monster from './Monster.js';
import Orb from './Orb.js';

export default class Player extends CanvasItem {
  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = window.innerHeight - this.image.height;
    this.posY = 40;
  }

  public moveLeft(): void {
    this.posX -= 10;
  }

  public moveRight(): void {
    this.posX += 10;
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  public isCollidingWithOrb(orb: Orb): boolean {
    if (orb.getPosX() + orb.getWidth() >= this.posX
      && orb.getPosX() <= this.posX + this.getWidth()
      && orb.getPosY() + orb.getHeight() >= this.posY
      && orb.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }

  public isCollidingWithMonster(monster: Monster): boolean {
    if (monster.getPosX() + monster.getWidth() >= this.posX
      && monster.getPosX() <= this.posX + this.getWidth()
      && monster.getPosY() + monster.getHeight() >= this.posY
      && monster.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }

  public isCollidingWithCloaks(cloak: Cloak): boolean {
    if (cloak.getPosX() + cloak.getWidth() >= this.posX
      && cloak.getPosX() <= this.posX + this.getWidth()
      && cloak.getPosY() + cloak.getHeight() >= this.posY
      && cloak.getPosY() <= this.posY + this.getHeight()) {
      return true;
    }
    return false;
  }
}
