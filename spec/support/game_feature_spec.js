const Game = require('../../src/game');
const Cell = require('../../src/cell');


describe('Game', () => {
  let game;
  let cell;
  let liveCell;
  let subjectCell;

  beforeEach(() => {
    game = new Game(5);
    cell = new Cell();
    liveCell = new Cell();
    liveCell.alive = true;
    subjectCell = new Cell();
  });

  describe('feature tests', () => {
    it('sets up a board with the correct dimensions', () => {
      expect(game.board.length).toBe(5);
      expect(game.board[0].length).toBe(5);
    });
    it('makes cells reproduce if surrounded by exactly 3 live neighbours', () => {
      game.board = [[cell, liveCell, cell], [liveCell, subjectCell, cell], [cell, cell, liveCell]];
      expect(game.shouldReproduce(1, 1)).toBe(true);
    });

    it('should not reproduce cells surrounded by less than 3 live neighbours', () => {
      game.board = [[cell, liveCell, cell], [cell, subjectCell, cell], [cell, cell, liveCell]];
      expect(game.shouldReproduce(1, 1)).toBe(false);
    });

    it('should not reproduce cells surrounded by more than 3 live neighbours', () => {
      game.board = [[liveCell, liveCell, cell],
        [cell, subjectCell, cell], [liveCell, cell, liveCell]];
      expect(game.shouldReproduce(1, 1)).toBe(false);
    });
  });

  describe('#allDead', () => {
    it('returns true for a board full of dead cells', () => {
      game.board = [[cell, cell], [cell, cell]];
      expect(game.allDead()).toBe(true);
    });

    it('returns false for a board with 1 or more alive cells', () => {
      game.board = [[cell, cell], [cell, liveCell]];
      expect(game.allDead()).toBe(false);
    });
  });
});
