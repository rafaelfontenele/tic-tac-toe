import { Board } from './Board.js';
import { Player } from './Player.js';


export const Game = function (window) {
    const hello = () => alert('hello');
    
    const playIntroAnimation = () => {
        const ttt = document.querySelector('.ttt-text');
        removeClass( ttt, 'inactive');
        const [tik, tak, toe] = ttt.children;
        addClass(ttt, 'animate');
        setTimeout(() => {
            tik.style.opacity = 1;
            tak.style.opacity = 1;
            toe.style.opacity = 1;
        }, 5000)
        setTimeout(() => removeClass(ttt, 'animate'), 6000);
        tik.style.opacity = 0.4;
        tak.style.opacity = 0.4;
        toe.style.opacity = 0.4;
    }
    
    const changeText = (id,newText) => {
        const element = window.document.getElementById(id);
        window.alert(element.textContent);
        element.textContent = newText;
    }

    const toggleActive = (element) => {
        const clsList = element.classList;
        if (clsList.contains('inactive') && clsList.contains('active')) {
            return
            //element.classList.remove('inactive');
            //element.classList.remove('active');
        } else {
        if (clsList.contains('inactive')) {
            element.classList.remove('inactive');
            element.classList.add('active');
        } else {
            element.classList.remove('active');
            element.classList.add('inactive');
        }
        }
    }

    const removeClass = (element, cls) => {
        if (!typeof element == Object || !typeof  cls=='string') return
    
        if (element.classList.contains(cls)) {
            element.classList.remove(cls);
        }
    }

    const addClass = (element, cls) => {
        if (!typeof element == Object || !typeof cls == 'string') return
    
        if (!element.classList.contains(cls)) {
            element.classList.add(cls);
        }
    }

    const startGame = () => {
            setTimeout(() => playIntroAnimation(), 1000);
            setTimeout( () => showMenu(), 9500);
    }
    
    
    const selectPlayer = (event)  => {
        const clickedButton = event.target;
        const value = clickedButton.value;
        if (value == 1 || value == 2) {
            selectPlayerButtons[0].classList.remove('checked');
            selectPlayerButtons[1].classList.remove('checked');
        }    else{
            selectPlayerButtons[2].classList.remove('checked');
            selectPlayerButtons[3].classList.remove('checked');
        }
        
        clickedButton.classList.add('checked');
        
        const leftSideSelected = selectPlayerButtons[0].classList.contains('checked') || selectPlayerButtons[1].classList.contains('checked')
        const rightSideSelected = selectPlayerButtons[2].classList.contains('checked') || selectPlayerButtons[3].classList.contains('checked')
        
        if (leftSideSelected && rightSideSelected) {
            startButton.disabled = false;
        } else {
            startButton.disabled = true;
        }
        
        
        
    }


    const showMenu = () => {

        [...selectPlayerButtons].forEach( (button) => {
            removeClass(button, 'checked')
        });


        removeClass(menu, 'inactive');
    }
    const hideMenu = () => {
        addClass(menu, 'inactive');
    }


    const showGameDisplay = () => {
        const game = document.querySelector('.game');
        removeClass(game, 'inactive');
    }
    
    const hideGameDisplay = () => {
        const game = document.querySelector('.game');
        addClass(game, 'inactive'); 
    }

    const playIconAnimation = (players) => {
        const leftIcons = iconWrapper.querySelectorAll('.left');
        const rightIcons = iconWrapper.querySelectorAll('.right');
        const p1 = players['p1'];
        const p2 = players['p2'];

        iconWrapper.classList.remove('inactive');
        if (p1 == 'player') {
            leftIcons[0].classList.add('active');
        } else {
            leftIcons[1].classList.add('active');
        }
        if (p2 == 'player') {
            rightIcons[0].classList.add('active');
        } else {
            rightIcons[1].classList.add('active');
        }

        setTimeout( () => {
            addClass(iconWrapper, 'inactive');
            leftIcons.forEach(icon => removeClass(icon, 'active'));
            rightIcons.forEach(icon => removeClass(icon, 'active'))
        }, 5000)
    }

    const replayMenuSelection = () => {
        hideGameDisplay();        
        setTimeout(showMenu, 2000);
    }

    const startMatch = (players) => {
        const player1 = players['p1'];
        const player2 = players['p2'];
        const p1 = Player(`${player1 == 'player' ? 'Red Player' : 'Red Bot'}`,
         player1 == 'bot', 'red');

        const p2 = Player(`${player2 == 'player' ? 'Green Player' : 'Green Bot'}`,
         player2 == 'bot', 'green');

         hideMenu();

         
        // setTimeout( () =>         playIconAnimation(players), 3000)
        
        // setTimeout( () =>                 {
        //     showGameDisplay();
        //     const b = Board(p1, p2, replayMenuSelection);
        //     b.start();
        //    }, 9000) 


        
            showGameDisplay();
            const b = Board(p1, p2, replayMenuSelection);
            b.start();
            
            
    }


    const getSelected = () => {
        addClass(startButton, 'checked');
        const selected = [...selectPlayerButtons].map(item => item.classList.contains('checked'));
        
        const matchPlayers = {p1: selected[0] ? 'player' : 'bot',
            p2: selected[2] ? 'player' : 'bot'}

           //matchPlayers == [p1 = player/bot, p2 = player/bot] 
        startMatch(matchPlayers);
    }

    const testBtn = document.querySelector('.test-btn')
    const menu = document.querySelector('.menu');
    const startButton = document.querySelector('.start-btn');
    const selectPlayerButtons = document.querySelectorAll('#selectPlayer-btn');
    const iconWrapper = document.querySelector('.icon-wrapper');

    startButton.addEventListener('click', () => getSelected());
    [...selectPlayerButtons].forEach(b => {
        b.addEventListener('click', (event) => selectPlayer(event));
    })
    
    //showMenu();

    startMatch({'p1': 'player', 'p2':'player'});
    


    return { changeText, playIntroAnimation, toggleActive, removeClass, addClass };
}




