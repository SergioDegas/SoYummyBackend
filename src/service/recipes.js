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

	return await Recipe.aggregate([
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
		{ $unset: ["ingredientsInfo", "ingredients.id"] },
	]);
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
const getPopularRecipes = async () =>
	await Recipe.aggregate([
		{
			$project: { title: 1, preview: 1, instructions: 1, favoritesCount: { $size: { $ifNull: ["$favorites", []] } } },
		},
		{
			$sort: { favoritesCount: -1 },
		},
		{ $unset: "favoritesCount" },
	]);

module.exports = { getRecipesByCategory, getRecipeById, getRecipesBySet, getPopularRecipes };
