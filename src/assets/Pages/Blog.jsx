import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import blogBanner from '../../ssssss.png';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Blog Data
  const blogs = [
    {
      id: 1,
      title: 'How to Prepare for JEE Main 2025',
      category: 'Exam Tips',
      author: 'D.V. Dwivedi',
      date: '15 Jan 2025',
      readTime: '5 min read',
      image: '📝',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      excerpt: 'Complete strategy to crack JEE Main with high percentile...',
      featured: true
    },
    {
      id: 2,
      title: 'NEET Biology: Key Topics to Cover',
      category: 'NEET',
      author: 'Priya Sharma',
      date: '14 Jan 2025',
      readTime: '4 min read',
      image: '🧬',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      excerpt: 'Biology carries maximum weightage in NEET. Here are the important chapters...',
      featured: false
    },
    {
      id: 3,
      title: 'Time Management Tips for Board Exams',
      category: 'Exam Tips',
      author: 'Saloni Kumari',
      date: '13 Jan 2025',
      readTime: '3 min read',
      image: '⏰',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      excerpt: 'Learn how to manage your time effectively during board exams...',
      featured: false
    },
    {
      id: 4,
      title: 'Foundation Course: Building Strong Base',
      category: 'Foundation',
      author: 'Amit Singh',
      date: '12 Jan 2025',
      readTime: '4 min read',
      image: '🏗️',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      excerpt: 'Why foundation courses are important for success in competitive exams...',
      featured: false
    },
    {
      id: 5,
      title: 'Physics Formulae You Must Remember',
      category: 'JEE',
      author: 'D.V. Dwivedi',
      date: '11 Jan 2025',
      readTime: '6 min read',
      image: '📐',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      excerpt: 'Important physics formulae for JEE Main and Advanced...',
      featured: false
    },
    {
      id: 6,
      title: 'Chemistry NCERT: Important Intext Questions',
      category: 'NEET',
      author: 'Priya Sharma',
      date: '10 Jan 2025',
      readTime: '5 min read',
      image: '⚗️',
      color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      excerpt: 'Must solve NCERT intext questions for Chemistry...',
      featured: false
    },
    {
      id: 7,
      title: 'How to Handle Exam Stress',
      category: 'Exam Tips',
      author: 'Saloni Kumari',
      date: '09 Jan 2025',
      readTime: '3 min read',
      image: '🧘',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      excerpt: 'Tips to stay calm and focused during exam preparation...',
      featured: false
    },
    {
      id: 8,
      title: 'Math Tricks for Quick Calculations',
      category: 'JEE',
      author: 'Amit Singh',
      date: '08 Jan 2025',
      readTime: '4 min read',
      image: '🧮',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      excerpt: 'Speed up your calculations with these amazing tricks...',
      featured: false
    }
  ];

  // Filter blogs based on category
  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  // Featured blog
  const featuredBlog = blogs.find(blog => blog.featured);

  // Categories
  const categories = ['all', 'Exam Tips', 'JEE', 'NEET', 'Foundation'];

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-hero-tag">📰 Blog</span>
          <h1>Latest Updates & Tips</h1>
          <p>Stay informed with the latest exam news and preparation tips</p>
          
          <div className="blog-hero-stats">
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Articles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Readers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">Daily</span>
              <span className="stat-label">Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Banner */}
      {featuredBlog && (
        <section className="featured-blog">
          <div className="featured-banner">
            <div className="featured-image" style={{ background: featuredBlog.color }}>
              <span className="featured-icon">{featuredBlog.image}</span>
            </div>
            <div className="featured-content">
              <span className="featured-tag">⭐ Featured</span>
              <h2>{featuredBlog.title}</h2>
              <p>{featuredBlog.excerpt}</p>
              <div className="featured-meta">
                <span>👤 {featuredBlog.author}</span>
                <span>📅 {featuredBlog.date}</span>
                <span>⏱️ {featuredBlog.readTime}</span>
              </div>
              <button className="read-more-btn">Read Article →</button>
            </div>
          </div>
        </section>
      )}

      {/* Sidebar with Blog Image */}
      <div className="blog-content-wrapper">
        <main className="blog-main">
          {/* Category Filter */}
          <section className="blog-category-filter">
            <div className="blog-filter-container">
              {categories.map(category => (
                <button
                  key={category}
                  className={`blog-filter-tab ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          </section>

          {/* Blog Grid */}
          <section className="blog-section">
            <div className="blog-header">
              <h2>{activeCategory === 'all' ? 'Latest Articles' : `${activeCategory} Articles`}</h2>
              <span className="blog-count">{filteredBlogs.length} articles</span>
            </div>

            <div className="blog-grid">
              {filteredBlogs.filter(b => !b.featured).map((blog, index) => (
                <div key={blog.id} className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Blog Image */}
                  <div className="blog-image" style={{ background: blog.color }}>
                    <span className="blog-icon">{blog.image}</span>
                    <div className="blog-category-badge">{blog.category}</div>
                  </div>

                  {/* Blog Content */}
                  <div className="blog-card-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    
                    {/* Blog Meta */}
                    <div className="blog-meta">
                      <span className="blog-author">👤 {blog.author}</span>
                      <span className="blog-date">📅 {blog.date}</span>
                    </div>
                    
                    <button className="blog-read-btn">Read More →</button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.filter(b => !b.featured).length === 0 && (
              <div className="no-blogs">
                <div className="no-blogs-icon">📰</div>
                <h3>No articles found</h3>
                <p>Check back later for new content</p>
              </div>
            )}
          </section>
        </main>

        {/* Blog Sidebar */}
        <aside className="blog-sidebar">
          <div className="sidebar-banner-card">
            <img src={blogBanner} alt="Blog Banner" className="sidebar-banner-image" />
          </div>
          
          <div className="sidebar-section-card">
            <h3>📚 Popular Categories</h3>
            <div className="category-list">
              {categories.slice(1).map((category, idx) => (
                <button 
                  key={category} 
                  className={`category-tag ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="sidebar-section-card newsletter-card">
            <h3>📧 Subscribe to Newsletter</h3>
            <p>Get latest updates directly in your inbox</p>
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </aside>
      </div>

      {/* Features Section */}
      <section className="blog-features-section">
        <div className="features-content">
          <h2>Why Read Our Blog?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Expert Guidance</h3>
              <p>Learn from experienced teachers and mentors</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Exam Strategies</h3>
              <p>Get proven tips to crack any exam</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Regular Updates</h3>
              <p>Stay updated with latest exam patterns</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <h3>Study Tips</h3>
              <p>Improve your productivity and performance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
