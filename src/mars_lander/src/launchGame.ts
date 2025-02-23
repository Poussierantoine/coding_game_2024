import {TurnIncrement} from '../../common/turnIncrement/turn-increment';
import {MarsLanderGateway} from './infrastructure/marsLanderGateway';
import {ActionAndLogGateway} from '../../common/action-and-log-gateway/action-and-log-gateway';

export const launchGame = (
  marsLanderGateway: MarsLanderGateway,
  actionAndLogGateway: ActionAndLogGateway,
  turnIncrement: TurnIncrement,
  maxTurn: number
) => {
  const landInfo = marsLanderGateway.getLandInfo();
  while (turnIncrement.getTurn() < maxTurn) {
    const shipInfo = marsLanderGateway.getShipInfo();
    actionAndLogGateway.doAction('0 0');
    turnIncrement.increment();
  }
  actionAndLogGateway.log('All turns processed');
};