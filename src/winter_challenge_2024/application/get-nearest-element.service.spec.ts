import {FakeTurnReader} from '../infra/fake-game.gateway';
import {GetNearestElementService} from './get-nearest-element.service';
import {Position} from '../domain/Position';
import {OPPONENT, PLAYER} from '../interfaces';

describe('GetNearestElementService', () => {

  describe('getNearestOrgan', () => {
    it('returns null if there is no organ', () => {
      const turnReader = new FakeTurnReader([
        '(O) (O)',
        '(O) (O)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestOrgan(new Position(0,1), PLAYER)).toBeNull();
    });

    it('doesn\'t return an organ if its on the target', () => {
      const turnReader = new FakeTurnReader([
        '(N) (N) (N)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestOrgan(new Position(2,0), PLAYER)).toEqual(turnInfo.grid.getCell(new Position(1,0)).organ);

    });

    it('get the nearest organ', () => {
      const turnReader = new FakeTurnReader([
        '(N) (O) (N)',
        '(O) (O) (O)',
        '(O) (O) (O)',
        '(N) (O) (N)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestOrgan(new Position(0,1), PLAYER)).toEqual(turnInfo.grid.getCell(new Position(0,0)).organ);
      expect(service.getNearestOrgan(new Position(2,2), PLAYER)).toEqual(turnInfo.grid.getCell(new Position(2,3)).organ);
    });

    it('get an organ of the requested player', () => {
      const turnReader = new FakeTurnReader([
        '(n) (O) (N)',
        '(O) (O) (O)',
        '(O) (O) (O)',
        '(N) (O) (N)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestOrgan(new Position(2,2), OPPONENT)).toEqual(turnInfo.grid.getCell(new Position(0,0)).organ);
    });
  });

  describe('getNearestProtein', () => {
    it('returns null if there is no protein', () => {
      const turnReader = new FakeTurnReader([
        '(O) (O)',
        '(O) (O)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestProtein(new Position(0,1), 'A')).toBeNull();
    });

    it('get the nearest protein', () => {
      const turnReader = new FakeTurnReader([
        '(A) (O) (A)',
        '(O) (O) (O)',
        '(O) (O) (O)',
        '(A) (O) (A)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestProtein(new Position(0,1), 'A')).toEqual(turnInfo.grid.getCell(new Position(0,0)).protein);
      expect(service.getNearestProtein(new Position(2,2), 'A')).toEqual(turnInfo.grid.getCell(new Position(2,3)).protein);
    });

    it('doesn\'t take other protein types', () => {
      const turnReader = new FakeTurnReader([
        '(A) (O) (A)',
        '(O) (O) (O)',
        '(O) (O) (O)',
        '(A) (O) (C)',
      ]);

      const turnInfo = turnReader.getTurnInfo();

      const service = new GetNearestElementService(turnInfo);

      expect(service.getNearestProtein(new Position(0,1), 'B')).toBeNull();
      expect(service.getNearestProtein(new Position(0,1), 'C')).toEqual(turnInfo.grid.getCell(new Position(2,3)).protein);

    });
  });

});