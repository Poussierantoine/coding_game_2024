import {FakeGameInformationGateway} from '../infrastructure/FakeGameInformationGateway';
import {GetGameGraphService} from './get-game-graph.service';
import {Grid} from '../domain/Grid';

describe('GetGameGraphService', () => {
  let gameGateway: FakeGameInformationGateway;
  let service: GetGameGraphService;

  beforeEach(() => {
    gameGateway = new FakeGameInformationGateway();
    service = new GetGameGraphService(gameGateway);
  });

  it('gets the information from the gateway and return the graph', () => {
    const grid = new Grid([
      [6, 6, 6],
      [6, 6, 6],
      [6, 6, 6],
    ]);
    gameGateway.feed({
      maxDepth: 0,
      grid,
    });

    const endingGridHashs = service.execute();
    expect(endingGridHashs).toEqual([grid.toHash()]);
  });
  //
  // it('gets the possible grids if the max depth is over 0', () => {
  //   const grid = new Grid([
  //     [0, 6, 6],
  //     [6, 6, 6],
  //     [6, 6, 6],
  //   ]);
  //   gameGateway.feed({
  //     maxDepth: 1,
  //     grid,
  //   });
  //
  //
  //   const endingGridHashs = service.execute();
  //   expect(endingGridHashs).toEqual([new Grid([
  //     [1, 6, 6],
  //     [6, 6, 6],
  //     [6, 6, 6],
  //   ]).toHash(),
  //   ]);
  // });
});