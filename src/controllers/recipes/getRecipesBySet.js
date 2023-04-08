const { skipPageHandler, limitHandler } = require("../../helpers");
const { recipes } = require("../../service");

const getMainPage = async (req, res) => {
	const { page = 1, limit = 4 } = req.query;

	const result = await recipes.getRecipesBySet(skipPageHandler(page, limit), limitHandler(limit));

	res.status(200).json({
		status: 200,
		message: "success",
		result,
	});
};

module.exports = getMainPage;
