import React, { useState, useEffect, useRef } from 'react'
import './UpcomingBatches.css'
import { Link } from 'react-router-dom'

const UpcomingBatches = () => {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 15, hours: 8, minutes: 45, seconds: 30 })
  const [animatedStats, setAnimatedStats] = useState({})
  const statsRef = useRef(null)

  // Enhanced Upcoming Batches Data
  const upcomingBatches = [
    {
      id: 1,
      title: 'JEE 2025 Crash Course',
      description: 'Complete preparation for JEE Main & Advanced 2025. Expert faculty, daily tests, and comprehensive study material.',
      startDate: '15 January 2025',
      duration: '6 Months',
      seats: 'Limited Seats',
      seatsFilled: 85,
      totalSeats: 100,
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Daily Live Classes', 'Mock Tests', 'Doubt Sessions', 'Study Material'],
      category: 'JEE',
      price: '₹8,999',
      originalPrice: '₹15,000',
      discount: '40%'
    },
    {
      id: 2,
      title: 'NEET 2025 Batch',
      description: 'Comprehensive NEET preparation with experienced faculty. Biology, Physics & Chemistry covered in depth.',
      startDate: '20 January 2025',
      duration: '8 Months',
      seats: '50 Seats Left',
      seatsFilled: 50,
      totalSeats: 100,
      icon: '🧬',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      features: ['Live Classes', 'Test Series', 'NCERT Focus', 'Doubt Clearing'],
      category: 'NEET',
      price: '₹6,999',
      originalPrice: '₹12,000',
      discount: '42%'
    },
    {
      id: 3,
      title: 'Foundation Course (9-10)',
      description: 'Build strong foundation for future competitive exams. Mathematics, Science & English covered.',
      startDate: '25 January 2025',
      duration: '12 Months',
      seats: '100 Seats',
      seatsFilled: 30,
      totalSeats: 100,
      icon: '📚',
      gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      features: ['Concept Building', 'Regular Tests', 'Personal Attention', 'Progress Tracking'],
      category: 'Foundation',
      price: '₹4,999',
      originalPrice: '₹8,000',
      discount: '38%'
    },
    {
      id: 4,
      title: 'Board Exam Special (10-12)',
      description: 'Special batch for CBSE/State Board exams 2025. Complete syllabus coverage with revision.',
      startDate: '1 February 2025',
      duration: '4 Months',
      seats: '80 Seats',
      seatsFilled: 20,
      totalSeats: 100,
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Syllabus Completion', 'Revision Classes', 'Sample Papers', 'Result Guarantee'],
      category: 'Board',
      price: '₹3,999',
      originalPrice: '₹6,000',
      discount: '33%'
    }
  ]

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      batch: 'JEE 2024 Batch',
      avatar: '👨‍🎓',
      rating: 5,
      text: 'The JEE crash course helped me secure AIR 234. The faculty is amazing and the study material is top-notch!'
    },
    {
      id: 2,
      name: 'Priya Singh',
      batch: 'NEET 2024 Batch',
      avatar: '👩‍🎓',
      rating: 5,
      text: 'Best decision I made was joining Zenith Guru. Scored 680/720 in NEET thanks to their excellent teaching.'
    },
    {
      id: 3,
      name: 'Aditya Patel',
      batch: 'Foundation Course',
      avatar: '👨‍🎓',
      rating: 5,
      text: 'The foundation course built my concepts so well. I am now confident for JEE preparation next year.'
    }
  ]

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: 'When do the batches start?',
      answer: 'Our upcoming batches start from January 15, 2025 onwards. Each batch has a specific start date mentioned in the batch details.'
    },
    {
      id: 2,
      question: 'How can I enroll in a batch?',
      answer: 'You can enroll by clicking the "Enroll Now" button on any batch card or by contacting us directly through the contact page.'
    },
    {
      id: 3,
      question: 'Are there any scholarships available?',
      answer: 'Yes! We offer scholarships up to 100% based on our scholarship test. Contact us to know more about the upcoming scholarship test dates.'
    },
    {
      id: 4,
      question: 'What is the batch size?',
      answer: 'We maintain small batch sizes of 50-100 students to ensure personal attention to every student.'
    }
  ]

  // Auto-slide banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % upcomingBatches.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [upcomingBatches.length])

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Animated Stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const stats = [
      { key: 'batches', target: 4, suffix: '' },
      { key: 'seats', target: 350, suffix: '+' },
      { key: 'students', target: 2500, suffix: '+' },
      { key: 'success', target: 95, suffix: '%' }
    ]

    stats.forEach((stat) => {
      let current = 0
      const increment = stat.target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.target) {
          current = stat.target
          clearInterval(timer)
        }
        setAnimatedStats(prev => ({ ...prev, [stat.key]: Math.floor(current) }))
      }, 30)
    })
  }

  return (
    <div className="upcoming-batches-page">
      {/* Enhanced Hero Section with Countdown */}
      <section className="batches-hero-enhanced">
        {/* Floating Particles */}
        <div className="batch-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="batch-particle" style={{
              '--delay': `${i * 0.3}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
        
        {/* Glow Effects */}
        <div className="batch-glow batch-glow-1"></div>
        <div className="batch-glow batch-glow-2"></div>
        
        <div className="batches-hero-content">
          <span className="batch-hero-badge">🚀 Upcoming Batches 2025</span>
          <h1 className="batch-hero-title">Start Your Journey Today</h1>
          <p className="batch-hero-subtitle">
            Join our expert-led batches and achieve your academic goals. Limited seats available!
          </p>
          
          {/* Countdown Timer */}
          <div className="countdown-container">
            <span className="countdown-label">Next Batch Starts In:</span>
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.days).padStart(2, '0')}</span>
                <span className="countdown-unit">Days</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-unit">Hours</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-unit">Minutes</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-unit">Seconds</span>
              </div>
            </div>
          </div>
          
          <div className="batch-hero-buttons">
            <Link to="/contact" className="batch-btn-primary">
              <span>Enroll Now</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="#batches" className="batch-btn-secondary">
              <span>View All Batches</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="batch-stats-section" ref={statsRef}>
        <div className="batch-stats-decoration"></div>
        <div className="batch-stats-grid">
          <div className="batch-stat-card">
            <div className="batch-stat-icon">📅</div>
            <div className="batch-stat-content">
              <h3>{animatedStats.batches || 0}</h3>
              <p>Upcoming Batches</p>
            </div>
          </div>
          <div className="batch-stat-card">
            <div className="batch-stat-icon">🪑</div>
            <div className="batch-stat-content">
              <h3>{animatedStats.seats || 0}{animatedStats.seats ? '+' : ''}</h3>
              <p>Total Seats</p>
            </div>
          </div>
          <div className="batch-stat-card">
            <div className="batch-stat-icon">👨‍🎓</div>
            <div className="batch-stat-content">
              <h3>{animatedStats.students || 0}{animatedStats.students ? '+' : ''}</h3>
              <p>Students Enrolled</p>
            </div>
          </div>
          <div className="batch-stat-card">
            <div className="batch-stat-icon">🎯</div>
            <div className="batch-stat-content">
              <h3>{animatedStats.success || 0}{animatedStats.success ? '%' : ''}</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Batch Timeline */}
      <section className="batch-timeline-section">
        <div className="section-header">
          <span className="section-tag">📅 Batch Schedule</span>
          <h2>Upcoming Batch Timeline</h2>
          <p>Mark your calendar for these important dates</p>
        </div>
        
        <div className="batch-timeline">
          {upcomingBatches.map((batch, index) => (
            <div key={batch.id} className={`timeline-item ${index === currentBanner ? 'active' : ''}`}>
              <div className="timeline-marker" style={{ background: batch.gradient }}></div>
              <div className="timeline-content">
                <div className="timeline-date">{batch.startDate}</div>
                <div className="timeline-batch-name">{batch.title}</div>
                <div className="timeline-category">{batch.category}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Banner Carousel */}
      <section className="featured-batch-carousel">
        <div 
          className="featured-batch-card"
          style={{ background: upcomingBatches[currentBanner].gradient }}
        >
          <div className="featured-batch-content">
            <span className="featured-badge">🌟 Featured Batch</span>
            <h3>{upcomingBatches[currentBanner].title}</h3>
            <p>{upcomingBatches[currentBanner].description}</p>
            <div className="featured-batch-details">
              <div className="featured-detail">
                <span>📅</span>
                <span>{upcomingBatches[currentBanner].startDate}</span>
              </div>
              <div className="featured-detail">
                <span>⏱️</span>
                <span>{upcomingBatches[currentBanner].duration}</span>
              </div>
            </div>
            <div className="featured-price">
              <span className="featured-current">{upcomingBatches[currentBanner].price}</span>
              <span className="featured-original">{upcomingBatches[currentBanner].originalPrice}</span>
              <span className="featured-discount">{upcomingBatches[currentBanner].discount} OFF</span>
            </div>
            <Link to="/contact" className="featured-enroll-btn">
              Enroll Now
            </Link>
          </div>
          <div className="featured-batch-icon">
            <span>{upcomingBatches[currentBanner].icon}</span>
          </div>
        </div>

        {/* Banner Indicators */}
        <div className="featured-dots">
          {upcomingBatches.map((_, index) => (
            <button
              key={index}
              className={`featured-dot ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </section>

      {/* Sidebar with Test Series */}
      <div className="batches-sidebar-wrapper">
        <button 
          className="mobile-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span>☰</span> More Options {sidebarOpen ? '✕' : ''}
        </button>
        
        <aside className={`batches-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-section-card">
            <h3>📚 Quick Links</h3>
            <Link to="/test-series" className="sidebar-link">
              <span className="link-icon">📝</span>
              <div className="link-content">
                <span className="link-title">Test Series</span>
                <span className="link-desc">Practice tests & mock exams</span>
              </div>
              <span className="link-arrow">→</span>
            </Link>
            <Link to="/courses" className="sidebar-link">
              <span className="link-icon">🎓</span>
              <div className="link-content">
                <span className="link-title">All Courses</span>
                <span className="link-desc">Browse our courses</span>
              </div>
              <span className="link-arrow">→</span>
            </Link>
            <Link to="/contact" className="sidebar-link">
              <span className="link-icon">📞</span>
              <div className="link-content">
                <span className="link-title">Enquiry</span>
                <span className="link-desc">Get in touch with us</span>
              </div>
              <span className="link-arrow">→</span>
            </Link>
          </div>
          
          <div className="sidebar-section-card sidebar-cta">
            <div className="cta-image">
              <img src="/ssss.png" alt="Special Offer" />
            </div>
            <h4>Special Offer!</h4>
            <p>Get 20% off on all test series</p>
            <Link to="/test-series" className="sidebar-cta-btn">
              Explore Now
            </Link>
          </div>
        </aside>
      </div>

      {/* All Batches Grid - Enhanced */}
      <section className="all-batches-enhanced" id="batches">
        <div className="section-header">
          <span className="section-tag">🎓 All Upcoming Batches</span>
          <h2>Choose Your Batch</h2>
          <p>Select the perfect batch for your academic goals</p>
        </div>

        <div className="batches-grid-enhanced">
          {upcomingBatches.map((batch, index) => (
            <div 
              key={batch.id}
              className={`batch-card-enhanced ${index === currentBanner ? 'highlighted' : ''}`}
              style={{ '--batch-color': batch.gradient.includes('667eea') ? '#667eea' : 
                batch.gradient.includes('11998e') ? '#11998e' : 
                batch.gradient.includes('ff416c') ? '#ff416c' : '#f093fb' }}
            >
              <div className="batch-card-header" style={{ background: batch.gradient }}>
                <span className="batch-icon-large">{batch.icon}</span>
                <div className="batch-badges">
                  <span className="batch-category-badge">{batch.category}</span>
                  <span className="batch-discount-badge">{batch.discount} OFF</span>
                </div>
              </div>
              
              <div className="batch-card-body">
                <h3 className="batch-title">{batch.title}</h3>
                <p className="batch-description">{batch.description}</p>
                
                {/* Seat Availability Progress */}
                <div className="seat-progress">
                  <div className="seat-progress-header">
                    <span>Seat Availability</span>
                    <span className="seats-left">{batch.totalSeats - batch.seatsFilled} seats left</span>
                  </div>
                  <div className="seat-progress-bar">
                    <div 
                      className="seat-progress-fill"
                      style={{ 
                        width: `${(batch.seatsFilled / batch.totalSeats) * 100}%`,
                        background: batch.gradient
                      }}
                    ></div>
                  </div>
                  <div className="seat-progress-labels">
                    <span>{batch.seatsFilled} filled</span>
                    <span>{batch.totalSeats} total</span>
                  </div>
                </div>
                
                <div className="batch-info-grid">
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <div className="info-text">
                      <span className="info-label">Start Date</span>
                      <span className="info-value">{batch.startDate}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">⏱️</span>
                    <div className="info-text">
                      <span className="info-label">Duration</span>
                      <span className="info-value">{batch.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="batch-features-list">
                  {batch.features.map((feature, idx) => (
                    <span key={idx} className="feature-check">✓ {feature}</span>
                  ))}
                </div>
                
                <div className="batch-pricing">
                  <div className="price-current">{batch.price}</div>
                  <div className="price-original">{batch.originalPrice}</div>
                </div>
                
                <Link to="/contact" className="batch-enroll-btn-enhanced">
                  Enroll Now
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="batch-testimonials-section">
        <div className="section-header">
          <span className="section-tag">💬 Student Reviews</span>
          <h2>What Our Students Say</h2>
          <p>Real feedback from our successful students</p>
        </div>
        
        <div className="batch-testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="batch-testimonial-card">
              <div className="testimonial-quote-icon">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.batch}</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {'⭐'.repeat(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="batch-faq-section">
        <div className="section-header">
          <span className="section-tag">❓ FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We've got answers!</p>
        </div>
        
        <div className="batch-faq-grid">
          {faqs.map((faq) => (
            <div key={faq.id} className="batch-faq-item">
              <div className="faq-question-row">
                <span>{faq.question}</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer-row">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="batch-cta-enhanced">
        <div className="batch-cta-decoration"></div>
        <div className="batch-cta-content">
          <span className="batch-cta-badge">🎯 Limited Time Offer</span>
          <h2>Not Sure Which Batch to Choose?</h2>
          <p>Contact us for free counseling and find the perfect batch for your goals. Early bird discounts available!</p>
          <div className="batch-cta-features">
            <div className="cta-feature">
              <span>✓</span> Free Demo Class
            </div>
            <div className="cta-feature">
              <span>✓</span> Expert Counseling
            </div>
            <div className="cta-feature">
              <span>✓</span> Scholarship Test
            </div>
          </div>
          <div className="batch-cta-buttons">
            <Link to="/contact" className="batch-cta-btn primary">
              <span>📞 Contact Us</span>
            </Link>
            <Link to="/courses" className="batch-cta-btn secondary">
              <span>📚 View All Courses</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UpcomingBatches
