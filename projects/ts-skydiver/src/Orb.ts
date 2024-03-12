import CanvasRenderer from './CanvasRenderer.js';
import LightItem from './LightItem.js';

export default class Orb extends LightItem {
  private chance: number;

  private randomX: number;

  public constructor() {
    super();
    this.chance = Math.floor(Math.random() * 99);
    if (this.chance <= 32) {
      this.image = CanvasRenderer.loadNewImage('./assets/orb1.png');
      this.lightForce = 1;
    }
    if (this.chance > 32 && this.chance <= 65) {
      this.image = CanvasRenderer.loadNewImage('./assets/orb2.png');
      this.lightForce = 3;
    }
    if (this.chance > 65) {
      this.image = CanvasRenderer.loadNewImage('./assets/orb3.png');
      this.lightForce = 5;
    }
    this.speed = 0.2;
    this.randomX = Math.floor(Math.random() * window.innerWidth);
    this.posX = this.randomX;
    this.posY = window.innerHeight - this.image.height;
  }

  public override update(elapsed: number): void {
    this.posY -= elapsed * this.speed;
  }

  public override getLightForce(): number {
    return this.lightForce;
  }
}
