import {GetGameGraphService} from './application/get-game-graph.service';
import {GameInformationGateway} from './infrastructure/GameInformationGateway';
import {GetGraphEndingGridsSumService} from './application/get-graph-ending-grids-sum.service';

const getGameGraphService = new GetGameGraphService(new GameInformationGateway());
const getGraphEndingGridsSumService = new GetGraphEndingGridsSumService();
const graph = getGameGraphService.execute();
const sum = getGraphEndingGridsSumService.execute(graph);

console.log(sum);
