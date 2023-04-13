const { User, Recipe, Ingredient } = require("../models");
const { mongoose } = require("mongoose");

const removeFromShoppingList = async ({ userId, id }) => {
	await User.findByIdAndUpdate(userId, { $pull: { shoppingList: { id } } });

	return {
		message: `Successfully removed from shopping list`,

		removedIngredientId: id,
	};
};
const addToShoppingList = async ({ payload, userId }) => {
	const { id } = payload;
	await User.findByIdAndUpdate(userId, { $addToSet: { shoppingList: payload } });
	const ingredient = await Ingredient.findById(id, { _id: 0 });
	const newIngredient = { ...payload, ...JSON.parse(JSON.stringify(ingredient)) };
	return {
		message: `Successfully added to shopping list`,
		addedIngredient: newIngredient,
	};
};

const updateShoppingList = async ({ payload, user }) => {
	const { shoppingList = [], userId } = user;
	const { ingredientId: id, measure } = payload;

	// [SM] Check is ingredient already added in a shopping list
	const isIngredientAlreadyIn = shoppingList.find((item) => item.id.toHexString() === id);
	if (isIngredientAlreadyIn) {
		return await removeFromShoppingList({ userId, id });
	}

	return await addToShoppingList({
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
		status: 200,
		shoppingList,
		message: "Success",
	};
};

const getFavoriteRecipes = async ({ skip, limit, favoriteRecipes }) =>
	await Recipe.find({ _id: { $in: favoriteRecipes } }, { title: 1, description: 1, time: 1, instructions: 1, thumb: 1 })
		.skip(skip)
		.limit(limit);

const removeRecipeFromFavorites = async ({ userId, recipeId }) =>
	await User.findByIdAndUpdate(userId, { $pull: { favoriteRecipes: recipeId } });

const addRecipeToFavorites = async ({ userId, recipeId }) =>
	await User.findByIdAndUpdate(userId, {
		$addToSet: {
			favoriteRecipes: recipeId,
		},
	});

module.exports = {
	getShoppingList,
	addToShoppingList,
	removeFromShoppingList,
	updateShoppingList,
	getFavoriteRecipes,
	removeRecipeFromFavorites,
	addRecipeToFavorites,
};
