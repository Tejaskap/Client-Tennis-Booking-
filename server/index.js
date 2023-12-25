const express = require("express");
const cors = require("cors");
const app = express();
const googleCalendar = require("./lib/googleCalendar");
const PORT = "5001";

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  optionsSuccessStatus: 200,
};

// const corsOptions = {
//   origin: "*", // Allow any origin for testing
//   optionsSuccessStatus: 200,
// };

app.use(cors(corsOptions));

const bodyParser = require("body-parser");

// Define the getCurrentDateTimeForCalendar function
const getCurrentDateTimeForCalendar = () => {
  const date = new Date();
  const padZero = (value) => (value < 10 ? `0${value}` : value);

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());

  const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000Z`;

  const startDate = new Date(newDateTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/api/display-events", cors(), async (req, res) => {
  try {
    const { startTime, endTime } = req.query; // Use req.query here
    const events = await googleCalendar.displayEventTimes(startTime, endTime);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/create-event", cors(), async (req, res) => {
  try {
    const eventData = req.body; // Assume eventData already contains start and end properties
    const events = await googleCalendar.insertEvent(eventData);
    res.json(events);
  } catch (error) {
    console.error("Error creating event:", error.message);
    console.error("Error details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// In index.js
app.get("/api/current-datetime", cors(), (req, res) => {
  try {
    const { start, end } = getCurrentDateTimeForCalendar();
    res.json({ start, end });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
