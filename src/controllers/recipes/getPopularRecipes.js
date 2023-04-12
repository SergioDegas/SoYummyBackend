const { recipes } = require('../../service');

const getPopularRecipes = async (req, res) => {
	const result = await recipes.getPopularRecipes();
	res.json({
		status: 200,
		message: 'Success',
		popularRecipes: result,
	});
};
module.exports = getPopularRecipes;
