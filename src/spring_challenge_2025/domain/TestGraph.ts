import {Graph, Tree} from './Graph';


export class TestGraph extends Graph {
  constructor(){
    super();
  }

  overrideProcessedGridTrees(
    processedGridTrees: Record<string, Tree>,
  ) {
    this.processedGridTrees.clear();
    for (const [hash, { children, leavesIfFullyProcessed, depth }] of Object.entries(processedGridTrees)) {
      this.processedGridTrees.set(hash, {
        children,
        leavesIfFullyProcessed,
        depth,
      });
    }
  }

  getProcessedGridTreesAsRecord() {
    const record = {} as Record<string, Tree>;
    for (const [hash, tree] of this.processedGridTrees.entries()) {
      record[hash] = tree;
    }
    return record;
  }

  clear() {
    this.processedGridTrees.clear();
  }
}
