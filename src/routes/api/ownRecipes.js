const express = require("express");
const {ownRecipesAdd, ownRecipesDelete} = require("../../controllers/getOwnRecipes");
const { authenticate, isBodyNotEmpty, isValidId, schemaValidator, uploadCloud } = require("../../middlewares");


const router = express.Router();

router.post("/", authenticate, schemaValidator, uploadCloud("images"), ownRecipesAdd);
router.delete("/:id", authenticate, isValidId, ownRecipesDelete);

module.exports = router;