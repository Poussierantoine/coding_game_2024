import {Grid} from './domain/Grid';
import {GetGameGraphService} from './application/get-game-graph.service';
import {GetGraphEndingGridsSumService} from './application/get-graph-ending-grids-sum.service';
import {FakeGameInformationGateway} from './infrastructure/FakeGameInformationGateway';

describe('some e2e test', () => {
  it('should take not too long', () => {
    const grid = new Grid([
      [3,0,0],
      [3,6,2],
      [1,0,2],
    ]);
    const fakeGameInformationGateway = new FakeGameInformationGateway();
    const gameInformation = {
      maxDepth: 24,
      grid,
    };
    fakeGameInformationGateway.feed(gameInformation);
    const graphService = new GetGameGraphService(fakeGameInformationGateway);
    const sumService = new GetGraphEndingGridsSumService();
    const now = Date.now();
    const graph = graphService.execute();
    const sum = sumService.execute(graph);
    const end = Date.now();
    expect(sum).toEqual(0);
    expect(end - now).toBeLessThan(2000);
  });
});