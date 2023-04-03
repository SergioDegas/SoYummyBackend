const { httpError } = require("../../helpers");
const { Ingredient } = require("../../models");

const getIngredients = async (req, res, next) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 8;
	const skipIndex = (page - 1) * limit;

	const ingredientsList = await Ingredient.find().skip(skipIndex).limit(limit);
	if (!ingredientsList) {
		throw httpError(404, "Not found");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		data: { ingredients },
	});
};

module.exports = getIngredients;
