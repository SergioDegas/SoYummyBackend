const current = require("./current");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");
const updateUserData = require('./updateUserData');
const logout = require('./logout');
const { getFavoriteRecipes, updateFavoriteRecipe} = require("./favoriteRecipes");

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
  getShoppingList: ctrlWrapper(getShoppingList),
  updateUserData: ctrlWrapper(updateUserData),
  logout: ctrlWrapper(logout), 
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  updateFavoriteRecipe: ctrlWrapper(updateFavoriteRecipe),
};
