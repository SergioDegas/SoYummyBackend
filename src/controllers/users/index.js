const current = require("./current");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");
const updateAvatar = require('./updateAvatar');
const logout = require('./logout');
const { getFavoriteRecipes, updateFavoriteRecipe} = require("./favoriteRecipes");

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
  getShoppingList: ctrlWrapper(getShoppingList),
  updateAvatar: ctrlWrapper(updateAvatar),
  logout: ctrlWrapper(logout), 
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  updateFavoriteRecipe: ctrlWrapper(updateFavoriteRecipe),
};
