const { Recipe } = require("../../models");
const { httpError } = require("../../helpers");

const ownRecipesGet = async (req, res) => {
    
    if (!req.user) {
      throw httpError(401, "Access token is missing or invalid");
    }

    const { _id: owner } = req.user;
    const {page = 1, limit = 8} = req.query;
    const skip = (page - 1) * limit;
    const result = await Recipe.find({ owner }).skip(skip).limit(limit).populate("owner", "email subscription");
    
    if (!result.length) {
      throw httpError(404, "Not found");
    }

    res.status(200).json({
      status: 200,
      message: "success",
      data: { result: result },
    });
  };

module.exports = {ownRecipesGet};