export default class Cattrubite{
  private value: number;

  public constructor(value: number){
    this.value = value;
  }

  public increase(): void{
    this.value++;
  }

  public decrease(){
    this.value--;
  }

  public getValue(){
    return this.value;
  }
}
