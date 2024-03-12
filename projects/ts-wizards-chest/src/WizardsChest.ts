import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Level from './Level.js';
import Level1 from './Level1.js';
import Level2 from './Level2.js';
import Level3 from './Level3.js';
import Level4 from './Level4.js';
import ScoreItem from './ScoreItem.js';

export default class WizardsChest extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private currentLevel: Level;

  /**
   * Create a new instance of the game.
   *
   * @param canvas HTML canvas where the game should be rendered
   */
  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = 600;
    this.keyListener = new KeyListener();

    this.currentLevel = new Level1(canvas.width, canvas.height);
    this.currentLevel.startLevel();

  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    // TODO: process input
    this.currentLevel.processInput(this.keyListener);
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param elapsed time elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(elapsed: number): boolean {
    // TODO: update game state
    this.currentLevel.update(elapsed);

    // TODO: check if there is a new level to load
    const newLevel: Level = this.currentLevel.nextLevel();
    if(newLevel != null) {
      this.currentLevel = newLevel;
      this.currentLevel.startLevel();
    }
    return true;
  }

  /**
   * Render all the elements in the screen. Called from GameLoop
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);
    // TODO: render the current level
    this.currentLevel.render(this.canvas);
  }
}
