import CanvasRenderer from './CanvasRenderer.js';
import Meteor from './Meteor.js';
import Shield from './Shield.js';

export default class Player {
  private image: HTMLImageElement;

  private speed: number;

  private acceleration: number;

  private posX: number;

  private posY: number;

  private accelerateUp: boolean;

  private accelerateDown: boolean;

  public constructor(maxX: number, maxY: number) {
    this.image = CanvasRenderer.loadNewImage('./assets/ship.png');
    this.speed = 2;
    this.acceleration = 0;
    this.posX = maxX;
    this.posY = Math.random() * maxY;
  }

  public isCollidingMeteor(meteor: Meteor): boolean {
    if (this.posX + this.image.width >= meteor.getPosX()
      && meteor.getPosY() + meteor.getHeight() >= this.posY
      && this.posY + this.image.height >= meteor.getPosY()) {
      return true;
    }
    return false;
  }

  public isCollidingShield(shield: Shield): boolean {
    if (this.posX + this.image.width >= shield.getPosX()
      && shield.getPosY() + shield.getHeight() >= this.posY
      && this.posY + this.image.height >= shield.getPosY()) {
      return true;
    }
    return false;
  }

  public moveUp(): void {
    this.acceleration -= 0.25;
  }

  public moveDown(): void {
    this.acceleration += 0.25;
  }

  public setPosY(posY: number): void {
    this.posY = posY;
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

  public update(): void {
    this.posY += this.acceleration;
  }

  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
