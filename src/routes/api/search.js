const express = require("express");
const searchCtrl = require("../../controllers/getSearch");
const { authenticate, isBodyNotEmpty } = require("../../middlewares");

const router = express.Router();

router.get("/",  searchCtrl.getSearch)

module.exports = router;