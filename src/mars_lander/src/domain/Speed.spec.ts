import {Speed} from './Speed';

describe('speed', () => {
  it('get the linear speed', () => {
    const speed = new Speed(1, 2);
    expect(speed.getLinearSpeed()).toEqual(Math.sqrt(5));
  });

  it('get the angle of the speed', () => {
    const speed = new Speed(1, 1);
    const speed2 = new Speed(-1, -1);

    expect(speed.getAngle()).toEqual(45);
    expect(speed2.getAngle()).toEqual(-45);
  });
});