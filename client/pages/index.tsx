import React, { useEffect, useState } from "react";

function Index() {
  const [message, setMessage] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });

    const generateTimeSlots = () => {
      const startTime = 7;
      const endTime = 21;
      const slots = [];
      for (let i = startTime; i <= endTime; i++) {
        slots.push(`${i.toString().padStart(2, "0")}:00`);
      }
      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  return (
    <div className="container">
      <h1>{message}</h1>
      <div className="time-slots-container">
        {timeSlots.map((timeSlot, index) => (
          <div key={index} className="time-slot">
            {timeSlot}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
