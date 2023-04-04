const { httpError } = require("../../../helpers");
const { User } = require("../../../models");
require("dotenv").config();

const getShoppingList = async (req, res) => {
	const { shoppingList } = req.user;

	if (!shoppingList.length) {
		res.json({
			shoppingList: [],
		});
	}
	res.json({ shoppingList });
};

module.exports = getShoppingList;
