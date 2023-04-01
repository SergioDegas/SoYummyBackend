const { httpError } = require("../../helpers");
const { recipes } = require("../../service");

const getRecipesByCategory = async (req, res) => {
    const { category } = req.params;

    const result = await recipes.getRecipesByCategory(category);

    if (!result || result.length === 0) {
        throw httpError(401, "Bad request");
    }

    res.status(200).json({
        status: 200,
        message: "success",
        data: { recipes: result },
    });
};

module.exports = getRecipesByCategory;
