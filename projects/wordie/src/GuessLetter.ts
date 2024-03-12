export default class GuessLetter {
  private letter: string;

  private isCorrectLetter: boolean;

  private isCorrectPlace: boolean;

  public constructor(letter: string) {
    this.letter = letter;
  }

  public getLetter(){
    return this.letter;
  }

  // if the letter exists and is not in the right place
  public setCorrectLetter(): void {
   this.isCorrectLetter = true;
  }
  // if the letter exists and is in the right place
  public setCorrectPlace(): void {
   this.isCorrectPlace = true;
  }

  public writeLetter(): HTMLDivElement {
   const divElement = document.createElement('div');
   divElement.innerHTML = this.letter;
   if(this.isCorrectLetter == true){
    divElement.style.color = 'blue';
   }
   else if(this.isCorrectPlace == true){
    divElement.style.color = 'green';
   }

   return divElement;

  }



}
