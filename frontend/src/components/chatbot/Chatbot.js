import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Spinner, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose, embedded = false }) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize session with welcome message
  useEffect(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    localStorage.setItem('chatSessionId', newSessionId);
    
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    console.log('🤖 Chatbot Initialized:', {
      sessionId: newSessionId,
      apiUrl: apiUrl,
      environment: process.env.REACT_APP_ENVIRONMENT || 'development',
      hasToken: !!localStorage.getItem('token')
    });
    
    // Add welcome message
    setMessages([{
      role: 'assistant',
      content: t('chatbot:welcomeMessage', {
        defaultValue: "Hello! 👋 I'm your EduDBT assistant. I can help you with Aadhaar linking, DBT enabling, scholarships, and more. What would you like to know?"
      }),
      timestamp: new Date()
    }]);
  }, [t]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    console.log('Messages state updated. Total messages:', messages.length);
    messages.forEach((msg, i) => {
      console.log(`Message ${i}:`, {
        role: msg.role,
        contentLength: msg.content?.length,
        contentPreview: msg.content?.substring(0, 50)
      });
    });
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare headers - only include Authorization if token exists
      const headers = {
        'Content-Type': 'application/json'
      };
      
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Sending chatbot request:', {
        message: inputMessage,
        sessionId,
        language: i18n.language,
        hasToken: !!token
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/chatbot/message`,
        {
          message: inputMessage,
          sessionId: sessionId,
          language: i18n.language
        },
        { headers }
      );

      console.log('Chatbot response received:', response.data);
      console.log('Response message length:', response.data.message?.length);
      console.log('Response message content:', response.data.message);

      if (response.data.success) {
        const botMessage = {
          role: 'assistant',
          content: response.data.message,
          timestamp: new Date(response.data.timestamp)
        };
        console.log('Adding bot message to state:', botMessage);
        setMessages(prev => {
          const newMessages = [...prev, botMessage];
          console.log('New messages array:', newMessages);
          return newMessages;
        });
      } else {
        console.error('Response not successful:', response.data);
        throw new Error(response.data.error || 'Failed to get response');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = {
        role: 'assistant',
        content: t('chatbot:errorMessage', {
          defaultValue: "I apologize, but I'm having trouble responding right now. Please try again or visit our Help page for assistance."
        }),
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm(t('chatbot:confirmClear', { defaultValue: 'Are you sure you want to clear this chat?' }))) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/chatbot/history/${sessionId}`
        );
        
        // Create new session
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        localStorage.setItem('chatSessionId', newSessionId);
        
        // Reset with welcome message
        setMessages([{
          role: 'assistant',
          content: t('chatbot:welcomeMessage', {
            defaultValue: "Hello! 👋 I'm your EduDBT assistant. How can I help you today?"
          }),
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Failed to clear chat:', error);
      }
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(i18n.language, { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen && !embedded) return null;

  return (
    <Card className={embedded ? 'chatbot-embedded' : 'chatbot-floating'}>
      <Card.Header className="chatbot-header">
        <div className="d-flex align-items-center">
          <img 
            src="/chatbot-logo.png" 
            alt="Chatbot" 
            className="chatbot-logo me-2"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0">
              {t('chatbot:title', { defaultValue: 'EduDBT Assistant' })}
            </h6>
            <small className="text-muted">
              <Badge bg="success" className="me-1">
                <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i> Online
              </Badge>
              {t('chatbot:subtitle', { defaultValue: 'AI-powered help' })}
            </small>
          </div>
          <div className="chatbot-actions">
            <Button 
              variant="link" 
              size="sm" 
              className="text-muted me-2"
              onClick={handleClearChat}
              title={t('chatbot:clearChat', { defaultValue: 'Clear chat' })}
            >
              <i className="bi bi-trash"></i>
            </Button>
            {!embedded && (
              <Button 
                variant="link" 
                size="sm" 
                className="text-muted"
                onClick={onClose}
              >
                <i className="bi bi-x-lg"></i>
              </Button>
            )}
          </div>
        </div>
      </Card.Header>

      <Card.Body className="chatbot-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.role === 'user' ? 'message-user' : 'message-bot'} ${msg.isError ? 'message-error' : ''}`}
          >
            <div className="message-content">
              {msg.role === 'assistant' && (
                <div className="message-avatar">
                  <i className="bi bi-robot"></i>
                </div>
              )}
              <div className="message-bubble">
                <div className="message-text">
                  {msg.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <small className="message-time text-muted">
                  {formatTime(msg.timestamp)}
                </small>
              </div>
              {msg.role === 'user' && (
                <div className="message-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message message-bot">
            <div className="message-content">
              <div className="message-avatar">
                <i className="bi bi-robot"></i>
              </div>
              <div className="message-bubble">
                <Spinner animation="grow" size="sm" className="me-1" />
                <Spinner animation="grow" size="sm" className="me-1" />
                <Spinner animation="grow" size="sm" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer className="chatbot-footer">
        <Form onSubmit={handleSendMessage}>
          <div className="d-flex gap-2 align-items-center">
            <img 
              src="/chatbot-logo.png" 
              alt="EduDBT Assistant" 
              className="chatbot-footer-logo"
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder={t('chatbot:inputPlaceholder', { 
                defaultValue: 'Ask me anything about Aadhaar, DBT, scholarships...' 
              })}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="chatbot-input"
            />
            <Button 
              type="submit" 
              variant="primary"
              disabled={!inputMessage.trim() || isLoading}
              className="chatbot-send-btn"
              title="Send message"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  style={{ transform: 'rotate(0deg)' }}
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
              )}
            </Button>
          </div>
        </Form>
        <small className="text-muted d-block mt-2 text-center">
          {t('chatbot:disclaimer', { 
            defaultValue: 'AI responses may not always be accurate. Verify important information.' 
          })}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default Chatbot;
