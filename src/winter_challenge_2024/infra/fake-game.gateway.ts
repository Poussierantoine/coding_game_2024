import {GameGateway, GridSize, ITurnInfo, OPPONENT, PLAYER, ProteinType, UP} from '../interfaces';
import {TurnInfo} from '../domain/TurnInfo';
import {Action} from '../domain/Action';
import {Grid} from '../domain/grid/Grid';
import {Cell} from '../domain/grid/Cell';
import {Organ} from '../domain/grid/Organ';
import {Position} from '../domain/Position';
import {Protein} from '../domain/grid/Protein';


type FakeGameGatewayProps = {
    initialization: GridSize,
    turns: TurnInfo[],
};

export class FakeGameGateway implements GameGateway {
  private turns: TurnInfo[];
  private initialization: GridSize;
  private actualTurn = 0;

  printedElements: string[] = [];
  executedActions: Action[] = [];

  constructor({initialization, turns}: Partial<FakeGameGatewayProps>) {
    this.turns = turns ?? [];
    this.initialization = initialization ?? {width: 0, height: 0};
  }

  getInitialization() {
    return this.initialization;
  };

  getTurnInfo() {
    const turn = this.turns[this.actualTurn];
    this.actualTurn ++;
    return turn;
  };

  print(stringToPrint: string) {
    this.printedElements.push(stringToPrint);
  };

  doAction(action: Action) {
    this.executedActions.push(action);
  };

}



export class FakeTurnReader {

  private readonly EMPTY_CELL_CHAR = 'O';
  private readonly WALL_CHAR = 'W';

  private readonly A_PROTEIN_CHAR = 'A';
  private readonly B_PROTEIN_CHAR = 'B';
  private readonly C_PROTEIN_CHAR = 'C';
  private readonly D_PROTEIN_CHAR = 'D';
  private readonly PROTEIN_CHARS = `${this.A_PROTEIN_CHAR}|${this.B_PROTEIN_CHAR}|${this.C_PROTEIN_CHAR}|${this.D_PROTEIN_CHAR}`;

  private readonly UP_CHAR = 'up';
  private readonly DOWN_CHAR = 'do';
  private readonly RIGHT_CHAR = 'ri';
  private readonly LEFT_CHAR = 'le';
  private readonly NO_DIRECTION_CHAR = 'no';
  private readonly DIRECTION_CHARS = `${this.UP_CHAR}|${this.RIGHT_CHAR}|${this.DOWN_CHAR}|${this.LEFT_CHAR}|${this.NO_DIRECTION_CHAR}`;

  private readonly OPPONENT_ROOT_ORGAN_CHAR = 'r';
  private readonly PLAYER_ROOT_ORGAN_CHAR = 'R';
  private readonly OPPONENT_BASIC_ORGAN_CHAR = 'n';
  private readonly PLAYER_BASIC_ORGAN_CHAR = 'N';
  private readonly ORGAN_CHARS = `${this.OPPONENT_ROOT_ORGAN_CHAR}|${this.PLAYER_ROOT_ORGAN_CHAR}|${this.OPPONENT_BASIC_ORGAN_CHAR}|${this.PLAYER_BASIC_ORGAN_CHAR}`;

  private readonly ORGAN_GROUP = `(${this.ORGAN_CHARS}(;${this.DIRECTION_CHARS})?)`;

  private readonly CELL = `\\((${this.WALL_CHAR}|${this.EMPTY_CELL_CHAR}|${this.ORGAN_GROUP}|${this.PROTEIN_CHARS})\\)`;
  private readonly SEPARATOR = ' ';
  private readonly LINE = `(${this.CELL}(${this.SEPARATOR}${this.CELL})*)`;

  private readonly turn: ITurnInfo;
  private readonly gridSize: GridSize;
  private requiredActionCount: number;

  constructor(lines: string[]) {
    lines.forEach(line => {
      // console.log(line)
      // console.log(this.LINE)
      // console.log(new RegExp(this.LINE).test(line))
      // console.log(this.CELL)
      // console.log(new RegExp(this.CELL).test(line))
      if (!new RegExp(this.LINE).test(line)) {
        throw new Error('Invalid character in grid, each line should be (char) separated by space. allowed characters are W, r, R, b, B, or space');
      }
    });
    this.requiredActionCount = 0;
    const splitLines = lines.map(line => line.split(' '));
    this.gridSize = {
      width: splitLines[0].length,
      height: splitLines.length,
    };
    if(splitLines.some(line => line.length !== this.gridSize.width)){
      throw new Error('Invalid grid, all lines should be same length');
    }
    this.turn = {
      grid: new Grid(this.gridSize),
      myProteins: {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      },
      oppProteins: {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      },
      myOrgans: [],
      oppOrgans: [],
      organMap: new Map(),
      proteins: []
    };
    this.parseGrid(splitLines);
  }


  getTurnInfo(): TurnInfo {
    return new TurnInfo({
      turn: this.turn,
      gridSize: this.gridSize,
      requiredActionCount: this.requiredActionCount,
    });
  }


  private parseGrid(splitGrid: string[][]) {
    splitGrid.forEach((line, y) => {
      line.forEach((cell, x) => {
        const position = new Position(x, y);
        this.parseCell(cell, position);
      });
    });
  }

  private parseCell(rawCell: string, position: Position){
    let organId = 0;
    const cellType = rawCell[1];
    let cell: Cell;
    if(cellType === this.EMPTY_CELL_CHAR) {
      cell = new Cell({position, isWall: false});
    } else if (cellType === this.WALL_CHAR) {
      cell = new Cell({position, isWall: true});
    }else if(new RegExp(this.PROTEIN_CHARS).test(cellType)){
      const protein = new Protein(cellType as ProteinType, position);
      cell = new Cell({position, isWall: false, protein: protein});
      this.turn.proteins.push(protein);
    } else {
      const organ = this.parseOrgan(cellType, position, organId);
      cell = new Cell({position, isWall: false, organ});
      organId++;
    }
    this.turn.grid.setCells(cell);
  }

  private parseOrgan(organType: string, position: Position, organId: number) {
    let organ: Organ;

    if (
      organType === this.OPPONENT_ROOT_ORGAN_CHAR
        || organType === this.OPPONENT_BASIC_ORGAN_CHAR
    ) {
      if(organType === this.OPPONENT_ROOT_ORGAN_CHAR) {
        organ = new Organ({
          id: organId,
          position,
          type: 'ROOT',
          direction: UP,
          parentId: 0,
          rootId: 0,
          owner: OPPONENT,
        });
      } else {
        organ = new Organ({
          id: organId,
          position,
          type: 'BASIC',
          direction: UP,
          parentId: 0,
          rootId: 0,
          owner: OPPONENT,
        });
      }
      this.turn.oppOrgans.push(organ);
    } else {
      if(organType === this.PLAYER_ROOT_ORGAN_CHAR) {
        organ = new Organ({
          id: organId,
          position,
          type: 'ROOT',
          direction: UP,
          parentId: 0,
          rootId: 0,
          owner: PLAYER,
        });
        this.requiredActionCount++;
      } else {
        organ = new Organ({
          id: organId,
          position,
          type: 'BASIC',
          direction: UP,
          parentId: 0,
          rootId: 0,
          owner: PLAYER,
        });
      }
      this.turn.myOrgans.push(organ);
    }
    this.turn.organMap.set(position.x, organ);
    return organ;
  }
}