import React from 'react'

const HandIcon = ({ variant = 1, className = "w-5 h-5", color = "#0a3b4a" }) => {
  const variants = {
    1: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M8 12V6C8 4.9 8.9 4 10 4s2 .9 2 2v6m-2 0v4c0 1.1-.9 2-2 2s-2-.9-2-2v-4m2 0h4m-4 0H6c-1.1 0-2-.9-2-2s.9-2 2-2h2m6 0h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2m-2 0v2c0 1.1.9 2 2 2s2-.9 2-2v-2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M9 11V7C9 5.9 9.9 5 11 5s2 .9 2 2v4m-2 0v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3m2 0h3m-3 0H7c-1.1 0-2-.9-2-2s.9-2 2-2h2m5 0h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2m-2 0v1c0 1.1.9 2 2 2s2-.9 2-2v-1"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M8 10V6C8 4.9 8.9 4 10 4s2 .9 2 2v4m-2 0v5c0 1.1-.9 2-2 2s-2-.9-2-2v-5m2 0h4m-4 0H6c-1.1 0-2-.9-2-2s.9-2 2-2h2m6 0h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2m-2 0v3c0 1.1.9 2 2 2s2-.9 2-2v-3"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M9 9V5C9 3.9 9.9 3 11 3s2 .9 2 2v4m-2 0v6c0 1.1-.9 2-2 2s-2-.9-2-2V9m2 0h4m-4 0H7c-1.1 0-2-.9-2-2s.9-2 2-2h2m5 0h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2m-2 0v4c0 1.1.9 2 2 2s2-.9 2-2v-4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M8 8V4C8 2.9 8.9 2 10 2s2 .9 2 2v4m-2 0v7c0 1.1-.9 2-2 2s-2-.9-2-2V8m2 0h5m-5 0H6c-1.1 0-2-.9-2-2s.9-2 2-2h2m6 0h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2m-2 0v5c0 1.1.9 2 2 2s2-.9 2-2v-5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    6: (
      <svg viewBox="0 0 32 32" fill="none" className={className}>
        {/* Main hand shape - stylized with rounded edges */}
        <path d="M16 4C12 4 8 8 8 12V16C8 20 12 24 16 24C20 24 24 20 24 16V12C24 8 20 4 16 4Z" fill="#22c55e"/>
        
        {/* Thumb - curved and positioned on the left */}
        <path d="M8 12C6 12 4 14 4 16C4 18 6 20 8 20C10 20 12 18 12 16C12 14 10 12 8 12Z" fill="#16a34a"/>
        
        {/* Fingers - four rounded segments with slight curves */}
        <path d="M12 8C10 8 8 10 8 12V16C8 18 10 20 12 20C14 20 16 18 16 16V12C16 10 14 8 12 8Z" fill="#16a34a"/>
        <path d="M16 6C14 6 12 8 12 10V14C12 16 14 18 16 18C18 18 20 16 20 14V10C20 8 18 6 16 6Z" fill="#16a34a"/>
        <path d="M20 6C18 6 16 8 16 10V14C16 16 18 18 20 18C22 18 24 16 24 14V10C24 8 22 6 20 6Z" fill="#16a34a"/>
        <path d="M24 8C22 8 20 10 20 12V16C20 18 22 20 24 20C26 20 28 18 28 16V12C28 10 26 8 24 8Z" fill="#16a34a"/>
        
        {/* Palm base - rounded connection */}
        <path d="M12 16C10 16 8 18 8 20C8 22 10 24 12 24C14 24 16 22 16 20C16 18 14 16 12 16Z" fill="#15803d"/>
      </svg>
    ),
    7: (
      <svg viewBox="0 0 32 32" fill="none" className={className}>
        {/* Gradient hand design matching the hand-icon.svg file */}
        {/* Thumb - darkest green */}
        <path d="M6 10C4 10 2 12 2 14C2 16 4 18 6 18C8 18 10 16 10 14C10 12 8 10 6 10Z" fill="#15803d"/>
        
        {/* Index finger - darkest green */}
        <path d="M10 6C8 6 6 8 6 10V14C6 16 8 18 10 18C12 18 14 16 14 14V10C14 8 12 6 10 6Z" fill="#15803d"/>
        
        {/* Middle finger - medium-dark green */}
        <path d="M14 4C12 4 10 6 10 8V12C10 14 12 16 14 16C16 16 18 14 18 12V8C18 6 16 4 14 4Z" fill="#16a34a"/>
        
        {/* Ring finger - medium-light green */}
        <path d="M18 4C16 4 14 6 14 8V12C14 14 16 16 18 16C20 16 22 14 22 12V8C22 6 20 4 18 4Z" fill="#22c55e"/>
        
        {/* Pinky finger - lightest green */}
        <path d="M22 6C20 6 18 8 18 10V14C18 16 20 18 22 18C24 18 26 16 26 14V10C26 8 24 6 22 6Z" fill="#4ade80"/>
        
        {/* Palm base - connecting all fingers */}
        <path d="M10 14C8 14 6 16 6 18C6 20 8 22 10 22C12 22 14 20 14 18C14 16 12 14 10 14Z" fill="#15803d"/>
      </svg>
    )
  }

  return variants[variant] || variants[1]
}

export default HandIcon
