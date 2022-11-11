const {
  validateLedger,
} = require("../../utils/request-schema/ledger-validator");
const {
  ledgerResFormat,
} = require("../../utils/request-schema/ledger-response");
// All the business logic here
exports.getLedgers = function (req) {
  let res = [];
  let payload = {
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    frequency: req.query.frequency,
    weeklyRent: req.query.weeklyRent,
    timezone: req.query.timezone,
  };
  const { error } = validateLedger(payload);
  if (error) {
    return error;
  }
  let startDate = new Date(payload.startDate.substring(0, 10));
  let endDate = new Date(payload.endDate.substring(0, 10));
  let weekAmount = util.toTwoDecimal(payload.weeklyRent);
  const frequency = payload.frequency;
  if (frequency != "MONTHLY") {
    const payDays = util.findDays(frequency);

    if (frequency == "FORTNIGHTLY") {
      weekAmount = weekAmount * 2;
    }

    const differenceInTime = endDate.getTime() - startDate.getTime();
    let noOfDays = differenceInTime / (1000 * 3600 * 24);
    // If total no.of days is less the the pay days (frequency days)
    if (noOfDays < payDays) {
      let finalAmount = (weekAmount / payDays) * (noOfDays + 1);
      finalAmount = util.toTwoDecimal(finalAmount);
      const finalLeaseDate = util.addDays(startDate, noOfDays);
      res.push(ledgerResFormat(startDate, finalLeaseDate, finalAmount));
    }
    while (noOfDays >= payDays) {
      // Find the final date of lease
      let nextLeaseDate = util.addDays(startDate, payDays - 1); //(must subtract one beacause must consider the start date too)
      //  iteration's lease response
      res.push(ledgerResFormat(startDate, nextLeaseDate, weekAmount));
      // next lease start date
      startDate = util.addDays(nextLeaseDate, 1); //adding one beacuse it must start from the next day of the current lease end date
      noOfDays = noOfDays - payDays;
      // when total no of days is smaller than the payDays then there won't be an next iteration so must find the amount of remaining days
      if (noOfDays < payDays) {
        let finalAmount = (weekAmount / payDays) * (noOfDays + 1);
        finalAmount = util.toTwoDecimal(finalAmount);
        const finalLeaseDate = util.addDays(startDate, noOfDays);
        res.push(ledgerResFormat(startDate, finalLeaseDate, finalAmount));
      }
    }
  } else {
    let amount = ((weekAmount / 7) * 365) / 12;
    amount = util.toTwoDecimal(amount);

    let nextLeaseDate = new Date(startDate);
    let originalDate = nextLeaseDate.getDate();

    while (nextLeaseDate < endDate) {
      //Find the last day of the next month
      const nextMonthLastDay = util.lastDayOfMonth(
        nextLeaseDate.getFullYear(),
        nextLeaseDate.getMonth() + 1
      );

      //Check whether the next month's last day is less than the current date
      if (nextLeaseDate.getDate() > nextMonthLastDay) {
        nextLeaseDate.setDate(nextMonthLastDay);
        nextLeaseDate.setMonth(nextLeaseDate.getMonth() + 1);
        res.push(ledgerResFormat(startDate, nextLeaseDate, amount));
        startDate = new Date(nextLeaseDate);
        //Go to next iteration
        continue;
      }

      nextLeaseDate.setMonth(nextLeaseDate.getMonth() + 1);
      nextLeaseDate.setDate(originalDate);

      if (nextLeaseDate <= endDate) {
        res.push(ledgerResFormat(startDate, nextLeaseDate, amount));
        startDate = new Date(nextLeaseDate);
      } else {
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const noOfDays = differenceInTime / (1000 * 3600 * 24);
        balanceAmount = (payload.weeklyRent / 7) * noOfDays;
        balanceAmount = util.toTwoDecimal(balanceAmount);
        res.push(ledgerResFormat(startDate, endDate, balanceAmount));
      }
    }
  }
  return res;
};
