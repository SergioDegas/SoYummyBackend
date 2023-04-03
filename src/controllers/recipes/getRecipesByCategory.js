const { httpError } = require("../../helpers");
const { recipes } = require("../../service");
const { categories } = require("../../helpers");

const getRecipesByCategory = async (req, res) => {
	const { category } = req.params;

	// if (!categories.includes(category)) {
	// 	throw httpError(400, "Bad request");
	// }

	const result = await recipes.getRecipesByCategory(category);

	if (!result) {
		throw httpError(404, "Recipes not found");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		recipes: result,
	});
};

module.exports = getRecipesByCategory;
