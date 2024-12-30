import {ProteinType} from "../../interfaces";
import {Position} from "../Position";

export class Protein {
    constructor (
        private readonly _type: ProteinType,
        private readonly _position: Position
    ) {
    }

    get type(): ProteinType {
        return this._type;
    }

    get position (): Position {
        return this._position;
    }

    toString(){
        return this._type
    }

}