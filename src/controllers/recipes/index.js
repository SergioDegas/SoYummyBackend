const { ctrlWrapper } = require("../../helpers");

const getCategoryList = require("./getCategoryList");
const getRecipesByCategory = require("./getRecipesByCategory");

module.exports = {
    getCategoryList: ctrlWrapper(getCategoryList),
    getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
};
