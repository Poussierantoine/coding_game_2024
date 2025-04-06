import {Graph} from '../domain/Graph';

export class GetGraphEndingGridsSumService {

  execute(graph: Graph): number {
    if (graph.endingGridsHashs.length === 0) {
      return 0;
    }
    return graph.endingGridsHashs.reduce((acc, hash) => {
      return (acc + Number.parseInt(hash)) % Math.pow(2, 30);
    }, 0);
  }
}