//create a react componant that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and displayes that message ina box below

import React, { useState } from "react";
import './App.css';

function App() {
  
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  //when the submit is hit calling the endpoint running at port 3001

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message));
    
  };

  return (
    <div className="App">
      <h1>ChatBot Tom</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={message} placeholder="Ask Tom anything" onChange={(e) => setMessage(e.target.value)} />
       
        <button type="submit">Submit</button>
      </form>
      {response && <div><b>Tom:</b> {response} </div> }
    </div>
  );
}

export default App
