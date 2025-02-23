import {TestMarsLanderGateway} from './infrastructure/TestMarsLanderGateway';
import {TestActionAndLogGateway} from '../../common/action-and-log-gateway/test-action-and-log-gateway';
import {InMemoryTestTurnIncrement} from '../../common/turnIncrement/in-memory-test-turn-increment';
import {launchGame} from './launchGame';
import {Position} from './domain/Position';
import {ShipInfo} from './infrastructure/marsLanderGateway';


describe('launchGame', () => {
  const marsLanderGateway = new TestMarsLanderGateway();
  const actionsGateway = new TestActionAndLogGateway();
  const turnIncrement = new InMemoryTestTurnIncrement();
  const MAX_TURN = 1;
  const testLaunchGame = (maxTurn: number = MAX_TURN) => launchGame(marsLanderGateway, actionsGateway, turnIncrement, maxTurn);
  const uselessShipInfo = {
    position: new Position(0, 0),
    horizontalSpeed: 0,
    verticalSpeed: 0,
    fuel: 0,
    rotationAngle: 0,
    power: 0,
  };

  beforeEach(() => {
    marsLanderGateway.feedLandInfo([new Position(0, 0)]);
    feedUselessFakeShipInfo();
  });

  it('do an action for each turn before max turn and log when all turns processed', () => {
    const maxTurn = 2;
    feedUselessFakeShipInfo(maxTurn);
    testLaunchGame(maxTurn);
    expect(actionsGateway.actions).toHaveLength(maxTurn);
    expect(actionsGateway.logs).toEqual(['All turns processed']);
  });

  const feedUselessFakeShipInfo = (numberOfShipInfo: number = 1) => {
    const shipInfo: ShipInfo[] = [uselessShipInfo];
    for (let i = 1; i < numberOfShipInfo; i++) {
      shipInfo.push(uselessShipInfo);
    }
    marsLanderGateway.feedShipInfos(shipInfo);
  };
});