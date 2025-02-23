import {Position} from './Position';

export class Speed {
  constructor(public xPerSec: number, public yPerSec: number) {
  }

  getLinearSpeed() {
    const origin = new Position(0, 0);
    return origin.getDistance(new Position(this.xPerSec, this.yPerSec));
  }

  getAngle() {
    const speedEndPositionFromOrigin = new Position(this.xPerSec, this.yPerSec);
    return speedEndPositionFromOrigin.getAngleFrom(new Position(0, 0));
  }

}