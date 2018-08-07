import React from 'react';
import CampaignListItem from './campaign-list-item.jsx';
import map from 'lodash/map';
import { arrayOf, object } from 'prop-types';

const CampaignList = ({ campaigns }) => {
  const items = map(campaigns, item => <CampaignListItem key={item.id} item={item} />);

  return (
    <table className="campaign-list">
      <thead>
        <tr>
          <th width="30%">Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>
            Budget <small>(USD)</small>
          </th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </table>
  );
};

CampaignList.propTypes = {
  campaigns: arrayOf(object),
};

export default CampaignList;
