const { skipPageHandler } = require("../../../helpers");
const { user } = require("../../../service");

const getFavoriteRecipes = async (req, res) => {
	const { favoriteRecipes } = req.user;
	const { page = 1, limit = 8 } = req.query;

	const recipes = await user.getFavoriteRecipes({
		skip: skipPageHandler(page, limit),
		limit: parseInt(limit),
		favoriteRecipes,
	});
	res.json({
		status: 200,
		message: "success",
		recipes,
		totalItems: favoriteRecipes.length || 0,
	});
};
module.exports = getFavoriteRecipes;
