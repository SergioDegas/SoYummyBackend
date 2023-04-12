const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middlewares');
const subscribe = require('../../controllers/subscribe/subscribe');

router.patch('/subscribe', authenticate, subscribe);

module.exports = router;
