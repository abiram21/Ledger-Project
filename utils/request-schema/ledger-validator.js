const Joi = require('joi'); 
exports.validate_ledger = function(payload) {
const schema = Joi.object().keys({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().greater(Joi.ref('start_date')).required(),
  frequency: Joi.string().valid('WEEKLY', 'FORTNIGHTLY','MONTHLY').required(),
  weekly_rent: Joi.number().min(1).required(),
  time_zone: Joi.string().valid('CST', 'IST','GMT').required()

});
return schema.validate(payload);
}
