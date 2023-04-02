const express = require("express");
const ingredientsCtrl = require("../../controllers/ingredients");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/list", authenticate, ingredientsCtrl.getIngredientsList);

module.exports = router;
