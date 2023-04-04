const getPopularRecipes = (req, res) => {
	res.json({
		status: 200,
		message: "Success",
		popularRecipes: [],
	});
};
module.exports = getPopularRecipes;
