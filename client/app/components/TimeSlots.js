// TimeSlots.js
import React from "react";

const TimeSlots = ({
  timeSlots,
  data,
  selectedDate,
  bookingSlot,
  handleBookNow,
  handleConfirmBooking,
  clientName,
  setClientName,
}) => {
  const isTimeOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && end1 > start2;
  };

  const availableTimeSlots = timeSlots.filter((slot) => {
    return !data.some((event) =>
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
    );
  });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      <ul className="space-y-4">
        {availableTimeSlots.map((slot, index) => (
          <li key={index} className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">{`${slot.startTime} - ${slot.endTime}`}</span>
              {bookingSlot &&
              bookingSlot.startTime === slot.startTime &&
              bookingSlot.endTime === slot.endTime ? (
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="border p-2"
                  />
                  <button
                    onClick={handleConfirmBooking}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleBookNow(slot.startTime, slot.endTime)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Book Now
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlots;