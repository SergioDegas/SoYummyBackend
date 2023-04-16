const { Recipe } = require('../models');

const searchService = async (searchTerm, page, limit, searchBy) => {
    const regex = new RegExp(searchTerm, 'i');
	const skip = (parseInt(page) - 1) * parseInt(limit);

    const matchQueries = {
        title: { title: regex },
        ingredient: { 'ingredients.name': regex },
        family: { 'ingredients.family': regex },
        default: {
            $or: [{ title: regex }, { 'ingredients.name': regex }, { 'ingredients.family': regex }],
        },
    };

    const matchQuery = matchQueries[searchBy] || matchQueries.default;

    const recipes = await Recipe.aggregate([
        {
            $lookup: {
                from: 'ingredients',
                localField: 'ingredients.id',
                foreignField: '_id',
                as: 'ingredients',
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
                        input: '$ingredients',
                        as: 'ingredient',
                        cond: {
                            $or: [
                                {
                                    $regexMatch: {
                                        input: '$$ingredient.name',
                                        regex: regex,
                                    },
                                },
                                {
                                    $regexMatch: {
                                        input: '$$ingredient.family',
                                        regex: regex,
                                    },
                                },
                                {
                                    $regexMatch: {
                                        input: '$title',
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
            $facet: {
              recipes: [{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
              count: [{ $count: 'total' }],
            },
        },
    ]);

    const totalRecipes = recipes[0].count[0].total;
    const totalPage = Math.ceil(totalRecipes / parseInt(limit));
    return { recipes: recipes[0].recipes, totalRecipes, totalPage };
};

module.exports = { searchService };
