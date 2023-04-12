const { user } = require('../../../service');
require('dotenv').config();

const updateShoppingList = async (req, res) => {
	const { shoppingList = [], id: userId } = req.user;
	const result = await user.updateShoppingList({ payload: req.body, user: { shoppingList, userId } });

	res.json({
		status: 200,
		...result,
	});
};

module.exports = updateShoppingList;
