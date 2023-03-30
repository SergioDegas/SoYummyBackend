const express = require('express');
const router = express.Router();
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../model/user');
const {register, login} = require("../../controllers/users")


router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;