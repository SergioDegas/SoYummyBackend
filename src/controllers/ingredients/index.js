const { ctrlWrapper } = require("../../helpers");
const { getIngredientsList } = require("./getIngredientsList");

module.exports = {
  getIngredientsList: ctrlWrapper(getIngredientsList),
};
