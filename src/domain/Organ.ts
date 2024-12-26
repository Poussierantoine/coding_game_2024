import {Direction, OrganType} from "../interfaces";
import {Position} from "./Position";

export class Organ {
    private _id: number;
    private _position: Position;
    private type: OrganType;
    private direction: Direction;
    private rootId: number;
    private parentId: number;
    private owner: 0 | 1;

    constructor(
        organ: {
            id: number
            position: Position
            type: OrganType
            direction: Direction
            rootId: number
            parentId: number
            owner: 0 | 1
        }
    ) {
        this._id = organ.id;
        this._position = organ.position;
        this.type = organ.type;
        this.direction = organ.direction;
        this.rootId = organ.rootId;
        this.parentId = organ.parentId;
        this.owner = organ.owner;
    }

    get id(): number {
        return this._id;
    }
    get position(): Position {
        return this._position;
    }

    toString() {
        let result = '';
        if (this.owner === 0) {
            if(this.type === 'ROOT'){
                result += 'P';
            }else{
                result += 'p';
            }
        } else {
            if(this.type === 'ROOT'){
                result += 'O';
            }else{
                result += 'o';
            }
        }
        return result;
    }
}