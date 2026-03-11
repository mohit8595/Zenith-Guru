import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if preloader has already been shown in this session (browser tab)
    const hasPreloaderShown = sessionStorage.getItem('preloaderShown');
    
    if (hasPreloaderShown) {
      setIsLoading(false);
      return;
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Hide preloader after 2.5 seconds and remember it for this session
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('preloaderShown', 'true');
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  // Always show preloader on page refresh (localStorage check)
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('preloaderShown');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        {/* Logo Animation */}
        <div className="preloader-logo">
          <div className="logo-circle">
            <span className="logo-icon">🎓</span>
          </div>
          <div className="logo-ring ring-1"></div>
          <div className="logo-ring ring-2"></div>
          <div className="logo-ring ring-3"></div>
        </div>

        {/* Brand Name */}
        <h1 className="preloader-brand">
          <span className="brand-zenith">Zenith</span>
          <span className="brand-guru">Guru</span>
        </h1>

        {/* Tagline */}
        <p className="preloader-tagline">Excellence in Education</p>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.min(Math.round(progress), 100)}%</span>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Background Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
