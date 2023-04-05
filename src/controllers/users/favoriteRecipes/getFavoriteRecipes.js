const { httpError } = require("../../../helpers");
const { User, Recipe } = require("../../../models");

const getFavoriteRecipes = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			throw httpError(404, "User not found");
		}
		const favoriteRecipeIds = user.favoriteRecipes;
		const favoriteRecipes = await Recipe.find({ _id: { $in: favoriteRecipeIds } });
    res.status(200).json({
      status: 200,
      message: "success",
      data: { favoriteRecipes },
    });
	} catch (error) {
		next(error);
	}
};

module.exports = getFavoriteRecipes;
