import CanvasItem from './CanvasItem.js';

export default abstract class ScoreItem extends CanvasItem {
  protected score: number;

  protected timeToLive: number;

  /**
   *updating the scoreitem
   * @param elapsed time elapsed
   */
  public update(elapsed: number): void {
    this.timeToLive -= 0.1 * elapsed;
  }

  public getScore(): number {
    return this.score;
  }

  /**
   * @returns true, if it should be removed/false, if not
   */
  public abstract shouldremove(): boolean;


  public getTimeToLive(): number {
    return this.timeToLive;
  }

  public getShouldRemove(): boolean {
    return this.shouldremove();
  }

  public setTimeToLive(timeToLive: number): void {
    this.timeToLive = timeToLive;
  }
}
