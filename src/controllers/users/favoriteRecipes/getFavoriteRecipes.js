const { httpError } = require("../../../helpers");
const { Recipe } = require("../../../models");

const getFavoriteRecipes = async (req, res, next) => {
	const {user} = req;
	if (!user) {
		throw httpError(404, "User not found");
	}
	const favoriteRecipeIds = user.favoriteRecipes;
	const favoriteRecipes = await Recipe.find({ _id: { $in: favoriteRecipeIds } });
	res.status(200).json({
		message: "success",
		data: { favoriteRecipes },
	});
};

module.exports = getFavoriteRecipes;
