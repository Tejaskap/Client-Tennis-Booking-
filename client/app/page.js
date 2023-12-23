// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import CalendarComponent from "./CalendarComponent";

const metadata = {
  title: "Tejas Calendar App",
  description: "Book your slot.",
};

// Update the actual API endpoint based on your server setup
const API_ENDPOINT = "http://localhost:5001/api/display-events";

async function getData(startTime, endTime) {
  try {
    const res = await fetch(
      `${API_ENDPOINT}?startTime=${startTime}&endTime=${endTime}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

const generateTimeSlots = (startHour, endHour, interval) => {
  const timeSlots = [];
  let currentHour = startHour;
  while (currentHour < endHour) {
    const startTime = `${currentHour < 10 ? "0" : ""}${currentHour}:00`;
    const endTime = `${currentHour + 1 < 10 ? "0" : ""}${currentHour + 1}:00`;
    timeSlots.push({ startTime, endTime });
    currentHour += interval;
  }
  return timeSlots;
};

const isTimeOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && end1 > start2;
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const fetchData = async (startDateTime, endDateTime) => {
    try {
      console.log(
        "Fetching data with startTime and endTime:",
        startDateTime,
        endDateTime
      );
      const result = await getData(
        startDateTime.toISOString(),
        endDateTime.toISOString()
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const onSelectDate = (date) => {
    setSelectedDate(date);

    const startDateTime = new Date(date);
    startDateTime.setHours(8, 0, 0, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(20, 0, 0, 0);

    fetchData(startDateTime, endDateTime);

    const generatedTimeSlots = generateTimeSlots(8, 20, 1);
    console.log("Generated time slots:", generatedTimeSlots);
    setTimeSlots(generatedTimeSlots);
  };

  useEffect(() => {
    const generatedTimeSlots = generateTimeSlots(8, 20, 1);
    console.log("Generated time slots:", generatedTimeSlots);
    setTimeSlots(generatedTimeSlots);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Book a time with Tejas</h1>
      <CalendarComponent onSelectDate={onSelectDate} />

      <div className="mt-8">
        <p className="text-lg mb-2">Select a date and time:</p>
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 mb-4"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Book Now</button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Time Slots</h2>
        <ul>
          {timeSlots.map((slot, index) => (
            <li key={index}>
              {`${slot.startTime} to ${slot.endTime}`} -{" "}
              {data.some((event) =>
                isTimeOverlap(
                  new Date(event.start.dateTime),
                  new Date(event.end.dateTime),
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    parseInt(slot.startTime.split(":")[0], 10),
                    0,
                    0
                  ),
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                    parseInt(slot.endTime.split(":")[0], 10),
                    0,
                    0
                  )
                )
              )
                ? "Booked"
                : "Available"}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
