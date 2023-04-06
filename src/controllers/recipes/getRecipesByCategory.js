const { httpError } = require("../../helpers");
const { recipes } = require("../../service");
const { categories } = require("../../helpers");
const { skipPageHandler, limitHandler } = require("../../helpers");

const getRecipesByCategory = async (req, res) => {
	const { category } = req.params;
	const { page = 1, limit = 8 } = req.query;

	// if (!categories.includes(category)) {
	// 	throw httpError(400, "Bad request");
	// }

	const result = await recipes.getRecipesByCategory(category, skipPageHandler(page, limit), limitHandler(limit));
	const totalResult = await recipes.getRecipesByCategory(category, 0, 0);
	const totalPages = Math.ceil(totalResult.length / limit);

	if (!result) {
		throw httpError(404, "Recipes not found");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		recipes: result,
		totalPages,
	});
};

module.exports = getRecipesByCategory;
