const { httpError } = require("../../../helpers");
const { User, Ingredient } = require("../../../models");
require("dotenv").config();

const updateShoppingList = async (req, res) => {
	const { id, amount } = req.body;
	const { shoppingList = [], id: userId } = req.user;

	const isIngredientAlreadyIn = shoppingList.find((item) => item?._id.toHexString() === id);

	const ingredientToAdd = await Ingredient.findById(id);
	// [SM] first check is ingredient allready added to the list
	if (!isIngredientAlreadyIn) {
		if (!ingredientToAdd) {
			throw httpError(404, "Failed to update! Ingredient not found!");
		}
		const payload = { ...JSON.parse(JSON.stringify(ingredientToAdd)), amount };
		await User.findByIdAndUpdate(userId, { $addToSet: { shoppingList: payload } });
		res.json({
			status: 200,
			message: `${ingredientToAdd.name} successfully added to the shopping list`,
			data: {
				addedIngredient: payload,
			},
		});
	} else {
		await User.findByIdAndUpdate(userId, { $pull: { shoppingList: { _id: ingredientToAdd._id } } });
		res.json({
			status: 200,
			message: `${ingredientToAdd.name} successfully removed from shopping list`,
			data: { removedIngredientId: id },
		});
	}
};

module.exports = updateShoppingList;
