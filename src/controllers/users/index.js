const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const { updateShoppingList, getShoppingList } = require("./shoppingList");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	current: ctrlWrapper(current),
	logout: ctrlWrapper(logout),
	updateShoppingList: ctrlWrapper(updateShoppingList),
	getShoppingList: ctrlWrapper(getShoppingList),
};
