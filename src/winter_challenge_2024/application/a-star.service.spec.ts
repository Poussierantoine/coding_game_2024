import {Grid} from '../domain/grid/Grid';
import {Position} from '../domain/Position';
import {CellBuilder} from '../domain/grid/Cell.builder';
import {AStarService} from './a-star.service';
import {FakeTurnReader} from '../infra/fake-game.gateway';

describe('AStarService', () => {

  it('get the shortest path if no wall', () => {
    const grid = new Grid({width: 3, height:2});
    const startPosition = new Position(0,0);
    const endPosition = new Position(2,0);
    const expectedPath = [
      new CellBuilder({position: startPosition}).build(),
      new CellBuilder({position: new Position(1,0)}).build(),
      new CellBuilder({position: endPosition}).build(),
    ];
    const service = new AStarService(grid);
    expect(service.getShortestPath(startPosition, endPosition)).toEqual(expectedPath);
  });

  it('doesn\'t walks on walls', () => {
    const fakeTurnReader = new FakeTurnReader([
      '(r) (O) (O) (O) (O)',
      '(O) (O) (W) (W) (O)',
      '(O) (W) (R) (O) (O)',
      '(O) (W) (O) (O) (O)',
      '(O) (W) (O) (O) (O)',
    ]);
    const grid = fakeTurnReader.getTurnInfo().grid;
    const startPosition = new Position(2,2);
    const endPosition = new Position(0,0);

    const expectedPathLength = 9;
    const service = new AStarService(grid);

    const shortestPath = service.getShortestPath(startPosition, endPosition);
    expect(shortestPath).toHaveLength(expectedPathLength);
  });

  it('doesn\'t walks on organs except the goal and the start position', () => {
    const fakeTurnReader = new FakeTurnReader([
      '(r) (O) (O) (O) (O)',
      '(O) (O) (N) (N) (O)',
      '(O) (n) (R) (O) (O)',
      '(O) (n) (O) (O) (O)',
      '(O) (n) (O) (O) (O)',
    ]);
    const grid = fakeTurnReader.getTurnInfo().grid;
    const startPosition = new Position(2,2);
    const endPosition = new Position(0,0);

    const expectedPathLength = 9;
    const service = new AStarService(grid);

    const shortestPath = service.getShortestPath(startPosition, endPosition);
    expect(shortestPath).toHaveLength(expectedPathLength);
  });
});