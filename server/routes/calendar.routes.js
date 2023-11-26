/**
 * Define calendar routes
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/calendar.controller");

// API Routes
router.get("/list", controller.getAll);

// export
module.exports = router;
