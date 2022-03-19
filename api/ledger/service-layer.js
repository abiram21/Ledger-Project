
const {validate_ledger} = require('../../utils/request-schema/ledger-validator')

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
  const frequency = payload.frequency
  if(frequency!= "MONTHLY") {

    const payDays =  util.findDays(frequency);
    let weekAmount = payload.weekly_rent;
    if(frequency=="FORTNIGHTLY") {
      weekAmount = weekAmount *2;
    }
    let startDate = new Date(payload.start_date.substring(0,10));
    let endDate = new Date(payload.end_date.substring(0,10));
    
    const differenceInTime = endDate.getTime() - startDate.getTime();
    let noOfDays = differenceInTime / (1000 * 3600 * 24);

    while (noOfDays>payDays){

        let nextLeaseDate = util.addDays(startDate,payDays-1);
        const lease = {"start_date":util.changeFormat(startDate),"end_date":util.changeFormat(nextLeaseDate),"amount":weekAmount}  
        res.push(lease);

        startDate = util.addDays(nextLeaseDate,1)
        noOfDays = noOfDays-payDays;

        if(noOfDays<payDays) {
          const finalAmount = weekAmount / payDays * (noOfDays+1);
          const finalLeaseDate = util.changeFormat(util.addDays(startDate,noOfDays));
          const remainingLease = {"start_date":util.changeFormat(startDate),"end_date":finalLeaseDate,"amount":finalAmount} ;
          res.push(remainingLease);
        }
        
    }
   
  }
  return cb(false, res);
};

