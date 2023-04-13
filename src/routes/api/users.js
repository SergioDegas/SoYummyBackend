const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate, uploadCloud } = require("../../middlewares");
const subscribe = require("../../controllers/subscribe/subscribe")

const {
	getShoppingList,
	updateShoppingList,
	current,
	updateUserData,
	logout,
	getFavoriteRecipes,
	updateFavoriteRecipe,
} = require("../../controllers/users");

router.get("/shopping-list", authenticate, getShoppingList);
router.patch("/shopping-list", isBodyNotEmpty(), authenticate, schemaValidator, updateShoppingList);
router.get("/current", schemaValidator, authenticate, current);
router.post("/update", authenticate, uploadCloud("avatars"), updateUserData);
router.post("/logout", schemaValidator, authenticate, logout);
router.get("/favorites", authenticate, getFavoriteRecipes);
router.patch("/favorites", authenticate, isBodyNotEmpty(), updateFavoriteRecipe)
router.patch("/subscription", authenticate, subscribe);

module.exports = router;
