import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get stored counts from localStorage
    const storedTotal = localStorage.getItem('zenithGuru_totalVisitors');
    const storedToday = localStorage.getItem('zenithGuru_todayVisitors');
    const storedDate = localStorage.getItem('zenithGuru_visitorDate');
    const currentDate = new Date().toDateString();

    let total = storedTotal ? parseInt(storedTotal) : 1247; // Start with base number
    let today = 0;

    // Check if it's a new day
    if (storedDate === currentDate && storedToday) {
      today = parseInt(storedToday);
    } else {
      // Reset for new day
      today = 1;
      localStorage.setItem('zenithGuru_visitorDate', currentDate);
    }

    // Increment visitor count (only once per session)
    const hasVisited = sessionStorage.getItem('zenithGuru_hasVisited');
    if (!hasVisited) {
      total += 1;
      today += 1;
      sessionStorage.setItem('zenithGuru_hasVisited', 'true');
      localStorage.setItem('zenithGuru_totalVisitors', total.toString());
      localStorage.setItem('zenithGuru_todayVisitors', today.toString());
    }

    // Animate the counter
    setIsAnimating(true);
    animateValue(0, total, 1500, setVisitorCount);
    animateValue(0, today, 1000, setTodayCount);

    // Update today's count periodically (simulate real-time)
    const interval = setInterval(() => {
      const currentStored = localStorage.getItem('zenithGuru_todayVisitors');
      if (currentStored) {
        setTodayCount(parseInt(currentStored));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const animateValue = (start, end, duration, setter) => {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += increment * Math.ceil(range / 50);
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
        setTimeout(() => setIsAnimating(false), 500);
      }
      setter(current);
    }, Math.max(stepTime, 30));
  };

  return (
    <div className="visitor-counter">
      <div className="counter-badge">
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span className="live-text">LIVE</span>
        </div>
        
        <div className="counter-stats">
          <div className="stat-row">
            <span className="stat-icon">👥</span>
            <div className="stat-info">
              <span className={`stat-number ${isAnimating ? 'animating' : ''}`}>
                {visitorCount.toLocaleString()}
              </span>
              <span className="stat-label">Total Visitors</span>
            </div>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-row">
            <span className="stat-icon">📅</span>
            <div className="stat-info">
              <span className="stat-number today">{todayCount.toLocaleString()}</span>
              <span className="stat-label">Today</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Test Series Button */}
      <Link to="/test-series" className="test-series-btn">
        <span className="test-text">Test Series</span>
      </Link>
    </div>
  );
};

export default VisitorCounter;
