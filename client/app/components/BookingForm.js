// BookingForm.js
import React from "react";

const BookingForm = ({
  bookingSlot,
  handleConfirmBooking,
  handleCancelBooking,
  clientName,
  setClientName,
}) => {
  return (
    <>
      {bookingSlot ? (
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
          <button
            onClick={handleCancelBooking}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => console.log("Book Now clicked")} // Placeholder action
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Book Now
        </button>
      )}
    </>
  );
};

export default BookingForm;
