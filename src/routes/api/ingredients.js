const express = require("express");
const ingredientsCtrl = require("../../controllers/ingredients");


const router = express.Router();

router.get("/list",ingredientsCtrl.getIngredientsList);

module.exports = router;
