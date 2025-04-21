import {GameInformationGateway} from '../infrastructure/GameInformationGateway';
import {Graph} from '../domain/Graph';
import {Grid} from '../domain/Grid';

type GraphProvider<T extends Graph = Graph> = () => T;

const productionGraphProvider: GraphProvider = (): Graph => {
  return new Graph();
};

export class GetGameGraphService<T extends Graph> {
  private endingGridHashs: string[];
  private maxDepth!: number;
  private initialGrid!: Grid;
  private graph: Graph;

  constructor(
    private readonly gameInformationGateway: GameInformationGateway,
    private readonly graphProvider: GraphProvider<T> = productionGraphProvider as GraphProvider<T>,
  ) {
    this.endingGridHashs = [];
    this.graph = this.graphProvider();
  }

  execute() {
    this.init();
    if (this.maxDepth === 0) {
      return [this.initialGrid.toHash()];
    }
    this.buildGraphFromGrid(this.initialGrid);
    return this.endingGridHashs;
  }

  private init() {
    const { maxDepth, grid } = this.gameInformationGateway.getGameInformation();
    if (!(maxDepth !== undefined && maxDepth >= 0 && grid !== undefined)) {
      throw new Error('something goes wrong with the game information');
    }
    this.maxDepth = maxDepth;
    this.initialGrid = grid;
  }

  private addEndingGridHashs(...hashs: string[]) {
    this.endingGridHashs.push(...hashs);
  }

  private buildGraphFromGrid(grid: Grid) {
    const hash = grid.toHash();
    if(!hash.includes('0')) {
      // grid full, leave of the tree
      this.addEndingGridHashs(hash);
      return;
    }
    this.processGridWithChildren(grid, hash, 0);
  }

  private processGridWithChildren(grid: Grid, hash: string, currentDepth: number) {
    const possibleGrids = grid.getPossibleGrids();
    const currentGridLeavesIfFulyProcessed: string[] = [];
    let fullyProcessed = true;
    const children = [];
    for (const possibleGrid of possibleGrids) {
      const possibleGridHash = possibleGrid.toHash();
      const possibleGridDepth = currentDepth + 1;
      children.push(possibleGridHash);
      const endingGridsFromShortcut = this.getShortcutEndingGrids(possibleGridHash, possibleGridDepth);
      if (endingGridsFromShortcut) {
        currentGridLeavesIfFulyProcessed.push(...endingGridsFromShortcut);
        continue;
      }
      const leavesIfFullyProcessed = this.processGridWithChildren(possibleGrid, possibleGridHash, possibleGridDepth);
      if (fullyProcessed && leavesIfFullyProcessed.length) {
        currentGridLeavesIfFulyProcessed.push(...leavesIfFullyProcessed);
      } else {
        fullyProcessed = false;
      }
    }
    this.graph.addProcessedGridHash(hash, currentDepth, children, currentGridLeavesIfFulyProcessed);
    return currentGridLeavesIfFulyProcessed;
  }

  private getShortcutEndingGrids(hash: string, currentDepth: number): string[] | undefined {
    if (currentDepth === this.maxDepth) {
      this.addEndingGridHashs(hash);
      this.graph.addProcessedGridHash(hash, currentDepth, [], []);
      return [hash];
    }
    if (!hash.includes('0')){
      this.graph.addProcessedGridHash(hash, currentDepth, [], [hash]);
      this.addEndingGridHashs(hash);
      return [hash];
    }
    return this.useGraphIfExists(hash, currentDepth);
  }

  private useGraphIfExists(hash: string, currentDepth: number) {
    const graph = this.graph.getGraphFromHash(hash);
    if (!graph){
      return undefined;
    }
    if(graph.depth >= currentDepth) {
      if(graph.leavesIfFullyProcessed.length > 0) {
        this.addEndingGridHashs(...graph.leavesIfFullyProcessed);
        this.graph.onlyUpdateDepth(graph, currentDepth);
        return graph.leavesIfFullyProcessed;
      }
    }
    if(graph.depth > currentDepth){
      const {endingGrids, leavesToProcess} = this.graph.searchForEndingGridsAndGridsToProcessForHash(hash, currentDepth);
      this.addEndingGridHashs(...endingGrids);
      for(const leafToProcess of leavesToProcess) {
        this.processGridWithChildren(Grid.fromHash(leafToProcess.hash), leafToProcess.hash, currentDepth);
      }
      return [];
    }

    const endingGrids = this.graph.searchForEndingGridsForHash(hash, currentDepth, this.maxDepth);
    this.addEndingGridHashs(...endingGrids);
    return [];
  }
}