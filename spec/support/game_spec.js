const Game = require('../../src/game');


describe('Game', () => {
  let game;
  let cell;

  beforeEach(() => {
    game = new Game(5);
    cell = jasmine.createSpyObj('cell', ['isAlive']);
  });
  it('sets up a board with the correct dimensions', () => {
    expect(game.board.length).toBe(5);
    expect(game.board[0].length).toBe(5);
  });

  describe('#allDead', () => {
    it('returns true for a board full of dead cells', () => {
      cell.isAlive.and.callFake(() => false);

      game.board = [[cell, cell], [cell, cell]];
      expect(game.allDead()).toBe(true);
    });

    it('returns false for a board with 1 or more alive cells', () => {
      cell.isAlive.and.callFake(() => false);

      const liveCell = jasmine.createSpyObj('cell', ['isAlive']);
      liveCell.isAlive.and.callFake(() => true);

      game.board = [[cell, cell], [cell, liveCell]];
      expect(game.allDead()).toBe(false);
    });
  });
});
