const { httpError } = require("../../../helpers");
const { User } = require("../../../models");

const addFavoriteRecipes = async (req, res) => {
	try {
		const { recipeId } = req.body;
		if (!recipeId) {
			throw httpError(400, "Bad request!");
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet: { favoriteRecipes: recipeId } },
			{ new: true },
		);
		if (!updatedUser) {
			throw httpError(404, "User not found");
		}
		res.status(200).json({ message: "Recipe added to favorites successfully" });
	} catch (error) {
		next(error);
	}
};

module.exports = addFavoriteRecipes;
