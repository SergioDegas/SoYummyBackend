const Recipe = require("../models/recipe");

const getRecipesByCategory = async (category) => {
    return Recipe.find({ category }, "title thumb", {
        skip: 0,
        limit: 8,
    }).sort({ updatedAt: "descending" });
};

module.exports = { getRecipesByCategory };
