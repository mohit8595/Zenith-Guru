import React, { useState, useEffect, useRef } from 'react'
import './Contact.css'
import { Link } from 'react-router-dom'
import { contactAPI } from '../../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeFaq, setActiveFaq] = useState(null)
  const [animatedStats, setAnimatedStats] = useState({})
  
  const statsRef = useRef(null)

  const contactInfo = [
    {
      icon: '📍',
      title: 'Our Location',
      details: ['123 Education Street', 'Kanpur, Uttar Pradesh', 'India - 208001'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '📞',
      title: 'Phone Number',
      details: ['+91 98765 43210', '+91 98765 43211', 'Mon-Sat: 9AM - 7PM'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '📧',
      title: 'Email Address',
      details: ['info@zenithguru.com', 'support@zenithguru.com', 'admissions@zenithguru.com'],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      details: ['Monday - Saturday', '9:00 AM - 7:00 PM', 'Sunday: Closed'],
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ]

  const faqs = [
    {
      question: 'How can I enroll in a course?',
      answer: 'You can enroll by clicking the "Enroll Now" button on any course page or visit our contact section to reach out to our team directly.'
    },
    {
      question: 'Do you offer online classes?',
      answer: 'Yes! We offer both online and offline classes. Our online platform provides live interactive sessions with recorded backups.'
    },
    {
      question: 'What is the batch size?',
      answer: 'We maintain small batch sizes of 15-20 students to ensure individual attention and better learning outcomes.'
    },
    {
      question: 'Do you provide study materials?',
      answer: 'Yes, we provide comprehensive study materials including notes, practice papers, and mock tests for all our courses.'
    },
    {
      question: 'Is there a demo class available?',
      answer: 'Absolutely! We offer free demo classes for all courses. You can book a demo by filling out the contact form or calling us directly.'
    }
  ]

  const socialLinks = [
    { icon: '📘', name: 'Facebook', color: '#1877f2' },
    { icon: '📸', name: 'Instagram', color: '#e4405f' },
    { icon: '🐦', name: 'Twitter', color: '#1da1f2' },
    { icon: '💼', name: 'LinkedIn', color: '#0077b5' },
    { icon: '📺', name: 'YouTube', color: '#ff0000' }
  ]

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'JEE Student',
      avatar: '👨‍🎓',
      text: 'The support team was incredibly helpful. They guided me through the entire admission process!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'NEET Aspirant',
      avatar: '👩‍⚕️',
      text: 'Quick response to all my queries. The counselors are very knowledgeable and friendly.',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      role: 'Class 12 Student',
      avatar: '👨‍💻',
      text: 'Best coaching institute! The demo class convinced me to join immediately.',
      rating: 5
    }
  ]

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
      { key: 'response', target: 24, suffix: 'h' },
      { key: 'support', target: 24, suffix: '/7' },
      { key: 'satisfaction', target: 98, suffix: '%' },
      { key: 'students', target: 10, suffix: 'K+' }
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await contactAPI.submit(formData)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="contact-page">
      {/* Animated Hero Section */}
      <section className="contact-hero-enhanced">
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.3}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        
        <div className="contact-hero-content">
          <span className="contact-badge-enhanced">
            <span className="badge-pulse"></span>
            📬 Get In Touch
          </span>
          <h1>Contact <span className="gradient-text">Zenith Guru</span></h1>
          <p>
            Have questions about our courses or want to enroll? We're here to help! 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="contact-hero-info">
            <div className="info-item-enhanced">
              <span className="info-icon">📞</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="info-item-enhanced">
              <span className="info-icon">📧</span>
              <span>info@zenithguru.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="contact-stats" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">⚡</span>
            <span className="stat-number">{animatedStats.response || 0}h</span>
            <span className="stat-label">Response Time</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌐</span>
            <span className="stat-number">{animatedStats.support || 0}/7</span>
            <span className="stat-label">Support Available</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">😊</span>
            <span className="stat-number">{animatedStats.satisfaction || 0}%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👨‍🎓</span>
            <span className="stat-number">{animatedStats.students || 0}K+</span>
            <span className="stat-label">Happy Students</span>
          </div>
        </div>
      </section>

      {/* Contact Info Cards - Enhanced */}
      <section className="contact-info-section-enhanced">
        <div className="section-header">
          <span className="section-tag">📇 Contact Information</span>
          <h2>Get in Touch With Us</h2>
          <p>Multiple ways to reach our team</p>
        </div>
        <div className="contact-info-grid-enhanced">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="contact-info-card-enhanced"
              style={{ '--card-color': info.color }}
            >
              <div className="card-glow"></div>
              <div className="info-icon-wrapper-enhanced">
                <span className="card-icon">{info.icon}</span>
              </div>
              <h3>{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
              <div className="card-shine"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & FAQ Section */}
      <section className="contact-main-section-enhanced">
        <div className="contact-container-enhanced">
          
          {/* Contact Form - Enhanced */}
          <div className="contact-form-wrapper-enhanced">
            <div className="form-header-enhanced">
              <span className="form-tag">✉️ Send Message</span>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            {submitted ? (
              <div className="success-message-enhanced">
                <div className="success-animation">
                  <span className="success-icon">✅</span>
                  <div className="success-rings"></div>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <button 
                  className="send-another-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-enhanced">
                <div className="form-row-enhanced">
                  <div className="form-group-enhanced">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-enhanced">
                  <div className="form-group-enhanced">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="demo">Demo Class Request</option>
                      <option value="support">Student Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-enhanced full-width">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="error-message-enhanced">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button type="submit" className="submit-btn-enhanced" disabled={isLoading}>
                  <span className="btn-content">
                    <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                    {!isLoading && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    )}
                  </span>
                  <span className="btn-shine"></span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section - Enhanced */}
          <div className="faq-wrapper-enhanced">
            <div className="faq-header-enhanced">
              <span className="faq-tag">❓ FAQ</span>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers to common questions</p>
            </div>
            <div className="faq-list-enhanced">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item-enhanced ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-summary">
                    <span className="faq-icon-enhanced">❓</span>
                    <span className="faq-question">{faq.question}</span>
                    <span className="faq-arrow-enhanced">▼</span>
                  </div>
                  <div className={`faq-answer-enhanced ${activeFaq === index ? 'show' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section - New */}
      <section className="social-section">
        <div className="section-header">
          <span className="section-tag">🌐 Connect With Us</span>
          <h2>Follow Us on Social Media</h2>
          <p>Stay updated with latest news and offers</p>
        </div>
        <div className="social-grid">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href="#" 
              className="social-card"
              style={{ '--social-color': social.color }}
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-name">{social.name}</span>
              <div className="social-glow"></div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="testimonials-section-contact">
        <div className="section-header">
          <span className="section-tag">💬 Student Reviews</span>
          <h2>What Our Students Say</h2>
          <p>Real feedback from our students</p>
        </div>
        <div className="testimonials-grid-contact">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card-contact">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{testimonial.avatar}</span>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
              <div className="testimonial-rating">
                {'⭐'.repeat(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section - Enhanced */}
      <section className="map-section-enhanced">
        <div className="map-container-enhanced">
          <div className="map-3d-wrapper">
            <div className="map-card-3d">
              <div className="map-content-enhanced">
                <span className="map-icon-enhanced">🗺️</span>
                <h3>Visit Our Center</h3>
                <p>123 Education Street, Kanpur</p>
                <div className="map-features">
                  <span className="map-feature">🚌 Near Bus Stand</span>
                  <span className="map-feature">🚗 Parking Available</span>
                  <span className="map-feature">♿ Wheelchair Accessible</span>
                </div>
                <Link to="/courses" className="map-btn-enhanced">View on Map</Link>
              </div>
              <div className="map-decoration map-decoration-1"></div>
              <div className="map-decoration map-decoration-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="contact-cta-section-enhanced">
        <div className="cta-decoration cta-decoration-1"></div>
        <div className="cta-decoration cta-decoration-2"></div>
        <div className="cta-content-enhanced">
          <span className="cta-badge">🚀 Start Your Journey</span>
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students already learning on Zenith Guru</p>
          <div className="cta-features">
            <span className="cta-feature">✓ Free Demo Class</span>
            <span className="cta-feature">✓ Expert Teachers</span>
            <span className="cta-feature">✓ Flexible Schedule</span>
          </div>
          <div className="cta-buttons-enhanced">
            <Link to="/courses" className="btn btn-primary-enhanced">
              <span>Browse Courses</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/" className="btn btn-secondary-enhanced">
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
