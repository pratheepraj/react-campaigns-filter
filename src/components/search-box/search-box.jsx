import React from 'react';
import { func } from 'prop-types';

const searchBox = ({ onChange }) => {
  return (
    <input
      className="search-box"
      type="text"
      onChange={event => onChange(event.target.value)}
      placeholder="Type to search..."
    />
  );
};

searchBox.propTypes = {
  onChange: func,
};

export default searchBox;
