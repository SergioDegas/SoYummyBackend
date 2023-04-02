const { ctrlWrapper } = require("../../helpers");

const getCategoryList = require("./getCategoryList");
const getRecipesByCategory = require("./getRecipesByCategory");
const getRecipeById = require("./getRecipesById");
const getMainPage = require("./getMainPage");

module.exports = {
	getCategoryList: ctrlWrapper(getCategoryList),
	getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
	getRecipeById: ctrlWrapper(getRecipeById),
	getMainPage: ctrlWrapper(getMainPage),
};
