import {ReadlineProvider} from '../../common/readline-abstraction';
import {Grid} from '../domain/Grid';

export type GameInformation = {
  maxDepth: number;
  grid: Grid;
}

export class GameInformationGateway {

  constructor(private readonly readLineProvider: ReadlineProvider = new ReadlineProvider()) {

  }

  getGameInformation(): GameInformation {
    const depth = parseInt(this.readLineProvider.readline());
    const cells: number[][] = [[],[],[]];
    for (let i = 0; i < 3; i++) {
      const inputs = this.readLineProvider.readline().split(' ');
      for (let j = 0; j < 3; j++) {
        cells[i][j] = parseInt(inputs[j]);
      }
    }
    console.error({
      maxDepth: depth,
      grid: new Grid(cells).toHash(),
    });
    return {
      maxDepth: depth,
      grid: new Grid(cells),
    };
  }
}
