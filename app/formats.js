export default {
  number: {
    'czk-zero-decimals': {
      style: 'currency',
      currency: 'CZK',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'currency-zero-decimals': {
      style: 'currency',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'currency-with-exactly-two-decimals': {
      style: 'currency',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    'currency-up-to-two-decimals': {
      style: 'currency',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    'currency-two-to-six-decimals': {
      style: 'currency',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    },
    'czk-two-decimals': {
      style: 'currency',
      currency: 'CZK',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    'czk-zero-or-two-decimals': {
      style: 'currency',
      currency: 'CZK',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    'percent-zero-decimals': {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'percent-two-decimals': {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    'percent-up-to-two-decimals': {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    'percent-up-to-one-decimal': {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    },
    'czk-per-month': {
      style: 'currency',
      currency: 'CZK',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    pa: {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    'pa-one-decimal': {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
    'zero-decimals': {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
    'one-decimal': {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
    'two-decimals': {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  date: {
    'YYYY-MM-DD': {},
    'M/YYYY': {
      month: 'numeric',
      year: 'numeric',
    },
    'M/YY': {
      month: 'numeric',
      year: '2-digit',
    },
  },
};
