import {Cell} from "./Cell";
import {Grid} from "./Grid";
import {Position} from "./Position";
import {OrganBuilder} from "./Organ.builder";
import {CellBuilder} from "./Cell.builder";

describe('Grid', () => {
    it('set and get the cells', () => {
        const grid = new Grid({width: 2, height: 2})
        let position1 = new Position(0, 1);
        const cell1 = new Cell({
            position: position1,
            isWall: true
        })
        grid.setCells(cell1)
        let position2 = new Position(1, 0);
        const cell2 = new Cell({
            position: position2,
            isWall: true
        })
        grid.setCells(cell2)
        expect(grid.getCell(position1)).toEqual(cell1)
        expect(grid.getCell(position2)).toEqual(cell2)
    });

    it('throw if position is outside the grid', () => {
        const grid = new Grid({width: 1, height: 1})
        let position = new Position(-1, 0);
        expect(() => grid.getCell(position)).toThrow()

        const cell = new CellBuilder({
            position: position,
        }).build()
        expect(() => grid.setCells(cell)).toThrow()
    });

    describe('can move to', () => {
        it(`doesn't allow walls`, () => {
            const grid = new Grid({width: 1, height: 1})
            let position = new Position(0, 0);
            const wall = new Cell({
                position: position,
                isWall: true
            })
            grid.setCells(wall)
            expect(grid.canMoveTo(position)).toBe(false)
        });

        it(`doesn't allow occupied cells`, () => {
            const grid = new Grid({width: 1, height: 1})
            let position = new Position(0, 0);
            const organ = new CellBuilder({
                position: position,
                organ: new OrganBuilder({position}).build()
            }).build()
            grid.setCells(organ)
            expect(grid.canMoveTo(position)).toBe(false)
        });
    });

    it('get adjacent cells', () => {
        const grid = new Grid({width: 3, height: 3})
        const position = new Position(1,1);
        const expectedCells = [
            new CellBuilder({position: new Position(1,0)}).build(),
            new CellBuilder({position: new Position(0,1)}).build(),
            new CellBuilder({position: new Position(2,1)}).build(),
            new CellBuilder({position: new Position(2,1)}).build(),
        ];
        expect(grid.getAdjacentCells(position)).toEqual(expect.arrayContaining(expectedCells))
    });

    it('gets only inside grid cells without throwing', () => {
        const grid = new Grid({width: 2, height: 2})
        const position = new Position(0,0);
        const expectedCells = [
            new CellBuilder({position: new Position(1,0)}).build(),
            new CellBuilder({position: new Position(0,1)}).build(),
        ];
        expect(grid.getAdjacentCells(position)).toEqual(expect.arrayContaining(expectedCells))
    });
});