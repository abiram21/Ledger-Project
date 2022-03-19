exports.ledgerResFormat = function(startDate,endDate,amount) {
  const lease = {
    "start_date":util.changeFormat(startDate),
    "end_date":util.changeFormat(endDate),
    "amount":amount
}  

  return lease;
}