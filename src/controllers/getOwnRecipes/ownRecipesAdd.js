const { Recipe } = require("../../models");
const { httpError } = require("../../helpers");

const ownRecipesAdd = async (req, res) => {
  if (!req.user) {
    throw httpError(401, "Access token is missing or invalid");
  }

  // if (!req.file) {
  //   throw httpError(400, "No file uploaded");
  // }

  const { _id: owner } = req.user;
  // const thumb = req.file.path;

  const result = await Recipe.create({
    ...req.body,
    owner,
    // thumb,
  });

  res.status(201).json({
    status: 201,
    message: "success",
    data: { result },
  });
};

module.exports = { ownRecipesAdd };