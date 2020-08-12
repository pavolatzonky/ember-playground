import { convertHumanReadableRatingToFLoat } from 'ember-playground/utils/rating-converter';

const zonkyRate = 0.02;

const allAmounts = [
  20000,
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  55000,
  60000,
  65000,
  70000,
  75000,
  80000,
  85000,
  90000,
  95000,
  100000,
  105000,
  110000,
  115000,
  120000,
  125000,
  130000,
  135000,
  140000,
  145000,
  150000,
  155000,
  160000,
  165000,
  170000,
  175000,
  180000,
  185000,
  190000,
  195000,
  200000,
  205000,
  210000,
  215000,
  220000,
  225000,
  230000,
  235000,
  240000,
  245000,
  250000,
  255000,
  260000,
  265000,
  270000,
  275000,
  280000,
  285000,
  290000,
  295000,
  300000,
  305000,
  310000,
  315000,
  320000,
  325000,
  330000,
  335000,
  340000,
  345000,
  350000,
  355000,
  360000,
  365000,
  370000,
  375000,
  380000,
  385000,
  390000,
  395000,
  400000,
  405000,
  410000,
  415000,
  420000,
  425000,
  430000,
  435000,
  440000,
  445000,
  450000,
  455000,
  460000,
  465000,
  470000,
  475000,
  480000,
  485000,
  490000,
  495000,
  500000,
  510000,
  520000,
  530000,
  540000,
  550000,
  560000,
  570000,
  580000,
  590000,
  600000,
  610000,
  620000,
  630000,
  640000,
  650000,
  660000,
  670000,
  680000,
  690000,
  700000,
  710000,
  720000,
  730000,
  740000,
  750000,
];

const terms = [
  84,
  78,
  72,
  66,
  60,
  54,
  48,
  47,
  46,
  45,
  44,
  43,
  42,
  41,
  40,
  39,
  38,
  37,
  36,
  35,
  34,
  33,
  32,
  31,
  30,
  29,
  28,
  27,
  26,
  25,
  24,
  23,
  22,
  21,
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  8,
  7,
  6,
];

function getRelevantAmounts(amountMin, amountMax) {
  return allAmounts.filter(
    amount => amountMin <= amount && amount <= amountMax
  );
}

function getRelevantTerms(termMin, termMax) {
  return terms.filter(term => termMin <= term && term <= termMax);
}

function calculateFinalAmount(amount, rating) {
  return amount * (1.0 + rating + zonkyRate);
}

function calculateAnnuitiesForTermAndRating(
  annuityMin,
  annuityMax,
  term,
  rating,
  amountsForRequest
) {
  const annuities = [];

  amountsForRequest.forEach(amountForRequest => {
    const amountWithInterest = calculateFinalAmount(amountForRequest, rating);

    const annuity = Math.round(amountWithInterest / term);

    if (annuityMin <= annuity && annuity <= annuityMax) {
      annuities.push(annuity);
    } else {
      annuities.push(null);
    }
  });

  return annuities;
}

export default function calculateAnnuity(request) {
  const {
    rating,
    requestedAmount,
    requestedAnnuity,
    amountMin,
    amountMax,
    annuityMin,
    annuityMax,
    // paymentDay,
    termMin,
    termMax,
  } = request;

  const ratingAsFloat = convertHumanReadableRatingToFLoat(rating);
  const amountsForRequest = getRelevantAmounts(amountMin, amountMax);
  const terms = getRelevantTerms(termMin, termMax);
  const termItems = [];

  terms.forEach(term => {
    const annuitiesForTermItem = calculateAnnuitiesForTermAndRating(
      annuityMin,
      annuityMax,
      term,
      ratingAsFloat,
      amountsForRequest
    );

    termItems.push({
      annuities: annuitiesForTermItem,
      interestRate: ratingAsFloat,
      term,
    });
  });

  const index = amountsForRequest.indexOf(requestedAmount);
  const closestTermItem = findTermItemByAnnuity(
    requestedAnnuity,
    termItems,
    index
  );

  const annuities = {
    amount: requestedAmount,
    amounts: amountsForRequest,
    annuity: closestTermItem.annuities[index],
    term: closestTermItem.term,
    terms: termItems,
  };

  return annuities;
}

function findTermItemByAnnuity(requestedAnnuity, termItems, index) {
  let closestTermItem;
  let minDifferenceFound = 999999;

  termItems.forEach(termItem => {
    const annuityForRequestedAmount = termItem.annuities[index];

    if (!annuityForRequestedAmount) {
      return;
    }

    const difference = Math.abs(requestedAnnuity - annuityForRequestedAmount);

    if (difference < minDifferenceFound) {
      minDifferenceFound = difference;
      closestTermItem = termItem;
    }
  });

  return closestTermItem;
}
