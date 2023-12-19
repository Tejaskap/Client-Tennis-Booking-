// lib/googleCalendar.js

const { google } = require("googleapis");
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar";
const TIMEOFFSET = "+01:00";

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Define the calendar object globally
const calendar = google.calendar({ version: "v3", auth });

const getCurrentDateTimeForCalendar = () => {
  const date = new Date();
  const padZero = (value) => (value < 10 ? `0${value}` : value);

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());

  const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

  const startDate = new Date(newDateTime);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

  return {
    start: startDate,
    end: endDate,
  };
};

const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    if (response.status >= 200 && response.status < 300) {
      return "Event added to calendar";
    } else {
      return "Event could not be added to calendar";
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error.message}`);
    return "Error adding event to calendar";
  }
};

const getEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: "Europe/Berlin",
    });

    return response.data.items || [];
  } catch (error) {
    console.log(`Error at getEvents --> ${error.message}`);
    return [];
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await calendar.events.delete({
      calendarId,
      eventId,
    });

    return response.data === "" ? 1 : 0;
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error.message}`);
    return 0;
  }
};

const displayEventTimes = (events) => {
  if (events.length > 0) {
    events.forEach((event, index) => {
      const startTime = new Date(event.start.dateTime).toLocaleTimeString();
      const endTime = new Date(event.end.dateTime).toLocaleTimeString();

      console.log(`Event ${index + 1}:`);
      console.log("Start Time:", startTime);
      console.log("End Time:", endTime);
      console.log("------------------------");
    });
  } else {
    console.log("No events found in the response.");
  }
};

(async () => {
  const dateTime = getCurrentDateTimeForCalendar();

  const newEvent = {
    summary: "This is the summary.",
    description: "This is the description.",
    start: {
      dateTime: dateTime.start,
      timeZone: "Europe/Berlin",
    },
    end: {
      dateTime: dateTime.end,
      timeZone: "Europe/Berlin",
    },
  };

  const insertEventResult = await insertEvent(newEvent);
  console.log(insertEventResult);

  const startDateTime = "2023-12-14T20:00:00.000Z";
  const endDateTime = "2023-12-14T21:00:00.000Z";
  const events = await getEvents(startDateTime, endDateTime);
  displayEventTimes(events);

  const eventIdToDelete = "hkkdmeseuhhpagc862rfg6nvq4";
  const deleteEventResult = await deleteEvent(eventIdToDelete);
  console.log(deleteEventResult);
})();

module.exports = {
  displayEventTimes,
};
