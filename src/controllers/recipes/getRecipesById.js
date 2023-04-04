const { httpError } = require("../../helpers");
const { recipes } = require("../../service");

const getRecipeById = async (req, res) => {
	const { id: recipeId } = req.params;

	const result = await recipes.getRecipeById(recipeId);
	console.log(result);

	if (!result) {
		throw httpError(404, "Recipe not found!");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		recipe: result,
	});
};

module.exports = getRecipeById;
