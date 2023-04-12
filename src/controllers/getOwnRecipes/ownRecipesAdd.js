const { ownRecipes } = require('../../service');
const { httpError } = require('../../helpers');

const ownRecipesAdd = async (req, res) => {
	if (!req.user) {
		throw httpError(401, 'Access token is missing or invalid');
	}

	const { _id: owner } = req.user;
	const thumb = req.file.path;

	const result = await ownRecipes.createRecipe({
		body: req.body,
		owner,
		thumb,
	});

	res.json({
		status: 201,
		message: 'success',
		result,
	});
};

module.exports = { ownRecipesAdd };
