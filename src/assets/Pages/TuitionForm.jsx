import React, { useState } from 'react'
import './TuitionForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { contactAPI } from '../../utils/api'

const TuitionForm = () => {
  const [selectedMode, setSelectedMode] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    subject: '',
    parentName: '',
    address: ''
  })

  const tuitionModes = [
    {
      id: 'offline',
      title: 'Offline',
      description: 'Physical classes at our center',
      icon: '🏫',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Face-to-face learning', 'Direct doubt clearing', 'Physical study materials', 'Lab facilities']
    },
    {
      id: 'hybrid',
      title: 'Hybrid',
      description: 'Mix of online and offline',
      icon: '🔄',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      features: ['Flexible schedule', 'Online + offline mix', 'Recorded lectures', 'Both doubt options']
    },
    {
      id: 'online',
      title: 'Online',
      description: 'Live classes from home',
      icon: '💻',
      color: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      features: ['Learn from anywhere', 'Live interactive classes', 'Digital study material', 'Online doubt clearing']
    }
  ]

  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
    setShowForm(true)
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
      const submissionData = {
        ...formData,
        tuitionMode: selectedMode,
        subject: `Tuition - ${selectedMode}`
      }
      await contactAPI.submit(submissionData)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (showForm) {
      setShowForm(false)
      setSelectedMode(null)
    } else {
      navigate('/')
    }
  }

  if (submitted) {
    return (
      <div className="tuition-form-page">
        <div className="tuition-success-container">
          <div className="success-animation">
            <div className="success-circle">
              <span className="success-icon">✅</span>
            </div>
            <div className="success-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for your interest in our tuition program. Our team will contact you within 24 hours.</p>
          <div className="success-details">
            <div className="detail-item">
              <span className="detail-icon">📚</span>
              <span>Mode: <strong>{selectedMode?.charAt(0).toUpperCase() + selectedMode?.slice(1)}</strong></span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📧</span>
              <span>Confirmation sent to: <strong>{formData.email}</strong></span>
            </div>
          </div>
          <div className="success-buttons">
            <Link to="/" className="btn-home">
              <span>Back to Home</span>
            </Link>
            <Link to="/contact" className="btn-contact">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tuition-form-page">
      {/* Hero Section */}
      <section className="tuition-hero">
        <div className="tuition-hero-bg">
          <div className="hero-particles">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="particle" style={{
                '--delay': `${i * 0.3}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="tuition-hero-content">
          <button className="back-btn" onClick={handleBack}>
            <span>←</span> Back
          </button>
          
          {!showForm ? (
            <>
              <span className="tuition-badge">📚 Tuition Program</span>
              <h1>Choose Your Learning Mode</h1>
              <p>Select the best mode that suits your learning needs</p>
            </>
          ) : (
            <>
              <span className="tuition-badge">
                {tuitionModes.find(m => m.id === selectedMode)?.icon} {tuitionModes.find(m => m.id === selectedMode)?.title} Mode
              </span>
              <h1>Complete Your Application</h1>
              <p>Fill in your details and we'll get back to you soon</p>
            </>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="tuition-content">
        {!showForm ? (
          /* Mode Selection */
          <div className="mode-selection">
            <div className="modes-grid">
              {tuitionModes.map((mode) => (
                <div 
                  key={mode.id}
                  className="mode-card"
                  style={{ '--mode-color': mode.color }}
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className="mode-card-bg"></div>
                  <div className="mode-icon-wrapper">
                    <span className="mode-icon">{mode.icon}</span>
                  </div>
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                  <ul className="mode-features">
                    {mode.features.map((feature, index) => (
                      <li key={index}>
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="select-mode-btn">
                    Select {mode.title}
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="form-container">
            <div className="selected-mode-banner" style={{ 
              background: tuitionModes.find(m => m.id === selectedMode)?.color 
            }}>
              <span className="banner-icon">{tuitionModes.find(m => m.id === selectedMode)?.icon}</span>
              <span className="banner-text">
                Applying for {tuitionModes.find(m => m.id === selectedMode)?.title} Tuition
              </span>
              <button className="change-mode-btn" onClick={() => setShowForm(false)}>
                Change
              </button>
            </div>

            <form onSubmit={handleSubmit} className="tuition-application-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Student Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter student name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="parentName">Parent's Name *</label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Enter parent's name"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="class">Class *</label>
                    <select
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select class</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject Interest</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="English">English</option>
                      <option value="All Subjects">All Subjects</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button type="submit" className="submit-application-btn" disabled={isLoading}>
                <span className="btn-content">
                  <span>{isLoading ? 'Submitting...' : 'Submit Application'}</span>
                  {!isLoading && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  )}
                </span>
              </button>
            </form>
          </div>
        )}
      </section>

      {/* Features Section */}
      {!showForm && (
        <section className="tuition-features">
          <div className="section-header">
            <span className="section-tag">✨ Why Choose Zenith Guru</span>
            <h2>Our Tuition Benefits</h2>
            <p>Experience quality education with our expert teachers</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Teachers</h3>
              <p>Learn from qualified and experienced educators</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Regular assessments and performance reports</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Doubt Clearing</h3>
              <p>One-on-one doubt sessions with teachers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Study Material</h3>
              <p>Comprehensive notes and practice papers</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="tuition-cta">
        <div className="cta-content">
          <h2>Need Help Choosing?</h2>
          <p>Our counselors are here to help you make the right choice</p>
          <div className="cta-buttons">
            <Link to="/contact" className="cta-btn primary">
              <span>Contact Us</span>
            </Link>
            <Link to="/courses" className="cta-btn secondary">
              <span>View Courses</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TuitionForm
