const { httpError } = require("../../../helpers");
const { user } = require("../../../service");

const getFavoriteRecipes = async (req, res, next) => {
	const { favoriteRecipes } = req.user;

	const recipes = await user.getFavoriteRecipes(favoriteRecipes);
	res.json({
		status: 200,
		message: "success",
		recipes,
	});
};
module.exports = getFavoriteRecipes;
