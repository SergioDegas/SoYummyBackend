const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator } = require("../../middlewares");
const { register, login } = require("../../controllers/auth");

router.post("/register", schemaValidator, register);
router.post("/login", schemaValidator, login);

module.exports = router;
