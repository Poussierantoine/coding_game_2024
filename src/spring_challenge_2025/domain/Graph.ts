import {Grid} from './Grid';

export class Graph{
  public readonly endingGridsHashs: string[] = [];
  private processedGridsHashs: string[] = [];
  private readonly maxDepth: number;


  constructor(grid: Grid,maxDepth: number){
    this.maxDepth = maxDepth;
    this.processGrid(grid);
  }

  processGrid(grid: Grid){
    this.endingGridsHashs.push(grid.toHash());
  }

  // todo faire attention car même si on a vu une grille, peut-être qu'elle etait
  //  en bout de chaine et du coup si on la recroise au debut on a peut-être pas
  //  vu toutes les possibilites
}