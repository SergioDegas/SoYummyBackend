const { Recipe } = require("../../models");
const { httpError } = require("../../helpers");

const getSearch = async (req, res) => {
	const { searchTerm, page = 1, limit = 8 } = req.query;
	const skip = (parseInt(page) - 1) * parseInt(limit);
	const regex = new RegExp(searchTerm, "i");
	const recipes = await Recipe.aggregate([
		{
			$lookup: {
				from: "ingredients",
				localField: "ingredients.id",
				foreignField: "_id",
				as: "ingredients",
			},
		},
		{
			$match: {
				$or: [{ title: regex }, { "ingredients.name": regex }],
			},
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
                                { $regexMatch: { input: "$$ingredient.name", regex: regex } },
                                { $regexMatch: { input: "$title", regex: regex } },
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

	if (!recipes || recipes.length === 0) {
		throw httpError(404, "Recipes not found!");
	}

	res.status(200).json({
		status: 200,
		message: "returned recipes by search value",
		data: { recipes: recipes },
	});
};

module.exports = { getSearch };
