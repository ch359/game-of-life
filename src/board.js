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
      // console.log('should reproduce neighbours: ', neighbours, i);
      if (neighbours[i].isAlive() === true) {
        alive += 1;
      }
    }
    return alive === 3;
  }

  getCell(x, y) {
    // console.log('Get cell - ---------------------');
    // console.log('I am the problematic board:', this.board);
    // console.log('My length is: ', this.board.length);
    // console.log('X and y are: ', x, y, 'respectively');
    // console.log('End of Get cell -------------');
    return this.board[x][y];
  }

  getNeighbours(x, y) {
    // console.log('I am the problematic board:', this.board);
    // console.log('My length is: ', this.board.length);
    // console.log('X and y are: ', x, y, 'respectively');
    const neighbours = [];
    // console.log('Line 31 neighbours is: ', neighbours);
    const xValues = this.xValues();
    const yValues = this.yValues();
    // console.log('switch x is: ', x);
    // console.log('x and y values are', xValues, yValues, 'respectively');
    for (let i = 0; i < xValues.length; i += 1) {
      for (let j = 0; j < yValues.length; j += 1) {
        // console.log('i is: ', i);
        // console.log('j is: ', j);
        if (!(xValues[i] === x && yValues[j] === y)) {
          // console.log('triggered by i and j of ', i, j);
          // console.log('xValues', xValues);
          // console.log('yValues', yValues);
          // console.log('getCell', this.getCell(xValues[i], yValues[j]));
          neighbours.push(this.getCell(xValues[i], yValues[j]));
          // console.log('neighbours after pushing i and j: ', i, j, neighbours);
        }
      }
    }
    return neighbours;
  }

  xValues(x) {
    let xValues;
    if (x < 1) {
      // console.log('x less than one triggered!');
      xValues = [x, x + 1];
      // console.log('case xvalues is: ', xValues);
    } else if (x === this.board.length - 1) {
      xValues = [x - 1, x];
    } else {
      xValues = [x - 1, x, x + 1];
    }
    return xValues;
  }

  yValues(y) {
    let yValues;
    if (y < 1) {
      yValues = [y, y + 1];
    } else if (y === this.board.length - 1) {
      yValues = [y - 1, y];
    } else {
      yValues = [y - 1, y, y + 1];
    }
    return yValues;
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

// todo test for board edge cases
