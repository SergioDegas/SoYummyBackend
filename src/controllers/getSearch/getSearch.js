const { search } = require('../../service');

const getSearch = async (req, res) => {
  const { searchTerm, page, limit, searchBy } = req.query;
  const {recipes, totalPage} = await search.searchService(searchTerm, page, limit, searchBy, true);

  if (!recipes || recipes.length === 0) {
    return res.json({
      status: 200,
      message: 'success',
      recipes: [], 
    });
  }

  res.json({
    status: 200,
    message: 'success',
    recipes,
	totalPage
  });

};

module.exports = { getSearch };
