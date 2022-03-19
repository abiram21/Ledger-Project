
const {validate_ledger} = require('../../utils/request-schema/ledger-validator')
// All the business logic here
exports.getLedgers =  function (req, cb) {
  let payload = {
      "start_date":req.query.start_date,
      "end_date":req.query.end_date,
      "frequency": req.query.frequency,
      "weekly_rent":req.query.weekly_rent,
      "time_zone":req.query.timezone
  }

  const result = validate_ledger(payload); 
  if(result.error!=null) {
    return cb(true,result.error)
  }

  //Logic needed to be implemented
  return cb(false, payload);
};
