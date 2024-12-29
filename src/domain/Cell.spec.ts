import {Cell} from "./Cell";
import {Organ} from "./Organ";
import {Position} from "./Position";

describe('Cell', () => {

    describe('toString', () => {
        let commonPosition = new Position(0,0);
        it('returns (W) if the cell is a wall', () => {
            const cell = new Cell({position: commonPosition, isWall: true});
            expect(cell.toString()).toBe('(W)');
        });

        it('returns ( ) if the cell is empty', () => {
            const cell = new Cell({position: commonPosition, isWall: false});
            expect(cell.toString()).toBe('(O)');
        });

        it('returns the wrapped protein if the cell contains one', () => {
            const cell = new Cell({position: commonPosition, isWall: false, protein: 'A'});
            expect(cell.toString()).toBe('(A)');
        });

        it(`returns the organ toString result if the cell is an organ`,  () => {
            let organ = new Organ({
                id: 1,
                position: commonPosition,
                type: 'ROOT',
                direction: 'N',
                rootId: 1,
                parentId: 1,
                owner: 1
            });
            const cell = new Cell({position: commonPosition, isWall: false, organ});
            expect(cell.toString()).toBe('(r)');
        });

    });

});