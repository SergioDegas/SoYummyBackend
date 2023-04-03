const { httpError } = require("../../helpers");
const { User } = require("../../models");
const { Ingredients } = require("../../models");
require("dotenv").config();

const shoppingList = async (req, res) => {
	const { id } = req.body;
	const { shoppingList, _id } = await User.findById({ id }).populate(["shoppingList", "_id"]);
	if (!_id) {
		throw httpError(404, "Not Found");
	}
	if (!user.shoppingList) {
		res.json({
			ingredientsList: [],
		});
	}
	const payload = shoppingList.map((i) => mongoose.Types.ObjectId(i));
	const ingredientsList = await Ingredients.find({
		_id: { $in: payload },
	});
	console.log("ingredientsList: ", ingredientsList);
	res.json({ shoppingList: ingredientsList });
};

module.exports = shoppingList;
