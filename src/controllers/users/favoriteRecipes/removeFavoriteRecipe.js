const { httpError } = require("../../../helpers");
const { User } = require("../../../models");

const removeFavoriteRecipe = async (req, res, next) => {
	try {
		const { recipeId } = req.params;
		console.log(recipeId);
		if (!recipeId) {
			throw httpError(400, "Bad request!");
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { favoriteRecipes: recipeId } },
			{ new: true },
		);
		if (!updatedUser) {
			throw httpError(404, "User not found");
		}
		res.status(200).json({ message: "Recipe removed from favorites successfully" });
	} catch (error) {
		next(error);
	}
};

module.exports = removeFavoriteRecipe;
