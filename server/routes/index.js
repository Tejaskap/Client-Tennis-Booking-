const express = require("express");
const router = express.Router();

router.use("/api/calendar", require("./calendar.routes"));

module.exports = router;
