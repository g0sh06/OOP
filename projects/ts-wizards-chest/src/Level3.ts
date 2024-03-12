import Dynamite from './Dynamite.js';
import Key from './Key.js';
import Level from './Level.js';
import Level4 from './Level4.js';
import ScoreItem from './ScoreItem.js';

export default class Level3 extends Level {
  public constructor(maxX: number, maxY: number, startScore: number) {
    super(maxX, maxY, startScore);
    this.lanes = [];
    this.lanes.push(85);
    this.lanes.push(210);
    this.lanes.push(335);
    this.lanes.push(460);
    this.level = 3;
  }

  public override spawnNewItem(): void {
    const randomPos = Math.floor(Math.random() * this.lanes.length);
    const percentage = Math.floor(Math.random() * 10);
    if (percentage === 0) {
      this.gameItems.push(new Key(this.lanes[randomPos]))
    } else if (percentage === 1) {
      this.gameItems.push(new Dynamite(this.lanes[randomPos]));
    } else {
      this.gameItems.push(new ScoreItem(this.lanes[randomPos]));
    }

  }

  public override nextLevel(): Level | null {
    if (this.score >= 1500) {
      return new Level4(this.maxX, this.maxY, this.score);
    }
    return null
  }
}
