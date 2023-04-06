const { user } = require("../../../service");
const getShoppingList = async (req, res) => {
	const result = await user.getShoppingList(req.user.id);
	res.json({
		status: 200,
		...result,
	});
};

module.exports = getShoppingList;
