import { inRange, convertToTimestamp, formatDate } from './date';

describe('Date service', () => {
  it('convertToTimestamp: Converts date from format "MM/DD/YYYY" to timestamp', () => {
    let timestamp = Date.parse('2020-01-30');
    expect(convertToTimestamp('01/30/2020')).toEqual(timestamp);

    timestamp = Date.parse('2016-01-01');
    expect(convertToTimestamp('01/01/2016')).toEqual(timestamp);
  });

  it('formatDate: Formats date to default format', () => {
    let timestamp = Date.parse('2020-01-30');
    expect(formatDate(timestamp)).toEqual('30/01/2020');

    timestamp = Date.parse('2016-01-01');
    expect(formatDate(timestamp)).toEqual('01/01/2016');
  });

  it('inRange: Calculates whether a given date is within two other dates', () => {
    const rangeStartDate = Date.parse('2020-01-01');
    const rangeEndDate = Date.parse('2020-12-31');

    const date1 = Date.parse('2019-05-05');
    const date2 = Date.parse('2020-05-05');

    expect(inRange(date1, rangeStartDate, rangeEndDate)).toBe(false);
    expect(inRange(date2, rangeStartDate, rangeEndDate)).toBe(true);
  });
});
