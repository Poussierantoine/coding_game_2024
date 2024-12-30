import {Organ} from "./Organ";
import {Position} from "../Position";
import {OPPONENT, PLAYER} from "../../interfaces";

describe('Organ', () => {
    describe('toString', () => {

        const commonParameters = {
            id: 1,
            position: new Position(0,0),
            type: 'ROOT',
            direction: 'N',
            rootId: 1,
            parentId: 1,
            owner: OPPONENT
        } as const;

        it('returns n if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: OPPONENT
            });

            expect(organ.toString()).toBe('n');
        })

        it('returns r if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: OPPONENT
            });

            expect(organ.toString()).toBe('r');
        })

        it('returns N if it is opponent basic one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'BASIC',
                owner: PLAYER
            });

            expect(organ.toString()).toBe('N');
        })

        it('returns R if it is opponent root one', () => {
            const organ = new Organ({
                ...commonParameters,
                type: 'ROOT',
                owner: PLAYER
            });

            expect(organ.toString()).toBe('R');
        })
    });
});