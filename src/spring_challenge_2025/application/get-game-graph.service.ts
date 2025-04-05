import {GameInformationGateway} from '../infrastructure/GameInformationGateway';
import {Graph} from '../domain/Graph';

export class GetGameGraphService {

  constructor(
    private readonly gameInformationGateway: GameInformationGateway,
  ) {}


  execute(){
    const {maxDepth, grid} = this.gameInformationGateway.getGameInformation();
    const graph = new Graph(grid, maxDepth);
    return graph.endingGridsHashs;
  }
}