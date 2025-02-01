import {Position} from './Position';

describe('Position', () => {

  it('get the distance to another position (hypotenuse of the x y triangle)', () => {
    const position1 = new Position(1, 1);
    const position2 = new Position(1, 1);
    const position3 = new Position(1, 2);
    const position4 = new Position(2, 2);
    const position5 = new Position(3.56, 4.89384);

    expect(position1.getDistance(position2)).toEqual(0);
    expect(position1.getDistance(position3)).toEqual(1);
    expect(position1.getDistance(position4)).toEqual(Math.sqrt(2));
    expect(position1.getDistance(position5)).toEqual(Math.hypot(2.56, 3.89384));
  });

  it('tells if position are equals', () => {
    const position1 = new Position(1, 1);
    const position2 = new Position(1, 1);
    const position3 = new Position(1, 2);

    expect(position1.isSame(position2)).toBe(true);
    expect(position1.isSame(position3)).toBe(false);
  });

  describe('getAngleFrom', () => {
    it('throw if position is the same', () => {
      const position = new Position(0, 0);
      expect(() => position.getAngleFrom(position)).toThrow();
    });

    it('get the angle from a position', () => {
      const position = new Position(0, 0);
      const position2 = new Position(1,1);
      const position3 = new Position(0,1);
      const position4 = new Position(1,2);

      expect(position.getAngleFrom(position2)).toEqual(-45);
      expect(position2.getAngleFrom(position)).toEqual(45);
      expect(position3.getAngleFrom(position2)).toEqual(180);
      expect(position2.getAngleFrom(position4)).toEqual(90);
    });
  });
});