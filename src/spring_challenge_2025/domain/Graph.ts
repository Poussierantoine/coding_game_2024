type Hash = string;

export type Tree = {
  children: Hash[], // if empty it means the process has ended (no children or limit reached, if no children possible leavesIfFullyProcessed contains the hash)
  depth: number,
  leavesIfFullyProcessed: Hash[], // only if no child grid possible
}

//todo utiliser les leaves meme elles ne sont pas full au cas ou on ai un depth equaal ?
// du coup mettre un champ isFull dans le tree ?

export class Graph {

  protected readonly processedGridTrees: Map<Hash, Tree> = new Map();

  constructor(){
  }

  getGraphFromHash(hash: Hash): Tree | undefined {
    return this.processedGridTrees.get(hash);
  }

  addProcessedGridHash(gridHash: Hash, depth: number, children: Hash[], leavesIfFullyProcessed: Hash[] = []) {
    this.processedGridTrees.set(gridHash, {
      children,
      leavesIfFullyProcessed,
      depth,
    });
  }

  onlyUpdateDepth(alreadyProcessedTree: Tree, depth: number) {
    alreadyProcessedTree.depth = depth;
    for (const childHash of alreadyProcessedTree.children) {
      const childTree = this.processedGridTrees.get(childHash);
      this.onlyUpdateDepth(childTree!, depth + 1);
    }
  }

  searchForEndingGridsAndGridsToProcessForHash(hash: string, currentDepth: number) {
    const node = this.processedGridTrees.get(hash)!;
    node.depth = currentDepth;
    if (node.leavesIfFullyProcessed.length) {
      return {
        leavesToProcess: [],
        endingGrids: node.leavesIfFullyProcessed
      };
    }
    if (node.children.length === 0) {
      return {
        leavesToProcess: [{hash, node}],
        endingGrids: [],
      };
    }
    const endingGrids: string[] = [];
    const leavesToProcess: {hash: string; node: Tree}[] = [];
    for (const childHash of node.children) {
      const {leavesToProcess, endingGrids} = this.searchForEndingGridsAndGridsToProcessForHash(childHash, currentDepth + 1);
      endingGrids.push(...endingGrids);
      leavesToProcess.push(...leavesToProcess);
    }
    return {leavesToProcess, endingGrids};
  }

  searchForEndingGridsForHash(hash: string, currentDepth: number, maxDepth: number) {
    const node = this.processedGridTrees.get(hash)!;
    if(node.depth === currentDepth) {
      return this.searchForEndingGridsIfDepthIsEqualToGraph(hash);
    }
    if (node.children.length === 0) {
      return [hash];
    }
    if(currentDepth === maxDepth){
      return [hash];
    }
    const endingGrids: string[] = [];
    for (const childHash of node.children) {
      const currentEndingGrids = this.searchForEndingGridsForHash(childHash, currentDepth + 1, maxDepth);
      endingGrids.push(...currentEndingGrids);
    }
    return endingGrids;
  }

  private searchForEndingGridsIfDepthIsEqualToGraph(hash: string) {
    const node = this.processedGridTrees.get(hash)!;
    if(node.leavesIfFullyProcessed.length > 0) {
      return node.leavesIfFullyProcessed;
    }
    if(node.children.length === 0) {
      return [hash];
    }
    const endingGrids: string[] = [];
    for (const childHash of node.children) {
      const currentEndingGrids = this.searchForEndingGridsIfDepthIsEqualToGraph(childHash);
      endingGrids.push(...currentEndingGrids);
    }
    return endingGrids;
  }

  // private processAgainTheGraph({currentGridHash, currentGrid, alreadyProcessedTree, depth}: {
  //   alreadyProcessedTree: Tree,
  //   depth: number
  //   currentGridHash: Hash,
  //   currentGrid?: Grid,
  // }) {
  //   if (alreadyProcessedTree.depth === depth) {
  //     // same tree to process, we duplicate leaves in endingGridsHashsArray
  //     if(alreadyProcessedTree.leavesIfFullyProcessed.length > 0) {
  //       this.addEndingGridHashs(...alreadyProcessedTree.leavesIfFullyProcessed);
  //       return alreadyProcessedTree.leavesIfFullyProcessed;
  //     }
  //     if(alreadyProcessedTree.children.length === 0) {
  //       this.addEndingGridHashs(currentGridHash);
  //       return [];
  //     }
  //     if(depth === this.maxDepth) {
  //       this.addEndingGridHashs(currentGridHash);
  //       return [];
  //     }
  //     for (const childHash of alreadyProcessedTree.children) {
  //       const childTree = this.processedGridTrees.get(childHash);
  //       this.processAgainTheGraph({currentGridHash: childHash, alreadyProcessedTree: childTree!, depth: depth + 1});
  //     }
  //     return [];
  //   } else if (alreadyProcessedTree.depth > depth) {
  //     // tree potentially not fully processed comparing the depth, we complete and update the depth
  //     if (alreadyProcessedTree.leavesIfFullyProcessed.length > 0) {
  //       // graph already fully processed, no need to process again
  //       this.addEndingGridHashs(...alreadyProcessedTree.leavesIfFullyProcessed);
  //       this.onlyUpdateDepth(alreadyProcessedTree, depth);
  //       return alreadyProcessedTree.leavesIfFullyProcessed;
  //     }
  //     if(depth === this.maxDepth) {
  //       this.addEndingGridHashs(currentGridHash);
  //       return [];
  //     }
  //     if (alreadyProcessedTree.children.length === 0) {
  //       // need to process the grid not full
  //       const {leavesIfFullyProcessed} =  this.processGridWithPotentialChildren(currentGrid?? Grid.fromHash(currentGridHash), depth, currentGridHash);
  //       alreadyProcessedTree.depth = depth;
  //       return leavesIfFullyProcessed;
  //     }
  //     const leavesIfFullyProcessed: Hash[] = [];
  //     let fullyProcessed = true;
  //     for (const childHash of alreadyProcessedTree.children) {
  //       const childTree = this.processedGridTrees.get(childHash);
  //       const leaves = this.processAgainTheGraph({currentGridHash: childHash, alreadyProcessedTree: childTree!, depth: depth + 1});
  //       if (fullyProcessed && leaves?.length) {
  //         leavesIfFullyProcessed.push(...leaves);
  //       } else {
  //         fullyProcessed = false;
  //       }
  //     }
  //     alreadyProcessedTree.depth = depth;
  //     return leavesIfFullyProcessed;
  //   } else {
  //     // graph depth is lower than current, reprocess to find leaves under current limit
  //     if(
  //       !alreadyProcessedTree.leavesIfFullyProcessed
  //         .find(
  //           leave =>
  //               this.processedGridTrees.get(leave)!.depth + depth - alreadyProcessedTree.depth > this.maxDepth
  //         )) {
  //       this.addEndingGridHashs(...alreadyProcessedTree.leavesIfFullyProcessed);
  //       return alreadyProcessedTree.leavesIfFullyProcessed;
  //     }
  //     if (depth === this.maxDepth) {
  //       this.addEndingGridHashs(currentGridHash);
  //       return [];
  //     }
  //     for (const childHash of alreadyProcessedTree.children) {
  //       const childTree = this.processedGridTrees.get(childHash);
  //       this.processAgainTheGraph({currentGridHash: childHash, alreadyProcessedTree: childTree!, depth: depth + 1});
  //     }
  //     // we cannot take the graph as is so it means at least a leave cannot be pushed
  //     return [];
  //   }
  // }
}