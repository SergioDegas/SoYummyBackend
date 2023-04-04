const current = require("./current");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");
const updateAvatar = require('./updateAvatar');

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
  getShoppingList: ctrlWrapper(getShoppingList),
  updateAvatar: ctrlWrapper(updateAvatar),

};
