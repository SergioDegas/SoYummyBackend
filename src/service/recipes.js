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

module.exports = { getRecipesByCategory, getRecipeById };
