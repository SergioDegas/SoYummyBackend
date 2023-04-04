const { httpError } = require("../../helpers");
const { categories } = require("../../data");

const getCategoryList = async (req, res) => {
	const categoryList = [...categories].sort((a, b) => a.localeCompare(b));

	res.status(200).json({
		status: 200,
		message: "success",
		categories: categoryList,
	});
};

module.exports = getCategoryList;
