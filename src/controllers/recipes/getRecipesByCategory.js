const { httpError } = require("../../helpers");
const { recipes } = require("../../service");
const { categories } = require("../../helpers");

const getRecipesByCategory = async (req, res) => {
	const { category } = req.params;

	// if (!categories.includes(category)) {
	// 	throw httpError(404, "Category not found!");
	// }

	const result = await recipes.getRecipesByCategory(category);

	if (!result || result.length === 0) {
		throw httpError(400, "Bad request");
	}

	res.status(200).json({
		recipes: result,
	});
};

module.exports = getRecipesByCategory;
