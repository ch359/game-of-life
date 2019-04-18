const Board = require('../../src/board');


describe('Board', () => {
  let game;
  let cell;
  let liveCell;
  let subjectCell;

  beforeEach(() => {
    game = new Board(5);
    cell = jasmine.createSpyObj('cell', ['isAlive']);
    cell.isAlive.and.callFake(() => false);

    liveCell = jasmine.createSpyObj('cell', ['isAlive']);
    liveCell.isAlive.and.callFake(() => true);

    subjectCell = jasmine.createSpyObj('cell', ['isAlive']);
    subjectCell.isAlive.and.callFake(() => false);
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

  describe('#getCell', () => {
    it('returns the cell at given x and y coordinates', () => {
      game.board = [[cell, cell], [cell, subjectCell]];

      expect(game.getCell(1, 1)).toEqual(subjectCell);
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
      game.board = [[cell1, cell2, cell3], [cell4, subjectCell, cell5], [cell6, cell7, cell8]];
      for (let i = 0; i < testCells.length; i += 1) {
        expect(game.getNeighbours(1, 1)).toContain(testCells[i]);
      }
      expect(game.getNeighbours(1, 1).length).toBe(8);
      expect(game.getNeighbours(1, 1)).not.toContain(subjectCell);
    });

    it('can return correct results for edge pieces', () => {
      game.board = [[subjectCell, cell2, cell3], [cell4, cell1, cell5], [cell6, cell7, cell8]];
      expect(game.getNeighbours(0, 0)).toContain(cell2);
      expect(game.getNeighbours(0, 0)).toContain(cell4);
      expect(game.getNeighbours(0, 0)).toContain(cell1);
      expect(game.getNeighbours(0, 0).length).toBe(3);
    });
  });

  describe('#axisNeighbours', () => {
    it('returns all neighbours on that axis when board size is at least 3', () => {
      game.board = [[cell, cell, cell], [cell, subjectCell, cell], [cell, cell, cell]];
      expect(game.axisNeighbours(1)).toEqual([0, 1, 2]);
    });
    it('does not return a neighbour if it would have a position less than 0 on the axis', () => {
      game.board = [[subjectCell, cell], [cell, cell]];
      expect(game.axisNeighbours(0)).toEqual([0, 1]);
    });
    it('does not return a neighbour if it would have a position greater than the board length', () => {
      game.board = [[cell, cell, cell], [cell, cell, cell], [cell, cell, subjectCell]];
      expect(game.axisNeighbours(2)).toEqual([1, 2]);
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
