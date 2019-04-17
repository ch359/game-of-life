const Board = require('../../src/board');
const Cell = require('../../src/cell');


describe('Board', () => {
  let board;
  let cell;
  let liveCell;
  let subjectCell;

  beforeEach(() => {
    board = new Board(5);
    cell = new Cell();
    liveCell = new Cell();
    liveCell.alive = true;
    subjectCell = new Cell();
  });

  describe('feature tests', () => {
    it('sets up a board with the correct dimensions', () => {
      expect(board.board.length).toBe(5);
      expect(board.board[0].length).toBe(5);
    });

    it('makes cells reproduce if surrounded by exactly 3 live neighbours', () => {
      board.board = [[cell, liveCell, cell], [liveCell, subjectCell, cell], [cell, cell, liveCell]];
      expect(board.shouldReproduce(1, 1)).toBe(true);
    });

    it('should not reproduce cells surrounded by less than 3 live neighbours', () => {
      board.board = [[cell, liveCell, cell], [cell, subjectCell, cell], [cell, cell, liveCell]];
      expect(board.shouldReproduce(1, 1)).toBe(false);
    });

    it('should not reproduce cells surrounded by more than 3 live neighbours', () => {
      board.board = [[liveCell, liveCell, cell],
        [cell, subjectCell, cell], [liveCell, cell, liveCell]];
      expect(board.shouldReproduce(1, 1)).toBe(false);
    });
  });
});
