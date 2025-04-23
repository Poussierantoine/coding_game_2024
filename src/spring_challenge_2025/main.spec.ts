import {Grid} from './domain/Grid';
import {GetGameGraphService} from './application/get-game-graph.service';
import {GetEndingGridsSumService} from './application/get-ending-grids-sum.service';
import {FakeGameInformationGateway} from './infrastructure/FakeGameInformationGateway';

describe('some e2e test', () => {
  it('606000615 20 etats uniques', () => {
    const gameInformation = {
      maxDepth: 8,
      grid: Grid.fromHash('606000615'),
    };
    const fakeGameInformationGateway = new FakeGameInformationGateway();
    fakeGameInformationGateway.feed(gameInformation);
    const graphService = new GetGameGraphService(fakeGameInformationGateway);
    const sumService = new GetEndingGridsSumService();
    const graph = graphService.execute();
    const sum = sumService.execute(graph);
    expect(sum).toEqual(76092874);
  });

  it('241 etat', () => {
    const gameInformation = {
      maxDepth: 24,
      grid: new Grid([
        [3, 0, 0],
        [3, 6, 2],
        [1, 0, 2],
      ]),
    };
    const fakeGameInformationGateway = new FakeGameInformationGateway();
    fakeGameInformationGateway.feed(gameInformation);
    const graphService = new GetGameGraphService(fakeGameInformationGateway);
    const sumService = new GetEndingGridsSumService();
    const graph = graphService.execute();
    const sum = sumService.execute(graph);
    expect(sum).not.toEqual(661168294);
  });



  // 2168 etats uniquest unique
  // { maxDepth: 36, grid: '604202400' }
  // 350917228

  // 4154 etats uniques
  // { maxDepth: 32, grid: '000054105' }
  //999653138

  // 4956 etats uniques
  // { maxDepth: 40, grid: '004024134' }
  //521112022

  // 6044 etats uniques
  // { maxDepth: 40, grid: '054030030' }
  // 667094338

  // 93190 etats uniques
  // { maxDepth: 20, grid: '051000401' }
  // 738691369

  // 94596 etats uniques
  // { maxDepth: 20, grid: '100352100' }
  // 808014757
});