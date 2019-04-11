class Game {
  constructor(size) {
    this.board = new Array(size);
    for (let i = 0; i < this.board.length; i += 1) {
      this.board[i] = new Array(size);
    }
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
}

module.exports = Game;
