const { User } = require("../models");
const { mongoose } = require("mongoose");

const removeFromShoppingList = async ({ userId, id }) => {
	await User.findByIdAndUpdate(userId, { $pull: { shoppingList: { id } } });

	return {
		message: `Successfully removed from shopping list`,
		data: {
			removedIngredientId: id,
		},
	};
};
const addToShoppingList = async ({ payload, userId }) => {
	const { id } = payload;
	await User.findByIdAndUpdate(userId, { $addToSet: { shoppingList: payload } });
	return {
		message: `Successfully added to shopping list`,
		data: {
			addedIngredientId: id,
		},
	};
};

const updateShoppingList = async ({ payload, user }) => {
	const { shoppingList = [], userId } = user;
	const { ingredientId: id, measure } = payload;

	// [SM] Check is ingredient already added in a shopping list
	const isIngredientAlreadyIn = shoppingList.find((item) => item.id.toHexString() === id);
	return isIngredientAlreadyIn
		? await removeFromShoppingList({ userId, id })
		: addToShoppingList({
				payload: { id, measure },
				userId,
		  });
};
const getShoppingList = async (userId) => {
	const ObjectId = mongoose.Types.ObjectId;

	const result = await User.aggregate([
		{ $match: { _id: ObjectId(`${userId}`) } },
		{ $lookup: { from: "ingredients", localField: "shoppingList.id", foreignField: "_id", as: "ingredientsInfo" } },
		{
			$set: {
				fullList: {
					$map: {
						input: "$shoppingList",
						in: {
							$mergeObjects: [
								"$$this",
								{ $arrayElemAt: ["$ingredientsInfo", { $indexOfArray: ["$ingredientsInfo._id", "$$this.id"] }] },
							],
						},
					},
				},
			},
		},
		{ $unset: ["ingredientsInfo", "ingredients.id"] },
		{ $project: { fullList: 1, _id: 0 } },
	]);
	const shoppingList = result[0]?.fullList;
	return {
		data: shoppingList,
		message: "Success",
	};
};
module.exports = {
	getShoppingList,
	addToShoppingList,
	removeFromShoppingList,
	updateShoppingList,
};
