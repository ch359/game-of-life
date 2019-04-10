const Game = require('../../src/game');


describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game(5);
  });
  it('sets up a board with the correct dimensions', () => {
    expect(game.board.length).toBe(5);
    expect(game.board[0].length).toBe(5);
  });

  xit('populates the board with dead cells', () => {
    expect(game.allDead()).toBe(true);
  });

  describe('#allDead', () => {
    it('returns true for a board full of dead cells', () => {
      const cell = jasmine.createSpyObj('cell', [{ alive: false }]);
      game.board = [[cell, cell], [cell, cell]];
      expect(game.allDead()).toBe(true);
    });

    it('returns false for a board with 1 or more alive cells', () => {
      const cell = jasmine.createSpyObj('cell', [{ alive: false }]);
      const liveCell = jasmine.createSpyObj('cell', [{ alive: true }]);
      console.log("Cell alive status: " + cell);
      game.board = [[cell, cell], [cell, liveCell]];
      expect(game.allDead()).toBe(false);
    });
  });
});
