import {Grid} from './Grid';
import {Graph} from './Graph';


export class TestGraph extends Graph {
  constructor(grid: Grid, maxDepth: number){
    super(grid, maxDepth);
  }

  getProcessedGridTrees() {
    return this.processedGridTrees;
  }

  overrideEndingGridHashs(endingGridsHashs: string[]) {
    this.endingGridsHashsArray.splice(0, this.endingGridsHashsArray.length, ...endingGridsHashs);
  }
}
