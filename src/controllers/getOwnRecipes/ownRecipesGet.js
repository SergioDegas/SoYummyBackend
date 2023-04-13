const { ownRecipes } = require('../../service');
const { httpError } = require('../../helpers');

const ownRecipesGet = async (req, res) => {
	if (!req.user) {
		throw httpError(401, 'Access token is missing or invalid');
	}

	const result = await ownRecipes.recipesServiceGet({ user: req.user, query: req.query });

	res.json({
		status: 200,
		message: 'success',
		...result,
	});
};

module.exports = { ownRecipesGet };
