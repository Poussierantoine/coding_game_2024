import {GetEndingGridsSumService} from './get-ending-grids-sum.service';

describe('GetEndingGridsSumService', () => {
  const service = new GetEndingGridsSumService();

  it('returns 0 if no ending grids hashs', () => {
    const sum = service.execute([]);
    expect(sum).toEqual(0);
  });

  it('sums the hashs and return the sum', () => {
    const sum = service.execute(['000000001', '000000002']);
    expect(sum).toEqual(3);
  });
  it('gets the sum modulo 2^30', () => {
    const sum = service.execute(['999999999', '999999999', '999999999', '999999999', '999999999', '999999999', '999999999']);
    expect(sum).toEqual(557549049);
  });
});