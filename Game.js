

export const Game = (window) => {

    
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
        if (!typeof element == HTMLElement || !typeof  cls=='string') return
    
        if (element.classList.contains(cls)) element.classList.remove(cls);
    }

    const addClass = (element, cls) => {
        if (!typeof element == HTMLElement || !typeof cls == 'string') return
    
        (!element.classList.contains(cls)) ? element.classList.add(cls) : null;
    }

    const startGame = () => {
            setTimeout(() => playIntroAnimation(), 1000);
            setTimeout( () => showMenu(), 9500);
    }
    const showMenu = () => {
        removeClass(menu, 'inactive');
    }
    const hideMenu = () => {
        addClass(menu, 'inactive');
    }



    const playIconAnimation = () => {
        
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
    const test = () => {
        addClass(iconWrapper, 'active');
        setTimeout( () => removeClass(iconWrapper, 'active'), 8000)
    }


    const startMatch = (players) => {
        
        alert(Object.values(players));
        hideMenu();

    }

    const getSelected = () => {
        const selected = [...selectPlayerButtons].map(item => item.classList.contains('checked'));
        [...selectPlayerButtons].forEach( item => item.classList.remove('checked'));
        const matchPlayers = {p1: selected[0] ? 'player' : 'bot',
            p2: selected[2] ? 'player' : 'bot'}


        startMatch(matchPlayers);
    }

    const testBtn = document.querySelector('.test-btn')
    const menu = document.querySelector('.menu');
    const startButton = document.querySelector('.start-btn');
    const selectPlayerButtons = document.querySelectorAll('#selectPlayer-btn');
    const iconWrapper = document.querySelectorAll('.icon-wrapper');

    testBtn.addEventListener('click', (e) => test());
    startButton.addEventListener('click', () => getSelected());
    [...selectPlayerButtons].forEach(b => {
        b.addEventListener('click', (event) => selectPlayer(event));
    })
    

    return { changeText, playIntroAnimation, toggleActive, removeClass, addClass };
}




