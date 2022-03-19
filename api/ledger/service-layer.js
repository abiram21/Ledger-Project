const {validate_ledger} = require('../../utils/request-schema/ledger-validator')
const {ledgerResFormat} = require('../../utils/request-schema/ledger-response')
// All the business logic here
exports.getLedgers =  function (req, cb) {
  let res = [];
  let payload = {
      "start_date": req.query.start_date,
      "end_date": req.query.end_date,
      "frequency": req.query.frequency,
      "weekly_rent": req.query.weekly_rent,
      "time_zone":req.query.timezone
  }
  const result = validate_ledger(payload); 
  if(result.error!=null) {
    return cb(true,result.error)
  }
  let startDate = new Date(payload.start_date.substring(0,10));
  let endDate = new Date(payload.end_date.substring(0,10));
  let weekAmount = payload.weekly_rent;
  const frequency = payload.frequency
  if(frequency != "MONTHLY") {

    const payDays =  util.findDays(frequency);
    
    if(frequency=="FORTNIGHTLY") {
      weekAmount = weekAmount *2;
    }
    
    const differenceInTime = endDate.getTime() - startDate.getTime();
    let noOfDays = differenceInTime / (1000 * 3600 * 24);
    // If total no.of days is less the the pay days (frequency days)
    if(noOfDays < payDays) {
          const finalAmount = weekAmount / payDays * (noOfDays+1);
          const finalLeaseDate = util.addDays(startDate,noOfDays);
          res.push(ledgerResFormat(startDate,finalLeaseDate,finalAmount));
    }
    while (noOfDays >= payDays){
        // Find the final date of lease
        let nextLeaseDate = util.addDays(startDate,payDays-1); //(must subtract one beacause must consider the start date too)
        //  iteration's lease response
        res.push(ledgerResFormat(startDate,nextLeaseDate,weekAmount));
        // next lease start date
        startDate = util.addDays(nextLeaseDate,1) //adding one beacuse it must start from the next day of the current lease end date
        noOfDays = noOfDays-payDays;
        // when total no of days is smaller than the payDays then there won't be an next iteration so must find the amount of remaining days
        if(noOfDays < payDays) {
          const finalAmount = weekAmount / payDays * (noOfDays+1);
          const finalLeaseDate = util.addDays(startDate,noOfDays);
          res.push(ledgerResFormat(startDate,finalLeaseDate,finalAmount));
        }       
    }
  }
  else {
    
    const amount = (weekAmount / 7 * 365) / 12;

    let nextLeaseDate = new Date (startDate);
    let originalDate = nextLeaseDate.getDate();

    while (nextLeaseDate < endDate) {

      //Find the last day of the next month
      const nextMonthLastDay = util.lastDayOfMonth(nextLeaseDate.getFullYear(),nextLeaseDate.getMonth()+1);

      //Check whether the next month's last day is less than the current date
      if(nextLeaseDate.getDate() > nextMonthLastDay) {
        nextLeaseDate.setDate(nextMonthLastDay);
        nextLeaseDate.setMonth(nextLeaseDate.getMonth()+1);
        res.push(ledgerResFormat(startDate,nextLeaseDate,amount));
        startDate = new Date(nextLeaseDate);
        //Go to next iteration
        continue;
      }

      nextLeaseDate.setMonth(nextLeaseDate.getMonth()+1);
      nextLeaseDate.setDate(originalDate);

      if(nextLeaseDate < endDate) {
        res.push(ledgerResFormat(startDate,nextLeaseDate,amount));
        startDate = new Date(nextLeaseDate);
      } else {
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const noOfDays = differenceInTime / (1000 * 3600 * 24);
        balanceAmount = (payload.weekly_rent / 7 * noOfDays);
        res.push(ledgerResFormat(startDate,endDate,balanceAmount));
      }
    }
  }
  return cb(false, res);
};


