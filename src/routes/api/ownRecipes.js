const express = require("express");
const ownRecipesCtrl = require("../../controllers/getOwnRecipes");
const { authenticate, isBodyNotEmpty, isValidId, schemaValidator } = require("../../middlewares");


const router = express.Router();

router.post("/", authenticate, isBodyNotEmpty(), schemaValidator, ownRecipesCtrl.ownRecipesAdd);

router.get("/", authenticate, isBodyNotEmpty(), schemaValidator, ownRecipesCtrl.ownRecipesGet);

router.delete("/:id", authenticate, isValidId, ownRecipesCtrl.ownRecipesDelete);

module.exports = router;