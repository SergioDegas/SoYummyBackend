const { Recipe } = require("../models");

const getRecipesByCategory = async (category, skip = 0, limit = 8) => {
	return await Recipe.find({ category }, "title thumb", {
		skip,
		limit,
	}).sort({ updatedAt: "descending" });
};

const getRecipeById = async (recipeId) => {
	return await Recipe.findOne({ _id: recipeId });
};

const getRecipesBySet = async (skip, limit) => {
	return await Recipe.aggregate([
		{ $sort: { category: 1, updatedAt: -1 } },
		{ $group: { _id: "$category", recipes: { $push: { title: "$title", thumb: "$thumb" } } } },
		{ $sort: { _id: 1 } },
		{ $skip: skip },
		{ $limit: limit },
		{ $project: { recipes: { $slice: ["$recipes", 4] } } },
	]);
};
const getPopularRecipes = async () =>
	await Recipe.aggregate([{ $sort: { category: 1, updatedAt: -1 } }, { $limit: 4 }], {
		$project: {
			title: 1,
			image: 1,
			description: 1,
		},
	});

module.exports = { getRecipesByCategory, getRecipeById, getRecipesBySet, getPopularRecipes };
