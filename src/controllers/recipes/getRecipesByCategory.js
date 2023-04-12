const { recipes } = require('../../service');
const { categories } = require('../../data');
const { skipPageHandler, limitHandler } = require('../../helpers');

const getRecipesByCategory = async (req, res) => {
	const { category } = req.params;
	const { page = 1, limit = 8 } = req.query;

	if (!categories.includes(category)) {
		res.status(400).json({ status: 400, message: 'Bad request!' });
	}

	const result = await recipes.getRecipesByCategory(category, skipPageHandler(page, limit), limitHandler(limit));

	res.json({
		status: 200,
		message: 'success',
		...result,
	});
};

module.exports = getRecipesByCategory;
