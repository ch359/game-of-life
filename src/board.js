const Cell = require('../src/cell');

class Board {
  constructor(size) {
    this.constructBoard(size);
    this.populateBoard();
  }

  shouldReproduce(x, y) {
    const neighbours = this.getNeighbours(x, y);
    let alive = 0;
    for (let i = 0; i < neighbours.length; i += 1) {
      if (neighbours[i].isAlive() === true) {
        alive += 1;
      }
    }
    return alive === 3;
  }

  getCell(x, y) {
    return this.board[x][y];
  }

  getNeighbours(x, y) {
    const neighbours = [];
    const xValues = [x - 1, x, x + 1];
    const yValues = [y - 1, y, y + 1];
    for (let i = 0; i < xValues.length; i += 1) {
      for (let j = 0; j < yValues.length; j += 1) {
        if (!(xValues[i] === x && yValues[j] === y)) {
          neighbours.push(this.getCell(xValues[i], yValues[j]));
        }
      }
    }
    return neighbours;
  }

  allDead() {
    let allDead = true;
    for (let i = 0; i < this.board.length; i += 1) {
      for (let j = 0; j < this.board[i].length; j += 1) {
        if (this.board[i][j].isAlive() === true) {
          allDead = false;
          break;
        }
      }
    }
    return allDead;
  }

  constructBoard(size) {
    this.board = new Array(size);
    for (let i = 0; i < this.board.length; i += 1) {
      this.board[i] = new Array(size);
    }
  }

  populateBoard() {
    for (let i = 0; i < this.board.length; i += 1) {
      for (let j = 0; j < this.board.length; j += 1) {
        this.board[i][j] = new Cell();
      }
    }
  }
}

module.exports = Board;
