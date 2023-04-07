const { user } = require("../../../service");

const getFavoriteRecipes = async (req, res) => {
	const { favoriteRecipes } = req.user;

	const recipes = await user.getFavoriteRecipes(favoriteRecipes);
	res.json({
		status: 200,
		message: "success",
		recipes,
	});
};
module.exports = getFavoriteRecipes;
