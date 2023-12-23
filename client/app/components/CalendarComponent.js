// CalendarComponent.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarComponent = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    onSelectDate(today);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="calendar-container">
      <div className="datepicker-header">
        <button className="today-button" onClick={goToToday}>
          Today
        </button>
      </div>
      <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
    </div>
  );
};

export default CalendarComponent;
