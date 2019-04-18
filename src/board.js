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

  shouldDie(x, y) {
    const neighbours = this.getNeighbours(x, y);
    return this.populationDeath(x, y, neighbours) === true;
  }

  populationDeath(x, y, neighbours) {
    let alive = 0;
    for (let i = 0; i < neighbours.length; i += 1) {
      if (neighbours[i].isAlive() === true) {
        alive += 1;
      }
    }
    return alive > 3 || alive < 2;
  }

  getCell(x, y) {
    return this.board[x][y];
  }

  getNeighbours(x, y) {
    const neighbours = [];
    const xValues = this.axisNeighbours(x);
    const yValues = this.axisNeighbours(y);
    for (let i = 0; i < xValues.length; i += 1) {
      for (let j = 0; j < yValues.length; j += 1) {
        if (!(xValues[i] === x && yValues[j] === y)) {
          neighbours.push(this.getCell(xValues[i], yValues[j]));
        }
      }
    }
    return neighbours;
  }

  axisNeighbours(coordinate) {
    let axisNeighbours;
    if (coordinate < 1) {
      axisNeighbours = [coordinate, coordinate + 1];
    } else if (coordinate === this.board.length - 1) {
      axisNeighbours = [coordinate - 1, coordinate];
    } else {
      axisNeighbours = [coordinate - 1, coordinate, coordinate + 1];
    }
    return axisNeighbours;
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
        const cell = new Cell();
        this.randomiseStatus(cell);
        this.board[i][j] = cell;
      }
    }
  }

  randomiseStatus(cell) {
    if (Math.random() > 0.8) {
      cell.live();
    }
  }
}

module.exports = Board;

// todo test for board edge cases
