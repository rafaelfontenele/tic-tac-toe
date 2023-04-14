import { Game } from './Game.js';





const g = new Game(window);

g.changeText(2, 'lala');

const element = window.document.getElementById('1');




function toggle() {
    const cls = 'text'
    const text = document.querySelector(`.${cls}`);
    if (text.classList.contains('active')) {
        text.classList.remove('active');
        text.classList.add('inactive');
    } else {
        text.classList.remove('inactive');
        text.classList.add('active');
    }

}