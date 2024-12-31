import {Direction, DOWN, LEFT, RIGHT, UP} from "../interfaces";

export class Position {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    getDistance(otherPosition: Position){
        return this.getDistanceX(otherPosition) + this.getDistanceY(otherPosition)
    }

    getAdjacentPositions(){
        return [
            new Position(this._x + 1, this._y),
            new Position(this._x, this._y + 1),
            new Position(this._x, this._y - 1),
            new Position(this._x - 1, this._y),
        ]
    }

    isSame(otherPosition: Position) {
        return this._x === otherPosition.x && this._y === otherPosition.y
    }

    getDirectionTo(otherPosition: Position): Direction{
        if(this._x !== otherPosition.x && this._y !== otherPosition.y){
            throw new Error('the positions are not on the same line or column')
        }
        if(otherPosition.isSame(this)){
            throw new Error('the positions are the same')
        }
        if(this._x === otherPosition.x){
            return this._y < otherPosition.y ? DOWN : UP
        }
        return this._x < otherPosition.x ? RIGHT : LEFT
    }

    toString() {
        return `${this._x} ${this._y}`
    }

    private getDistanceX(otherPosition: Position){
        return Math.abs(this._x - otherPosition.x);
    }

    private getDistanceY(otherPosition: Position){
        return Math.abs(this._y - otherPosition.y);
    }

}