import {Grid} from './Grid';

describe('Grid', () => {
  describe('toHash', () => {
    it('returns all the cells number and 0 if no dice in a string', () => {
      const grid = new Grid([
        [0, 1, 2],
        [6, 6, 6],
        [1, 2, 3],
      ]);
      expect(grid.toHash()).toEqual('012666123');
    });
  });

  describe('fromHash', () => {
    it('create the grid', () => {
      const hash = '123456789';
      const grid = Grid.fromHash(hash);
      expect(grid.toHash()).toEqual(hash);
    });
  });

  describe('getPossibleGrids', () => {
    it('return an empty array if no possible grid', () => {
      const grid = new Grid([
        [6, 6, 6],
        [6, 6, 6],
        [6, 6, 6],
      ]);
      expect(grid.getPossibleGrids()).toEqual([]);
    });

    it('returns a grid for every possibilities', () => {
      const grid = new Grid([
        [0, 6, 6],
        [6, 6, 6],
        [6, 6, 0],
      ]);
      const possibleGrids = grid.getPossibleGrids();
      expect(possibleGrids).toHaveLength(2);
      expect(possibleGrids[0]).toEqual(new Grid([
        [1, 6, 6],
        [6, 6, 6],
        [6, 6, 0],
      ]));
      expect(possibleGrids[1]).toEqual(new Grid([
        [0, 6, 6],
        [6, 6, 6],
        [6, 6, 1],
      ]));
    });
  });

  it('captures dices if the sum is equal or under 6', () => {
    const grid = new Grid([
      [0, 1, 6],
      [1, 6, 6],
      [6, 6, 6],
    ]);
    const possibleGrids = grid.getPossibleGrids();
    expect(possibleGrids).toHaveLength(1);
    expect(possibleGrids[0].toHash()).toEqual(new Grid([
      [2, 0, 6],
      [0, 6, 6],
      [6, 6, 6],
    ]).toHash());
  });

  it('does not captures empty cells (0)', () => {
    const grid = new Grid([
      [1, 0, 0],
      [6, 1, 6],
      [6, 6, 6],
    ]);
    const possibleGrids = grid.getPossibleGrids();
    expect(possibleGrids).toHaveLength(2);
    expect(possibleGrids.map(g => g.toHash())).toEqual([
      new Grid([
        [0, 2, 0],
        [6, 0, 6],
        [6, 6, 6],
      ]).toHash(),
      new Grid([
        [1, 0, 1],
        [6, 1, 6],
        [6, 6, 6],
      ]).toHash(),
    ]);
  });

  it('gets all possible captures if many allowed', () => {
    const grid = new Grid([
      [6, 1, 6],
      [1, 0, 1],
      [6, 6, 6],
    ]);
    const possibleGrids = grid.getPossibleGrids();
    expect(possibleGrids).toHaveLength(4);
    const hashs = possibleGrids.map((grid) => grid.toHash());
    expect(hashs).toEqual(expect.arrayContaining([
      new Grid([
        [6, 1, 6],
        [0, 2, 0],
        [6, 6, 6],
      ]).toHash(),
      new Grid([
        [6, 0, 6],
        [0, 2, 1],
        [6, 6, 6],
      ]).toHash(),
      new Grid([
        [6, 0, 6],
        [1, 2, 0],
        [6, 6, 6],
      ]).toHash(),
      new Grid([
        [6, 0, 6],
        [0, 3, 0],
        [6, 6, 6],
      ]).toHash(),
    ]));
  });
});