export class Position {
  constructor(public x: number, public y: number) {
  }

  getDistance(position: Position) {
    const deltaX = Math.abs(this.x - position.x);
    const deltaY = Math.abs(this.y - position.y);

    return Math.hypot(deltaX, deltaY);
  }

  isSame(position: Position) {
    return this.x === position.x && this.y === position.y;
  }

  getAngleFrom(position: Position) {
    if (this.isSame(position)) {
      throw new Error('Cannot get angle from the same position');
    }
    const deltaX = Math.abs(this.x - position.x);
    const deltaY = Math.abs(this.y - position.y);
    if (deltaX === 0) {
      return this.y < position.y ? 90 : -90;
    }
    if (deltaY === 0) {
      return this.x < position.x ? 180 : 0;
    }
    const angle = Math.atan(deltaY / deltaX) * 180 / Math.PI;
    const negativeFactor = this.y < position.y ? -1 : 1;
    return negativeFactor * angle;
  }

  toString() {
    return `x${this.x} y${this.y}`;
  }
}