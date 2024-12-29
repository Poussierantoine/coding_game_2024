import {Grid} from "../domain/Grid";
import {Position} from "../domain/Position";
import {CellBuilder} from "../domain/Cell.builder";
import {AStarService} from "./a-star.service";
import {FakeTurnReader} from "../infra/fake-game.gateway";
import {Logger} from "../utils/logger";

describe('AStarService', () => {

    it('get the shortest path if no wall', () => {
        const grid = new Grid({width: 3, height:2})
        const startPosition = new Position(0,0)
        const endPosition = new Position(2,0);
        let expectedPath = [
            new CellBuilder({position: startPosition}).build(),
            new CellBuilder({position: new Position(1,0)}).build(),
            new CellBuilder({position: endPosition}).build(),
        ];
        const service = new AStarService(grid, new Logger())
        expect(service.getShortestPath(startPosition, endPosition)).toEqual(expectedPath)
    });

    it(`doesn't walk on walls`, () => {
        const fakeTurnReader = new FakeTurnReader([
            '(r) (O) (O) (O) (O)',
            '(O) (O) (W) (W) (O)',
            '(O) (W) (R) (O) (O)',
            '(O) (W) (O) (O) (O)',
            '(O) (W) (O) (O) (O)',
        ]);
        const grid = fakeTurnReader.getTurnInfo().grid
        const startPosition = new Position(2,2)
        const endPosition = new Position(0,0);

        let expectedPathLength = 9;
        let logger = new Logger();
        const service = new AStarService(grid, logger)

        let shortestPath = service.getShortestPath(startPosition, endPosition);
        logger.printLogs()
        expect(shortestPath).toHaveLength(expectedPathLength)
    });
});