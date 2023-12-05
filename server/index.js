const { default: axios } = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
// const cors = require("cors");
const PORT = "5001";
const { google } = require("googleapis");
// const routes = require("./routes");

dotenv.config({});

// Registering routes
// app.use(routes);

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

app.get("/api/calendar", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/api/calendar/list", (req, res) => {
  const token = req.query.code;

  const { tokens } = oauth2Client.getToken(code);
  console.log(req.query);
  res.send("it's working");
});

// generate a url that asks permissions for Google Calendar scopes
const scopes = ["https://www.googleapis.com/auth/calendar"];

app.get("/api/home", (req, res) => {
  res.json({ message: "Hello, world" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
