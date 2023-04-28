import { Player } from './Player.js';

export const Board = function (p1, p2) {
    let leftPlayer = p1;
    let rightPlayer = p2;
    let currentTurn = p1;
    let boardArr = new Array(9);
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

    const makePlay = (player, cell) => {

        const cellKey = cell.getAttribute('key');
        boardArr[cellKey] = player;

        console.log(boardArr);        
        
        
        cell.classList.add(...player.getIconClasses());
        
        changeCurrentTurn();


        let winner = checkWinner();

        if (winner) {
            return
            //increaseWinnerWins
            //resetGame
        }
    }

    const updateDisplay = () => {
        const display = document.querySelector('.display');
        const left = display.querySelector('.left');
        const textDisplay = display.querySelector('.text');
        const right = display.querySelector('.right');

        const leftChildren = [...left.childNodes].filter(x => x.tagName == 'DIV');
        
        leftChildren[0].style.backgroundImage = "url('images/et_red.svg')";
        console.log(leftChildren)
    }

    const handleCellClick = (event) => {
        const cell = event.target;
        if (cell.classList.length != 1) {
            return
        }

        if (currentTurn.isBot) {
            console.log('isBot');
            return
        }

        makePlay(currentTurn, cell);


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
    
    const getCurrentTurn = () => {
        alert(currentTurn);
    }

    const changeCurrentTurn = () => {

        if (currentTurn == p1) {
            currentTurn = p2;
        } else {
            currentTurn = p1;
        }

    }

    


    return {  changeCurrentTurn, getCurrentTurn, showBoard, fillBoard, updateDisplay }
}

