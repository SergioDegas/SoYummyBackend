const { mongoose } = require('mongoose');
const { Recipe } = require('../models');

const getRecipesByCategory = async (category, skip, limit) => {
	const recipes = await Recipe.find({ category }, 'title thumb').sort({ createdAt: -1 }).skip(skip).limit(limit);
	const total = await Recipe.find({ category }).countDocuments();
	const totalPages = Math.ceil(total / limit);

	return { recipes, totalPages };
};

const getRecipeById = async (recipeId) => {
	const ObjectId = mongoose.Types.ObjectId;

	const result = await Recipe.aggregate([
		{ $match: { _id: ObjectId(`${recipeId}`) } },
		{ $lookup: { from: 'ingredients', localField: 'ingredients.id', foreignField: '_id', as: 'ingredientsInfo' } },
		{
			$set: {
				ingredients: {
					$map: {
						input: '$ingredients',
						in: {
							$mergeObjects: [
								'$$this',
								{ $arrayElemAt: ['$ingredientsInfo', { $indexOfArray: ['$ingredientsInfo._id', '$$this.id'] }] },
							],
						},
					},
				},
			},
		},
		{ $unset: ['ingredientsInfo', 'ingredients.id'] },
	]);

	return result.length > 0 ? result[0] : null;
};

const getRecipesBySet = async (skip, limit) => {
	const data = await Recipe.aggregate([
		{
			$facet: {
				data: [
					{ $sort: { category: 1, createdAt: -1 } },
					{ $group: { _id: '$category', recipes: { $push: { title: '$title', thumb: '$thumb', _id: '$_id' } } } },
					{ $sort: { _id: 1 } },
					{ $project: { recipes: { $slice: ['$recipes', 4] } } },
					{ $skip: skip },
					{ $limit: limit },
				],
				total: [{ $group: { _id: '$category' } }, { $count: 'totalPages' }],
			},
		},
	]);

	const result = data[0]?.data;
	const totalPages = Math.ceil(data[0].total[0].totalPages / limit);

	return { result, totalPages };
};

const getPopularRecipes = async () =>
	await Recipe.aggregate([
		{
			$project: { title: 1, preview: 1, instructions: 1, favoritesCount: { $size: { $ifNull: ['$favorites', []] } } },
		},
		{
			$sort: { favoritesCount: -1 },
		},
		{
			$limit: 4,
		},
		{ $unset: 'favoritesCount' },
	]);

const removeRecipeFromFavorites = async ({ userId, recipeId }) =>
	await Recipe.findByIdAndUpdate(recipeId, { $pull: { favorites: userId } });

const addRecipeToFavorites = async ({ userId, recipeId }) =>
	await Recipe.findByIdAndUpdate(recipeId, {
		$addToSet: {
			favorites: userId,
		},
	});
module.exports = {
	getRecipesByCategory,
	getRecipeById,
	getRecipesBySet,
	removeRecipeFromFavorites,
	addRecipeToFavorites,
	getPopularRecipes,
};
