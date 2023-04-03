const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate } = require("../../middlewares");
const { getShoppingList, updateShoppingList, current } = require("../../controllers/users");

router.get("/shopping-list", authenticate, getShoppingList);
router.patch("/shopping-list", isBodyNotEmpty(), authenticate, schemaValidator, updateShoppingList);
router.get("/current", schemaValidator, authenticate, current);

module.exports = router;
