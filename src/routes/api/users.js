const express = require('express');
const router = express.Router();
const { isBodyNotEmpty, schemaValidator, authenticate } = require('../../middlewares');
const { register, login, current, logout } = require('../../controllers/users');

router.post(
  '/register',
  isBodyNotEmpty('skdfsdlkjfsdklfsdjf'),
  schemaValidator,
  register
);
router.post('/login', isBodyNotEmpty(), schemaValidator, login);
router.get('/current', schemaValidator, authenticate, current);
router.post('/logout', schemaValidator, authenticate, logout);

module.exports = router;
