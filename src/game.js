const Board = require('../src/board');

class Game {
  constructor() {
    console.log('Constructor has activated!');

    this.canvas = document.getElementById('gameCanvas');
    this.canvasProperties = {
      width: 500,
      height: 500,
      gridSize: 10,
    };
    this.board = new Board(this.canvasProperties.width / this.canvasProperties.gridSize);
    debugger;
    this.drawInitialCanvas();
    this.populateCells();
    for (let i = 0; i < 10; i += 1) {
      this.tick();
    }
    console.log('ticking finished');
  }

  tick() {
    for (let i = 0; i < this.board.board.length; i += 1) {
      for (let j = 0; j < this.board.board.length; j += 1) {
        // console.log('i and j in tick are: ', i, j);
        this.updateCell(i, j);
      }
    }
    this.ctx.stroke();
  }

  updateCell(x, y) {
    this.reproduce(x, y);
    const { gridSize } = this.canvasProperties;
    this.fillCell(x * gridSize, y * gridSize, this.board.getCell(x, y).isAlive());
  }

  reproduce(x, y) {
    const cell = this.board.getCell(x, y);
    if (cell.isAlive() === false) {
      if (this.board.shouldReproduce(x, y)) {
        cell.live();
      }
    }
  }

  populateCells() {
    const gameBoard = this.board.board;
    for (let i = 0; i < gameBoard.length; i += 1) {
      for (let j = 0; j < gameBoard.length; j += 1) {
        const cell = gameBoard[i][j];
        const { gridSize } = this.canvasProperties;
        if (cell.isAlive()) {
          this.fillCell(i * gridSize, j * gridSize, true);
        } else {
          this.fillCell(i * gridSize, j * gridSize, false);
        }
      }
    }
  }

  fillCell(x, y, bool) {
    if (bool === true) {
      this.ctx.fillStyle = 'red';
    } else {
      this.ctx.fillStyle = 'white';
    }
    this.ctx.fillRect(x, y, this.canvasProperties.gridSize, this.canvasProperties.gridSize);
  }

  drawInitialCanvas() {
    if (this.canvas.getContext) {
      this.canvas.width = this.canvasProperties.width;
      this.canvas.height = this.canvasProperties.height;

      this.ctx = this.canvas.getContext('2d');

      for (let x = 0.5; x < 501; x += this.canvasProperties.gridSize) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, 501);
      }

      for (let y = 0.5; y < 501; y += this.canvasProperties.gridSize) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(501, y);
      }

      this.ctx.strokeStyle = '#ddd';
      this.ctx.stroke();
    }
  }
}

(() => {
  let game = new Game();
})();

// todo refactor to improve performance
