const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate } = require("../../middlewares");
const { register, login, current, logout } = require("../../controllers/users");

router.post("/register", isBodyNotEmpty(), schemaValidator, register);
router.post("/login", isBodyNotEmpty(), schemaValidator, login);
router.post("/logout", schemaValidator, authenticate, logout);

module.exports = router;
