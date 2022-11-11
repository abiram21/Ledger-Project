exports.ledgerResFormat = function (startDate, endDate, amount) {
  const lease = {
    startDate: util.changeFormat(startDate),
    endDate: util.changeFormat(endDate),
    amount: amount,
  };

  return lease;
};
