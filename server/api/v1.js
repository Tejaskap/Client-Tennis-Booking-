// api/v1
const express = require("express");
const router = express.Router();
const { getBookableCalendarSpots } = require("../lib/googleCalendar");
const { listEvents } = require("../lib/getCalender");

router.get("/", (req, res) => {
  res.json({ message: "The V1 API is working" });
});

router.get("/monthly-events", async (req, res) => {
  console.log(await listEvents());
});

router.get("/monthlyevents", async (req, res) => {
  console.log(await getBookableCalendarSpots());
  res.json({ message: "yolo" });
});

module.exports = router;
