const Joi = require("joi");

const subscribeSchema = Joi.object({
	inputEmail: Joi.string().required(),
});

module.exports = subscribeSchema;