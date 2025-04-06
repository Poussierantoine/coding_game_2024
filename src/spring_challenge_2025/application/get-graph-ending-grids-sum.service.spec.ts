import {GetGraphEndingGridsSumService} from './get-graph-ending-grids-sum.service';
import {TestGraph} from '../domain/TestGraph';
import {Grid} from '../domain/Grid';

describe('GetGraphEndingGridsSumService', () => {
  const service = new GetGraphEndingGridsSumService();

  const graph: TestGraph = new TestGraph(new Grid([
    [0, 6, 6],
    [6, 6, 6],
    [6, 6, 0],
  ]), 2);

  it('returns 0 if no ending grids hashs', () => {
    graph.overrideEndingGridHashs([]);
    const sum = service.execute(graph);
    expect(sum).toEqual(0);
  });

  it('sums the hashs and return the sum', () => {
    graph.overrideEndingGridHashs(['000000001', '000000002']);
    const sum = service.execute(graph);
    expect(sum).toEqual(3);
  });
  it('gets the sum modulo 2^30', () => {
    graph.overrideEndingGridHashs(['999999999', '999999999', '999999999', '999999999', '999999999', '999999999', '999999999']);
    const sum = service.execute(graph);
    expect(sum).toEqual(557549049);
  });
});