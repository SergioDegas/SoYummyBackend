const current = require("./current");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");
const updateAvatar = require('./updateAvatar');
const logout = require('./logout');
const {addFavoriteRecipes, getFavoriteRecipes, removeFavoriteRecipe} = require("./favoriteRecipes");

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
  getShoppingList: ctrlWrapper(getShoppingList),
  updateAvatar: ctrlWrapper(updateAvatar),
  logout: ctrlWrapper(logout),
  addFavoriteRecipes: ctrlWrapper(addFavoriteRecipes),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
