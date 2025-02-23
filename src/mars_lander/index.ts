import {InMemoryTurnIncrement} from '../common/in-memory-turn-increment';
import {launchGame} from './src/main';
import {MarsLanderGatewayProduction} from './src/marsLanderGatewayProduction';

const MAX_TURN = 100;

launchGame(
  new MarsLanderGatewayProduction(),
  new InMemoryTurnIncrement(),
  MAX_TURN
);