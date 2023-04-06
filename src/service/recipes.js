const { mongoose } = require("mongoose");
const { Recipe } = require("../models");

const getRecipesByCategory = async (category, skip = 0, limit = 8) => {
	return await Recipe.find({ category }, "title thumb", {
		skip,
		limit,
	}).sort({ updatedAt: "descending" });
};

const getRecipeById = async (recipeId) => {
	const ObjectId = mongoose.Types.ObjectId;

	const result = await Recipe.aggregate([
		{ $match: { _id: ObjectId(`${recipeId}`) } },
		{ $lookup: { from: "ingredients", localField: "ingredients.id", foreignField: "_id", as: "ingredientsInfo" } },
		{
			$set: {
				ingredients: {
					$map: {
						input: "$ingredients",
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
		{ $limit: 1 },
		{ $unset: ["ingredientsInfo", "ingredients.id"] },
	]);
	return result[0] || null;
};

const getRecipesBySet = async (skip, limit) => {
	return await Recipe.aggregate([
		{ $sort: { category: 1, updatedAt: -1 } },
		{ $group: { _id: "$category", recipes: { $push: { title: "$title", thumb: "$thumb", _id: "$_id" } } } },
		{ $sort: { _id: 1 } },
		{ $skip: skip },
		{ $limit: limit },
		{ $project: { recipes: { $slice: ["$recipes", 4] } } },
	]);
};
const removeRecipeFromFavorites = async ({ userId, recipeId }) =>
	await Recipe.findByIdAndUpdate(recipeId, { $pull: { favorites: userId } });

const addRecipeToFavorites = async ({ userId, recipeId }) =>
	await Recipe.findByIdAndUpdate(recipeId, {
		$addToSet: {
			favorites: userId,
		},
	});
module.exports = {
	getRecipesByCategory,
	getRecipeById,
	getRecipesBySet,
	removeRecipeFromFavorites,
	addRecipeToFavorites,
};
