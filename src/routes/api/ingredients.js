const express = require("express");
const { getIngredients } = require("../../controllers/ingredients");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getIngredients);

module.exports = router;
