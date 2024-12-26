import {Position} from "./Position";

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
});