import React, { useState } from 'react';
import Chatbot from './Chatbot';
import './Chatbot.css';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className="chatbot-float-btn"
        onClick={toggleChat}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <img 
            src="/chatbot-logo.png" 
            alt="Chat" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<i class="bi bi-chat-dots-fill"></i>';
            }}
          />
        )}
      </button>

      {/* Chatbot Component */}
      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
