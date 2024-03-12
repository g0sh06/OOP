import Key from './Key.js';
import Level from './Level.js';
import Level3 from './Level3.js';
import ScoreItem from './ScoreItem.js';

export default class Level2 extends Level {
  public constructor(maxX: number, maxY: number, startScore: number) {
    super(maxX, maxY, startScore);
    this.lanes.push(160);
    this.lanes.push(285);
    this.lanes.push(410);
    this.level = 2;
  }

  public override spawnNewItem(): void {
    const randomPos = Math.floor(Math.random() * this.lanes.length);
    const percentage = Math.floor(Math.random() * 10);
    if (percentage === 0) {
      this.gameItems.push(new Key(this.lanes[randomPos]))
    } else {
      this.gameItems.push(new ScoreItem(this.lanes[randomPos]));
    }

  }

  public override nextLevel(): Level | null {
    if (this.score >= 1000) {
      return new Level3(this.maxX, this.maxY, this.score);
    }
    return null;
  }
}

