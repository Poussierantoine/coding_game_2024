import {FakeGameInformationGateway} from '../infrastructure/FakeGameInformationGateway';
import {GetGameGraphService} from './get-game-graph.service';
import {Grid} from '../domain/Grid';
import {Graph} from '../domain/Graph';

describe('GetGameGraphService', () => {
  let gameGateway: FakeGameInformationGateway;
  let service: GetGameGraphService<Graph>;

  beforeEach(() => {
    gameGateway = new FakeGameInformationGateway();
    service = new GetGameGraphService(gameGateway);
  });

  it('gets the information from the gateway and return  a graph', () => {
    const grid = new Grid([
      [6, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]);
    gameGateway.feed({
      maxDepth: 0,
      grid,
    });

    const graph = service.execute();
    expect(graph).toBeInstanceOf(Graph);
    expect(graph.endingGridsHashs).toEqual([grid.toHash()]);
  });

  it('gets the possible grids if the max depth is over 0', () => {
    const grid = new Grid([
      [0, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]);
    gameGateway.feed({
      maxDepth: 1,
      grid,
    });


    const graph = service.execute();
    expect(graph.endingGridsHashs).toEqual([new Grid([
      [1, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]).toHash(),
    ]);
  });

  it('add the grid to the ending grids if it cannot evolve even if it was already processed', () => {
    const grid = new Grid([
      [0,6,0],
      [2,2,2],
      [1,6,1],
    ]);
    gameGateway.feed({
      maxDepth: 20,
      grid,
    });
    const endingGridProcessedTwice = new Grid([
      [1,6,1],
      [2,2,2],
      [1,6,1],
    ]);
    const graph = service.execute();
    expect(graph.endingGridsHashs).toEqual([
      endingGridProcessedTwice.toHash(),
      endingGridProcessedTwice.toHash(),
    ]);
  });

  it('gets all endings even if a part of the graph is processed twice', () => {
    const grid = new Grid([
      [5,0,6],
      [4,5,0],
      [0,6,4],
    ]);
    gameGateway.feed({
      maxDepth: 20,
      grid,
    });

    const graph = service.execute();
    expect(graph.endingGridsHashs).toHaveLength(6);
  });

  // describe('concerning graph processing optimisation', () => {
  //   const testGraphProvider = (grid: Grid, maxDepth: number) => {
  //     return new TestGraph(grid, maxDepth);
  //   };
  //   let testService: GetGameGraphService<TestGraph>;
  //
  //   beforeEach(() => {
  //     testService = new GetGameGraphService<TestGraph>(gameGateway, testGraphProvider);
  //   });
  //
  //   it('process grids only once', () => {
  //     const grid = new Grid([
  //       [0, 1, 6],
  //       [1, 6, 1],
  //       [6, 1, 0],
  //     ]);
  //     gameGateway.feed({
  //       maxDepth: 3,
  //       grid,
  //     });
  //
  //     const graph = testService.execute();
  //     const processedGridsHashs = graph.getProcessedGridTrees();
  //     expect(processedGridsHashs).toEqual(1);
  //   });
  // });
});
