const { Recipe } = require('../../models');
const { httpError } = require('../../helpers');

const ownRecipesDelete = async (req, res) => {
    const { id } = req.params;
    const result = await Recipe.findByIdAndRemove(id);
    if (!result) {
        throw httpError(404, 'Not found')
    }
    res.json({
        message: "Recipe deleted",
    });
};

module.exports = ownRecipesDelete;