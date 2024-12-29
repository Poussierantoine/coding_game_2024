import {FakeTurnReader} from "./fake-game.gateway";
import {Position} from "../domain/Position";

describe('FakeGameGateway', () => {


    describe('FakeGameReader', () => {

        describe('allowed chars', () => {
            it('throw if string contain incorrect character', () => {
                expect(() => new FakeTurnReader(['(a)'])).toThrow();
            });

            it('handle empty cell', () => {
                const reader = new FakeTurnReader(['(O)']);
                expect(reader.getTurnInfo().grid.getCell(new Position(0,0)).isWall).toBe(false);
                expect(reader.getTurnInfo().grid.getCell(new Position(0,0)).organ).not.toBeDefined()
            });

            it('handle walls', () => {
                const reader = new FakeTurnReader(['(W)']);
                expect(reader.getTurnInfo().grid.getCell(new Position(0,0)).isWall).toBe(true);
            });

            it('handle player root organ', () => {
                const reader = new FakeTurnReader(['(R)']);
                const organ = reader.getTurnInfo().grid.getCell(new Position(0,0)).organ;
                expect(organ).toBeDefined();
                expect(organ?.type).toBe('ROOT');
                expect(organ?.isOpponent()).toBe(false);
            });

            it('handle player basic organ', () => {
                const reader = new FakeTurnReader(['(N)']);
                const organ = reader.getTurnInfo().grid.getCell(new Position(0,0)).organ;
                expect(organ).toBeDefined();
                expect(organ?.type).toBe('BASIC');
                expect(organ?.isOpponent()).toBe(false);
            });

            it('handle opponent root organ', () => {
                const reader = new FakeTurnReader(['(r)']);
                const organ = reader.getTurnInfo().grid.getCell(new Position(0,0)).organ;
                expect(organ).toBeDefined();
                expect(organ?.type).toBe('ROOT');
                expect(organ?.isOpponent()).toBe(true);
            });

            it('handle opponent basic organ', () => {
                const reader = new FakeTurnReader(['(n)']);
                const organ = reader.getTurnInfo().grid.getCell(new Position(0,0)).organ;
                expect(organ).toBeDefined();
                expect(organ?.type).toBe('BASIC');
                expect(organ?.isOpponent()).toBe(true);
            });

            it('handle proteins', () => {
                const reader = new FakeTurnReader(['(A) (B) (C) (D)']);
                const grid = reader.getTurnInfo().grid;
                expect(grid.getCell(new Position(0,0)).protein).toBe('A');
                expect(grid.getCell(new Position(1,0)).protein).toBe('B');
                expect(grid.getCell(new Position(2,0)).protein).toBe('C');
                expect(grid.getCell(new Position(3,0)).protein).toBe('D');
            });
        });

        it('parse multiline grid', () => {
            const reader = new FakeTurnReader([
                '(W) (O)',
                '(B) (r)'
            ]);
            const grid = reader.getTurnInfo().grid;
            expect(grid.getCell(new Position(0,0)).isWall).toBe(true);
            expect(grid.getCell(new Position(1,0)).isWall).toBe(false);
            expect(grid.getCell(new Position(0,1)).protein).toBe('B');
            expect(grid.getCell(new Position(1,1)).organ?.isOpponent()).toBe(true);
        });

        it('get grid size from input', () => {
            const reader = new FakeTurnReader([
                '(W) (W) (W)',
                '(W) (W) (W)'
            ]);
            const grid = reader.getTurnInfo().grid;
            expect(grid.width).toBe(3);
            expect(grid.height).toBe(2);
        });

        it('throw if grid not valid', () => {
            expect(() => new FakeTurnReader([
                '(W) (W) (W)',
                '(W)'
            ])).toThrow();
        })
    });
});