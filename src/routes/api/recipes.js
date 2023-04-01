const express = require("express");
const recipesCtrl = require("../../controllers/recipes");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get(
    "/category-list",
    // authenticate,
    recipesCtrl.getCategoryList
);

router.get(
    "/category/:category",
    // authenticate,
    recipesCtrl.getRecipesByCategory
);

module.exports = router;
