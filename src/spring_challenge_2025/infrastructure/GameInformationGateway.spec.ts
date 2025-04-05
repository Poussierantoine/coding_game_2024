import {GameInformationGateway} from './GameInformationGateway';
import {FakeReadlineProvider} from '../../common/readline-abstraction';

describe('GameInformationGateway', () => {
  let gateway: GameInformationGateway;
  let readlineProvider: FakeReadlineProvider;

  beforeEach(() => {
    readlineProvider = new FakeReadlineProvider();
    gateway = new GameInformationGateway(readlineProvider);
  });

  it('gets the game information', () => {
    const depth = '1';
    readlineProvider.feed([
      depth,
      '1 2 3',
      '4 5 6',
      '7 8 9',
    ]);

    const result = gateway.getGameInformation();

    expect(result.maxDepth).toEqual(1);
    expect(result.grid.toHash()).toEqual('123456789');
  });
});