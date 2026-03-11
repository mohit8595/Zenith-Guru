import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const statsRef = useRef(null);

  // Course categories with counts
  const categories = [
    { name: 'All', count: 18 },
    { name: 'JEE', count: 3 },
    { name: 'NEET', count: 3 },
    { name: 'Foundation', count: 2 },
    { name: 'Class 11-12', count: 4 },
    { name: 'Class 9-10', count: 2 },
    { name: 'Class 6-8', count: 3 },
    { name: 'Class 1-5', count: 2 },
    { name: 'Pre-School', count: 2 }
  ];

  // Professional course data - Enhanced
  const courses = [
    {
      id: 1,
      title: 'JEE 2025 Complete Batch',
      category: 'JEE',
      class: '11-12',
      teacher: 'D.V. Dwivedi',
      teacherAvatar: '👨‍🏫',
      image: '📐',
      originalPrice: 15000,
      discountedPrice: 8999,
      discount: '40%',
      startDate: 'Starting 15 Jan 2025',
      features: ['Live Classes', 'DPP', 'Notes', 'Tests'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: false,
      rating: 4.9,
      students: 12500,
      bestseller: true,
      new: false
    },
    {
      id: 2,
      title: 'NEET 2025 Biology Mastery',
      category: 'NEET',
      class: '11-12',
      teacher: 'Priya Sharma',
      teacherAvatar: '👩‍🔬',
      image: '🧬',
      originalPrice: 12000,
      discountedPrice: 6999,
      discount: '42%',
      startDate: 'Starting 20 Jan 2025',
      features: ['Live Classes', 'NCERT', 'DPP', 'Mock Tests'],
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: false,
      rating: 4.8,
      students: 9800,
      bestseller: true,
      new: false
    },
    {
      id: 3,
      title: 'Class 10 Board Complete',
      category: 'Class 9-10',
      class: '10',
      teacher: 'Saloni Kumari',
      teacherAvatar: '👩‍🏫',
      image: '📚',
      originalPrice: 8000,
      discountedPrice: 4999,
      discount: '38%',
      startDate: 'Starting 10 Jan 2025',
      features: ['All Subjects', 'Sample Papers', 'Doubt Sessions'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      link: 'https://www.youtube.com/playlist?list=PLp5LSWlPV-OaMGsLKOgwR3y6vBHDhjqYv',
      isFree: false,
      rating: 4.7,
      students: 8500,
      bestseller: false,
      new: true
    },
    {
      id: 4,
      title: 'Class 9 Foundation Batch',
      category: 'Class 9-10',
      class: '9',
      teacher: 'Amit Singh',
      teacherAvatar: '👨‍💼',
      image: '🎯',
      originalPrice: 7000,
      discountedPrice: 4499,
      discount: '36%',
      startDate: 'Starting 12 Jan 2025',
      features: ['Math & Science', 'Worksheets', 'Tests'],
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      link: 'https://www.youtube.com/playlist?list=PLp5LSWlPV-OZNigNiDxjqe_Qh0OGDeVVV',
      isFree: false,
      rating: 4.6,
      students: 6200,
      bestseller: false,
      new: true
    },
    {
      id: 5,
      title: 'Foundation 6-8 Master Course',
      category: 'Class 6-8',
      class: '6-8',
      teacher: 'D.V. Dwivedi',
      teacherAvatar: '👨‍🏫',
      image: '🔬',
      originalPrice: 6000,
      discountedPrice: 3999,
      discount: '33%',
      startDate: 'Starting 15 Jan 2025',
      features: ['All Subjects', 'Activity Based', 'Tests'],
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      link: 'https://www.youtube.com/playlist?list=PLqFLT7iOGSVuQKAsrIcWASH7UcqvC5a-D',
      isFree: false,
      rating: 4.8,
      students: 7800,
      bestseller: true,
      new: false
    },
    {
      id: 6,
      title: 'Class 7 Complete Package',
      category: 'Class 6-8',
      class: '7',
      teacher: 'Saloni Kumari',
      teacherAvatar: '👩‍🏫',
      image: '⚡',
      originalPrice: 5500,
      discountedPrice: 3499,
      discount: '36%',
      startDate: 'Starting 18 Jan 2025',
      features: ['Math & Science', 'Worksheets', 'Doubt Classes'],
      color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      link: 'https://www.youtube.com/playlist?list=PLqFLT7iOGSVtyJxXHGyuqwnH1r9pLeTyn',
      isFree: false,
      rating: 4.7,
      students: 5400,
      bestseller: false,
      new: false
    },
    {
      id: 7,
      title: 'Primary 1-5 All Subjects',
      category: 'Class 1-5',
      class: '1-5',
      teacher: 'Priya Sharma',
      teacherAvatar: '👩‍🏫',
      image: '📖',
      originalPrice: 5000,
      discountedPrice: 2999,
      discount: '40%',
      startDate: 'Starting 20 Jan 2025',
      features: ['All Subjects', 'Fun Learning', 'Activities'],
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      link: 'https://www.youtube.com/playlist?list=PLbHPr2Sq4vpb5Sb9YcVtoMLDA1hAN8rWP',
      isFree: false,
      rating: 4.9,
      students: 11200,
      bestseller: true,
      new: false
    },
    {
      id: 8,
      title: 'Nursery Play & Learn',
      category: 'Pre-School',
      class: 'Nursery',
      teacher: 'Amit Singh',
      teacherAvatar: '👨‍🎨',
      image: '🧸',
      originalPrice: 3000,
      discountedPrice: 1999,
      discount: '33%',
      startDate: 'Starting 25 Jan 2025',
      features: ['Rhymes', 'Games', 'Activities', 'Art'],
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      link: 'https://www.youtube.com/playlist?list=PLsWGIildqfyRwDU6ls_zgk6GF2uy2GVRM',
      isFree: false,
      rating: 4.8,
      students: 6800,
      bestseller: false,
      new: false
    },
    {
      id: 9,
      title: 'JEE Advanced 2025',
      category: 'JEE',
      class: '12',
      teacher: 'D.V. Dwivedi',
      teacherAvatar: '👨‍🏫',
      image: '🎓',
      originalPrice: 18000,
      discountedPrice: 10999,
      discount: '39%',
      startDate: 'Starting 1 Feb 2025',
      features: ['Advanced Problems', 'PYQs', 'Mock Tests', 'DPP'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: false,
      rating: 4.9,
      students: 8900,
      bestseller: true,
      new: true
    },
    {
      id: 10,
      title: 'NEET Physics Complete',
      category: 'NEET',
      class: '11-12',
      teacher: 'Saloni Kumari',
      teacherAvatar: '👩‍🔬',
      image: '⚛️',
      originalPrice: 10000,
      discountedPrice: 5999,
      discount: '40%',
      startDate: 'Starting 15 Jan 2025',
      features: ['Concept Building', 'Numericals', 'NCERT'],
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: false,
      rating: 4.7,
      students: 7200,
      bestseller: false,
      new: false
    },
    {
      id: 11,
      title: 'Class 8 Board Prep',
      category: 'Class 6-8',
      class: '8',
      teacher: 'Amit Singh',
      teacherAvatar: '👨‍💼',
      image: '🏆',
      originalPrice: 6000,
      discountedPrice: 3799,
      discount: '37%',
      startDate: 'Starting 15 Jan 2025',
      features: ['All Subjects', 'Sample Papers', 'Revision'],
      color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      link: 'https://www.youtube.com/playlist?list=PLqFLT7iOGSVvy1h-lbPQDlWufh2vYIQKw',
      isFree: false,
      rating: 4.6,
      students: 4800,
      bestseller: false,
      new: false
    },
    {
      id: 12,
      title: 'UKG Learning Fun',
      category: 'Pre-School',
      class: 'UKG',
      teacher: 'Priya Sharma',
      teacherAvatar: '👩‍🎨',
      image: '🌟',
      originalPrice: 3500,
      discountedPrice: 2299,
      discount: '34%',
      startDate: 'Starting 25 Jan 2025',
      features: ['ABC & 123', 'Rhymes', 'Drawing', 'Games'],
      color: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      link: 'https://www.youtube.com/playlist?list=PLsWGIildqfySPleMNfKqEEyUSJJ9IfcMY',
      isFree: false,
      rating: 4.9,
      students: 9200,
      bestseller: true,
      new: false
    },
    // Free Courses
    {
      id: 13,
      title: 'JEE Basics Free Course',
      category: 'JEE',
      class: '11-12',
      teacher: 'D.V. Dwivedi',
      teacherAvatar: '👨‍🏫',
      image: '📐',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['Video Lectures', 'Basic Problems', 'Notes'],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: true,
      rating: 4.5,
      students: 25000,
      bestseller: false,
      new: false
    },
    {
      id: 14,
      title: 'NEET Biology Free Preview',
      category: 'NEET',
      class: '11-12',
      teacher: 'Priya Sharma',
      teacherAvatar: '👩‍🔬',
      image: '🧬',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['Cell Biology', 'Plant Kingdom', 'Animal Kingdom'],
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      link: 'https://www.youtube.com/playlist?list=PLFJjlLgbF19WZnvnZRc5sM1lYFhKWqNsf',
      isFree: true,
      rating: 4.6,
      students: 18000,
      bestseller: false,
      new: false
    },
    {
      id: 15,
      title: 'Class 10 Math Free Lectures',
      category: 'Class 9-10',
      class: '10',
      teacher: 'Saloni Kumari',
      teacherAvatar: '👩‍🏫',
      image: '📚',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['Algebra', 'Geometry', 'Trigonometry'],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      link: 'https://www.youtube.com/playlist?list=PLp5LSWlPV-OaMGsLKOgwR3y6vBHDhjqYv',
      isFree: true,
      rating: 4.7,
      students: 22000,
      bestseller: false,
      new: false
    },
    {
      id: 16,
      title: 'Science Experiments for Kids',
      category: 'Class 6-8',
      class: '6-8',
      teacher: 'Amit Singh',
      teacherAvatar: '👨‍💼',
      image: '🔬',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['Fun Experiments', 'Science Projects', 'Learning'],
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      link: 'https://www.youtube.com/playlist?list=PLqFLT7iOGSVuQKAsrIcWASH7UcqvC5a-D',
      isFree: true,
      rating: 4.8,
      students: 15000,
      bestseller: false,
      new: false
    },
    {
      id: 17,
      title: 'Phonics & Alphabet Learning',
      category: 'Class 1-5',
      class: '1-5',
      teacher: 'Priya Sharma',
      teacherAvatar: '👩‍🏫',
      image: '📖',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['ABC Song', 'Writing', 'Pronunciation'],
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      link: 'https://www.youtube.com/playlist?list=PLbHPr2Sq4vpb5Sb9YcVtoMLDA1hAN8rWP',
      isFree: true,
      rating: 4.9,
      students: 28000,
      bestseller: false,
      new: false
    },
    {
      id: 18,
      title: 'Nursery Rhymes Collection',
      category: 'Pre-School',
      class: 'Nursery',
      teacher: 'Amit Singh',
      teacherAvatar: '👨‍🎨',
      image: '🧸',
      originalPrice: 0,
      discountedPrice: 0,
      discount: '100%',
      startDate: 'Available Now',
      features: ['Popular Rhymes', 'Fun Songs', 'Dance'],
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      link: 'https://www.youtube.com/playlist?list=PLsWGIildqfyRwDU6ls_zgk6GF2uy2GVRM',
      isFree: true,
      rating: 4.8,
      students: 35000,
      bestseller: false,
      new: false
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: '👨‍🎓',
      course: 'JEE 2025 Complete Batch',
      rating: 5,
      text: 'This course completely transformed my JEE preparation. The live classes and DPPs are amazing!'
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: '👩‍🎓',
      course: 'NEET 2025 Biology Mastery',
      rating: 5,
      text: 'Best NEET preparation course ever! The teachers explain concepts so clearly.'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      avatar: '👨‍🎓',
      course: 'Class 10 Board Complete',
      rating: 5,
      text: 'Scored 95% in boards thanks to Zenith Guru. Highly recommended!'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How do I access the course materials?',
      answer: 'Once you enroll, you get immediate access to all course materials through our student dashboard. You can access video lectures, PDFs, and tests 24/7.'
    },
    {
      question: 'Are the classes live or recorded?',
      answer: 'We offer both live interactive classes and recorded sessions. All live classes are recorded and available for revision.'
    },
    {
      question: 'What is the refund policy?',
      answer: 'We offer a 7-day money-back guarantee if you are not satisfied with the course. No questions asked!'
    },
    {
      question: 'Do you provide study material?',
      answer: 'Yes! All courses include comprehensive study materials including PDF notes, practice sheets, and previous year question papers.'
    }
  ];

  // Featured courses (bestsellers)
  const featuredCourses = courses.filter(c => c.bestseller).slice(0, 3);

  // Auto-rotate featured courses
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCourses.length]);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const stats = [
      { key: 'students', target: 10000, suffix: '+' },
      { key: 'teachers', target: 50, suffix: '+' },
      { key: 'courses', target: 100, suffix: '+' },
      { key: 'results', target: 95, suffix: '%' }
    ];

    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ ...prev, [stat.key]: Math.floor(current) }));
      }, 30);
    });
  };

  // Filter and sort courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    const matchesPrice = priceFilter === 'all' || 
                         (priceFilter === 'paid' && !course.isFree) ||
                         (priceFilter === 'free' && course.isFree);
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.discountedPrice - b.discountedPrice;
    if (sortBy === 'price-high') return b.discountedPrice - a.discountedPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.new ? 1 : 0) - (a.new ? 1 : 0);
    return b.students - a.students; // popularity
  });

  return (
    <div className="courses-page">
      {/* Animated Hero Section */}
      <section className="courses-hero-enhanced">
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
        
        <div className="courses-hero-content">
          <span className="courses-tag">🎯 India's Best Learning Platform</span>
          <h1>Master Your Goals with Zenith Guru</h1>
          <p>Join 10,000+ students learning from India's top teachers</p>
          
          {/* Search Bar in Hero */}
          <div className="hero-search-container">
            <div className="hero-search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search for courses, teachers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          {/* Quick Category Pills */}
          <div className="category-pills">
            {categories.slice(0, 6).map(cat => (
              <button 
                key={cat.name}
                className={`category-pill ${selectedCategory === cat.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
                <span className="pill-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="hero-trust-badges">
            <div className="trust-badge-item">
              <span className="trust-badge-icon">⭐</span>
              <span className="trust-badge-text">4.9 Rating</span>
            </div>
            <div className="trust-badge-item">
              <span className="trust-badge-icon">👨‍🎓</span>
              <span className="trust-badge-text">10K+ Students</span>
            </div>
            <div className="trust-badge-item">
              <span className="trust-badge-icon">🏆</span>
              <span className="trust-badge-text">95% Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="featured-section">
        <div className="section-header">
          <span className="section-tag">🔥 Featured</span>
          <h2>Bestseller Courses</h2>
        </div>
        <div className="featured-carousel">
          {featuredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className={`featured-card ${index === featuredIndex ? 'active' : ''}`}
              style={{ background: course.color }}
            >
              <div className="featured-content">
                <div className="featured-badge">BESTSELLER</div>
                <h3>{course.title}</h3>
                <p className="featured-teacher">👨‍🏫 {course.teacher}</p>
                <div className="featured-stats">
                  <span>⭐ {course.rating}</span>
                  <span>👨‍🎓 {course.students.toLocaleString()} students</span>
                </div>
                <Link to={course.link} target="_blank" className="featured-btn">
                  Explore Course →
                </Link>
              </div>
              <div className="featured-icon-large">{course.image}</div>
            </div>
          ))}
          <div className="featured-indicators">
            {featuredCourses.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === featuredIndex ? 'active' : ''}`}
                onClick={() => setFeaturedIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div className="sticky-category-bar">
        <div className="category-tabs-container">
          {categories.map(cat => (
            <button 
              key={cat.name}
              className={`category-tab ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
              <span className="tab-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="courses-main-container">
        {/* Filters and Sort Bar */}
        <div className="filters-sort-bar">
          <div className="filters-left">
            <button 
              className="filter-toggle-btn"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span>⚙️</span> Filters
            </button>
            <span className="results-count">{filteredCourses.length} courses found</span>
          </div>
          
          <div className="filters-right">
            {/* View Toggle */}
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>

            {/* Sort Dropdown */}
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        {filterOpen && (
          <div className="mobile-filter-sheet">
            <div className="filter-sheet-header">
              <h3>Filters</h3>
              <button className="close-filter-sheet" onClick={() => setFilterOpen(false)}>✕</button>
            </div>
            <div className="filter-options">
              <div className="filter-group">
                <h4>Price</h4>
                <label className="filter-radio">
                  <input 
                    type="radio" 
                    value="all" 
                    checked={priceFilter === 'all'}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  />
                  All Courses
                </label>
                <label className="filter-radio">
                  <input 
                    type="radio" 
                    value="paid" 
                    checked={priceFilter === 'paid'}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  />
                  Paid Only
                </label>
                <label className="filter-radio">
                  <input 
                    type="radio" 
                    value="free" 
                    checked={priceFilter === 'free'}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  />
                  Free Only
                </label>
              </div>
            </div>
            <button 
              className="clear-filters-mobile"
              onClick={() => {
                setPriceFilter('all');
                setSelectedCategory('All');
                setSearchQuery('');
                setFilterOpen(false);
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Course Grid/List */}
        <div className={`courses-display ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className={`course-card-enhanced ${hoveredCard === course.id ? 'hovered' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Image Section */}
              <div className="card-image-section" style={{ background: course.color }}>
                <span className="card-icon-large">{course.image}</span>
                {course.bestseller && <div className="card-badge bestseller-badge">🔥 Bestseller</div>}
                {course.new && <div className="card-badge new-badge">✨ New</div>}
                {course.isFree && <div className="card-badge free-badge">FREE</div>}
                {!course.isFree && !course.bestseller && !course.new && (
                  <div className="card-badge discount-badge">{course.discount} OFF</div>
                )}
                
                {/* Quick Actions Overlay */}
                <div className="card-quick-actions">
                  <button className="quick-action-btn" title="Add to Wishlist">♡</button>
                  <button className="quick-action-btn" title="Quick View">👁</button>
                  <button className="quick-action-btn" title="Compare">⚖</button>
                </div>
              </div>

              {/* Card Content Section */}
              <div className="card-content-section">
                <div className="card-header">
                  <span className="card-category">{course.category}</span>
                  <div className="card-rating">
                    <span>⭐</span>
                    <span>{course.rating}</span>
                    <span className="rating-count">({course.students.toLocaleString()})</span>
                  </div>
                </div>

                <h3 className="card-title">{course.title}</h3>

                <div className="card-teacher">
                  <span className="teacher-avatar-small">{course.teacherAvatar}</span>
                  <span>{course.teacher}</span>
                </div>

                <div className="card-meta">
                  <span className="meta-item">📅 {course.startDate}</span>
                  <span className="meta-item">👨‍🎓 {course.students.toLocaleString()} enrolled</span>
                </div>

                <div className="card-features-compact">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="feature-pill">✓ {feature}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="card-actions">
                    <Link to={course.link} target="_blank" className="btn-explore-enhanced">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="no-results-enhanced">
            <div className="no-results-icon">🔍</div>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="clear-all-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceFilter('all');
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-decoration"></div>
        <div className="stats-grid-enhanced">
          <div className="stat-card">
            <div className="stat-icon-large">👨‍🎓</div>
            <div className="stat-content">
              <h3>{animatedStats.students || 0}+</h3>
              <p>Active Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-large">👨‍🏫</div>
            <div className="stat-content">
              <h3>{animatedStats.teachers || 0}+</h3>
              <p>Expert Teachers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-large">📚</div>
            <div className="stat-content">
              <h3>{animatedStats.courses || 0}+</h3>
              <p>Courses</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-large">🎯</div>
            <div className="stat-content">
              <h3>{animatedStats.results || 0}%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">💬 Student Reviews</span>
          <h2>What Our Students Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.course}</span>
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
      <section className="faq-section">
        <div className="section-header">
          <span className="section-tag">❓ FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <div className="cta-badge">🚀 Limited Time Offer</div>
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of students already learning on Zenith Guru</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-cta-primary">Get Free Demo</Link>
            <Link to="/courses" className="btn-cta-secondary">Browse All Courses</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
