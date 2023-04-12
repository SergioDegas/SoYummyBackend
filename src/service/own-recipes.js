const { Recipe } = require('../models');

const recipesServiceGet = async ({ user, query }) => {
	const { _id: owner } = user;
	const { page = 1, limit = 8 } = query;
	const skip = (page - 1) * limit;

	const result = await Recipe.find({ owner })
		.skip(skip)
		.limit(limit)
		.sort({ updatedAt: -1 })
		.populate('owner', 'email subscription');
	const totalItems = await Recipe.find({ owner }).countDocuments();

	return { result, totalItems };
};

const createRecipe = async ({ body, owner, thumb }) => {
	const result = await Recipe.create({
		...body,
		owner,
		thumb,
	});
	return result;
};

const deleteRecipe = async ({ id, owner }) => await Recipe.findOneAndRemove({ _id: id, owner });

const recipesServiceGetById = async ({ id, owner }) => await Recipe.findOne({ _id: id, owner });

module.exports = { recipesServiceGet, deleteRecipe, recipesServiceGetById, createRecipe };
