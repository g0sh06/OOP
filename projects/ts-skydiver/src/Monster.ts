import CanvasRenderer from './CanvasRenderer.js';
import LightItem from './LightItem.js';

export default class Monster extends LightItem {
  private chance: number;

  private randomX: number;

  private randomSpeed: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 99);
    if(this.chance <= 49) {
      this.image = CanvasRenderer.loadNewImage('./assets/monster1.png');
      this.lightForce = 10;
    }
    if(this.chance > 49 && this.chance <= 79) {
      this.image = CanvasRenderer.loadNewImage('./assets/monster2.png');
      this.lightForce = 20;
    }
    if(this.chance > 79) {
      this.image = CanvasRenderer.loadNewImage('./assets/monster3.png');
      this.lightForce = 30;
    }
    this.speed = 0.3;
    this.randomX = Math.floor(Math.random() * window.innerWidth);
    this.posX = this.randomX;
    this.posY = window.innerHeight - this.image.height;
  }

  public override update(elapsed: number): void {
   this.posY -= elapsed * this.speed;
  }

  public setPosX(posX: number): void {
    this.posX = posX;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
  }

  public override getLightForce(): number {
    return this.lightForce;
  }
}
