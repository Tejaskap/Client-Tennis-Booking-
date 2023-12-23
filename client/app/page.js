// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import CalendarComponent from "./components/CalendarComponent";
import TimeSlots from "./components/TimeSlots";
import BookingForm from "./components/BookingForm";

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

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingSlot, setBookingSlot] = useState(null);
  const [clientName, setClientName] = useState("");

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

  const handleBookNow = (startTime, endTime) => {
    setBookingSlot({ startTime, endTime });
  };

  const handleConfirmBooking = () => {
    // Add logic to confirm booking and save clientName, for now, just log the details
    console.log(
      `Booking confirmed for ${clientName} from ${bookingSlot.startTime} to ${bookingSlot.endTime}`
    );
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Book a Session with Tejas
          </h1>
          <CalendarComponent onSelectDate={onSelectDate} />
          <TimeSlots
            timeSlots={timeSlots}
            data={data}
            selectedDate={selectedDate}
            bookingSlot={bookingSlot}
            handleBookNow={handleBookNow}
            handleConfirmBooking={handleConfirmBooking}
            clientName={clientName}
            setClientName={setClientName}
          />
          <BookingForm
            bookingSlot={bookingSlot}
            handleConfirmBooking={handleConfirmBooking}
            clientName={clientName}
            setClientName={setClientName}
          />
        </div>
      </div>
    </main>
  );
}
