const { Recipe } = require("../models");

const searchService = async (searchTerm, page = 1, limit = 8, searchBy) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const regex = new RegExp(searchTerm, "i");

  const matchQueries = {
    title: { title: regex },
    ingredient: { "ingredients.name": regex },
    family: { "ingredients.family": regex },
    default: {
      $or: [
        { title: regex },
        { "ingredients.name": regex },
        { "ingredients.family": regex },
      ],
    },
  };

  const matchQuery = matchQueries[searchBy] || matchQueries.default;

  return await Recipe.aggregate([
    {
      $lookup: {
        from: "ingredients",
        localField: "ingredients.id",
        foreignField: "_id",
        as: "ingredients",
      },
    },
    {
      $match: matchQuery,
    },
    {
      $project: {
        title: 1,
        category: 1,
        area: 1,
        instructions: 1,
        description: 1,
        thumb: 1,
        preview: 1,
        time: 1,
        popularity: 1,
        youtube: 1,
        ingredients: {
          $filter: {
            input: "$ingredients",
            as: "ingredient",
            cond: {
              $or: [
                {
                  $regexMatch: {
                    input: "$$ingredient.name",
                    regex: regex,
                  },
                },
                {
                  $regexMatch: {
                    input: "$$ingredient.family",
                    regex: regex,
                  },
                },
                {
                  $regexMatch: {
                    input: "$title",
                    regex: regex,
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: parseInt(limit),
    },
  ]);
};

module.exports = { searchService };