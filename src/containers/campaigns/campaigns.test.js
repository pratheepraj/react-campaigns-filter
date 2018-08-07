import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Campaigns from './campaigns.jsx';
import { convertToTimestamp } from '../../services/date';

describe('Campaigns', () => {
  let component = null;
  let instance = null;

  beforeEach(() => {
    component = shallow(<Campaigns />);
    instance = component.instance();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('convertDatesToTimestamp: Converts dates in string format to timestamp', () => {
    const data = [
      { id: 1, name: 'Divavu', startDate: '07-12-2018', endDate: '07-30-2018', Budget: 88377 },
    ];

    const timestamp = Date.parse(data[0].startDate);
    const converted = instance.convertDatesToTimestamp(data);
    expect(converted[0].startDate).toEqual(timestamp);
  });

  it('removeCampaignsWithBadDate: Removes campaigns with end date prior to the start date', () => {
    const data = [
      {
        id: 1,
        startDate: convertToTimestamp('01/18/2020'),
        endDate: convertToTimestamp('05/18/2020'),
      },
      {
        id: 2,
        startDate: convertToTimestamp('01/18/2018'),
        endDate: convertToTimestamp('05/18/2016'),
      },
    ];

    expect(instance.removeCampaignsWithBadDate(data).length).toEqual(1);
  });

  it('filterByCampaignName', () => {
    const data = [
      { id: 1, name: 'Divavu' },
      { id: 2, name: 'Jaxspan' },
      { id: 3, name: 'Jaxspanish' },
    ];

    const filtered = instance.filterByCampaignName(data, 'jaxs');
    expect(filtered.length).toEqual(2);
    expect(filtered[0].id).toEqual(2);
    expect(filtered[1].id).toEqual(3);
  });

  it('filterByDate', () => {
    const data = [
      {
        id: 1,
        startDate: convertToTimestamp('01/18/2018'),
        endDate: convertToTimestamp('05/18/2018'),
      },
      {
        id: 2,
        startDate: convertToTimestamp('01/18/2019'),
        endDate: convertToTimestamp('05/18/2019'),
      },
      {
        id: 3,
        startDate: convertToTimestamp('01/18/2020'),
        endDate: convertToTimestamp('05/18/2020'),
      },
    ];

    const rangeStartDate = convertToTimestamp('01/01/2020');
    const rangeEndDate = convertToTimestamp('12/01/2020');

    const filtered = instance.filterByDate(data, rangeStartDate, rangeEndDate);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].id).toEqual(3);
  });
});
