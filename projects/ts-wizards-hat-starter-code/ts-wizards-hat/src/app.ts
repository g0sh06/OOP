import WizardsHat from './WizardsHat.js';

const wizardsHat: WizardsHat = new WizardsHat(document.getElementById('game') as HTMLCanvasElement);

window.addEventListener('load', () => {
  wizardsHat.start();
});
