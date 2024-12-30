import {ProteinType} from "../../interfaces";
import {Position} from "../Position";

export class Protein {
    constructor (
        private readonly _type: ProteinType,
        private readonly position: Position
    ) {
    }

    get type(): ProteinType {
        return this._type;
    }

    toString(){
        return this._type
    }

}