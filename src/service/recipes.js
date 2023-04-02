const Recipe = require("../model/recipe");

const getRecipesByCategory = async (category) => {
	return Recipe.find({ category }, "title thumb", {
		skip: 0,
		limit: 8,
	}).sort({ updatedAt: "descending" });
};

const getRecipeById = async (recipeId) => {
	return Recipe.findOne({ _id: recipeId });
};

module.exports = { getRecipesByCategory, getRecipeById };
