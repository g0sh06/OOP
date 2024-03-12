import CanvasRenderer from './CanvasRenderer.js';
import ScoreElement from './ScoreElement.js';

export default class Spider extends ScoreElement {
  public constructor(maxX: number) {
    super();
    const percentage: number = Math.floor(Math.random() * 9);
    if (percentage === 0) {
      this.image = CanvasRenderer.loadNewImage('assets/spider01.png');
      this.score = 5;
    } else if (percentage === 1 || percentage === 2) {
      this.image = CanvasRenderer.loadNewImage('assets/spider02.png');
      this.score = 3;
    } else if (percentage === 3 || percentage === 4 || percentage === 5) {
      this.image = CanvasRenderer.loadNewImage('assets/spider03.png');
      this.score = 2;
    } else {
      this.image = CanvasRenderer.loadNewImage('assets/spider04.png');
      this.score = 1;
    }
    this.posX = Math.random() * maxX;
    this.posY = 0;
  } 

  /**
   *
   * @param elapsed variable, which will be added to the Y coordinate every milisecond
   */
  public update(elapsed: number): void {
    this.posY += 0.075 * elapsed;
  }


}
