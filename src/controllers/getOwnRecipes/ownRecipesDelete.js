const { Recipe } = require("../../models");
const { httpError } = require("../../helpers");

const ownRecipesDelete = async (req, res) => {
	if (!req.user) {
        throw httpError(401, "Access token is missing or invalid");
	}
	const { id } = req.params;
	const { _id: owner } = req.user;

	const recipe = await Recipe.findOne({ _id: id, owner });

	if (!recipe) {
		throw httpError(404, "Not found");
	}

	const result = await Recipe.findByIdAndRemove(id);

	if (!result) {
		throw httpError(404, "Not found");
	}

	res.status(200).json({
		status: 200,
		message: "success",
		data: { result },
	});
};

module.exports = {ownRecipesDelete};
