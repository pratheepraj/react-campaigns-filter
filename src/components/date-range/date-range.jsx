import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import { number, string, func } from 'prop-types';
import { DATE_START, DATE_END, DEFAULT_DATE_FORMAT, PLACEHOLDER_FORMAT } from '../../config/date';
import 'react-datepicker/dist/react-datepicker.css';

const DateRange = ({ startDate, error, endDate, onChange, onReset }) => {
  const onStartDateChange = date => {
    // Multiply by 1000 as date.unix() gives timestamp in seconds
    const dateToChange = date ? date.unix() * 1000 : null;
    onChange(dateToChange, DATE_START);
  };

  const onEndDateChange = date => {
    // Multiply by 1000 as date.unix() gives timestamp in seconds
    const dateToChange = date ? date.unix() * 1000 : null;
    onChange(dateToChange, DATE_END);
  };

  return (
    <div className="date-range">
      <div className="date-range__content">
        Start date
        <DatePicker
          selected={startDate ? moment(startDate) : moment()}
          dateFormat={DEFAULT_DATE_FORMAT}
          placeholderText={PLACEHOLDER_FORMAT}
          onChange={onStartDateChange}
        />
        End Date
        <DatePicker
          selected={endDate ? moment(endDate) : moment()}
          dateFormat={DEFAULT_DATE_FORMAT}
          placeholderText={PLACEHOLDER_FORMAT}
          onChange={onEndDateChange}
        />
        <button type="button" onClick={onReset}>
          Reset Dates
        </button>
      </div>
      <div className="date-range__error">{error}</div>
    </div>
  );
};

DateRange.propTypes = {
  startDate: number,
  error: string,
  endDate: number,
  onChange: func,
  onReset: func,
};

export default DateRange;
