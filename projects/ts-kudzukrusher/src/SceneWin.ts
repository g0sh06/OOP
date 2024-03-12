import CanvasRenderer from './CanvasRenderer.js';
import Level from './Level.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';

export default class SceneWin extends Scene {

  private continue: boolean;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.continue = false;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.continue = true;
    }

  }

  public override update(elapsed: number): void {


  }

  public override getNextScene(): Scene | null {
    if (this.continue) {
      return new SceneWin(this.maxX, this.maxY);
    }
    return null;
  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#ad8b5c');
    CanvasRenderer.writeText(canvas, 'You win', canvas.width / 2, canvas.height / 2, 'center', 'Arial', 56, 'white');
    CanvasRenderer.writeText(canvas, 'Click to continue', canvas.width / 2, 500, 'center', 'Arial', 56, 'white');
  }
}
