import {FakeTurnReader} from "../infra/fake-game.gateway";
import {GetNearestOrganService} from "./get-nearest-organ.service";
import {Position} from "../domain/Position";
import {OPPONENT, PLAYER} from "../interfaces";

describe('getNearestOrganService', () => {
    it('returns null if there is no organ', () => {
        const turnReader = new FakeTurnReader([
            '(O) (O)',
            '(O) (O)',
        ]);

        const turnInfo = turnReader.getTurnInfo();

        const service = new GetNearestOrganService(turnInfo);

        expect(service.execute(new Position(0,1), PLAYER)).toBeNull();

    });

    it('get the nearest organ', () => {
        const turnReader = new FakeTurnReader([
            '(N) (O) (N)',
            '(O) (O) (O)',
            '(O) (O) (O)',
            '(N) (O) (N)',
        ]);

        const turnInfo = turnReader.getTurnInfo();

        const service = new GetNearestOrganService(turnInfo);

        expect(service.execute(new Position(0,1), PLAYER)).toEqual(turnInfo.grid.getCell(new Position(0,0)).organ);
        expect(service.execute(new Position(2,2), PLAYER)).toEqual(turnInfo.grid.getCell(new Position(2,3)).organ);
    });

    it('get an organ of the requested player', () => {
        const turnReader = new FakeTurnReader([
            '(n) (O) (N)',
            '(O) (O) (O)',
            '(O) (O) (O)',
            '(N) (O) (N)',
        ]);

        const turnInfo = turnReader.getTurnInfo();

        const service = new GetNearestOrganService(turnInfo);

        expect(service.execute(new Position(2,2), OPPONENT)).toEqual(turnInfo.grid.getCell(new Position(0,0)).organ);
    });
});