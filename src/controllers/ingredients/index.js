const { ctrlWrapper } = require("../../helpers");
const getIngredients = require("./getIngredientsList");

module.exports = {
  getIngredients: ctrlWrapper(getIngredients),
};
