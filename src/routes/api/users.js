const express = require('express');
const router = express.Router();
const {
  validateBody,
  isBodyNotEmpty,
  schemaValidator,
} = require('../../middlewares');
const { register, login } = require('../../controllers/users');

router.post('/register', isBodyNotEmpty(), schemaValidator, register);
router.post('/login', isBodyNotEmpty(), schemaValidator, login);

module.exports = router;
