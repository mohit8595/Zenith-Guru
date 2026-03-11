import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getVideos } from '../../utils/videoStorage'
import './Videos.css'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = () => {
    try {
      const storedVideos = getVideos()
      setVideos(storedVideos)
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (video) => {
    // Navigate to video player page
    navigate(`/video/${video.id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="videos-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading Videos...</p>
      </div>
    )
  }

  return (
    <div className="videos-page">
      <div className="videos-page-header">
        <h1>🎥 Video Lectures</h1>
        <p>Click on any video to watch it</p>
      </div>

      {videos.length === 0 ? (
        <div className="videos-page-empty">
          <div className="empty-icon">🎬</div>
          <h3>No Videos Available</h3>
          <p>No video lectures have been uploaded yet.</p>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              className="video-card"
              onClick={() => handleVideoClick(video)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="video-thumbnail">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} />
                ) : (
                  <div className="thumbnail-placeholder">
                    <span>🎬</span>
                  </div>
                )}
                {video.duration && (
                  <span className="video-duration">{formatDuration(video.duration)}</span>
                )}
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {video.description && (
                  <p className="video-description">{video.description}</p>
                )}
                <div className="video-meta">
                  <span className="video-date">
                    📅 {formatDate(video.createdAt)}
                  </span>
                  {video.views && (
                    <span className="video-views">
                      👁️ {video.views} views
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="videos-count">
        {videos.length} Video{videos.length !== 1 ? 's' : ''} available
      </div>
    </div>
  )
}

export default Videos

