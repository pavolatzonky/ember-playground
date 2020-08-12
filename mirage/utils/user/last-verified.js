const BORROWER_STATUSES = new Set([
  'SCORED',
  'APPROVED',
  'SIGNED',
  'COVERED',
  'ACTIVE',
  'PAID',
]);

export default function lastVerified(user, db) {
  let hasBorrowerRecords =
    db.borrowerRecords
      .where({
        userId: user.id,
      })
      .filter(item => BORROWER_STATUSES.has(item.status)).length > 0;

  let isApprovedInvestor = user.roles.includes('ROLE_INVESTOR');
  let isApprovedRentier = user.roles.includes('ROLE_RENTIER');

  return hasBorrowerRecords || isApprovedInvestor || isApprovedRentier;
}
