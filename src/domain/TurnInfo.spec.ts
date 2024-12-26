import {CellBuilder} from "./Cell.builder";
import {OrganBuilder} from "./Organ.builder";
import {TurnInfo} from "./TurnInfo";
import {TurnInfoBuilder} from "./TurnInfoBuilder";
import {Position} from "./Position";

describe('TurnInfo', () => {
    describe('toString', () => {
        it('display cells columns by row', () => {
            const cell00 = new CellBuilder({position: new Position(0,0), isWall: true}).build()
            const cell10 = new CellBuilder({position: new Position(1,0), isWall: false}).build()
            const playerOrgan = new OrganBuilder({position: new Position(0,1)}).build()
            const cell01 = new CellBuilder({position: new Position(0,1), isWall: false, organ: playerOrgan}).build()
            const opponentOrgan = new OrganBuilder({owner: 1, position: new Position(1,1)}).build()
            const cell11= new CellBuilder({position: new Position(1,1), isWall: false, organ: opponentOrgan}).build()

            const game = new TurnInfoBuilder({grid: [[cell00, cell01], [cell10, cell11]]}).build()

            expect(game.toString()).toEqual(
                `(W) (P)\n( ) (O)`
            )
        });
    });
});