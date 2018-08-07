import currency from 'currency.js';

// Outputs in the format 000,000,000
export const formatMoney = value => currency(value, { symbol: '', precision: 0 }).format(true);
