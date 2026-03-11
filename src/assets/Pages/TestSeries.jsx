import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TestSeries.css';
import blogBanner from '../../ssssss.png';

const TestSeries = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    mobile: '',
    email: '',
    address: '',
    crashCourse: false,
    testSeries: false
  });

  // Test Series Data
  const testSeries = [
    {
      id: 1,
      title: 'JEE Main 2025 Full Mock Test',
      category: 'JEE',
      totalTests: 25,
      attempted: 12,
      price: 2999,
      validity: '12 Months',
      image: '📝',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['AI-Based Analysis', 'Detailed Solutions', 'Rank Predictor', 'Video Explanations'],
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'JEE Advanced 2025 Complete Pack',
      category: 'JEE',
      totalTests: 30,
      attempted: 0,
      price: 3999,
      validity: '18 Months',
      image: '🎯',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Previous Year Papers', 'Mock Tests', 'Expert Solutions', 'Performance Tracking'],
      status: 'Not Started'
    },
    {
      id: 3,
      title: 'NEET 2025 Full Length Tests',
      category: 'NEET',
      totalTests: 20,
      attempted: 8,
      price: 2499,
      validity: '12 Months',
      image: '🧬',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      features: ['PCB Combined', 'NCERT Based', 'Detailed Analysis', 'Revision Notes'],
      status: 'In Progress'
    },
    {
      id: 4,
      title: 'NEET Biology Mock Tests',
      category: 'NEET',
      totalTests: 15,
      attempted: 15,
      price: 1499,
      validity: '6 Months',
      image: '🧪',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      features: ['Botany + Zoology', 'Diagram Based', 'High Weightage Topics', 'Quick Solutions'],
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Class 10 Board 2025 Tests',
      category: 'Class 9-10',
      totalTests: 10,
      attempted: 5,
      price: 999,
      validity: '6 Months',
      image: '📚',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['All Subjects', 'Sample Papers', 'CBSE Pattern', 'Marking Scheme'],
      status: 'In Progress'
    },
    {
      id: 6,
      title: 'Class 9 Foundation Tests',
      category: 'Class 9-10',
      totalTests: 8,
      attempted: 0,
      price: 799,
      validity: '6 Months',
      image: '🎓',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Math & Science', 'Olympiad Prep', 'Chapter Tests', 'Concepts Clear'],
      status: 'Not Started'
    },
    {
      id: 7,
      title: 'Class 6-8 All Subjects Pack',
      category: 'Class 6-8',
      totalTests: 12,
      attempted: 12,
      price: 699,
      validity: '12 Months',
      image: '🔬',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      features: ['Fun Learning', 'Interactive Tests', 'Progress Reports', 'Parent Dashboard'],
      status: 'Completed'
    },
    {
      id: 8,
      title: 'Foundation Course Tests',
      category: 'Foundation',
      totalTests: 50,
      attempted: 20,
      price: 4999,
      validity: '24 Months',
      image: '🏆',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Complete Syllabus', 'Regular Updates', 'Expert Faculty', 'Doubt Support'],
      status: 'In Progress'
    }
  ];

  // Filter tests based on category
  const filteredTests = activeCategory === 'all' 
    ? testSeries 
    : testSeries.filter(test => test.category === activeCategory);

  // Categories
  const categories = ['all', 'JEE', 'NEET', 'Class 9-10', 'Class 6-8', 'Foundation'];

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted! We will contact you soon.');
    setShowForm(false);
    setFormData({
      studentName: '',
      fatherName: '',
      mobile: '',
      email: '',
      address: '',
      crashCourse: false,
      testSeries: false
    });
  };

  return (
    <div className="test-series-page">
      {/* Hero Section */}
      <section className="test-hero">
        <div className="test-hero-content">
          <span className="test-hero-tag">📋 Test Series</span>
          <h1>Test Your Knowledge</h1>
          <p>Practice with India's best test series and ace your exams</p>
          
          <div className="test-hero-stats">
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Mock Tests</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Improvement</span>
            </div>
          </div>
        </div>
      </section>


      {/* Registration Form Modal */}
      {showForm && (
        <div className="form-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="form-close" onClick={() => setShowForm(false)}>✕</button>
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student Name *</label>
                <input 
                  type="text" 
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Father's Name *</label>
                <input 
                  type="text" 
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  placeholder="Enter father's name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Interested In:</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="crashCourse"
                      checked={formData.crashCourse}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-custom"></span>
                    Crash Course
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="testSeries"
                      checked={formData.testSeries}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-custom"></span>
                    Test Series
                  </label>
                </div>
              </div>
              <button type="submit" className="form-submit-btn">Submit Registration</button>
            </form>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <section className="test-category-filter">
        <div className="test-filter-container">
          {categories.map(category => (
            <button
              key={category}
              className={`test-filter-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'All Tests' : category}
            </button>
          ))}
        </div>
      </section>

      {/* Test Content Wrapper with Sidebar */}
      <div className="test-content-wrapper">
        <main className="test-main">
          {/* Test Series Grid */}
      <section className="test-section">
        <div className="test-header">
          <h2>{activeCategory === 'all' ? 'All Test Series' : `${activeCategory} Test Series`}</h2>
          <div className="test-header-right">
            <span className="test-count">{filteredTests.length} test series available</span>
            <Link to="/blog" className="blog-link-btn">📰 Blog</Link>
          </div>
        </div>

        <div className="test-grid">
          {filteredTests.map((test, index) => (
            <div key={test.id} className="test-card" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Test Image */}
              <div className="test-image" style={{ background: test.color }}>
                <span className="test-icon">{test.image}</span>
                <div className="test-category-badge">{test.category}</div>
                {test.status === 'Completed' && <div className="completed-badge">✓ Completed</div>}
                {test.status === 'In Progress' && <div className="progress-badge">In Progress</div>}
              </div>

              {/* Test Content */}
              <div className="test-content">
                <h3 className="test-title">{test.title}</h3>
                
                {/* Progress Bar */}
                <div className="test-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{test.attempted}/{test.totalTests} Tests</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(test.attempted / test.totalTests) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Features */}
                <div className="test-features">
                  {test.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-tag">✓ {feature}</span>
                  ))}
                </div>

                {/* Price & Validity */}
                <div className="test-price-info">
                  <div className="price-section">
                    <span className="validity">Valid for {test.validity}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="test-actions">
                  {test.attempted > 0 ? (
                    <Link to={`/test/${test.id}`} className="btn-continue">
                      Continue Test
                    </Link>
                  ) : (
                    <button className="btn-start">Start Test</button>
                  )}
                  <button className="btn-details">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="no-tests">
            <div className="no-tests-icon">📝</div>
            <h3>No tests available</h3>
            <p>Check back later for new tests</p>
          </div>
        )}
        </section>
        </main>

        {/* Test Sidebar */}
        <aside className="test-sidebar">
          <div className="sidebar-banner-card">
            <img src={blogBanner} alt="Blog Banner" className="sidebar-banner-image" />
          </div>
          
          <div className="sidebar-section-card">
            <h3>📚 Quick Links</h3>
            <Link to="/blog" className="sidebar-link">
              <span className="link-icon">📰</span>
              <div className="link-content">
                <span className="link-title">Blog</span>
                <span className="link-desc">Latest tips & updates</span>
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
            <Link to="/upcoming-batches" className="sidebar-link">
              <span className="link-icon">📅</span>
              <div className="link-content">
                <span className="link-title">Upcoming Batches</span>
                <span className="link-desc">Join new batches</span>
              </div>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </aside>
        </div>

      {/* Features Section */}
      <section className="test-features-section">
        <div className="features-content">
          <h2>Why Our Test Series?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analytics</h3>
              <p>Track your performance with AI-powered analysis</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Rank Predictor</h3>
              <p>Know your expected rank before the actual exam</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📹</div>
              <h3>Video Solutions</h3>
              <p>Learn from expert video explanations</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Revise Anytime</h3>
              <p>Access tests multiple times until you master</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestSeries;
