const express = require('express');
const router = express.Router();
const {
  schemaValidator,
  authenticate,
  uploadCloud,
} = require('../../middlewares');
const { current, updateAvatar} = require('../../controllers/user');

router.get('/current', schemaValidator, authenticate, current);
router.post('/updateAvatar', authenticate, uploadCloud.single("image"), updateAvatar);

module.exports = router;
