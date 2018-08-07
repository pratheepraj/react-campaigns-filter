import React from 'react';
import Status from '../status';
import { shape, string, number } from 'prop-types';
import { inRange, formatDate } from '../../services/date';
import { formatMoney } from '../../services/money';

const CampaignListItem = ({ item }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{formatDate(item.startDate)}</td>
      <td>{formatDate(item.endDate)}</td>
      <td>
        <Status on={inRange(Date.now(), item.startDate, item.endDate)} />
      </td>
      <td>{formatMoney(item.Budget)}</td>
    </tr>
  );
};

CampaignListItem.propTypes = {
  item: shape({
    name: string,
    startDate: number,
    endDate: number,
    Budget: number,
  }),
};

export default CampaignListItem;
