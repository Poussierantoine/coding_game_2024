import {Grid} from './Grid';

type Hash = string;

type Tree = {
  children: Hash[], // if empty it means the process has ended (no children or limit reached, if no children leavesIfFullyProcessed contains the hash)
  depth: number,
  leavesIfFullyProcessed: Hash[],
}

//todo utiliser les leaves meme elles ne sont pas full au cas ou on ai un depth equaal ?
// du coup mettre un champ isFull dans le tree ?

export class Graph {
  protected readonly endingGridsHashsArray: string[] = [];
  protected readonly processedGridTrees: Map<Hash, Tree> = new Map();
  private readonly maxDepth: number;


  constructor(grid: Grid,maxDepth: number){
    this.maxDepth = maxDepth;
    if (maxDepth === 0) {
      this.endingGridsHashsArray.push(grid.toHash());
    } else {
      this.processGrid(grid);
    }
  }

  get endingGridsHashs() {
    return this.endingGridsHashsArray;
  }

  private processGrid(grid: Grid, depth: number = 0): {hash: Hash; leavesIfFullyProcessed: Hash[]} {
    const hash = grid.toHash();
    if (depth === this.maxDepth) {
      this.addEndingGridHash(hash);
      if (hash.indexOf('0') !== -1) {
        // grid not full, leave of the tree until the graph is used from a lower depth
        this.addProcessedGridHash(hash, depth, [], []);
        return {hash, leavesIfFullyProcessed: []};
      }
      // grid full, leave of the tree
      this.addProcessedGridHash(hash, depth, [], []);
      return {hash, leavesIfFullyProcessed: [hash]};
    }
    // check for shorcuts ;)
    const leaves = this.useAlreadyProcessedGraphIfExists(grid, depth);
    if(leaves) {
      return {hash, leavesIfFullyProcessed: leaves};
    }
    // build new graph part if not already processed
    const possibleGrids = grid.getPossibleGrids();
    if(possibleGrids.length === 0) {
      // grid full, leave of the tree
      this.addEndingGridHash(hash);
      this.addProcessedGridHash(hash, depth, [], []);
      return {hash, leavesIfFullyProcessed: [hash]};
    }
    const children: Hash[] = [];
    const leavesIfFullyProcessed: Hash[] = [];
    let fullyProcessed = true;
    for (const possibleGrid of possibleGrids) {
      const {leavesIfFullyProcessed, hash} = this.processGrid(possibleGrid, depth + 1);
      children.push(hash);
      if(leavesIfFullyProcessed.length === 0) {
        fullyProcessed = false;
        leavesIfFullyProcessed.splice(0, leavesIfFullyProcessed.length);
      }
      if(fullyProcessed) {
        leavesIfFullyProcessed.push(...leavesIfFullyProcessed);
      }
    }
    this.addProcessedGridHash(hash, depth, children, leavesIfFullyProcessed);
    return {
      hash,
      leavesIfFullyProcessed,
    };
  }

  private useAlreadyProcessedGraphIfExists(grid: Grid, depth: number): Hash[] | undefined {
    const alreadyProcessedTree = this.processedGridTrees.get(grid.toHash());
    if (alreadyProcessedTree) {
      if (alreadyProcessedTree.depth === depth) {
        if(alreadyProcessedTree.leavesIfFullyProcessed.length > 0) {
          this.endingGridsHashsArray.push(...alreadyProcessedTree.leavesIfFullyProcessed);
          return alreadyProcessedTree.leavesIfFullyProcessed;
        }
      }
      this.processAgainTheGraph(grid, alreadyProcessedTree, depth);
    }
    return;
  }

  private addEndingGridHash(hash: Hash) {
    this.endingGridsHashsArray.push(hash);
  }

  private addProcessedGridHash(gridHash: Hash, depth: number, children: Hash[], leavesIfFullyProcessed: Hash[] = []) {
    this.processedGridTrees.set(gridHash, {
      children,
      leavesIfFullyProcessed,
      depth,
    });
  }

  private processAgainTheGraph(_grid: Grid, _alreadyProcessedTree: Tree, _depth: number) {
    // todo reparcourir le graph
    // - mettre a jour les depth si depth < tree.depth
    // - ajouter les leavesIfFullyProcessed si on va plus loin dans le graph et qu'on le finit
    // - ajouter les children si on va plus loin dans le graph et qu'on le finit
    // - mettre les endedGridHash quand on rencontre une fin ou a la fin de la depth
  }
}