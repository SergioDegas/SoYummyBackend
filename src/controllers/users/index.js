const current = require("./current");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
	current: ctrlWrapper(current),
	updateShoppingList: ctrlWrapper(updateShoppingList),
	getShoppingList: ctrlWrapper(getShoppingList),
};
