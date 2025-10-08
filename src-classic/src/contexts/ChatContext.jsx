import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load chat state from sessionStorage on mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatMessages');
    const savedShowWelcome = sessionStorage.getItem('chatShowWelcome');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    
    if (savedShowWelcome !== null) {
      setShowWelcome(savedShowWelcome === 'true');
    }
  }, []);

  // Save chat state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem('chatShowWelcome', showWelcome.toString());
  }, [showWelcome]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  const hideWelcome = () => {
    setShowWelcome(false);
  };

  const value = {
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    showWelcome,
    setShowWelcome,
    addMessage,
    clearMessages,
    hideWelcome
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
