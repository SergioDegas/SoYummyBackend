const { categories } = require("../../helpers");
const { recipes } = require("../../service");

const getMainPage = async (req, res) => {
	const result = await Promise.all(
		[...categories]
			.sort((a, b) => a.localeCompare(b))
			.map(async (category) => {
				const recipesList = await recipes.getRecipesByCategory(category, 0, 4);
				return { category, recipes: recipesList };
			}),
	);

	res.status(200).json({
		status: 200,
		message: "success",
		data: result,
	});
};

module.exports = getMainPage;
