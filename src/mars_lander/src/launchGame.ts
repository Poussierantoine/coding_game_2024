import {TurnIncrement} from '../../common/turnIncrement/turn-increment';
import {MarsLanderGateway} from './infrastructure/marsLanderGateway';
import {ActionAndLogGateway} from '../../common/action-and-log-gateway/action-and-log-gateway';
import {LandingService} from './application/landing-service';
import {Position} from './domain/Position';

export const launchGame = (
  marsLanderGateway: MarsLanderGateway,
  actionAndLogGateway: ActionAndLogGateway,
  turnIncrement: TurnIncrement,
  maxTurn: number
) => {
  const landingService = new LandingService({
    maxSpeed: 40,
    gravityAcceleration: 3.711
  });
  marsLanderGateway.getLandInfo();
  let landingPosition;
  while (turnIncrement.getTurn() < maxTurn) {
    const shipInfo = marsLanderGateway.getShipInfo();
    landingPosition = new Position(shipInfo.position.x, 100);

    const power = landingService.getPowerForTurn(shipInfo, landingPosition!);

    actionAndLogGateway.doAction(`0 ${power}`);

    turnIncrement.increment();
  }
  actionAndLogGateway.log('All turns processed');
};