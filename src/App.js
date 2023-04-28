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

  const fetchStockPrice = async (symbol) => {
    try {
      const response = await fetch(`https://kyles-chatbot-node.herokuapp.com/api/stock/${symbol}`);
      const data = await response.json();
      if (data.error) {
        setChatbotResponse(`Error: ${data.error}`);
      } else {
        setChatbotResponse(`The stock price for ${data.symbol} is $${data.price}`);
      }
    } catch (error) {
      setChatbotResponse('Error: Could not fetch stock price data.');
    }
  };

  const handleMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    setUserInput('');

    if (message.toLowerCase().startsWith('stock:')) {
      const symbol = message.slice(6).trim();
      if (symbol) {
        fetchStockPrice(symbol);
      } else {
        setChatbotResponse('Error: Please provide a valid stock symbol.');
      }
    } else {
      sendMessage(message);
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
      <button onClick={handleMessage}>Send</button>
      <div>{chatbotResponse}</div>
    </div>
  );
}

export default App;
