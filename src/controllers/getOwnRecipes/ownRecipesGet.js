const { Recipe } = require("../../models");

const ownRecipesGet = async (req, res) => {
    const { _id } = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const filter = favorite ? { owner: _id, favorite} : { owner: _id };
    const skip = (page - 1) * limit;
    const result = await Recipe.find(filter, "", {skip, limit}).populate("owner", "email subscription");
    res.status(200).json(result);
  };

module.exports = ownRecipesGet;