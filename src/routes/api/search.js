const express = require('express');
const searchCtrl = require('../../controllers/getSearch');

const router = express.Router();

router.get('/', searchCtrl.getSearch);

module.exports = router;
