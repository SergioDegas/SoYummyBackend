const { httpError } = require("../../helpers");
const { categories } = require("../../helpers");

const getCategoryList = async (req, res) => {
	const categoryList = [...categories].sort((a, b) => a.localeCompare(b));

	if (!categoryList) {
		throw httpError(404, "Categories not found!");
	}

	res.status(200).json({
		categories: categoryList,
	});
};

module.exports = getCategoryList;
