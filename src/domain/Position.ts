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

    isSame(otherPosition: Position){
        return this._x === otherPosition.x && this._y === otherPosition.y
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