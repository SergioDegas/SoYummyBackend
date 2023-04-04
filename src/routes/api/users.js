const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate, uploadCloud } = require("../../middlewares");
const { getShoppingList, updateShoppingList, current, updateAvatar, logout, addFavoriteRecipes, getFavoriteRecipes } = require("../../controllers/users");

router.get("/shopping-list", authenticate, getShoppingList);
router.patch("/shopping-list", isBodyNotEmpty(), authenticate, schemaValidator, updateShoppingList);
router.get("/current", schemaValidator, authenticate, current);
router.post('/updateAvatar', authenticate, uploadCloud('avatars'), updateAvatar);
router.post("/logout", schemaValidator, authenticate, logout);
router.post("/favorites", isBodyNotEmpty(), authenticate, addFavoriteRecipes);
router.get("/favorites", authenticate, getFavoriteRecipes);



module.exports = router;
