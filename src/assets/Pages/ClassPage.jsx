import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ClassPage.css';

const ClassPage = () => {
  const { classNum } = useParams();
  const classNumber = parseInt(classNum) || 3;

  // Subject data based on class level
  const getSubjectsForClass = (num) => {
    if (num === 4) {
      // Class 4 with real educational YouTube videos
      return [
        {
          name: 'Mathematics',
          icon: '📐',
          description: 'Learn math concepts including multiplication, division, fractions, and geometry',
          videos: [
            { 
              title: 'Class 4 Maths - Multiplication', 
              videoId: 'h_qQAhhhW3E',
              embedUrl: 'https://www.youtube.com/embed/h_qQAhhhW3E'
            },
            { 
              title: 'Class 4 Maths - Division', 
              videoId: 'KXX7upt1C64',
              embedUrl: 'https://www.youtube.com/embed/KXX7upt1C64'
            },
            { 
              title: 'Class 4 Maths - Fractions', 
              videoId: 'K6fH2w2ojq8',
              embedUrl: 'https://www.youtube.com/embed/K6fH2w2ojq8'
            }
          ]
        },
        {
          name: 'Science',
          icon: '🔬',
          description: 'Explore plants, animals, water cycle, and weather concepts',
          videos: [
            { 
              title: 'Class 4 Science - Plants', 
              videoId: 'B5XNIvRz6M8',
              embedUrl: 'https://www.youtube.com/embed/B5XNIvRz6M8'
            },
            { 
              title: 'Class 4 Science - Animals', 
              videoId: '7H2lqA3t7j8',
              embedUrl: 'https://www.youtube.com/embed/7H2lqA3t7j8'
            },
            { 
              title: 'Class 4 Science - Water Cycle', 
              videoId: '8a6mLd7t5k0',
              embedUrl: 'https://www.youtube.com/embed/8a6mLd7t5k0'
            }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          description: 'Improve grammar, vocabulary, reading, and writing skills',
          videos: [
            { 
              title: 'English Grammar - Tenses', 
              videoId: 'v5MXM8QDkOE',
              embedUrl: 'https://www.youtube.com/embed/v5MXM8QDkOE'
            },
            { 
              title: 'English - Common Nouns', 
              videoId: 'bQBF5VF0Kk4',
              embedUrl: 'https://www.youtube.com/embed/bQBF5VF0Kk4'
            },
            { 
              title: 'English - Composition Writing', 
              videoId: '9W7bCuZx0h0',
              embedUrl: 'https://www.youtube.com/embed/9W7bCuZx0h0'
            }
          ]
        },
        {
          name: 'Social Studies',
          icon: '🌍',
          description: 'Learn about history, geography, and civics of India',
          videos: [
            { 
              title: 'Our Great India', 
              videoId: 'L1L0nB7K7lM',
              embedUrl: 'https://www.youtube.com/embed/L1L0nB7K7lM'
            },
            { 
              title: 'Indian Mountains & Rivers', 
              videoId: 'h2vJGg1Z4qk',
              embedUrl: 'https://www.youtube.com/embed/h2vJGg1Z4qk'
            },
            { 
              title: 'Historical Buildings of India', 
              videoId: '8dLxA6i9tY0',
              embedUrl: 'https://www.youtube.com/embed/8dLxA6i9tY0'
            }
          ]
        },
        {
          name: 'Hindi',
          icon: '🇮🇳',
          description: 'Learn Hindi vowels, consonants, grammar, and stories',
          videos: [
            { 
              title: 'Hindi Swar (Vowels)', 
              videoId: '3u6U7cNK6t4',
              embedUrl: 'https://www.youtube.com/embed/3u6U7cNK6t4'
            },
            { 
              title: 'Hindi Vyanjan (Consonants)', 
              videoId: 'vR24H4oY6xI',
              embedUrl: 'https://www.youtube.com/embed/vR24H4oY6xI'
            },
            { 
              title: 'Hindi Grammar - Sandhi', 
              videoId: '6c9aB6s6pQ8',
              embedUrl: 'https://www.youtube.com/embed/6c9aB6s6pQ8'
            }
          ]
        },
        {
          name: 'Computer',
          icon: '💻',
          description: 'Learn about computers, parts, and basic operations',
          videos: [
            { 
              title: 'Introduction to Computers', 
              videoId: '2maNZ7h44w',
              embedUrl: 'https://www.youtube.com/embed/2maNZ7h4m4w'
            },
            { 
              title: 'Parts of a Computer', 
              videoId: 'ORuK2C7C6nE',
              embedUrl: 'https://www.youtube.com/embed/ORuK2C7C6nE'
            },
            { 
              title: 'Typing Practice for Kids', 
              videoId: '9Cg7d6v5t9w',
              embedUrl: 'https://www.youtube.com/embed/9Cg7d6v5t9w'
            }
          ]
        }
      ];
    } else if (num <= 5) {
      return [
        {
          name: 'Mathematics',
          icon: '📐',
          description: `Advanced math concepts for Class ${num}`,
          videos: [
            { title: `${num}.1 - Introduction`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: `${num}.2 - Core Concepts`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: `${num}.3 - Practice Session`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Science',
          icon: '🔬',
          description: `Explore science topics for Class ${num}`,
          videos: [
            { title: 'Chapter 1 - Overview', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Chapter 2 - Deep Dive', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Chapter 3 - Experiments', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          description: `English literature and grammar for Class ${num}`,
          videos: [
            { title: 'Grammar Basics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Literature Analysis', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Writing Skills', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Social Studies',
          icon: '🌍',
          description: `History, geography and civics for Class ${num}`,
          videos: [
            { title: 'Historical Events', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Geography Concepts', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Civics and Governance', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Hindi',
          icon: '🇮🇳',
          description: `Hindi language and literature for Class ${num}`,
          videos: [
            { title: 'Hindi Grammar', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Prose & Poetry', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Writing Practice', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Computer',
          icon: '💻',
          description: `Digital skills and coding for Class ${num}`,
          videos: [
            { title: 'Computer Fundamentals', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Programming Basics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Practical Applications', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        }
      ];
    } else {
      // For classes 6-12 (more advanced subjects)
      return [
        {
          name: 'Mathematics',
          icon: '📐',
          description: `Advanced mathematics for Class ${num}`,
          videos: [
            { title: `Class ${num} Math - Part 1`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: `Class ${num} Math - Part 2`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: `Class ${num} Math - Part 3`, videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Physics',
          icon: '⚛️',
          description: `Physics concepts for Class ${num}`,
          videos: [
            { title: 'Mechanics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Thermodynamics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Electronics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Chemistry',
          icon: '🧪',
          description: `Chemistry fundamentals for Class ${num}`,
          videos: [
            { title: 'Organic Chemistry', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Inorganic Chemistry', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Physical Chemistry', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Biology',
          icon: '🧬',
          description: `Biology and life sciences for Class ${num}`,
          videos: [
            { title: 'Cell Biology', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Genetics', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Ecology', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'English',
          icon: '📚',
          description: `English literature for Class ${num}`,
          videos: [
            { title: 'Prose Analysis', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Poetry Interpretation', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Writing Mastery', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        },
        {
          name: 'Computer Science',
          icon: '💻',
          description: `Programming and IT for Class ${num}`,
          videos: [
            { title: 'Programming Fundamentals', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Data Structures', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Algorithms', videoId: 'dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
          ]
        }
      ];
    }
  };

  const subjects = getSubjectsForClass(classNumber);

  return (
    <div className="classpage-page">
      <section className="classpage-hero">
        <Link to="/courses" className="back-btn">← Back to Classes</Link>
        <h1>Class {classNumber} - Subjects</h1>
        <p>Choose a subject and watch educational videos with YouTube</p>
      </section>

      <section className="subjects-section">
        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-card">
              <div className="subject-header">
                <span className="subject-icon">{subject.icon}</span>
                <h2>{subject.name}</h2>
              </div>
              <p className="subject-description">{subject.description}</p>
              
              <div className="videos-section">
                <h3>📺 Video Lessons</h3>
                {subject.videos.map((video, vidIndex) => (
                  <div key={vidIndex} className="video-container">
                    <div className="video-title">
                      <span className="play-icon">▶️</span>
                      {video.title}
                    </div>
                    <div className="video-wrapper">
                      <iframe
                        width="100%"
                        height="200"
                        src={video.embedUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="youtube-embed"
                      ></iframe>
                    </div>
                    <div className="video-actions">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-link"
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Watch on YouTube
                      </a>
                      <button className="like-btn" title="Like this video">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        Like
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClassPage;

