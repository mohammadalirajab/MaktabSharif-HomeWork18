const express = require("express");
const router = express.Router();
const { getDashboard } = require("./dashboard.service");

router.get("/", getDashboard);

module.exports = router;
