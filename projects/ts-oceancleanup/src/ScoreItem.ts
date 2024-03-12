import CanvasItem from './CanvasItem.js';

export default abstract class ScoreItem extends CanvasItem {
  protected score: number;

  protected speed: number;

  /**
   *
   * @param elapsed time elapsed
   */
  public update(elapsed: number): void { };

  public getScore(): number {
    return this.score;
  }

  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  public setScore(score: number): void {
    this.score = score;
  }
}
