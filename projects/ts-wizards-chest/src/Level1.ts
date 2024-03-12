import Level from './Level.js';
import Level2 from './Level2.js';
import ScoreItem from './ScoreItem.js';

export default class Level1 extends Level {
  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY, 0);
    this.lanes.push(120);
    this.lanes.push(285);
    this.lanes.push(450);
  }

  public override spawnNewItem(): void {
    const randomPos = Math.floor(Math.random() * this.lanes.length)
    this.gameItems.push(new ScoreItem(this.lanes[randomPos]));
  }

  public override nextLevel(): Level | null{
    if(this.score >= 500) {
      return new Level2(this.maxX, this.maxY, this.score);
    }
    return null;
  }
}

