export const SUMMARY = {
  investmentsCount: 0,
  principalRemaining: 0,
  principalPaid: 0,
  interestRemaining: 0,
  interestPaid: 0,
};

export function filterInvestments(records, queryParams) {
  const investmentStatusEq = queryParams['investmentStatus__eq'];
  if (investmentStatusEq) {
    records = records.filter(
      record => record.investmentStatus === investmentStatusEq
    );
  }

  const loanPurposeIn = queryParams['loan.purpose__in'];
  if (loanPurposeIn) {
    const purposes = JSON.parse(loanPurposeIn);

    records = records.filter(record => purposes.includes(record.loan.purpose));
  }

  const borrowerRegionIn = queryParams['borrowerRegion__in'];
  if (borrowerRegionIn) {
    const regions = JSON.parse(borrowerRegionIn);

    records = records.filter(record => regions.includes(record.borrowerRegion));
  }

  const borrowerPrimaryIncomeTypeIn =
    queryParams['borrowerPrimaryIncomeType__in'];
  if (borrowerPrimaryIncomeTypeIn) {
    const borrowerPrimaryIncomeTypes = JSON.parse(borrowerPrimaryIncomeTypeIn);

    records = records.filter(record =>
      borrowerPrimaryIncomeTypes.includes(record.borrowerPrimaryIncomeType)
    );
  }

  const insuranceStatusIn = queryParams['insuranceStatus__in'];
  if (insuranceStatusIn) {
    const insuranceStatuses = JSON.parse(insuranceStatusIn);

    records = records.filter(record =>
      insuranceStatuses.includes(record.insuranceStatus)
    );
  }

  const loanHealthIn = queryParams['loanHealth__in'];
  if (loanHealthIn) {
    const loanHealths = JSON.parse(loanHealthIn);

    records = records.filter(record =>
      loanHealths.includes(record.loan.healthInfo)
    );
  }

  const sellStatusIn = queryParams['sellStatus__in'];
  if (sellStatusIn) {
    const sellStatuses = JSON.parse(sellStatusIn);

    records = records.filter(record =>
      sellStatuses.includes(record.sellStatus)
    );
  }

  const covidLabelIn = queryParams['covidLabel__in'];
  if (covidLabelIn) {
    const covidLabels = JSON.parse(covidLabelIn);

    records = records.filter(record => covidLabels.includes(record.covidLabel));
  }

  const loanAmountGte = queryParams['loan.amount__gte'];
  if (loanAmountGte) {
    const gte = JSON.parse(loanAmountGte);

    records = records.filter(record => record.loan.amount >= gte);
  }

  const loanAmountLte = queryParams['loan.amount__lte'];
  if (loanAmountLte) {
    const lte = JSON.parse(loanAmountLte);

    records = records.filter(record => record.loan.amount <= lte);
  }

  const unpaidInstalmentCountGte =
    queryParams['ext.unpaidInstalmentCount__gte'];
  if (unpaidInstalmentCountGte) {
    const gte = JSON.parse(unpaidInstalmentCountGte);

    records = records.filter(record => record.loan.payments.unpaid >= gte);
  }

  const unpaidInstalmentCountLte =
    queryParams['ext.unpaidInstalmentCount__lte'];
  if (unpaidInstalmentCountLte) {
    const lte = JSON.parse(unpaidInstalmentCountLte);

    records = records.filter(record => record.loan.payments.unpaid <= lte);
  }

  const interestRateGte = queryParams['loan.interestRate__gte'];
  if (interestRateGte) {
    const gte = JSON.parse(interestRateGte);

    records = records.filter(record => record.loan.interestRate >= gte);
  }

  const interestRateLte = queryParams['loan.interestRate__lte'];
  if (interestRateLte) {
    const lte = JSON.parse(interestRateLte);

    records = records.filter(record => record.loan.interestRate <= lte);
  }

  // Remove properties which are there only for filter purpose and are not really present in API
  return records.map(record => {
    delete record.borrowerPrimaryIncomeType;
    delete record.borrowerRegion;
    delete record.insuranceStatus;
    delete record.investmentStatus;
    delete record.covidLabel;
    const { healthInfo, ...loan } = record.loan; // eslint-disable-line no-unused-vars

    return { ...record, loan };
  });
}

export function summaryReducer(accumulator, currentValue) {
  accumulator.investmentsCount++;
  accumulator.principalRemaining += currentValue.principal.unpaid;
  accumulator.principalPaid +=
    currentValue.principal.total - currentValue.principal.unpaid;
  accumulator.interestRemaining += currentValue.interest.unpaid;
  accumulator.interestPaid +=
    currentValue.interest.total - currentValue.interest.unpaid;

  return accumulator;
}

export const sortByLoanInterestRateDesc = (a, b) =>
  a.loan.interestRate - b.loan.interestRate;

export const sortByLoanInterestRateAsc = (a, b) =>
  b.loan.interestRate - a.loan.interestRate;

export const sortByLoanUnpaidDesc = (a, b) =>
  a.loan.payments.unpaid - b.loan.payments.unpaid;

export const sortByLoanUnpaidAsc = (a, b) =>
  b.loan.payments.unpaid - a.loan.payments.unpaid;

export const sortByLoanTitleDesc = (a, b) =>
  a.loan.title.localeCompare(b.loan.title);

export const sortByLoanTitleAsc = (a, b) =>
  b.loan.title.localeCompare(a.loan.title);

export const sortByUnpaidPrincipalDesc = (a, b) =>
  a.principal.unpaid - b.principal.unpaid;

export const sortByUnpaidPrincipalAsc = (a, b) =>
  b.principal.unpaid - a.principal.unpaid;
