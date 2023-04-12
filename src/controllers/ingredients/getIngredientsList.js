const { Ingredient } = require('../../models');

const getIngredients = async (req, res) => {
	const ingredients = await Ingredient.find();

	res.json({
		status: 200,
		message: 'success',
		ingredients,
	});
};

module.exports = getIngredients;
