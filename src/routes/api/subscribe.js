const express = require("express");
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate } = require("../../middlewares");
const { register, login } = require("../../controllers/auth");
const subscribe = require("../../controllers/subscribe/subscribe")

router.post("/subscribe", authenticate, subscribe);


module.exports = router;