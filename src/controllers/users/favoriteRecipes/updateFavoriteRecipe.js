const { user, recipes } = require("../../../service");
const updateFavoriteRecipe = async (req, res) => {
	const { favoriteRecipes = [], id: userId } = req.user;
	const { recipeId } = req.body;

	if (!recipeId) {
		res.status(400).json({
			status: 400,
			message: "Bad Request",
		});
	}

	const isFavoriteRecipeAlreadyIn = favoriteRecipes.includes(recipeId);
	const favoriteRecipeToAdd = await recipes.getRecipeById(recipeId);
	const payload = { userId, recipeId };
	if (!favoriteRecipeToAdd) {
		res.status.json({
			status: 404,
			message: "Recipe not found",
		});
	}

	if (!isFavoriteRecipeAlreadyIn) {
		await user.addRecipeToFavorites(payload);
		await recipes.addRecipeToFavorites(payload);
		res.json({
			status: 200,
			message: `Recipe - ${favoriteRecipeToAdd.title || ""} is added to favorites successfully`,
			recipeId,
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
