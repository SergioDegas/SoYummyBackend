const { categories } = require('../../data');

const getCategoryList = async (req, res) => {
	const categoryList = [...categories].sort((a, b) => a.localeCompare(b));

	res.json({
		status: 200,
		message: 'success',
		categories: categoryList,
	});
};

module.exports = getCategoryList;
