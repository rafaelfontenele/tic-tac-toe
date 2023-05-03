import { Player } from './Player.js';

export const Board = function (p1, p2) {
    let leftPlayer = p1;
    let rightPlayer = p2;
    let boardArr = new Array(9);
    const MIN_BOT_DELAY = 1000;
    const MAX_BOT_DELAY = 2000;
    let winner; 
    let currentTurn;
    let winningMoves = [
        [0, 4, 8],
        [6, 4, 2],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]          
        ]

        
        
    const board = document.querySelector('.board');

    const handleMenuClick = () => alert('menuclick');

    const restartGame = () => {console.log('restartclick')};

    const showBoard = () => {
        if (board.classList.contains('inactive')) {
            board.classList.remove('inactive');
        }

    }

    const checkWinner = () => {
        let winner;


        for (let i=0;i<winningMoves.length;i++) {
            let line = winningMoves[i].map( index => boardArr[index]);

            if (line.includes(undefined)) continue

            if (line[0] === line[1] && line[1] === line[2]) {
                winner = line[0];
                
                return winner
            }

        }
        return winner

    }
    const getEmptyIndexList = () => {
        let emptyIndexes = [];

        for (let i=0;i<boardArr.length;i++) {
            if (boardArr[i] == undefined) {
                emptyIndexes.push(i);
            }
        }
        return emptyIndexes;
    }

    const makePlay = (player, cellIndex) => {
        if (gameIsLocked) {
            return
        }

        if (winner) {
            return
        }

        const boardCells = board.children
        boardArr[cellIndex] = player;
        const cell = boardCells[cellIndex];
        cell.classList.add(...player.getIconClasses());
        
        changeCurrentTurn();

        updateDisplay();

        winner = checkWinner();
        if (winner) {
            document.querySelector('.display')
                .querySelector('.text').textContent = `${winner.name} WON!`
            winner.wins += 1;
            updateDisplay()
            return
            //increaseWinnerWins
            //resetGame
        }
        if (getEmptyIndexList().length == 0) {
            //handle DRAW
            //finish game
            //reset game
    }

    
    const getIconUrl = (player) => {
        const type = (player.bot) ? 'robot' : 'et';
        const color = player.color;
        const url = `${type}_${color}.svg`
        return `url("images/${url}")`;
    }


    const updateDisplay = () => {
        const display = document.querySelector('.display');
        const left = display.querySelector('.left');
        const textDisplay = display.querySelector('.text');
        const right = display.querySelector('.right');

        const [leftIcon, leftWins, leftLosses] = [...left.childNodes].filter(x => x.tagName == 'DIV');
        const [rightIcon, rightWins, rightLosses] = [...right.childNodes].filter(x => x.tagName == 'DIV');
        
        leftIcon.style.backgroundImage = getIconUrl(p1);
        leftWins.innerHTML = `${p1.wins}`
        leftLosses.innerHTML = `${p1.losses}`

        textDisplay.textContent = `${currentTurn.name}'s turn...`

        rightIcon.style.backgroundImage = getIconUrl(p2);
        rightWins.innerHTML = `${p2.wins}`;
        rightLosses.innerHTML = `${p2.losses}`;
        
    }

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellKey = cell.getAttribute('key');
        
        if (boardArr[cellKey] != undefined) {
            return;
        }
        
        if (currentTurn.bot) {
            return
        }
        
        makePlay(currentTurn, cellKey);


    }

    const appendCell = (i) => {
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        newCell.setAttribute( 'key', i);
        newCell.innerHTML = i;
        newCell.addEventListener('click', (e) => handleCellClick(e));
        board.appendChild(newCell);
    }
    const fillBoard = () => {
        
        for (let i=0; i<9; i++) {

            setTimeout(appendCell, 150 * i, i);

        }            

        const boardCells = document.querySelectorAll('.cell');
    }
    
    const handleBot = () => {

        const botPlayIndex = currentTurn.handleBotPlay(boardArr, getEmptyIndexList());

        if (botPlayIndex == -1)  return

        const delay = MIN_BOT_DELAY + (Math.random() * (MAX_BOT_DELAY - MIN_BOT_DELAY));
        setTimeout(makePlay, delay, currentTurn, botPlayIndex);
    }

    const changeCurrentTurn = () => {

        if (currentTurn == p1) {
            currentTurn = p2;
        } else {
            currentTurn = p1;
        }

        if (currentTurn.bot) {
            handleBot();

        }

    }

    const resetGame = () => {
        alert('hi')
    }


    const start = () => {
        const menuBtn = document.querySelector('.menu-btn');
        const restartBtn = document.querySelector('.restart-btn');
        menuBtn.addEventListener('click', handleMenuClick);
        restartBtn.addEventListener('click', resetGame)

        showBoard();
        fillBoard();
        
        
        currentTurn = p1;
        updateDisplay();
        
        if (p1.bot) {
            handleBot();
        }
        
    }




    return {  changeCurrentTurn, showBoard,
         fillBoard, updateDisplay, start }
}

