// All the business logic here
exports.getLedgers =  function (req, cb) {
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const frequency = req.query.frequency;
  const weekly_rent = req.query.weekly_rent;
  const time_zone = req.query.timezone;
  let res = {
      "start_date":start_date
  }
  //Logic needed to be implemented
  return cb(false, res);
};
