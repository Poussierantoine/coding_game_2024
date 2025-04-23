import {Grid} from './domain/Grid';
import {GetGameGraphService} from './application/get-game-graph.service';
import {GetEndingGridsSumService} from './application/get-ending-grids-sum.service';
import {FakeGameInformationGateway} from './infrastructure/FakeGameInformationGateway';

describe('some e2e test', () => {
  function executeWithStartParamsAndExpectSum(gameInformation: { maxDepth: number; grid: Grid }, expectedSum: number) {
    const fakeGameInformationGateway = new FakeGameInformationGateway();
    fakeGameInformationGateway.feed(gameInformation);
    const graphService = new GetGameGraphService(fakeGameInformationGateway);
    const sumService = new GetEndingGridsSumService();
    const graph = graphService.execute();
    const sum = sumService.execute(graph);
    expect(sum).toEqual(expectedSum);
  }

  it.skip('606000615 20 etats uniques', () => {
    const gameInformation = {
      maxDepth: 8,
      grid: Grid.fromHash('606000615'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 76092874);
  });

  it.skip('241 etat', () => {
    const gameInformation = {
      maxDepth: 24,
      grid: new Grid([
        [3, 0, 0],
        [3, 6, 2],
        [1, 0, 2],
      ]),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 661168294);
  });

  it.skip('350917228 2168 etats uniques', () => {
    const gameInformation = {
      maxDepth: 36,
      grid: Grid.fromHash('604202400'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 350917228);
  });

  it.skip('999653138 4154 etats uniques', () => {
    const gameInformation = {
      maxDepth: 32,
      grid: Grid.fromHash('000054105'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 999653138);
  });

  it.skip('521112022 4956 etats uniques', () => {
    const gameInformation = {
      maxDepth: 40,
      grid: Grid.fromHash('004024134'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 521112022);
  });

  it.skip('667094338 6044 etats uniques', () => {
    const gameInformation = {
      maxDepth: 40,
      grid: Grid.fromHash('054030030'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 667094338);
  });

  it.skip('738691369 93190 etats uniques', () => {
    const gameInformation = {
      maxDepth: 20,
      grid: Grid.fromHash('051000401'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 738691369);
  });

  it.skip('808014757 94596 etats uniques', () => {
    const gameInformation = {
      maxDepth: 20,
      grid: Grid.fromHash('100352100'),
    };
    executeWithStartParamsAndExpectSum(gameInformation, 808014757);
  });
});