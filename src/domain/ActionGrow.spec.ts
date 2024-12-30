import {OrganBuilder} from "./grid/Organ.builder";
import {Position} from "./Position";
import {ActionGrow} from "./ActionGrow";

describe('ActionGrow', () => {
    it('throw if the destination position is the same of the organ', () => {
        const position = new Position(0,0)
        const organ = new OrganBuilder({position}).build()
        expect(() => new ActionGrow(organ, position)).toThrow()
    });
});