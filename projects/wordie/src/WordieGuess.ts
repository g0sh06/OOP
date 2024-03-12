import GuessLetter from "./GuessLetter.js";

export default class WordieGuess {

  private letters: GuessLetter[];

  public constructor(answer: string, guess: string){
    for(let i = 0; guess.length; i++){
      this.letters.push(new GuessLetter(guess[i]));
    }
  }

  public getLetter(){
    return this.letters;
  }

  public checkLetter(answer: string){
    for(let i = 0; i < this.letters.length; i++){
      // check if letter exist
      if(answer.includes(this.letters[i].getLetter())){
       this.letters[i].setCorrectLetter();
      }
    }
    //check if letter exists and it is on the right place
    for(let i = 0; i < this.letters.length; i++){
      if(answer[i] === this.letters[i].getLetter()){
       this.letters[i].setCorrectPlace();
      }
    }
  }

  public writeGuess(): HTMLDivElement{
    const divElement = document.createElement('div');
    for(let i = 0; i < this.letters.length; i++){
      divElement.appendChild(this.letters[i].writeLetter());
    }
    return divElement;
  }


}
