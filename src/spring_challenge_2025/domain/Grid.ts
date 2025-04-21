type Position = {
  x: number;
  y: number;
}

type Move = { positions: Position[], sum: number };

export class Grid {
  constructor(
  public readonly cells: number[][]
  ){
  }

  getPossibleGrids() : Grid[] {
    const possibleGrids: Grid[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        if (this.cells[i][j] === 0) {
          possibleGrids.push(...this.getPossibleGridForCell(i, j));
        }
      }
    }
    return possibleGrids;
  }

  private getPossibleGridForCell(i: number, j: number) {
    const possibleGrids = [];
    const possibleMoves = this.getPossibleMoves(i, j);
    for (const move of possibleMoves) {
      const newGrid = this.applyMove(move, {x: i, y: j});
      possibleGrids.push(newGrid);
    }
    return possibleGrids;
  }

  toHash() {
    return this.cells.map((row) => row.map((cell) => `${cell}` ).join('')).join('');
  }

  private getPossibleMoves(i: number, j: number) {
    const neighbors = this.getNeighborsPositions(i, j);
    const captureMoves = this.getPossibleCombinations(neighbors);
    if(captureMoves.length === 0) {
      return [{positions: [{x: i, y: j}], sum: 1}];
    }
    return captureMoves;
  }

  private getNeighborsPositions(i: number, j: number) {
    const neighbors: Position[] = [];
    const positions = [
      {x: i - 1, y: j},
      {x: i + 1, y: j},
      {x: i, y: j - 1},
      {x: i, y: j + 1},
    ];
    for (const {x, y} of positions) {
      if (this.isInGrid(x, y)) {
        neighbors.push({x, y});
      }
    }
    return neighbors;
  }

  private isInGrid(x: number, y: number) {
    return x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[0].length;
  }

  private getPossibleCombinations(neighbors: Position[]) {
    return neighbors.reduce<Move[]>((acc, neighbor, currentIndex) => {
      const value = this.cells[neighbor.x][neighbor.y];
      if(currentIndex === neighbors.length - 1 || value === 6 || value === 0) {
        return acc;
      }
      const nextNeighbors = neighbors.slice(currentIndex + 1);
      const  moves = this.getRecursiveMoves(nextNeighbors, value, [neighbor]);
      return [
        ...acc,
        ...moves,
      ];
    }, [],
    );
  }

  private getRecursiveMoves(positions: Position[], sum: number, currentMovePositions: Position[]): Move[] {
    const moves: Move[] = [];
    for (let i = 0; i < positions.length; i++) {
      const current = positions[i];
      const value = this.cells[current.x][current.y];
      if (value === 6 || value === 0) {
        continue;
      }
      const nextPositions = positions.slice(i + 1);
      const nextSum = sum + value;
      if (nextSum <= 6) {
        const currentMoveNextPositions = [...currentMovePositions, current];
        moves.push({
          positions: currentMoveNextPositions,
          sum: nextSum,
        });
        if (nextSum <6) {
          moves.push(...this.getRecursiveMoves(nextPositions, nextSum, currentMoveNextPositions));
        }
      }
    }
    return moves;
  }

  private applyMove(move: Move, cellToPlay: Position) {
    const newCells = this.cells.map((row) => [...row]);
    for (const position of move.positions) {
      newCells[position.x][position.y] = 0;
    }
    newCells[cellToPlay.x][cellToPlay.y] = move.sum;
    return new Grid(newCells);
  }

  static fromHash(hash: string) {
    const cells =  hash.split('')
      .reduce((acc, value, index) => {
        if (index % 6 === 0) {
          acc.push([]);
        }
        acc[acc.length - 1].push(parseInt(value));
        return acc;
      }, [] as number[][]);
    return new Grid(cells);
  }
}