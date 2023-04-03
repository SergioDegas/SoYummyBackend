const { Recipe } = require('../../models');
const { httpError } = require('../../helpers');

const getSearch = async (req, res) => {
    const { searchTerm, page = 1, limit = 8 } = req.query;
    const skip = (page - 1 ) * limit;
    const regex = new RegExp(searchTerm, 'i');
    const recipes = await Recipe.find({ $or: [{ title: regex }, { ingredients: regex }] }, null, { skip, limit });
    res.json(recipes);
    if (!recipes) {
        throw httpError(404, "Not found");
    }
   
    res.status(200).json({
        status: 200,
        message: "success",
        data: {recipes: recipes},
    })
}

module.exports = { getSearch };

