const { httpError } = require("../../../helpers");
const { User, Recipe } = require("../../../models");
const { user, recipes } = require("../../../service");
const updateFavoriteRecipe = async (req, res) => {
	const { favoriteRecipes = [], id: userId } = req.user;
	const { recipeId } = req.body;

	if (!recipeId) {
		throw httpError(400, "Bad request!");
	}

	const isFavoriteRecipeAlreadyIn = favoriteRecipes.includes(recipeId);
	const favoriteRecipeToAdd = await recipes.getRecipeById(recipeId);
	const payload = { userId, recipeId };
	if (!favoriteRecipeToAdd) {
		throw httpError(404, "Recipe not found");
	}

	if (!isFavoriteRecipeAlreadyIn) {
		await user.addRecipeToFavorites(payload);
		await recipes.addRecipeToFavorites(payload);

		res.json({
			status: 200,
			message: `Recipe - ${favoriteRecipeToAdd.title || ""} is added to favorites successfully`,
			data: { recipeId },
		});
	} else if (isFavoriteRecipeAlreadyIn) {
		await user.removeRecipeFromFavorites(payload);
		await recipes.removeRecipeFromFavorites(payload);
		res.json({
			status: 200,
			message: `Recipe - ${favoriteRecipeToAdd.title || ""} removed from favorites successfully`,
			recipeId,
		});
	}
};

module.exports = updateFavoriteRecipe;
