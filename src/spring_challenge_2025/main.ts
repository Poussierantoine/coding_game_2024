import {GetGameGraphService} from './application/get-game-graph.service';
import {GameInformationGateway} from './infrastructure/GameInformationGateway';
import {GetEndingGridsSumService} from './application/get-ending-grids-sum.service';

const getGameGraphService = new GetGameGraphService(new GameInformationGateway());
const getEndingGridsSumService = new GetEndingGridsSumService();
const endingGrids = getGameGraphService.execute();
const sum = getEndingGridsSumService.execute(endingGrids);

console.log(sum);
