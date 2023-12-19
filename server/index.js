const dotenv = require("dotenv");
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

app.get("/api/home", cors(), async (req, res) => {
  try {
    const events = await googleCalendar.displayEventTimes();
    console.log(events);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // res.json({ message: "Hello, world" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
