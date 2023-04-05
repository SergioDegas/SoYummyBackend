const {search} = require("../../service");
const { httpError } = require("../../helpers");

const getSearch = async (req, res) => {
	const { searchTerm, page, limit, searchBy } = req.query;
	const recipes = await search.searchService(searchTerm, page, limit, searchBy);
  
	if (!recipes || recipes.length === 0) {
		return res.status(200).json({
		status: 200,
		message: "success",
		data: { recipes: [] },
	  });
	  }
  
	res.status(200).json({
	  status: 200,
	  message: "success",
	  data: { recipes: recipes },
	});
  };
  
  module.exports = { getSearch };