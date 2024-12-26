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

        it('returns o if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: 1
            });

            expect(organ.toString()).toBe('o');
        })

        it('returns O if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: 1
            });

            expect(organ.toString()).toBe('O');
        })

        it('returns o if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: 0
            });

            expect(organ.toString()).toBe('p');
        })

        it('returns O if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: 0
            });

            expect(organ.toString()).toBe('P');
        })
    });
});