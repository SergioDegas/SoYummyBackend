const { recipes } = require('../../service');

const getRecipeById = async (req, res) => {
	const { id: recipeId } = req.params;

	const result = await recipes.getRecipeById(recipeId);

	// if not not found recipe would be null
	res.json({
		status: 200,
		message: 'success',
		recipe: result,
	});
};

module.exports = getRecipeById;
