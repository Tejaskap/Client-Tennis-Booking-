import React, { useEffect, useState } from "react";

function index() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/home").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setMessage(data.message);
      });
    });
  }, []);

  return <div>{message}</div>;
}

export default index;