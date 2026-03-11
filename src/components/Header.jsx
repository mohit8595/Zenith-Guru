import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import zenithLogo from '../zenith.jpeg'
import { ThemeContext } from '../utils/ThemeContext.jsx'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isShrunk, setIsShrunk] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [user, setUser] = useState(null)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  
  // Theme context
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  // Check for logged in user and admin
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, [])
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])
  
  // Notification state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Course Available',
      message: 'Mathematics Class 10 - New batch starting next week!',
      time: '2 hours ago',
      type: 'course',
      unread: true
    },
    {
      id: 2,
      title: 'Assignment Due',
      message: 'Science project submission deadline is tomorrow.',
      time: '5 hours ago',
      type: 'assignment',
      unread: true
    },
    {
      id: 3,
      title: 'Live Class Starting',
      message: 'Physics live class starts in 30 minutes.',
      time: '30 mins ago',
      type: 'live',
      unread: false
    },
    {
      id: 4,
      title: 'Welcome to Zenith Guru',
      message: 'Thank you for joining! Explore our courses.',
      time: '1 day ago',
      type: 'welcome',
      unread: false
    }
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Always keep header visible - only shrink when scrolling down
      setIsVisible(true)
      
      // Shrink header when scrolling down, expand when at top
      if (currentScrollY > 50) {
        setIsShrunk(true)
      } else {
        setIsShrunk(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const handleAdminClick = () => {
    navigate('/admin');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAdminLoggedIn(false);
    setShowProfileDropdown(false);
    navigate('/admin');
  };

  return (
    <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'} ${isShrunk ? 'header-shrunk' : 'header-expanded'}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={zenithLogo} alt="Zenith Logo" className="logo-image" />
          <span className="logo-text">Zenith Guru</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/upcoming-batches" className="nav-link">Batches</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="header-actions">
          {/* Social Media Icons */}
          <div className="social-media-icons">
            <a 
              href="https://www.linkedin.com/in/zenith-guru-coaching-institute-828893279" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon linkedin"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .772 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/GuruPratham?t=KvR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon twitter"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/channel/UCWRZA6lhDJpnC_Ip0fwqQLg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon youtube"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/zenithguru/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
          
          {/* Notification Bell */}
          <div className="notification-wrapper">
            <div 
              className="notification-bell-icon" 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <svg className="bell-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
              </svg>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </div>
            
            {/* Notification Panel */}
            {isNotificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <div className="notification-header-title">
                    <svg className="header-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
                    </svg>
                    <h4>Notifications</h4>
                    {unreadCount > 0 && <span className="unread-count">{unreadCount} new</span>}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      className="mark-all-read"
                      onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="no-notifications">
                      <svg className="empty-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
                      </svg>
                      <p>No notifications yet</p>
                      <span>We'll notify you when something arrives</span>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                        onClick={() => setNotifications(notifications.map(n => 
                          n.id === notification.id ? {...n, unread: false} : n
                        ))}
                      >
                        <div className={`notification-type-icon ${notification.type}`}>
                          {notification.type === 'course' && (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="currentColor"/>
                              <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="currentColor"/>
                            </svg>
                          )}
                          {notification.type === 'assignment' && (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                              <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"/>
                            </svg>
                          )}
                          {notification.type === 'live' && (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                            </svg>
                          )}
                          {notification.type === 'welcome' && (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 17L17 12L15.59 10.59L13 13.17V7H11V13.17L8.41 10.59L7 12L12 17Z" fill="currentColor"/>
                            </svg>
                          )}
                        </div>
                        <div className="notification-content">
                          <div className="notification-title">{notification.title}</div>
                          <div className="notification-message">{notification.message}</div>
                          <div className="notification-time">{notification.time}</div>
                        </div>
                        {notification.unread && <div className="unread-indicator"></div>}
                      </div>
                    ))
                  )}
                </div>
                <div className="notification-footer">
                  <Link to="/notifications" className="view-all-link">View all notifications</Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {/* Sun Icon (shown in dark mode) */}
            <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            {/* Moon Icon (shown in light mode) */}
            <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          
          {/* Profile Dropdown */}
          <div className="profile-dropdown-wrapper" ref={dropdownRef}>
            {(user || isAdminLoggedIn) ? (
              <div 
                className="user-profile-btn"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="user-avatar">
                  {user ? (user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U') : 'A'}
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-fill">Login / Sign Up</Link>
            )}
            
            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className="profile-dropdown">
                {user && (
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    My Profile
                  </Link>
                )}
                <div 
                  className="dropdown-item admin-item"
                  onClick={handleAdminClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  Admin Panel
                </div>
                {user && (
                  <div className="dropdown-divider"></div>
                )}
                {user ? (
                  <div 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </div>
                ) : isAdminLoggedIn && (
                  <div 
                    className="dropdown-item logout-item"
                    onClick={handleAdminLogout}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout Admin
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
