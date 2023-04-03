const express = require('express');
const router = express.Router();
const {
  isBodyNotEmpty,
  schemaValidator,
  authenticate,
} = require('../../middlewares');
const { register, login, logout } = require('../../controllers/auth');


router.post('/register', isBodyNotEmpty(), schemaValidator, register);
router.post('/login', isBodyNotEmpty(), schemaValidator, login);
router.post('/logout', schemaValidator, authenticate, logout);

module.exports = router;