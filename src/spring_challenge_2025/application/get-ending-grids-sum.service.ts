export class GetEndingGridsSumService {

  execute(endingGrids: string[]): number {
    return endingGrids.reduce((acc, hash) => {
      return (acc + Number.parseInt(hash)) % Math.pow(2, 30);
    }, 0);
  }
}