const Board = require('../src/board');

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.canvasProperties = {
      width: 500,
      height: 500,
      gridSize: 10,
    };
    this.board = new Board(this.canvasProperties.width / this.canvasProperties.gridSize);
    this.setupInitialCanvas();

    const boundTick = this.tick.bind(this);
    setInterval(boundTick, 100);
  }

  tick() {
    for (let i = 0; i < this.board.board.length; i += 1) {
      for (let j = 0; j < this.board.board.length; j += 1) {
        this.updateCell(i, j, this.board.getCell(i, j));
      }
    }
    this.ctx.stroke();
  }

  updateCell(x, y, cell) {
    if (cell.isAlive()) {
      this.die(x, y, cell);
    } else {
      this.reproduce(x, y, cell);
    }
    this.fillCell(x * this.canvasProperties.gridSize, y * this.canvasProperties.gridSize,
      this.board.getCell(x, y).isAlive());
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

  fillCell(x, y, alive) {
    if (alive) {
      this.ctx.fillStyle = 'red';
    } else {
      this.ctx.fillStyle = 'white';
    }
    this.ctx.fillRect(x, y, this.canvasProperties.gridSize, this.canvasProperties.gridSize);
  }

  setupInitialCanvas() {
    if (this.canvas.getContext) {
      this.createCanvas();

      this.drawVerticalGridlines(this.canvas.width, this.canvas.height,
        this.canvasProperties.gridSize);
      this.drawHorizontalGridlines(this.canvas.width, this.canvas.height,
        this.canvasProperties.gridSize);

      this.paintLines();
    }
  }

  drawVerticalGridlines(width, height, gridSize) {
    for (let x = 0.5; x <= width; x += gridSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
  }

  drawHorizontalGridlines(width, height, gridSize) {
    for (let y = 0.5; y <= height; y += gridSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
  }

  paintLines() {
    this.ctx.strokeStyle = '#ddd';
    this.ctx.stroke();
  }

  createCanvas() {
    this.canvas.width = this.canvasProperties.width;
    this.canvas.height = this.canvasProperties.height;
    this.ctx = this.canvas.getContext('2d');
  }
}

(() => {
  const game = new Game(); // eslint-disable-line no-unused-vars
})();
