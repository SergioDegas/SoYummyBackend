const Joi = require('joi');

const addIngredientToList = Joi.object({
	ingredientId: Joi.string().required(),
	measure: Joi.string().required(),
});

module.exports = addIngredientToList;
