import { Player } from './Player.js';

export const Board = function (p1, p2) {
    let leftPlayer = p1;
    let rightPlayer = p2;
    let currentTurn = p1;
    let boardArr = new Array(9);
    const maxDelayInMs = 3000;
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


    const showBoard = () => {
        if (board.classList.contains('inactive')) {
            board.classList.remove('inactive');
        }

    }

    const checkWinner = () => {

        for (let i=0;i<winningMoves.length;i++) {
            let indexes = winningMoves[i];
            let line = [boardArr[indexes[0]], boardArr[indexes[1]], boardArr[indexes[2]]]
            if (line.includes(undefined)) return false
            return line[0];
        }

    }

    const makePlay = (player, cellIndex) => {

        const boardCells = board.children
        boardArr[cellIndex] = player;
        const cell = boardCells[cellIndex];
        
        cell.classList.add(...player.getIconClasses());
        
        changeCurrentTurn();

        updateDisplay();

        let winner = checkWinner();

        if (winner) {
            return
            //increaseWinnerWins
            //resetGame
        }
    }
    const getIconUrl = (player) => {
        const type = (player.bot) ? 'robot' : 'et';
        const color = player.color;
        const url = `${type}_${color}.svg`
        return `url("images/${url}")`;
    }

    const pickRandomEmptyIndex = () => {

        const emptyIndexes = boardArr.filter((n, index) => {
            if (n === undefined) {
                return index;
            }
        })

        const randomIndex = Math.floor( Math.random * emptyIndexes.length);

        return randomIndex

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

        if (currentTurn.isBot) {
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
    
    const handleBotPlay = () => {
        const chosenPlayIndex = pickRandomEmptyIndex();
        //const randomPlayDelay = Math.random * maxDelayInMs;
        const randomPlayDelay = 1500;
        setTimeout(makePlay, randomPlayDelay, currentTurn, chosenPlayIndex)
    }


    const getCurrentTurn = () => {
        alert(currentTurn);
    }

    const changeCurrentTurn = () => {

        if (currentTurn == p1) {
            currentTurn = p2;
        } else {
            currentTurn = p1;
        }

        if (currentTurn.bot) {
            handleBotPlay();
        }

    }

    


    return {  changeCurrentTurn, getCurrentTurn, showBoard, fillBoard, updateDisplay }
}

