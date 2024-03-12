import CanvasRenderer from './CanvasRenderer.js';
import Level from './Level.js';
import MouseListener from './MouseListener.js';
import Scene from './Scene.js';
import SceneWin from './SceneWin.js';

export default class SceneStart extends Scene {
  private logo: HTMLImageElement;

  private starting: boolean;

  private sceneWin: SceneWin;

  public constructor(maxX: number, maxY: number) {
    super(maxX, maxY);
    this.logo = CanvasRenderer.loadNewImage('./assets/logo.png');
    this.starting = false;
  }

  public override processInput(mouseListener: MouseListener): void {
    if (mouseListener.buttonPressed(MouseListener.BUTTON_LEFT)) {
      this.starting = true;
    }
  }

  public override update(elapsed: number): void {

  }

  public override render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.fillCanvas(canvas, '#ad8b5c');
    CanvasRenderer.drawImage(canvas, this.logo, 300, 100);
    CanvasRenderer.writeText(canvas, 'Click to start', canvas.width / 2, 800, 'center', 'Arial', 56, 'white');
  }

  public override getNextScene(): Scene | null {
    if (this.starting) {
      return new Level(this.maxX, this.maxY);
    }
    return null;
  }

}
