import {Position} from "./Position";
import {DOWN, LEFT, RIGHT, UP} from "../interfaces";

describe('Position', () => {
    it('get the sum of the difference on x and y as the distance', () => {
        const pos1 = new Position(1, 1)
        const pos2 = new Position(1, 1)
        const pos3 = new Position(1, 2)
        const pos4 = new Position(2, 2)

        expect(pos1.getDistance(pos2)).toEqual(0)
        expect(pos1.getDistance(pos3)).toEqual(1)
        expect(pos1.getDistance(pos4)).toEqual(2)
    });

    it('get the adjacent position on x and axes', () => {
        const pos1 = new Position(1, 1)
        const getAdjacentPositions = pos1.getAdjacentPositions()

        expect(getAdjacentPositions).toHaveLength(4)
        expect(getAdjacentPositions[0].toString()).toEqual('2 1')
        expect(getAdjacentPositions[1].toString()).toEqual('1 2')
        expect(getAdjacentPositions[2].toString()).toEqual('1 0')
        expect(getAdjacentPositions[3].toString()).toEqual('0 1')
    });

    describe('getDirectionTo', () => {
        it('throw if the positions are not on same line or column', () => {
            const pos1 = new Position(1, 1)
            const pos2 = new Position(2, 2)

            expect(() => pos1.getDirectionTo(pos2)).toThrow()
        });

        it('throw if the positions are the same', () => {
            const pos1 = new Position(1, 1)
            const pos2 = new Position(2, 2)

            expect(() => pos1.getDirectionTo(pos2)).toThrow()
        });

        it('gets the right direction', () => {
            const pos1 = new Position(1, 1)
            const pos2 = new Position(2, 1) // x+1
            const pos3 = new Position(1, 2) // y+1
            const pos4 = new Position(1, 0) // y-1
            const pos5 = new Position(0, 1) // x-1

            expect(pos1.getDirectionTo(pos2)).toEqual(RIGHT)
            expect(pos1.getDirectionTo(pos3)).toEqual(DOWN)
            expect(pos1.getDirectionTo(pos4)).toEqual(UP)
            expect(pos1.getDirectionTo(pos5)).toEqual(LEFT)
        });
    })
});