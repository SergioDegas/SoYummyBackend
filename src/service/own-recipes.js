const { Recipe } = require("../models");

const recipesServiceGet = async ({ user, query }) => {
  const { _id: owner } = user;
  const { page = 1, limit = 8 } = query;
  const skip = (page - 1) * limit;
  return await Recipe.find({ owner }).skip(skip).limit(limit).populate("owner", "email subscription");
}

module.exports = { recipesServiceGet };
