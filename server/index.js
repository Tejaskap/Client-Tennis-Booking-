const express = require("express");
const cors = require("cors");
const app = express();
const googleCalendar = require("./lib/googleCalendar");
const PORT = "5001";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/display-events", cors(), async (req, res) => {
  try {
    const { startTime, endTime } = req.params;
    const events = await googleCalendar.displayEventTimes(startTime, endTime);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/create-event", cors(), async (req, res) => {
  try {
    const events = await googleCalendar.insertEvent(req.body);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
