import CanvasRenderer from './CanvasRenderer.js';
import ScoreElement from './ScoreElement.js';

export default class Fruit extends ScoreElement {

  public constructor(maxX: number) {
    super();
    const percentage: number = Math.floor(Math.random() * 9);
    if (percentage <= 1) {
      this.image = CanvasRenderer.loadNewImage('assets/fruit-cherries.png');
      this.score = 10;
    } else if (percentage === 2 || percentage === 3) {
      this.image = CanvasRenderer.loadNewImage('assets/fruit-strawberry.png');
      this.score = 7;
    } else if (percentage === 3 || percentage === 5) {
      this.image = CanvasRenderer.loadNewImage('assets/fruit-orange.png');
      this.score = 5;
    } else if (percentage === 6 || percentage === 7) {
      this.image = CanvasRenderer.loadNewImage('assets/fruit-grapes.png');
      this.score = 3;
    } else {
      this.image = CanvasRenderer.loadNewImage('assets/fruit-banana.png');
      this.score = 3;
    }
    this.posX = Math.random() * maxX;
    this.posY = 0;
  }


  /**
   * @param elapsed adding additional speed to the fruits
   */
  public update(elapsed: number): void {
    this.posY += 0.15 * elapsed;
  }

}
