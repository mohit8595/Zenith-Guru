import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './BackButton.css'

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null
  }

  const handleGoBack = () => {
    // Try to go back, if no history go to home
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <button 
      className="back-button" 
      onClick={handleGoBack} 
      aria-label="Go back"
      type="button"
    >
      <svg 
        className="back-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  )
}

export default BackButton
