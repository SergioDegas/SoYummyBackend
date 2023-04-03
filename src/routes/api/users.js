const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate } = require("../../middlewares");
const { shoppingList, current } = require("../../controllers/users");

router.get("/shopping-list", authenticate, shoppingList);
// router.post('/login', isBodyNotEmpty(), schemaValidator, login);
router.get("/current", schemaValidator, authenticate, current);
// router.post('/logout', schemaValidator, authenticate, logout);

module.exports = router;
