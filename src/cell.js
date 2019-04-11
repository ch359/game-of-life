class Cell {
  constructor() {
    this.alive = false;
  }

  die() {
    this.alive = false;
  }

  live() {
    this.alive = true;
  }

  toggleAlive() {
    this.alive = !this.alive;
  }

  isAlive() {
    return this.alive;
  }
}

module.exports = Cell;
