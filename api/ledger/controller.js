// All the endpoints received here
const {getLedgers} = require('./service-layer')
exports.fetch_ledgers =  (req, res) => {

   getLedgers(req, (err, result) => {
    if (err) {
      return res.status(400).json(util.errorRes([{ message: result }]));
    } else {
      return res.status(200).json(util.sucessRes(result));
    }
  });
};