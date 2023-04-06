const { User, Recipe } = require("../models");
const getFavoriteRecipes = async (recipes) =>
	await Recipe.find({ _id: { $in: recipes } }, { title: 1, description: 1, time: 1, instructions: 1 });

const removeRecipeFromFavorites = async ({ userId, recipeId }) =>
	await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } });

const addRecipeToFavorites = async ({ userId, recipeId }) =>
	await User.findByIdAndUpdate(userId, {
		$addToSet: {
			favoriteRecipes: recipeId,
		},
	});
module.exports = {
	getFavoriteRecipes,
	removeRecipeFromFavorites,
	addRecipeToFavorites,
};
