const { httpError } = require("../../../helpers");
const { User, Recipe } = require("../../../models");

const updateFavoriteRecipe = async (req, res) => {
  const { favoriteRecipes = [], id: userId } = req.user;
  const { recipeId } = req.body;
  
  if (!recipeId) {
    throw httpError(400, "Bad request!");
  }

  const isFavoriteRecipeAlreadyIn = favoriteRecipes.includes(recipeId);
  const favoriteRecipeToAdd = await Recipe.findById(recipeId);

  if (!favoriteRecipeToAdd) {
    throw httpError(404, "Recipe not found");
  }

  const isUserAlreadyFavoritedTheRecipe = favoriteRecipeToAdd.favorites.includes(userId);

  if (!isUserAlreadyFavoritedTheRecipe && !isFavoriteRecipeAlreadyIn) {
    await User.findByIdAndUpdate(userId, { $addToSet: { favoriteRecipes: recipeId } });
    await Recipe.findByIdAndUpdate(recipeId, { $push: { favorites: userId } });

    res.json({
      status: 200,
      message: "Recipe added to favorites successfully",
    });
  } else if (isUserAlreadyFavoritedTheRecipe && isFavoriteRecipeAlreadyIn) {
    await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } });
    await Recipe.findByIdAndUpdate(recipeId, { $pull: { favorites: userId } });

    res.json({
      status: 200,
      message: "Recipe removed from favorites successfully",
    });
  } else if (isUserAlreadyFavoritedTheRecipe && !isFavoriteRecipeAlreadyIn) {
    await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } });

    res.json({
      status: 200,
      message: "Recipe removed from favorites successfully",
    });
  } else {
    await User.findByIdAndUpdate(userId, { $addToSet: { favoriteRecipes: recipeId } });

    res.json({
      status: 200,
      message: "Recipe added to favorites successfully",
    });
  }
};

module.exports = updateFavoriteRecipe;