// lib/googleCalendar.js

const axios = require("axios");

const apiKey = "AIzaSyAet8M5mzJAgNAuGLSlfT5IEFM-KZS1L94";
const calendarId =
  "9bd42a48cf019b21317287fffbb7c4bfe2310969869a0ff4e65721a7f1ad0939@group.calendar.google.com";
async function getBookableCalendarSpots() {
  try {
    console.log(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
    );
    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
    );
    const events = response.data.items;

    // Process the events
    const formattedEvents = events.map((event) => ({
      summary: event.summary,
      startDateTime: event.start.dateTime,
    }));

    return formattedEvents;
  } catch (error) {
    console.log(error);
    throw new Error(`Error fetching calendar entries: ${error.message}`);
  }
}

module.exports = {
  getBookableCalendarSpots,
};
