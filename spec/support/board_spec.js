const Board = require('../../src/board');


describe('Board', () => {
  let board;
  let cell;
  let liveCell;
  let subjectCell;

  beforeEach(() => {
    board = new Board(5);
    cell = jasmine.createSpyObj('cell', ['isAlive']);
    cell.isAlive.and.callFake(() => false);

    liveCell = jasmine.createSpyObj('cell', ['isAlive']);
    liveCell.isAlive.and.callFake(() => true);

    subjectCell = jasmine.createSpyObj('cell', ['isAlive']);
    subjectCell.isAlive.and.callFake(() => false);
  });

  describe('#allDead', () => {
    it('returns true for a board full of dead cells', () => {
      board.board = [[cell, cell], [cell, cell]];

      expect(board.allDead()).toBe(true);
    });

    it('returns false for a board with 1 or more alive cells', () => {
      board.board = [[cell, cell], [cell, liveCell]];

      expect(board.allDead()).toBe(false);
    });
  });

  describe('#getCell', () => {
    it('returns the cell at given x and y coordinates', () => {
      board.board = [[cell, cell], [cell, subjectCell]];

      expect(board.getCell(1, 1)).toEqual(subjectCell);
    });
  });

  describe('#getNeighbours', () => {
    const cell1 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell2 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell3 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell4 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell5 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell6 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell7 = jasmine.createSpyObj('cell', ['isAlive']);
    const cell8 = jasmine.createSpyObj('cell', ['isAlive']);
    const testCells = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8];

    it('identified all cells that are neighbours', () => {
      board.board = [[cell1, cell2, cell3], [cell4, subjectCell, cell5], [cell6, cell7, cell8]];
      for (let i = 0; i < testCells.length; i += 1) {
        expect(board.getNeighbours(1, 1)).toContain(testCells[i]);
      }
      expect(board.getNeighbours(1, 1).length).toBe(8);
      expect(board.getNeighbours(1, 1)).not.toContain(subjectCell);
    });

    xit('can return correct results for non-central pieces', () => {

    });
  });
});
