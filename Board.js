import { Player } from './Player.js';

export const Board = function (p1, p2, replayMenuSelection) {
    let gameIsLocked = false;
    let resetIsLocked = false;
    let boardArr = new Array(9);
    const MIN_BOT_DELAY = 1000;
    const MAX_BOT_DELAY = 2000;
    const GAME_RESET_TRANSITION_DELAY = 3000;
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
    const textDisplay = document.querySelector('.display').querySelector('.text');

    const handleMenuClick = () => {
        resetGame(true);
        replayMenuSelection();        
    };

    const handleResetClick = () => {

        if (resetIsLocked) return;

        resetGame(true)
    };

    const resetGame = (resetStats = false) => {

        lockReset();
        lockGame();

        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        boardArr = new Array(9);

        if (resetStats) {
            p1.wins = 0;
            p2.wins = 0;
            p1.losses = 0;
            p2.losses = 0;
        }


        
        start();
    }

    
    const showBoard = () => {
        if (board.classList.contains('inactive')) {
            board.classList.remove('inactive');
        }

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
    const animateWinningLine = (indexes, color) => {
        for (let i=0;i<indexes.length;i++) {
            let currentCell = board.children[indexes[i]];
            currentCell.classList.add(`${color}Winner`);
        }
    }

    const handleWinner = (winner, indexes) => {
        winner.wins += 1;
        (winner == p1) ? p2.losses+=1 : p1.losses+=1;
        animateWinningLine(indexes, (winner == p1) ? 'red' : 'green');
        updateDisplay(`${winner.name} WINS!`)
        setTimeout( resetGame, GAME_RESET_TRANSITION_DELAY)

    }
    const handleDraw = () => {
        lockGame();
        updateDisplay('Its a DRAW!');
        setTimeout( resetGame, GAME_RESET_TRANSITION_DELAY)
    }

    const checkWinner = () => {
        let winner;
        let winningLine;

        for (let i=0;i<winningMoves.length;i++) {
            let line = winningMoves[i].map( index => boardArr[index]);

            if (line.includes(undefined)) continue

            if (line[0] === line[1] && line[1] === line[2]) {
                winner = line[0];
                winningLine = winningMoves[i];
                break
            }

        }
        return [winner, winningLine]
    }

    const makePlay = (player, cellIndex) => {
        
        if (winner || gameIsLocked) {
            return
        }

        const boardCells = board.children
        boardArr[cellIndex] = player;
        const cell = boardCells[cellIndex];
        cell.classList.add(...player.getIconClasses());
        
        
        updateDisplay();
        
        let indexes;
        [winner, indexes] = checkWinner();
        
        let draw = (getEmptyIndexList().length == 0)
        
        if (winner) {
            handleWinner(winner, indexes);
            return
        }
        
        if (draw) {handleDraw()};
        
        changeCurrentTurn();

        
    }

    const getIconUrl = (player) => {
        const type = (player.bot) ? 'robot' : 'et';
        const color = player.color;
        const url = `${type}_${color}.svg`
        return `url("images/${url}")`;
    }

    const addTextDisplayAnimation = () => {textDisplay.classList.add('animate')}
    const removeTextDisplayAnimation = () => {textDisplay.classList.remove('animate')}


    const updateDisplay = (text = undefined) => {
        const display = document.querySelector('.display');
        const left = display.querySelector('.left');
        const textDisplay = display.querySelector('.text');
        const right = display.querySelector('.right');

        const [leftIcon, leftWins, leftLosses] = [...left.childNodes].filter(x => x.tagName == 'DIV');
        const [rightIcon, rightWins, rightLosses] = [...right.childNodes].filter(x => x.tagName == 'DIV');
        
        leftIcon.style.backgroundImage = getIconUrl(p1);
        leftWins.innerHTML = `${p1.wins}`
        leftLosses.innerHTML = `${p1.losses}`

        if (text == undefined) {
            textDisplay.textContent = `${currentTurn.name}'s turn...`
        } else {
            textDisplay.textContent = text;
            addTextDisplayAnimation()
        }

        rightIcon.style.backgroundImage = getIconUrl(p2);
        rightWins.innerHTML = `${p2.wins}`;
        rightLosses.innerHTML = `${p2.losses}`;
        
    }

    const handleCellClick = (event) => {

        if (gameIsLocked) {
            return
        }

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
    const lockGame = () => {if (!gameIsLocked) gameIsLocked = true};
    const unlockGame = () => {if (gameIsLocked) gameIsLocked = false};
    const lockReset = () => {if (!resetIsLocked) resetIsLocked = true};
    const unlockReset = () => {if (resetIsLocked) resetIsLocked = false}


    const appendCell = (i) => {
        if ([...board.children].length >= 9) return
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        //newCell.innerHTML = i;
        newCell.setAttribute('key', i);
        newCell.addEventListener('click', (e) => handleCellClick(e));
        board.appendChild(newCell)
    }
    
    const fillBoard = () => {
        
        for (let i=0; i<9; i++) {
            setTimeout(appendCell, 150 * i, i);
        }   

            
        
        const boardCells = document.querySelectorAll('.cell');
        //setTimeout(unlockGame, GAME_RESET_TRANSITION_DELAY);
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
    const getFirstToPlay = () => {
        if (p1.bot && p2.bot) {
            const randomChoice = Math.random();
            return (randomChoice < 0.5) ? p1 : p2;
        }

        return p1

    }


    const start = () => {
        const menuBtn = document.querySelector('.menu-btn');
        const resetBtn = document.querySelector('.restart-btn');
        removeTextDisplayAnimation();


        menuBtn.addEventListener('click', handleMenuClick);
        resetBtn.addEventListener('click', handleResetClick)

        showBoard();
        fillBoard();
        
        winner = undefined;
        currentTurn = getFirstToPlay();
        updateDisplay();

        unlockGame();
        setTimeout(unlockReset, 3500);

        if (p1.bot) {
            setTimeout(handleBot, 1000)
        }
        
    }



    return {  changeCurrentTurn, showBoard,
         fillBoard, updateDisplay, start }
}

