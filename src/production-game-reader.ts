import {Game} from "./Game";
import {Direction, GameReader, GridSize, IGame, Organ, OrganType, ProteinType} from "./interfaces";


type GetGame = (gridSize: GridSize) => Game
type GetRequiredActionsCount = () => number

export class ProductionReader implements GameReader {
getInitialization = () => {
    // @ts-ignore
    var inputs: string[] = readline().split(' ');
    const width: number = parseInt(inputs[0]); // columns in the game grid
    const height: number = parseInt(inputs[1]); // rows in the game grid
    return { width, height }
}

 getTurnInfo = (gridSize: GridSize) => {
    const game = this.getProductionGame(gridSize)
    const requiredActionsCount = this.getRequiredActionsCount()
    return { requiredActionsCount, game }
}

private getRequiredActionsCount: GetRequiredActionsCount = () => {
    // @ts-ignore
    return parseInt(readline()); // your number of organisms, output an action for each one in any order
}

private getProductionGame: GetGame = ({width, height}) => {
    const game: IGame = {
        grid: [],
        myProteins: { A: 0 , B: 0, C: 0, D: 0 },
        oppProteins: { A: 0 , B: 0, C: 0, D: 0 },
        myOrgans: [],
        oppOrgans: [],
        organMap: new Map()
    }

    for (let y = 0; y < height; ++y) {
        game.grid.push(new Array(width))
        for (let x = 0; x < width; ++x) {
            game.grid[y][x] = {
                position: { x, y },
                isWall: false,
            }
        }
    }

    // @ts-ignore
    const entityCount: number = parseInt(readline());
    for (let i = 0; i < entityCount; i++) {
        // @ts-ignore
        var inputs: string[] = readline().split(' ');
        const x: number = parseInt(inputs[0]);
        const y: number = parseInt(inputs[1]); // grid coordinate
        const type: string = inputs[2]; // WALL, ROOT, BASIC, TENTACLE, HARVESTER, SPORER, A, B, C, D
        const owner: number = parseInt(inputs[3]); // 1 if your organ, 0 if enemy organ, -1 if neither
        const organId: number = parseInt(inputs[4]); // id of this entity if it's an organ, 0 otherwise
        const organDir: string = inputs[5]; // N,E,S,W or X if not an organ
        const organParentId: number = parseInt(inputs[6]);
        const organRootId: number = parseInt(inputs[7]);

        if (type === 'WALL') {
            game.grid[y][x].isWall = true
        } else if (type === 'A' || type === 'B' || type === 'C' || type === 'D') {
            game.grid[y][x].protein = type as ProteinType
        } else {
            const organ: Organ = {
                id: organId,
                position: { x, y },
                type: type as OrganType,
                direction: organDir as Direction,
                parentId: organParentId,
                rootId: organRootId,
                owner: owner as 0 | 1
            }
            game.grid[y][x].organ = organ
            game.organMap.set(organId, organ)
            if (owner === 1) {
                game.myOrgans.push(organ)
            } else {
                game.oppOrgans.push(organ)
            }
        }
    }

    // @ts-ignore
    var inputs: string[] = readline().split(' ');
    const myA: number = parseInt(inputs[0]);
    const myB: number = parseInt(inputs[1]);
    const myC: number = parseInt(inputs[2]);
    const myD: number = parseInt(inputs[3]); // your protein stock
    game.myProteins = { A: myA, B: myB, C: myC, D: myD }
    // @ts-ignore
    var inputs: string[] = readline().split(' ');
    const oppA: number = parseInt(inputs[0]);
    const oppB: number = parseInt(inputs[1]);
    const oppC: number = parseInt(inputs[2]);
    const oppD: number = parseInt(inputs[3]); // opponent's protein stock
    game.oppProteins = { A: oppA, B: oppB, C: oppC, D: oppD }

    return new Game(game);
}
}
