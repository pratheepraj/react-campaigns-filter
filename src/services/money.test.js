import { formatMoney } from './money';

describe('Date service', () => {
  it('formatMoney: formats to 000,000,000', () => {
    expect(formatMoney(123456789)).toEqual('123,456,789');
    expect(formatMoney(1234.34)).toEqual('1,234');
  });
});
