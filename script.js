'use strict';

class GameBoard {
    constructor(x, y) {
        this._height = x;
        this._width = y;
        this._board = Array.from({length:x}, () => Array(y).fill(0));
        this._score = 0;
        this._initBoard();
    }

    get get_board() {
        return Array.from(this._board, (row) => [...row]);
    }

    get get_score() {
        return this._score;
    }

    // Logic to move all tiles left, right, up or down

    moveLeft() {
        for (let i = 0; i < this._height; i++) {
            
            for (let j = 1; j < this._width; j++) {
                let k = j-1;
                while (k > 0 && this._board[i][k] == 0) {
                    k--;
                }
                if (this._board[i][k] == 0) {
                    this._board[i][k] = this._board[i][j];
                    this._board[i][j] = 0;
                }
                else if (this._board[i][k] == this._board[i][j]){
                    this._board[i][k] += this._board[i][j];
                    this._score += this._board[i][k];
                    this._board[i][j] = 0;
                }
                else if (Math.abs(j-k) > 1){
                    this._board[i][k+1] = this._board[i][j];
                    this._board[i][j] = 0;
                }
            }
        }
    }

    moveRight() {
        for (let i = 0; i < this._height; i++) {
            
            for (let j = this._width - 2; j >= 0; j--) {
                let k = j+1;
                while (k < this._width - 1 && this._board[i][k] == 0) {
                    k++;
                }
                if (this._board[i][k] == 0) {
                    this._board[i][k] = this._board[i][j];
                    this._board[i][j] = 0;
                }
                else if (this._board[i][k] == this._board[i][j]){
                    this._board[i][k] += this._board[i][j];
                    this._score += this._board[i][k];
                    this._board[i][j] = 0;
                }
                else if (Math.abs(j-k) > 1){
                    this._board[i][k-1] = this._board[i][j];
                    this._board[i][j] = 0;
                }
            }
        }
    }

    moveUp() {
        for (let j = 0; j < this._width; j++) {
            
            for (let i = 1; i < this._height; i++) {
                let k = i-1;
                while (k > 0 && this._board[k][j] == 0) {
                    k--;
                }
                if (this._board[k][j] == 0) {
                    this._board[k][j] = this._board[i][j];
                    this._board[i][j] = 0;
                }
                else if (this._board[k][j] == this._board[i][j]){
                    this._board[k][j] += this._board[i][j];
                    this._score += this._board[k][j];
                    this._board[i][j] = 0;
                }
                else if (Math.abs(i-k) > 1){
                    this._board[k+1][j] = this._board[i][j];
                    this._board[i][j] = 0;
                }
            }
        }
    }

    moveDown() {
        for (let j = 0; j < this._width; j++) {
            
            for (let i = this._height - 2; i >= 0; i--) {
                let k = i+1;
                while (k < this._height - 1 && this._board[k][j] == 0) {
                    k++;
                }
                if (this._board[k][j] == 0) {
                    this._board[k][j] = this._board[i][j];
                    this._board[i][j] = 0;
                }
                else if (this._board[k][j] == this._board[i][j]){
                    this._board[k][j] += this._board[i][j];
                    this._score += this._board[k][j];
                    this._board[i][j] = 0;
                }
                else if (Math.abs(i-k) > 1){
                    this._board[k-1][j] = this._board[i][j];
                    this._board[i][j] = 0;
                }
            }
        }
    }


    addCellRandom(value) {
        const emptyCells = this._getEmptyCells();
        if (emptyCells.length == 0) {
            return;
        }
        const randIndex = Math.floor(Math.random() * emptyCells.length);
        this._board[emptyCells[randIndex][0]][emptyCells[randIndex][1]] = value;
    }

    ///////////////////////////////////////////////////
    //       PRIVATE METHODS                         //
    //////////////////////////////////////////////////
    _initBoard() {
        this.addCellRandom(2);
        this.addCellRandom(2);
    }

    _getEmptyCells() {
        const emptyCells = []
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                if (this._board[i][j] == 0) {
                    emptyCells.push([i, j]);
                }
            }
        }
        return emptyCells;
    }
}



class Game2048 {
    constructor() {
        this._gameBoard = new GameBoard(4, 4);
        this._bestScore = 0;
        this._printBoard();
        // Bind the event listener method to the class instance
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Register the event listener
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.keyCode === 37 || event.key === 'ArrowLeft') {
          // Left key pressed
          this._gameBoard.moveLeft();
          event.preventDefault();
        } else if (event.keyCode === 38 || event.key === 'ArrowUp') {
          // Up key pressed
          this._gameBoard.moveUp();
          event.preventDefault();
        } else if (event.keyCode === 39 || event.key === 'ArrowRight') {
          // Right key pressed
          this._gameBoard.moveRight();
          event.preventDefault();
        } else if (event.keyCode === 40 || event.key === 'ArrowDown') {
          // Down key pressed
          this._gameBoard.moveDown();
          event.preventDefault();
        }
        this._gameBoard.addCellRandom(2);
        this._bestScore = Math.max(this._bestScore, this._gameBoard.get_score);
        this._printBoard();
    }

    _printBoard() {
        const board = this._gameBoard.get_board;
        const table = document.querySelector('.gameboard');
        table.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('td');
                if (board[i][j] > 0) {
                    cell.textContent = board[i][j];
                }
                cell.classList.add('cell');
                cell.classList.add(`num${board[i][j]}`);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

}

const myGame = new Game2048();