const { categories } = require("../../helpers");
const { Recipe } = require("../../models");
const { recipes } = require("../../service");

const getMainPage = async (req, res) => {
	// const result = await Promise.all(
	// 	[...categories]
	// 		.sort((a, b) => a.localeCompare(b))
	// 		.map(async (category) => {
	// 			const recipesList = await recipes.getRecipesByCategory(category, 0, 4);
	// 			return { [category]: recipesList };
	// 		}),
	// );

	const limit = 4;
	const result = await recipes.getRecipesBySet(limit);

	if (!result) {
		throw httpError(404, "Recipes not found!");
	}

	res.status(200).json({
		result,
	});
};

module.exports = getMainPage;
