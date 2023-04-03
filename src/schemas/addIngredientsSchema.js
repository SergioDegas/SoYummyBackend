const Joi = require("joi");

const addIngredientToList = Joi.object({
	id: Joi.string().required(),
	amount: Joi.string().required(),
});

module.exports = addIngredientToList;
