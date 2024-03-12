import Dynamite from './Dynamite.js';
import Key from './Key.js';
import Level from './Level.js';
import ScoreItem from './ScoreItem.js';

export default class Level4 extends Level {
  public constructor(maxX: number, maxY: number, startScore: number) {
    super(maxX, maxY, 1500);
    this.lanes = [];
    this.lanes.push(35);
    this.lanes.push(160);
    this.lanes.push(285);
    this.lanes.push(410);
    this.lanes.push(535);
    this.level = 4;
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
    return null
  }
}
