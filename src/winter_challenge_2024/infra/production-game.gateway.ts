import {TurnInfo} from '../domain/TurnInfo';
import {Direction, GameGateway, GetTurnInfo, ITurnInfo, OPPONENT, OrganType, Owner} from '../interfaces';
import {Organ} from '../domain/grid/Organ';
import {Position} from '../domain/Position';
import {Action} from '../domain/Action';
import {Grid} from '../domain/grid/Grid';
import {Protein} from '../domain/grid/Protein';
import {readlineAbstraction} from '../../common/readline-abstraction';

export class ProductionGameGateway implements GameGateway {
  getInitialization = () => {
    const gridSize: string[] = readlineAbstraction().split(' ');
    const width: number = parseInt(gridSize[0]); // columns in the game grid
    const height: number = parseInt(gridSize[1]); // rows in the game grid
    return { width, height };
  };

  print(stringToPrint: string) {
    console.error(stringToPrint);
  }

  doAction(action: Action){
    console.log(action.toString());
  }

  getTurnInfo: GetTurnInfo =  (gridSize) => {
    const turnInfo: ITurnInfo = {
      grid: new Grid(gridSize),
      myProteins: { A: 0 , B: 0, C: 0, D: 0 },
      oppProteins: { A: 0 , B: 0, C: 0, D: 0 },
      myOrgans: [],
      oppOrgans: [],
      organMap: new Map(),
      proteins: []
    };

    const entityCount: number = parseInt(readlineAbstraction());
    for (let i = 0; i < entityCount; i++) {
      const entityInformations: string[] = readlineAbstraction().split(' ');
      const x: number = parseInt(entityInformations[0]);
      const y: number = parseInt(entityInformations[1]); // grid coordinate
      const type: string = entityInformations[2]; // WALL, ROOT, BASIC, TENTACLE, HARVESTER, SPORER, A, B, C, D
      const owner: number = parseInt(entityInformations[3]); // 1 if your organ, 0 if enemy organ, -1 if neither
      const organId: number = parseInt(entityInformations[4]); // id of this entity if it's an organ, 0 otherwise
      const organDir: string = entityInformations[5]; // N,E,S,W or X if not an organ
      const organParentId: number = parseInt(entityInformations[6]);
      const organRootId: number = parseInt(entityInformations[7]);

      const position = new Position(x,y);
      if (type === 'WALL') {
        turnInfo.grid.getCell(position).setIsWall(true);
      } else if (type === 'A' || type === 'B' || type === 'C' || type === 'D') {
        const protein = new Protein(type, position);
        turnInfo.grid.getCell(position).setProtein(protein);
        turnInfo.proteins.push(protein);
      } else {
        const organ = new Organ({
          id: organId,
          position: position,
          type: type as OrganType,
          direction: organDir as Direction,
          parentId: organParentId,
          rootId: organRootId,
          owner: owner as Owner
        });
        turnInfo.grid.getCell(position).setOrgan(organ);
        turnInfo.organMap.set(organId, organ);
        if (owner === OPPONENT) {
          turnInfo.myOrgans.push(organ);
        } else {
          turnInfo.oppOrgans.push(organ);
        }
      }
    }

    const playerVitamins: string[] = readlineAbstraction().split(' ');
    const myA: number = parseInt(playerVitamins[0]);
    const myB: number = parseInt(playerVitamins[1]);
    const myC: number = parseInt(playerVitamins[2]);
    const myD: number = parseInt(playerVitamins[3]); // your protein stock
    turnInfo.myProteins = { A: myA, B: myB, C: myC, D: myD };
    const opponentVitamins: string[] = readlineAbstraction().split(' ');
    const oppA: number = parseInt(opponentVitamins[0]);
    const oppB: number = parseInt(opponentVitamins[1]);
    const oppC: number = parseInt(opponentVitamins[2]);
    const oppD: number = parseInt(opponentVitamins[3]); // opponent's protein stock
    turnInfo.oppProteins = { A: oppA, B: oppB, C: oppC, D: oppD };

    const requiredActionsCount = this.getRequiredActionsCount();

    return new TurnInfo({turn: turnInfo, gridSize: gridSize, requiredActionCount: requiredActionsCount});
  };

  private getRequiredActionsCount = () => {
    return parseInt(readlineAbstraction()); // your number of organisms, output an action for each one in any order
  };
}
