const {Recipe} = require("../../models");

const ownRecipesAdd = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Recipe.create({...req.body, owner});
    res.status(201).json(result)
}

module.exports = ownRecipesAdd;