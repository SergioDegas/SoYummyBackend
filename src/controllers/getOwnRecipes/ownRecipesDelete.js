const { ownRecipes } = require("../../service");
const { httpError } = require("../../helpers");


const ownRecipesDelete = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const recipe = await ownRecipes.recipesServiceGetById({ id, owner });
    
	if (!recipe) {
		throw httpError(404, "Not found");
	}

    const result = await ownRecipes.deleteRecipe({ owner, id });
	
    if (!result) {
        throw httpError(404, "Not found");
    }

    res.json({
        status: 200,
        message: "success",
        result,
    });
};

module.exports = { ownRecipesDelete };