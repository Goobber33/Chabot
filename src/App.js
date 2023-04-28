import React, { useState } from 'react';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  const apiEndpoint = 'https://kyles-chatbot.herokuapp.com/chatbot';

  const sendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    setUserInput('');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          userInput: message,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setChatbotResponse(`Chatbot: ${jsonResponse.response}`);
      } else {
        setChatbotResponse('Error: Could not get a response from the chatbot.');
      }
    } catch (error) {
      setChatbotResponse('Error: Could not get a response from the chatbot.');
    }
  };

  return (
    <div className="App">
      <h1>Chatbot</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <div>{chatbotResponse}</div>
    </div>
  );
}

export default App;

