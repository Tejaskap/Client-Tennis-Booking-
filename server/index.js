const express = require("express");
const cors = require("cors");
const app = express();
const googleCalendar = require("./lib/googleCalendar");
const PORT = "5001";

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual origin of your React app
  optionsSuccessStatus: 200,
};

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
    // Use getCurrentDateTimeForCalendar to get the start and end times
    const { start, end } = googleCalendar.getCurrentDateTimeForCalendar();

    // Combine the current date and time with the received data
    const eventData = {
      ...req.body,
      start: {
        dateTime: start,
        timeZone: "Europe/Berlin",
      },
      end: {
        dateTime: end,
        timeZone: "Europe/Berlin",
      },
    };

    console.log("Received event data:", eventData);

    const events = await googleCalendar.insertEvent(eventData);
    console.log("Event added to calendar:", events);

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
