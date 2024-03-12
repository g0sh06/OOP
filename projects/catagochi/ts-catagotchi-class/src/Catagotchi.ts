import Cattrubite from "./Cattribute.js";

export default class Catagotchi {
  private catAlive: boolean;
  private catstatus: string;
  private catMood: Cattrubite;
  private catEnergy: Cattrubite;
  private catHunger: Cattrubite;

  public constructor(catAlive: boolean, catStatus: string) {
    this.catAlive = catAlive;
    this.catstatus = catStatus;
    this.catMood = new Cattrubite(10);
    this.catEnergy = new Cattrubite(10);
    this.catHunger = new Cattrubite(0);
  }

  public feed(): void{
    this.catHunger.decrease();
  }

  public play(): void{
     this.catMood.increase();
     this.catEnergy.decrease();
  }

  public pet(): void{
    this.catEnergy.increase();
    this.catHunger.increase();
  }

  public catDied(){
    if (this.catEnergy.getValue() <= 0) { this.catAlive = false; }
    if (this.catHunger.getValue()>= 10) { this.catAlive = false; }
  }

  public updateStatus(): void {
    if(this.catEnergy.getValue() < 4 || this.catMood.getValue() < 4 || this.catHunger.getValue() > 6) this.catstatus == "Okay";
    else if(this.catEnergy.getValue() < 2 || this.catMood.getValue() < 2 || this.catHunger.getValue() > 8) this.catstatus == "Unhappy";
    else{ this.catstatus == "Happy"; }
  }



  /**
   * Update the state of Catagotchi according to rules
   */
  public updateCat(): void {
    this.catHunger.increase();
    this.catEnergy.decrease();
    this.catMood.decrease();
    this.catDied();
    this.updateStatus();
  }

  /**
   * Update the screen of the Catagotchi
   * TODO: Complete this function.
   *
   * @returns String with the output for the screen
   */
  public getScreen(): string {
    if (this.catAlive) {
      return `Catagotchi!<br>
      Status: ${this.catstatus}<br>
      Mood:   ${this.catMood.getValue()}<br>
      Energy: ${this.catEnergy.getValue()}<br>
      Hunger: ${this.catHunger.getValue()}`;
    }
    return 'Catagotchi Dead!';
  }
}
