const { ctrlWrapper } = require("../../helpers");

const getCategoryList = require("./getCategoryList");
const getRecipesByCategory = require("./getRecipesByCategory");
const getRecipeById = require("./getRecipesById");

module.exports = {
	getCategoryList: ctrlWrapper(getCategoryList),
	getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
	getRecipeById: ctrlWrapper(getRecipeById),
};
