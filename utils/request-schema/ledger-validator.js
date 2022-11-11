const Joi = require('joi'); 
exports.validateLedger = function(payload) {
const schema = Joi.object().keys({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  frequency: Joi.string().valid('WEEKLY', 'FORTNIGHTLY','MONTHLY').required(),
  weeklyRent: Joi.number().min(1).required(),
  timezone: Joi.string().valid('CST', 'IST','GMT').required()

});
return schema.validate(payload);
}
