import {Direction, OPPONENT, OrganType, Owner, PLAYER} from "../../interfaces";
import {Position} from "../Position";

export class Organ {
    private _id: number;
    private _position: Position;
    private _type: OrganType;
    private _direction: Direction;
    private rootId: number;
    private parentId: number;
    private owner: Owner;

    constructor(
        organ: {
            id: number
            position: Position
            type: OrganType
            direction: Direction
            rootId: number
            parentId: number
            owner: Owner
        }
    ) {
        this._id = organ.id;
        this._position = organ.position;
        this._type = organ.type;
        this._direction = organ.direction;
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
    get type(): OrganType {
        return this._type;
    }
    get direction(): OrganType {
        return this._type;
    }

    isOpponent(): boolean {
        return this.owner === OPPONENT;
    }

    toString() {
        let result = '';
        if (this.owner === PLAYER) {
            if(this.type === 'ROOT'){
                result += 'R';
            }else{
                result += 'N';
            }
        } else {
            if(this.type === 'ROOT'){
                result += 'r';
            }else{
                result += 'n';
            }
        }
        return result;
    }
}