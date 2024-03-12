import CanvasRenderer from './CanvasRenderer.js';
import GameItem from './GameItem.js';

export default class Dynamite extends GameItem {
  public constructor(posX: number) {
    super();
    this.speed = 0.1;
    this.image = CanvasRenderer.loadNewImage('./assets/dynamite.png');
    this.posX = posX;
    this.posY = 0;
    this.score = 0;
  }

  public override update(elapsed: number): void {
    this.speed += this.speed * 0.005;
    this.posY += this.speed * elapsed;
  }
}
