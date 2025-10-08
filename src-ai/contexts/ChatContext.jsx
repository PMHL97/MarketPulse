import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  const addMessage = (message) => {
    setMessages(prev => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([])
  }

  const hideWelcome = () => setShowWelcome(false)

  const value = {
    messages,
    setMessages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
    showWelcome,
    setShowWelcome,
    isTyping,
    setIsTyping,
    hideWelcome,
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
