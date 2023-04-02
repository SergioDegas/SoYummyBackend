const { httpError } = require("../../helpers");
const { recipes } = require("../../service");

const getRecipeById = async (req, res) => {
	const { id: recipeId } = req.params;

	const result = await recipes.getRecipeById(recipeId);

	if (!result) {
		throw httpError(404, "Recipe not found!");
	}

	res.status(200).json({
		recipe: result,
	});
};

module.exports = getRecipeById;
