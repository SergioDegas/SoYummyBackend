const { httpError } = require("../../helpers");
const { recipes } = require("../../service");

const getRecipeById = async (req, res) => {
	const { id: recipeId } = req.params;
	console.log(recipeId);

	const result = await recipes.getRecipeById(recipeId);

	if (!result) {
		throw httpError(404, "Not found");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		data: { recipe: result },
	});
};

module.exports = getRecipeById;
