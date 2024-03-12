import CanvasRenderer from './CanvasRenderer.js';
import LightItem from './LightItem.js';

export default class Cloak extends LightItem {
  private randomSpeed: number;

  private timeEffect: number;

  private randomPos: number;

  private positions: number[][];

  public constructor() {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/cloak.png');
    this.randomSpeed = Math.random() * ((0.3 - 0.1 + 0.1) + 0.1);
    this.speed = this.randomSpeed;
    this.timeEffect = 15;
    this.randomPos = Math.random();
    this.posX = window.innerWidth / 2;
    this.posY = window.innerHeight - this.image.height;
  }

  public override update(elapsed: number): void {
    this.move(elapsed);
  }

  public getTimeEffect(): number {
    return this.timeEffect;
  }

  public move(elapsed: number): void {
    if (this.randomPos <= 0.5) {
      this.posX -= this.speed * elapsed / 2;
      this.posY -= this.speed * elapsed;
    } if (this.randomPos > 0.5) {
      this.posX += this.speed * elapsed / 2;
      this.posY -= this.speed * elapsed;
    }
  }
}
