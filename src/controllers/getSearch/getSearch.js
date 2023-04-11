const { search } = require("../../service");

const getSearch = async (req, res) => {
	const { searchTerm, page, limit, searchBy } = req.query;
	const recipes = await search.searchService(searchTerm, page, limit, searchBy);

	if (!recipes || recipes.length === 0) {
		return res.json({
			status: 200,
			message: "success",
			recipes: {recipes: []},
		});
	}

	res.json({
		status: 200,
		message: "success",
		recipes,
	});
};

module.exports = { getSearch };
