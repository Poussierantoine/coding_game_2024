import {ProteinType} from "../interfaces";
import {Organ} from "./Organ";
import {Position} from "./Position";


export class Cell {
    private _position: Position;
    private _organ?: Organ;
    private _protein?: ProteinType;
    private _isWall: boolean;

    constructor(
        cell: {
            position: Position
            isWall: boolean
            protein?: ProteinType
            organ?: Organ
        }
    ) {
        this._position = cell.position;
        this._isWall = cell.isWall;
        this._protein = cell.protein;
        this._organ = cell.organ;

    }


    get position(): Position {
        return this._position;
    }
    
    get organ(): Organ | undefined {
        return this._organ;
    }

    get protein(): ProteinType | undefined{
        return this._protein;
    }


    get isWall() {
        return this._isWall
    }

    setOrgan(value: Organ) {
        this._organ = value;
    }

    setIsWall(isWall: boolean) {
        this._isWall = isWall
    }


    setProtein(value: ProteinType) {
        this._protein = value;
    }

    toString() {
        let result = '(';
        if(this._organ){
             result+= this._organ.toString()
        } else if(this._isWall){
            result += 'W';
        } else if (this._protein) {
            result += this._protein;
        } else{
            result += 'O';
        }
        return result + ')';
    }
}
