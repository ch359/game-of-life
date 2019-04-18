const Board = require('../src/board');

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.canvasProperties = {
      width: 800,
      height: 800,
      gridSize: 10,
    };
    this.board = new Board(this.canvasProperties.width / this.canvasProperties.gridSize);
    this.drawInitialCanvas();
    this.populateCells();
    const boundTick = this.tick.bind(this);
    setInterval(boundTick, 100);
  }

  tick() {
    for (let i = 0; i < this.board.board.length; i += 1) {
      for (let j = 0; j < this.board.board.length; j += 1) {
        const cell = this.board.getCell(i, j);
        this.updateCell(i, j, cell);
      }
    }
    this.ctx.stroke();
  }

  updateCell(x, y, cell) {
    if (cell.isAlive() === true) {
      this.die(x, y, cell);
    } else {
      this.reproduce(x, y, cell);
    }
    const { gridSize } = this.canvasProperties;
    this.fillCell(x * gridSize, y * gridSize, this.board.getCell(x, y).isAlive());
  }

  reproduce(x, y, cell) {
    if (this.board.shouldReproduce(x, y) === true) {
      cell.live();
    }
  }

  die(x, y, cell) {
    if (this.board.shouldDie(x, y) === true) {
      cell.die();
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
    this.ctx.stroke();
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

      for (let x = 0.5; x <= this.canvasProperties.width; x += this.canvasProperties.gridSize) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvasProperties.height);
      }

      for (let y = 0.5; y <= this.canvasProperties.height; y += this.canvasProperties.gridSize) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvasProperties.width, y);
      }

      this.ctx.strokeStyle = '#ddd';
      this.ctx.stroke();
    }
  }
}

(() => {
  let game = new Game();
})();
