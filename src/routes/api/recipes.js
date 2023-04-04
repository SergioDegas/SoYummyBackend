const express = require("express");
const recipesCtrl = require("../../controllers/recipes");
const { authenticate, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/category-list", authenticate, recipesCtrl.getCategoryList);

router.get("/main-page", authenticate, recipesCtrl.getMainPage);

router.get("/category/:category", authenticate, recipesCtrl.getRecipesByCategory);

router.get("/:id", authenticate, isValidId, recipesCtrl.getRecipeById);

module.exports = router;
