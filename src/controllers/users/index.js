const current = require('./current');
const { updateShoppingList, getShoppingList } = require('./shoppingList');
const { ctrlWrapper } = require('../../helpers');
const updateUserData = require('./updateUserData');
const logout = require('./logout');
const { getFavoriteRecipes, updateFavoriteRecipe } = require('./favoriteRecipes');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
	getShoppingList: ctrlWrapper(getShoppingList),
	updateUserData: ctrlWrapper(updateUserData),
	logout: ctrlWrapper(logout),
	getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  updateFavoriteRecipe: ctrlWrapper(updateFavoriteRecipe),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

