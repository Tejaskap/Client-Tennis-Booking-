import React, { useEffect, useState } from "react";

function Index() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the server
    fetch("http://localhost:5001/api/home")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{message}</div>;
}

export default Index;
