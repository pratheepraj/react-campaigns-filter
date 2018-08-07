import React from 'react';
import { bool } from 'prop-types';

const Status = ({ on }) => (
  <div className="status">
    <div className={`status__icon ${on ? 'status__icon--active' : ''}`} />
    {on ? 'Active' : 'Inactive'}
  </div>
);

Status.propTypes = {
  on: bool,
};

export default Status;
