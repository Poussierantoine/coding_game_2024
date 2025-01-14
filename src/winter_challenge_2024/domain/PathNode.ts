import {Cell} from './grid/Cell';
import {Position} from './Position';

export class PathNode {

  private readonly _position: Position;

  private _heuristic?: number;

  constructor(
        private readonly cell: Cell,
        private readonly _cost: number,
        private readonly parent?: PathNode
  ) {
    this._position = cell.position;
  }

  get heuristic(): number {
    return this._heuristic ?? Number.MAX_VALUE;
  }

  set heuristic(value: number) {
    this._heuristic = value;
  }

  get cost(): number {
    return this._cost;
  }

  get position(): Position {
    return this._position;
  }

  toCellArray(): Cell[] {
    const parentPath: Cell[] | undefined = this.parent?.toCellArray();
    const currentCellPath = [this.cell];
    return parentPath ? parentPath.concat(currentCellPath) : currentCellPath;
  }
}