import {GameInformationGateway} from '../infrastructure/GameInformationGateway';
import {Graph} from '../domain/Graph';
import {Grid} from '../domain/Grid';

type GraphProvider<T extends Graph = Graph> = (grid: Grid, maxDepth: number) => T;

const productionGraphProvider: GraphProvider<Graph> = (grid: Grid, maxDepth: number) => {
  return new Graph(grid, maxDepth);
};

export class GetGameGraphService<T extends Graph> {
  constructor(
    private readonly gameInformationGateway: GameInformationGateway,
    private readonly graphProvider: GraphProvider<T> = productionGraphProvider as GraphProvider<T>,
  ) {}

  execute(): T {
    const { maxDepth, grid } = this.gameInformationGateway.getGameInformation();
    return this.graphProvider(grid, maxDepth);
  }
}