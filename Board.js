import { Player } from './Player.js';

export const Board = function (p1, p2) {

    let currentTurn = p1;
    let boardArr = new Array(9);


    const board = document.querySelector('.board');
    

    //boardCells.addEventListener('click', () => alert('click'))

    const showBoard = () => {
        if (board.classList.contains('inactive')) {
            board.classList.remove('inactive');
        }

    }

    const makePlay = (player, cell) => {
        const cellKey = cell.getAttribute('key');
        cell.style.backgroundColor = 'red';
        boardArr[cellKey] = player;
        console.log(boardArr);
        

    }

    const handleCellClick = (event) => {
        const cell = event.target;

        if (currentTurn.isBot) {
            console.log('isBot');
            return
        }

        makePlay(currentTurn, cell);


    }

    const appendCell = (i) => {
        console.log(i);
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
        alert(currentTurn.name);
    }

    const changeCurrentTurn = () => {
        if (currentTurn == p1) {
            currentTurn = p2;
        } else {
            currentTurn = p1;
        }
    }

    


    return {  changeCurrentTurn, getCurrentTurn, showBoard, fillBoard }
}

