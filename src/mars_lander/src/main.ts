import {TurnIncrement} from '../../common/turn-increment';
import {MarsLanderGateway} from './marsLanderGateway';

export const launchGame = (marsLAnderGateway: MarsLanderGateway, turnIncrement: TurnIncrement, maxTurn: number) => {
  const landInfo = marsLAnderGateway.getLandInfo();
  while (turnIncrement.getTurn() < maxTurn) {
    const shipInfo = marsLAnderGateway.getShipInfo();
    console.log('0 3');
  }
};