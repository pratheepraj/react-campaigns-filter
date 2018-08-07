import moment from 'moment';
import { DEFAULT_DATE_FORMAT } from '../config/date';

// Calculates whether a given date is within two other dates
export const inRange = (date, startDate, endDate) => date >= startDate && date <= endDate;

// Converts date from format 'MM/DD/YYYY' to timestamp
export const convertToTimestamp = (date = '') => {
  const split = date.split('/');
  return Date.parse([split[2], split[0], split[1]].join('-'));
};

// Formats date to default format
export const formatDate = date => moment(date).format(DEFAULT_DATE_FORMAT);
