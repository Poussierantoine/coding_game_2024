import {Organ} from "./Organ";
import {Position} from "./Position";

describe('Organ', () => {
    describe('toString', () => {

        const commonParameters = {
            id: 1,
            position: new Position(0,0),
            type: 'ROOT',
            direction: 'N',
            rootId: 1,
            parentId: 1,
            owner: 1
        } as const;

        it('returns n if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: 1
            });

            expect(organ.toString()).toBe('n');
        })

        it('returns r if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: 1
            });

            expect(organ.toString()).toBe('r');
        })

        it('returns N if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: 0
            });

            expect(organ.toString()).toBe('N');
        })

        it('returns R if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: 0
            });

            expect(organ.toString()).toBe('R');
        })
    });
});