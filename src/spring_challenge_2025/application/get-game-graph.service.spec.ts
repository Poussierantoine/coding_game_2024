import {FakeGameInformationGateway} from '../infrastructure/FakeGameInformationGateway';
import {GetGameGraphService} from './get-game-graph.service';
import {Grid} from '../domain/Grid';
import {Graph, Tree} from '../domain/Graph';
import {TestGraph} from '../domain/TestGraph';

describe('GetGameGraphService', () => {
  let gameGateway: FakeGameInformationGateway;
  let service: GetGameGraphService<Graph>;

  beforeEach(() => {
    gameGateway = new FakeGameInformationGateway();
    service = new GetGameGraphService(gameGateway);
  });

  it('gets the information from the gateway and return array of ending grid hashs', () => {
    const grid = new Grid([
      [6, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]);
    gameGateway.feed({
      maxDepth: 0,
      grid,
    });

    const results = service.execute();
    expect(results).toEqual([grid.toHash()]);
  });

  it('adds the grid to the ending grids if there is no possible grid', () => {
    const grid = new Grid([
      [1, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]);
    gameGateway.feed({
      maxDepth: 1,
      grid,
    });


    const results = service.execute();
    expect(results).toEqual([new Grid([
      [1, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]).toHash(),
    ]);
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


    const results = service.execute();
    expect(results).toEqual([new Grid([
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
    const results = service.execute();
    expect(results).toEqual([
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

    const results = service.execute();
    expect(results).toHaveLength(6);
  });

  describe('concerning graph processing optimisation', () => {
    const testGraph = new TestGraph();
    const testGraphProvider = () => {
      return testGraph;
    };
    let testService: GetGameGraphService<TestGraph>;

    beforeEach(() => {
      testService = new GetGameGraphService<TestGraph>(gameGateway, testGraphProvider);
      testGraph.clear();
    });

    describe('concerning finding a graph with lower depth than the preceding', () => {
      it('use the graph instead of processing it', () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 20,
          grid: initialGrid,
        });

        const onlyPossibleGrid = initialGrid.getPossibleGrids()[0];

        const endingGrids = ['222222222'];
        testGraph.overrideProcessedGridTrees({
          [onlyPossibleGrid.toHash()]: {
            children: [],
            depth: 100000, // over current depth when processed  = 1
            leavesIfFullyProcessed: endingGrids,
          }
        });

        const results = testService.execute();
        // if the graph is not used, there is two ending grids different from the one in the graph : ["216166666", "216166666"]
        expect(results).toEqual(endingGrids);
      });

      it('process over the graph end until the depth limit if the graph is not fully processed and update the graph depth and the processed rest of the graph', () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 20,
          grid: initialGrid,
        });

        const onlyPossibleGrid = initialGrid.getPossibleGrids()[0];

        testGraph.overrideProcessedGridTrees({
          [onlyPossibleGrid.toHash()]: {
            children: [], // graph end here, but there is possible children if depth limit is not reached
            depth: 100000, // over current depth when processed  = 1
            leavesIfFullyProcessed: [],
          }
        });

        const results = testService.execute();
        const endingGrid = new Grid([
          [2, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]).toHash();
        expect(results).toEqual([endingGrid, endingGrid]);
        const updatedGraph = testGraph.getProcessedGridTreesAsRecord();
        const newProcessedChildren1 = new Grid([
          [2, 0, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]).toHash();
        const newProcessedChildren2 = new Grid([
          [2, 1, 6],
          [0, 6, 6],
          [6, 6, 6],
        ]).toHash();
        expect(updatedGraph[onlyPossibleGrid.toHash()]).toEqual({
          children: expect.arrayContaining([
            newProcessedChildren1,
            newProcessedChildren2,
          ]),
          leavesIfFullyProcessed: [endingGrid, endingGrid],
          depth: 1,
        });
        expect(updatedGraph[newProcessedChildren1]).toEqual({
          children: [endingGrid],
          depth: 2,
          leavesIfFullyProcessed: [endingGrid],
        });
        expect(updatedGraph[newProcessedChildren2]).toEqual({
          children: [endingGrid],
          depth: 2,
          leavesIfFullyProcessed: [endingGrid],
        });
      });

      it('update the graph depth if the graph is fully processed', () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 20,
          grid: initialGrid,
        });

        const onlyPossibleGrid = initialGrid.getPossibleGrids()[0];

        const endingGrids = ['222222222'];
        testGraph.overrideProcessedGridTrees({
          [onlyPossibleGrid.toHash()]: {
            children: [],
            depth: 100000, // over current depth when processed  = 1
            leavesIfFullyProcessed: endingGrids,
          }
        });

        testService.execute();
        expect(testGraph.getProcessedGridTreesAsRecord()[onlyPossibleGrid.toHash()].depth).toEqual(1);
      });
    });

    describe('concerning finding a graph with same depth as preceding', () => {
      it('use the graph instead of processing it', () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 20,
          grid: initialGrid,
        });

        const onlyPossibleGrid = initialGrid.getPossibleGrids()[0];

        const endingGrids = ['222222222'];
        testGraph.overrideProcessedGridTrees({
          [onlyPossibleGrid.toHash()]: {
            children: [],
            depth: 1, // equal current depth  = 1
            leavesIfFullyProcessed: endingGrids,
          }
        });

        const results = testService.execute();
        // if the graph is not used, there is two ending grids different from the one in the graph : ["216166666", "216166666"]
        expect(results).toEqual(endingGrids);
      });

      it('gets the ending grids if the graph is not fully processed', () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 20,
          grid: initialGrid,
        });

        const onlyPossibleGrid = initialGrid.getPossibleGrids()[0];

        testGraph.overrideProcessedGridTrees({
          [onlyPossibleGrid.toHash()]: {
            children: [],
            depth: 1, // over current depth when processed  = 1
            leavesIfFullyProcessed: [],
          }
        });

        const results = testService.execute();
        expect(results).toEqual([onlyPossibleGrid.toHash()]);
        expect(testGraph.getProcessedGridTreesAsRecord()[initialGrid.toHash()].leavesIfFullyProcessed).toEqual([]);
      });
    });

    describe('concerning finding a graph with a higher depth than the preceding', () => {
      it('process the graph excluding leavesIfFullyProcessed and stops at the good depth + does not update the graph depth', async () => {
        const initialGrid = new Grid([
          [0, 1, 6],
          [1, 6, 6],
          [6, 6, 6],
        ]);
        gameGateway.feed({
          maxDepth: 3,
          grid: initialGrid,
        });

        //here creating a fake longer graph than what is possible, to make sure it stops at time
        const onlyPossibleGridFromInitial = initialGrid.getPossibleGrids()[0];
        const secondDepthGrid = onlyPossibleGridFromInitial.getPossibleGrids()[0].toHash();
        const thirdDepthGrid = new Grid([
          [6, 6, 6],
          [6, 6, 6],
          [6, 6, 3],
        ]).toHash();
        const fourthDepthGrid = new Grid([
          [6, 6, 6],
          [6, 6, 6],
          [6, 6, 4],
        ]).toHash();

        testGraph.overrideProcessedGridTrees({
          [secondDepthGrid]: {
            children: [thirdDepthGrid],
            depth: 1,
            leavesIfFullyProcessed: [fourthDepthGrid],
          },
          [thirdDepthGrid]: {
            children: [fourthDepthGrid],
            depth: 1,
            leavesIfFullyProcessed: [fourthDepthGrid],
          },
          [fourthDepthGrid]: {
            children: ['should never go here'],
            depth: 1,
            leavesIfFullyProcessed: [fourthDepthGrid],
          },
        });

        const results = testService.execute();
        // if the graph is not used, there is two ending grids different from the one in the graph : ["216166666", "216166666"]
        expect(results).toContain(thirdDepthGrid);
        expect(results).not.toContain(fourthDepthGrid);
        expect(testGraph.getProcessedGridTreesAsRecord()[secondDepthGrid].depth).toEqual(1);
        expect(testGraph.getProcessedGridTreesAsRecord()[thirdDepthGrid].depth).toEqual(1);
      });
    });


    it('updates the graph with processed grids', () => {
      const initialGrid = new Grid([
        [1, 0, 6],
        [6, 1, 6],
        [6, 6, 6],
      ]);
      gameGateway.feed({
        maxDepth: 20,
        grid: initialGrid,
      });

      const initialGridHash = initialGrid.toHash();

      const firstLevel = new Grid([
        [0, 2, 6],
        [6, 0, 6],
        [6, 6, 6],
      ]).toHash();
      const secondLevel1 = new Grid([
        [1, 2, 6],
        [6, 0, 6],
        [6, 6, 6],
      ]).toHash();
      const secondLevel2 = new Grid([
        [0, 2, 6],
        [6, 1, 6],
        [6, 6, 6],
      ]).toHash();

      const endingGrid = new Grid([
        [1, 2, 6],
        [6, 1, 6],
        [6, 6, 6],
      ]).toHash();

      const expectedGraph: Record<string, Tree> = {
        [initialGridHash]: {
          children: [
            firstLevel,
          ],
          depth: 0,
          leavesIfFullyProcessed: [endingGrid, endingGrid],
        },
        [firstLevel]: {
          children: [
            secondLevel1,
            secondLevel2,
          ],
          depth: 1,
          leavesIfFullyProcessed: [endingGrid, endingGrid],
        },
        [secondLevel1]: {
          children: [endingGrid],
          depth: 2,
          leavesIfFullyProcessed: [endingGrid],
        },
        [secondLevel2]: {
          children: [endingGrid],
          depth: 2,
          leavesIfFullyProcessed: [endingGrid],
        },
        [endingGrid]: {
          children: [],
          depth: 3,
          leavesIfFullyProcessed: [endingGrid],
        },
      };

      const results = testService.execute();
      expect(results).toEqual(expectedGraph[initialGridHash].leavesIfFullyProcessed);
      expect(testGraph.getProcessedGridTreesAsRecord()).toEqual(expectedGraph);
    });
  });
});
