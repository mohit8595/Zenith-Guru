import React, { useState, useEffect, useRef } from 'react'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import guru3Img from '../../guru3.jpeg'
import banner1Img from '../../Br1.jpeg'
import banner2Img from '../../Br2.jpeg'
import banner3Img from '../../Br3.jpeg'
import zenithSirImg from '../../zenithsir.png'
import VideoUploadModal from '../../components/VideoUploadModal'
import VideoPlayer from '../../components/VideoPlayer'
import PDFUploadModal from '../../components/PDFUploadModal'
import VideoGallery from '../../components/VideoGallery'
import PDFGallery from '../../components/PDFGallery'
import Preloader from '../../components/Preloader'
import BackToTop from '../../components/BackToTop'
import FloatingContact from '../../components/FloatingContact'
import VisitorCounter from '../../components/VisitorCounter'
import { getVideos } from '../../utils/videoStorage'
import { getPDFs } from '../../utils/pdfStorage'

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [animatedStats, setAnimatedStats] = useState({})
  
  // Video feature state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videos, setVideos] = useState([])
  
  // PDF feature state
  const [showPDFUploadModal, setShowPDFUploadModal] = useState(false)
  const [pdfs, setPDFs] = useState([])
  const navigate = useNavigate()
  
  const statsRef = useRef(null)
  
  const banners = [
    {
      id: 1,
      tag: 'New Batch',
      title: 'Start Learning Today',
      description: 'Join our new batch and boost your skills with expert teachers',
      buttonText: 'Explore Courses',
      buttonLink: '/courses',
      icon: '📚',
      image: banner1Img,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      tag: 'Free Demo',
      title: 'Try Free Demo Class',
      description: 'Experience quality education before you join',
      buttonText: 'Book Demo',
      buttonLink: '/contact',
      icon: '🎯',
      image: banner2Img,
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      id: 3,
      tag: 'Expert Teachers',
      title: 'Learn from Best',
      description: 'Get guidance from experienced educators',
      buttonText: 'Know More',
      buttonLink: '/about',
      icon: '👨‍🏫',
      image: banner3Img,
      gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)'
    }
  ]

  // Teacher data
  const teachers = [
    {
      name: 'D.V. Dwivedi',
      subject: 'Mathematics',
      experience: '15+ Years',
      image: zenithSirImg,
      qualification: 'M.Sc, B.Ed',
      achievement: 'Best Teacher Award',
      students: '5000+',
      rating: '4.9'
    },
    {
      name: 'Saloni Kumari',
      subject: 'Physics',
      experience: '12+ Years',
      image: zenithSirImg,
      qualification: 'BCA , M.Sc',
      achievement: 'JEE Top Mentor',
      students: '3500+',
      rating: '4.8'
    },
    {
      name: 'Priya Sharma',
      subject: 'Chemistry',
      experience: '10+ Years',
      image: zenithSirImg,
      qualification: 'M.Sc, B.Ed',
      achievement: 'NEET Expert',
      students: '4200+',
      rating: '4.9'
    },
    {
      name: 'Amit Singh',
      subject: 'English',
      experience: '8+ Years',
      image: zenithSirImg,
      qualification: 'M.A, B.Ed',
      achievement: 'Language Expert',
      students: '2800+',
      rating: '4.7'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    setIsLoaded(true)
    
    // Load videos from storage
    loadVideos()
    
    // Load PDFs from storage
    loadPDFs()

    // Refresh videos/PDFs when window gains focus
    const handleFocus = () => {
      loadVideos()
      loadPDFs()
    }
    window.addEventListener('focus', handleFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [banners.length])

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
      { key: 'students', target: 10000, suffix: '+' },
      { key: 'teachers', target: 50, suffix: '+' },
      { key: 'courses', target: 100, suffix: '+' },
      { key: 'results', target: 95, suffix: '%' }
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

  const loadVideos = () => {
    try {
      const fetchedVideos = getVideos()
      setVideos(fetchedVideos)
    } catch (error) {
      console.error('Error loading videos:', error)
    }
  }
  
  const loadPDFs = () => {
    try {
      const fetchedPDFs = getPDFs()
      setPDFs(fetchedPDFs)
    } catch (error) {
      console.error('Error loading PDFs:', error)
    }
  }

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleVideoUploaded = (newVideo) => {
    setVideos(prev => [newVideo, ...prev])
  }

  const handlePDFUploaded = (newPDF) => {
    setPDFs(prev => [newPDF, ...prev])
  }

  const totalUploads = videos.length + pdfs.length

  // Latest news data
  const latestNews = [
    { id: 1, text: "🎓 New JEE 2025 Batch Starting from 15th January - Enroll Now!", time: "2 hours ago" },
    { id: 2, text: "📚 NEET Crash Course 2024 - Limited Seats Available", time: "5 hours ago" },
    { id: 3, text: "🏆 Congratulations to our 50+ students selected in IITs this year!", time: "1 day ago" },
    { id: 4, text: "💻 Free Demo Classes Available - Register Today", time: "2 days ago" },
    { id: 5, text: "📝 Scholarship Test on 20th January - Up to 100% Fee Waiver", time: "3 days ago" },
    { id: 6, text: "🎯 Foundation Course for Class 9-10 - New Batch Started", time: "Just now" }
  ]

  return (
    <div className="home" onMouseMove={handleMouseMove}>
      {/* Latest News Ticker */}
      <div className="news-ticker">
        <div className="news-ticker-label">
          <span className="ticker-icon">📢</span>
          <span className="ticker-text">Latest News</span>
        </div>
        <div className="news-ticker-content">
          <div className="news-ticker-wrapper">
            {latestNews.map((news, index) => (
              <div key={index} className="news-item">
                <span className="news-item-text">{news.text}</span>
                <span className="news-item-time">{news.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visitor Counter - Below News Ticker */}
      <div className="visitor-counter-bar">
        <VisitorCounter />
        <Link to="/tuition-form" className="tuition-link">
          <span className="tuition-icon">📚</span>
          <span className="tuition-text">Tuition</span>
          <span className="tuition-arrow">→</span>
        </Link>
        <Link to="/upcoming-batches" className="upcoming-batches-link">
          <span className="upcoming-icon">🎓</span>
          <span className="upcoming-text">Upcoming Batches</span>
          <span className="upcoming-arrow">→</span>
        </Link>
      </div>

      {/* Hero Section - Enhanced */}
      <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
        {/* Animated background elements */}
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
        
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        
        <div className="hero-content">
          <div className="hero-badge-new">
            <span className="badge-pulse"></span>
            <span>🚀 New Batch 2025</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line1">Welcome to</span>
            <span className="hero-title-line2">Zenith Guru</span>
          </h1>
          <p className="hero-subtitle">
            Transform your career with expert-led courses. Join 10,000+ students achieving their dreams with India's best educators.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary stylish-btn">
              <span className="btn-content">
                <span>View Classes</span>
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <span className="btn-shine"></span>
            </Link>
            <Link to="/contact" className="btn btn-secondary stylish-btn">
              <span className="btn-content">
                <span>Free Demo</span>
              </span>
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <span className="trust-text">4.9 Rating</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-icon">👨‍🎓</span>
              <span className="trust-text">10K+ Students</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <span className="trust-icon">🏆</span>
              <span className="trust-text">95% Results</span>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number" data-count="15">15+</span>
              <span className="hero-stat-label">Classes</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number" data-count="10000">10K+</span>
              <span className="hero-stat-label">Students</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number" data-count="50">50+</span>
              <span className="hero-stat-label">Teachers</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-image-wrapper">
            <div className="hero-3d-container">
              <div className="hero-image-bg hero-image-bg-1"></div>
              <div className="hero-image-bg hero-image-bg-2"></div>
              <div className="hero-image-bg hero-image-bg-3"></div>
            </div>
            <img src={guru3Img} alt="Zenith Guru" className="hero-graphic" />
            <div className="hero-floating-card hero-floating-card-1">
              <span className="floating-icon">👨‍🎓</span>
              <span className="floating-text">Active Learners</span>
              <span className="floating-number">10,000+</span>
            </div>
            <div className="hero-floating-card hero-floating-card-2">
              <span className="floating-icon">📚</span>
              <span className="floating-text">Courses</span>
              <span className="floating-number">100+</span>
            </div>
            <div className="hero-badge">
              <span className="hero-badge-text">D.V. Dwivedi <br/> Founder </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section - Glassmorphism */}
      <section className="quick-features">
        <div className="features-bg">
          <div className="features-bg-shape features-bg-shape-1"></div>
          <div className="features-bg-shape features-bg-shape-2"></div>
        </div>
        <div 
          className="quick-feature feature-card-1 glass-card"
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="feature-icon-wrapper">
            <span className="feature-icon">💻</span>
          </div>
          <h3>Online Classes</h3>
          <p>Learn from anywhere with live interactive sessions</p>
          <div className="feature-link">
            <span>Learn More</span>
            <span className="arrow">→</span>
          </div>
          <div className="feature-overlay"></div>
        </div>
        <div 
          className="quick-feature feature-card-2 glass-card"
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate('/videos')}
          style={{ cursor: 'pointer' }}
        >
          <div className="feature-icon-wrapper">
            <span className="feature-icon">🎥</span>
          </div>
          <h3>Video Lectures</h3>
          <p>Watch educational video lectures</p>
          <div className="feature-link">
            <span>Watch Now</span>
            <span className="arrow">→</span>
          </div>
          <div className="feature-overlay"></div>
        </div>
        <div 
          className="quick-feature feature-card-3 glass-card"
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => navigate('/pdfs')}
          style={{ cursor: 'pointer' }}
        >
          <div className="feature-icon-wrapper">
            <span className="feature-icon">📄</span>
          </div>
          <h3>PDF Materials</h3>
          <p>Download and view study PDFs</p>
          <div className="feature-link">
            <span>View PDFs</span>
            <span className="arrow">→</span>
          </div>
          <div className="feature-overlay"></div>
        </div>
        <div 
          className="quick-feature feature-card-4 glass-card"
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="feature-icon-wrapper">
            <span className="feature-icon">📝</span>
          </div>
          <h3>Mock Tests</h3>
          <p>Practice with real exam patterns & track progress</p>
          <div className="feature-link">
            <span>Start Test</span>
            <span className="arrow">→</span>
          </div>
          <div className="feature-overlay"></div>
        </div>
      </section>

      {/* Teacher Section - Enhanced */}
      <section className="teachers-section">
        <div className="section-header">
          <span className="section-tag">👨‍🏫 Our Expert Faculty</span>
          <h2>Meet Our Teachers</h2>
          <p>Learn from experienced and qualified teachers who care about your success</p>
        </div>
        <div className="teachers-grid">
          {teachers.map((teacher, index) => (
            <div 
              key={index}
              className="teacher-card"
              onMouseEnter={() => setHoveredCard(`teacher${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="teacher-card-bg"></div>
              <div className="teacher-image">
                <img src={teacher.image} alt={teacher.name} />
                <div className="teacher-overlay">
                  <span className="teacher-qualification">{teacher.qualification}</span>
                </div>
                <div className="teacher-rating">
                  <span>⭐ {teacher.rating}</span>
                </div>
              </div>
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <span className="teacher-subject">{teacher.subject}</span>
                <div className="teacher-meta">
                  <span className="teacher-experience">📚 {teacher.experience}</span>
                  <span className="teacher-students">👨‍🎓 {teacher.students} Students</span>
                </div>
                <div className="teacher-achievement">
                  <span>🏆 {teacher.achievement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Auto-Sliding Banners */}
      <section className="sliding-banners">
        <div 
          className="sliding-banner" 
          style={{ background: banners[currentBanner].gradient }}
          onMouseEnter={() => setHoveredCard('banner')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {banners[currentBanner].image ? (
            <>
              <img 
                src={banners[currentBanner].image} 
                alt="Banner" 
                className="sliding-banner-image"
              />
              <div className="sliding-banner-image-overlay"></div>
            </>
          ) : (
            <div className="sliding-banner-icon">{banners[currentBanner].icon}</div>
          )}
          <div className="sliding-banner-content">
            <span className="sliding-banner-tag">{banners[currentBanner].tag}</span>
            <h2 className="sliding-banner-title">{banners[currentBanner].title}</h2>
            <p className="sliding-banner-description">{banners[currentBanner].description}</p>
            <Link to={banners[currentBanner].buttonLink} className="sliding-banner-btn stylish-btn">
              {banners[currentBanner].buttonText}
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="banner-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </section>

      {/* Classes Section */}
      <section className="classes-section">
        <div className="section-header">
          <span className="section-tag">📚 Our Classes</span>
          <h2>Find Your Class</h2>
          <p>Classes available for all age groups from nursery to class 12</p>
        </div>
        <div className="classes-grid">
          <Link 
            to="/courses" 
            className="class-card class-card-1"
            onMouseEnter={() => setHoveredCard('class1')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="class-card-inner">
              <span className="class-card-icon">🏫</span>
              <h3>Nursery - UKG</h3>
              <p>Early learning foundation</p>
              <span className="class-card-cta">Explore →</span>
            </div>
            <div className="class-card-overlay"></div>
          </Link>
          <Link 
            to="/courses" 
            className="class-card class-card-2"
            onMouseEnter={() => setHoveredCard('class2')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="class-card-inner">
              <span className="class-card-icon">📖</span>
              <h3>Class 1 - 5</h3>
              <p>Primary education</p>
              <span className="class-card-cta">Explore →</span>
            </div>
            <div className="class-card-overlay"></div>
          </Link>
          <Link 
            to="/courses" 
            className="class-card class-card-3"
            onMouseEnter={() => setHoveredCard('class3')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="class-card-inner">
              <span className="class-card-icon">🎯</span>
              <h3>Class 6 - 8</h3>
              <p>Middle school foundation</p>
              <span className="class-card-cta">Explore →</span>
            </div>
            <div className="class-card-overlay"></div>
          </Link>
          <Link 
            to="/courses" 
            className="class-card class-card-4"
            onMouseEnter={() => setHoveredCard('class4')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="class-card-inner">
              <span className="class-card-icon">⭐</span>
              <h3>Class 9 - 10</h3>
              <p>Board preparation</p>
              <span className="class-card-cta">Explore →</span>
            </div>
            <div className="class-card-overlay"></div>
          </Link>
          <Link 
            to="/courses" 
            className="class-card class-card-5"
            onMouseEnter={() => setHoveredCard('class5')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="class-card-inner">
              <span className="class-card-icon">🏆</span>
              <h3>Class 11 - 12</h3>
              <p>JEE/NEET preparation</p>
              <span className="class-card-cta">Explore →</span>
            </div>
            <div className="class-card-overlay"></div>
          </Link>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <section className="stats" ref={statsRef}>
        <div className="stats-bg-decoration"></div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <h3>{animatedStats.students || 0}+</h3>
              <p>Students</p>
            </div>
            <div className="stat-bg"></div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">👨‍🏫</div>
            <div className="stat-content">
              <h3>{animatedStats.teachers || 0}+</h3>
              <p>Teachers</p>
            </div>
            <div className="stat-bg"></div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3>{animatedStats.courses || 0}+</h3>
              <p>Courses</p>
            </div>
            <div className="stat-bg"></div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>{animatedStats.results || 0}%</h3>
              <p>Results</p>
            </div>
            <div className="stat-bg"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="section-header">
          <span className="section-tag">✨ Why Choose Us</span>
          <h2>The Zenith Guru Advantage</h2>
          <p>Experience learning like never before</p>
        </div>
        <div className="advantages-grid">
          <div className="advantage-card">
            <div className="advantage-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>Customized study plans tailored to your unique learning style and pace</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Real-time analytics to monitor your performance and identify improvement areas</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock doubt clearing and student support</p>
          </div>
          <div className="advantage-card">
            <div className="advantage-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Access quality education on any device, anytime</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="cta">
        <div className="cta-decoration cta-decoration-1"></div>
        <div className="cta-decoration cta-decoration-2"></div>
        <div className="cta-decoration cta-decoration-3"></div>
        <div className="cta-content">
          <div className="cta-badge">🚀 Limited Time Offer</div>
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of students already learning on Zenith Guru. Get access to expert-led courses and achieve your dreams.</p>
          <div className="cta-features">
            <div className="cta-feature">
              <span>✓</span> Free Demo Class
            </div>
            <div className="cta-feature">
              <span>✓</span> Expert Mentors
            </div>
            <div className="cta-feature">
              <span>✓</span> Flexible Schedule
            </div>
          </div>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-white stylish-btn">
              <span>Get Free Demo</span>
            </Link>
            <Link to="/courses" className="btn btn-outline-white stylish-btn">
              <span>Browse Classes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">💬 Student Reviews</span>
          <h2>What Our Students Say</h2>
          <p>Real feedback from our successful students</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">Zenith Guru helped me crack JEE with 98.6%ile. The teachers are amazing and the study material is top-notch!</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👨‍🎓</div>
              <div className="testimonial-info">
                <h4>Rahul Sharma</h4>
                <span>JEE Advanced 2024 - AIR 234</span>
              </div>
            </div>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">The mock tests and doubt clearing sessions were instrumental in my NEET preparation. Highly recommended!</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👩‍🎓</div>
              <div className="testimonial-info">
                <h4>Priya Singh</h4>
                <span>NEET 2024 - Score 680/720</span>
              </div>
            </div>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">Best decision I made was joining Zenith Guru. The personal attention and tracki ng helped me improve significantly.</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">👨‍🎓</div>
              <div className="testimonial-info">
                <h4>Aditya Patel</h4>
                <span>Class 12 - 95.2%</span>
              </div>
            </div>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      {/* Countdown Section - New */}
      <section className="countdown-section">
        <div className="countdown-bg">
          <div className="countdown-shape shape-1"></div>
          <div className="countdown-shape shape-2"></div>
        </div>
        <div className="countdown-content">
          <div className="countdown-badge">🎯 Next Batch Starting Soon</div>
          <h2>JEE/NEET 2025 Crash Course</h2>
          <p>Limited seats available. Enroll now and get early bird discount!</p>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number">15</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-number">08</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-number">45</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <span className="countdown-number">30</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          <div className="countdown-cta">
            <Link to="/contact" className="btn btn-primary countdown-btn">
              <span>Enroll Now - 30% Off</span>
            </Link>
            <span className="countdown-note">*Valid for first 100 students</span>
          </div>
        </div>
      </section>

      {/* Achievements Section - New */}
      <section className="achievements-section">
        <div className="section-header">
          <span className="section-tag">🏆 Our Achievements</span>
          <h2>Proven Track Record</h2>
          <p>Numbers that speak for themselves</p>
        </div>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon">🎓</div>
            <div className="achievement-number">5000+</div>
            <div className="achievement-label">Students Selected</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🏅</div>
            <div className="achievement-number">150+</div>
            <div className="achievement-label">IIT Selections</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">⭐</div>
            <div className="achievement-number">95%</div>
            <div className="achievement-label">Success Rate</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">👨‍🏫</div>
            <div className="achievement-number">50+</div>
            <div className="achievement-label">Expert Teachers</div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">📚</div>
            <div className="achievement-number">200+</div>
            <div className="achievement-label">Courses</div>
          </div>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section className="faq-section">
        <div className="section-header">
          <span className="section-tag">❓ FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We've got answers!</p>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <div className="faq-question">
              <span>What is Zenith Guru?</span>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              Zenith Guru is a premier online education platform offering comprehensive courses for JEE, NEET, and school board exams with expert faculty and personalized learning.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>How do I enroll in a course?</span>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              Simply browse our courses, select the one you want, and click enroll. You can also book a free demo class first to understand the teaching methodology.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>Are the classes live or recorded?</span>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              We offer both live interactive classes and recorded lectures. Students can access recorded sessions anytime for revision.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-question">
              <span>Do you provide study material?</span>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              Yes! We provide comprehensive study material including PDFs, video lectures, mock tests, and practice papers with each course.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-content">
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">🎓</span>
                <span className="footer-logo-text">Zenith Guru</span>
              </div>
              <p>Quality education for all. Learn from the best teachers from anywhere in India.</p>
              <div className="footer-social">
                <a href="#" className="social-link footer-social-link">📘</a>
                <a href="#" className="social-link footer-social-link">📸</a>
                <a href="#" className="social-link footer-social-link">🐦</a>
                <a href="#" className="social-link footer-social-link">📺</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/courses" className="footer-link">Courses</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-section">
              <h4>Classes</h4>
              <Link to="/courses" className="footer-link">Nursery - UKG</Link>
              <Link to="/courses" className="footer-link">Class 1 - 5</Link>
              <Link to="/courses" className="footer-link">Class 6 - 8</Link>
              <Link to="/courses" className="footer-link">Class 9 - 12</Link>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📧 info@zenithguru.com</p>
              <p>📞 +91 9876543210</p>
              <p>📍 India</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Zenith Guru. All rights reserved.</p>
          <div className="footer-developer">
            <span>Developed by </span>
            <a href="#" className="footer-developer-link">Mohit Kumar</a>
          </div>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy</a>
            <a href="#" className="footer-legal-link">Terms</a>
          </div>
        </div>
      </footer>

      {/* Video Upload Modal */}
      <VideoUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onVideoUploaded={handleVideoUploaded}
      />

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* PDF Upload Modal */}
      <PDFUploadModal 
        isOpen={showPDFUploadModal}
        onClose={() => setShowPDFUploadModal(false)}
        onPDFUploaded={handlePDFUploaded}
      />

      {/* Preloader */}
      <Preloader />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  )
}

export default Home
