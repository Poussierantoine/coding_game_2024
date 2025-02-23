import {InMemoryTurnIncrement} from '../common/turnIncrement/in-memory-turn-increment';
import {launchGame} from './src/launchGame';
import {MarsLanderGatewayProduction} from './src/infrastructure/marsLanderGatewayProduction';
import {ProductionActionAndLogGateway} from '../common/action-and-log-gateway/production-action-and-log-gateway';

const MAX_TURN = 100;

launchGame(
  new MarsLanderGatewayProduction(),
  new ProductionActionAndLogGateway(),
  new InMemoryTurnIncrement(),
  MAX_TURN
);