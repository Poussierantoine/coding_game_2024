import {InMemoryTurnIncrement} from '../common/turnIncrement/in-memory-turn-increment';
import {launchGame} from './src/launchGame';
import {MarsLanderGatewayProduction} from './src/infrastructure/marsLanderGatewayProduction';

const MAX_TURN = 100;

launchGame(
  new MarsLanderGatewayProduction(),
  new InMemoryTurnIncrement(),
  MAX_TURN
);