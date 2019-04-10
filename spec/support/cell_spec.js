const Cell = require('../../src/cell');

describe('Cell', () => {
  let cell;

  beforeEach(() => {
    cell = new Cell();
  });
  it('can die', () => {
    cell.alive = true;
    cell.die();
    expect(cell.alive).toBe(false);
  });

  it('can become alive', () => {
    cell.live();
    expect(cell.alive).toBe(true);
  });

  it('can toggle from dead to alive', () => {
    cell.toggleAlive();
    expect(cell.alive).toBe(true);
  });

  it('can toggle from alive to dead', () => {
    cell.alive = true;
    cell.toggleAlive();
    expect(cell.alive).toBe(false);
  });
});
