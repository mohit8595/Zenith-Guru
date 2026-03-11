import React, { useState } from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import guru3Img from '../../guru3.jpeg'
import zenithSirImg from '../../zenithsir.png'

const About = () => {
  const [activeTab, setActiveTab] = useState('mission')

  const features = [
    {
      icon: '🎯',
      title: 'Expert Faculty',
      description: 'Our teachers are highly qualified and experienced in their respective subject.'
    },
    {
      icon: '💡',
      title: 'Innovative Methods',
      description: 'We use modern teaching techniques to make learning effective and enjoyable.'
    },
    {
      icon: '📱',
      title: 'Online & Offline',
      description: 'Choose between online classes or in-person sessions at our centers.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Regular assessments and detailed progress reports for every student.'
    },
    {
      icon: '🤝',
      title: 'Personal Attention',
      description: 'Small batch sizes ensure individual attention for each student.'
    },
    {
      icon: '🌟',
      title: 'Proven Results',
      description: 'Consistent track record of excellent results in board and competitive exams.'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      class: 'Class 10',
      image: '👩‍🎓',
      rating: 5,
      text: 'Zenith Guru helped me score 97% in my board exams. The teachers are amazing!'
    },
    {
      name: 'Rahul Verma',
      class: 'Class 12',
      image: '👨‍🎓',
      rating: 5,
      text: 'Excellent coaching for JEE preparation. Very systematic approach.'
    },
    {
      name: 'Ananya Singh',
      class: 'Class 8',
      image: '👧',
      rating: 5,
      text: 'Learning is so much fun here! I love the online classes.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Students' },
    { number: '50+', label: 'Expert Teachers' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Results' }
  ]

  const teamTeachers = [
    {
      name: 'D.V. Dwivedi',
      subject: 'Mathematics',
      role: 'Founder & Head',
      qualification: 'M.Sc, B.Ed',
      image: zenithSirImg
    },
    {
      name: 'Dr. Rajesh Kumar',
      subject: 'Physics',
      role: 'Senior Faculty',
      qualification: 'M.Sc, Ph.D',
      image: zenithSirImg
    },
    {
      name: 'Priya Sharma',
      subject: 'Chemistry',
      role: 'Senior Faculty',
      qualification: 'M.Sc, B.Ed',
      image: zenithSirImg
    },
    {
      name: 'Amit Singh',
      subject: 'English',
      role: 'Faculty',
      qualification: 'M.A, B.Ed',
      image: zenithSirImg
    },
    {
      name: 'Neha Gupta',
      subject: 'Biology',
      role: 'Senior Faculty',
      qualification: 'M.Sc, B.Ed',
      image: zenithSirImg
    },
    {
      name: 'Vikash Pandey',
      subject: 'Social Science',
      role: 'Faculty',
      qualification: 'M.A, B.Ed',
      image: zenithSirImg
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">✨ About Zenith Guru</span>
          <h1>About <span>Zenith Guru</span></h1>
          <p>
            Zenith Guru is a premier educational platform dedicated to providing 
            top-quality learning resources and guidance to students from Nursery 
            to Class 12. Our mission is to make education accessible, enjoyable, 
            and effective for every learner.
          </p>
          <div className="about-hero-buttons">
            <Link to="/contact" className="btn btn-primary">
              <span>Get Free Demo</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/courses" className="btn btn-secondary">
              <span>View Courses</span>
            </Link>
          </div>
          <div className="about-hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="about-stat">
                <span className="about-stat-number">{stat.number}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero-image">
          <div className="about-image-wrapper">
            <div className="about-image-bg"></div>
            <img src={guru3Img} alt="Zenith Guru" className="about-graphic" />
            <div className="about-badge-card">
              <span className="badge-icon">🏆</span>
              <div className="badge-content">
                <span className="badge-title">Best Education</span>
                <span className="badge-subtitle">Platform 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section">
        <div className="founder-container">
          <div className="founder-image">
            <div className="founder-img-wrapper">
              <img src={zenithSirImg} alt="D.V. Dwivedi - Founder" />
              <div className="founder-experience">
                <span className="exp-number">15+</span>
                <span className="exp-label">Years Experience</span>
              </div>
            </div>
          </div>
          <div className="founder-content">
            <span className="founder-tag">👤 Our Founder</span>
            <h2>D.V. Dwivedi</h2>
            <p className="founder-title">Educationist & Visionary</p>
            <p className="founder-description">
              With over 15 years of experience in the education sector, D.V. Dwivedi 
              has dedicated his life to transforming the way students learn. His vision 
              is to provide quality education that is accessible to every student, 
              regardless of their background or location.
            </p>
            <p className="founder-description">
              Under his leadership, Zenith Guru has helped thousands of students achieve 
              their academic goals and dreams. His teaching methodology combines 
              traditional values with modern technology.
            </p>
            <div className="founder-achievements">
              <div className="achievement">
                <span className="achievement-icon">📚</span>
                <span className="achievement-text">M.Sc. Mathematics</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🎓</span>
                <span className="achievement-text">B.Ed. Certified</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-text">Best Teacher Award</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">Why Choose Us</span>
          <h2>The Zenith Guru Advantage</h2>
          <p>We provide comprehensive learning solutions tailored to each student's needs</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-overlay"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Section */}
      <section className="tab-section">
        <div className="tab-container">
          <div className="tab-header">
            <button 
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              <span className="tab-icon">🎯</span>
              <span>Our Mission</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
              onClick={() => setActiveTab('vision')}
            >
              <span className="tab-icon">👁️</span>
              <span>Our Vision</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'values' ? 'active' : ''}`}
              onClick={() => setActiveTab('values')}
            >
              <span className="tab-icon">💎</span>
              <span>Our Values</span>
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'mission' && (
              <div className="tab-pane active">
                <h3>Our Mission</h3>
                <p>
                  To provide world-class education that nurtures intellectual curiosity, 
                  critical thinking, and holistic development in every student. We strive 
                  to bridge the gap between traditional and modern education by leveraging 
                  technology while maintaining the essence of personalized learning.
                </p>
                <ul>
                  <li>Make quality education accessible to all</li>
                  <li>Empower students to reach their full potential</li>
                  <li>Foster a love for learning that lasts a lifetime</li>
                  <li>Prepare students for academic and personal success</li>
                </ul>
              </div>
            )}
            {activeTab === 'vision' && (
              <div className="tab-pane active">
                <h3>Our Vision</h3>
                <p>
                  To be the leading educational platform that transforms the learning 
                  experience for students across India and beyond. We envision a world 
                  where every student has access to excellent education regardless of 
                  their geographical location or financial constraints.
                </p>
                <ul>
                  <li>Become the most trusted name in education</li>
                  <li>Impact millions of students positively</li>
                  <li>Set new standards in teaching excellence</li>
                  <li>Create a global community of learners</li>
                </ul>
              </div>
            )}
            {activeTab === 'values' && (
              <div className="tab-pane active">
                <h3>Our Values</h3>
                <p>
                  Our core values guide everything we do at Zenith Guru. They form the 
                  foundation of our educational approach and our commitment to students, 
                  parents, and educators.
                </p>
                <ul>
                  <li><strong>Excellence:</strong> Strive for the highest standards</li>
                  <li><strong>Integrity:</strong> Be honest, transparent, and ethical</li>
                  <li><strong>Innovation:</strong> Embrace new ideas and methods</li>
                  <li><strong>Compassion:</strong> Care for each student's journey</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">💬 Testimonials</span>
          <h2>What Our Students Say</h2>
          <p>Real feedback from our successful students and their parents</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.class}</span>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-quote">"</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Teachers Section */}
      <section className="team-section">
        <div className="section-header">
          <span className="section-tag">👨‍🏫 Our Teaching Team</span>
          <h2>Meet Our Expert Teachers</h2>
          <p>Qualified and experienced educators dedicated to your success</p>
        </div>
        <div className="team-grid">
          {teamTeachers.map((teacher, index) => (
            <div key={index} className="team-card">
              <div className="team-image">
                <img src={teacher.image} alt={teacher.name} />
                <div className="team-overlay">
                  <span className="team-qualification">{teacher.qualification}</span>
                </div>
              </div>
              <div className="team-info">
                <h3>{teacher.name}</h3>
                <span className="team-subject">{teacher.subject}</span>
                <span className="team-role">{teacher.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Join Zenith Guru today and take the first step towards academic success</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-white">
              <span>Get Free Demo</span>
            </Link>
            <Link to="/courses" className="btn btn-outline">
              <span>Explore Courses</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

