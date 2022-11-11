// All the endpoints received here
const { getLedgers } = require("./service-layer");
exports.fetch_ledgers = async (req, res) => {
  const result = getLedgers(req);
  if (result.error) {
    return res.status(400).json(util.errorRes([{ message: result.error }]));
  }
  return res.status(200).json(util.sucessRes(result));
};
