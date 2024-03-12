import NumberDisplay from "./NumberDisplay.js";


export default class Clockdisplay {
  private display: HTMLDivElement;

  private hours: NumberDisplay;

  private minutes: NumberDisplay;

  private seconds: NumberDisplay;

  public constructor(display: HTMLDivElement) {
    this.hours = new NumberDisplay(24);
    this.minutes = new NumberDisplay(60);
    this.seconds = new NumberDisplay(60);
    this.display = display;
  }

  public timeTIck(): void {
    this.seconds.increment();
    if (this.seconds.getValue() === 0) {
      this.minutes.increment();
      if (this.minutes.getValue() === 0) {
        this.hours.increment();
      }
    }

    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.display.innerHTML = `${this.hours.getValue()}:${this.minutes.getValue()}:${this.seconds.getValue()}`;
  }
}
