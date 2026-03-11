import React, { useState, useEffect } from 'react'
import './VideoGallery.css'
import { getVideos, deleteVideo, formatDuration } from '../utils/videoStorage'

const VideoGallery = ({ videos: propVideos, onVideoSelect, onVideoDelete, showUploadButton, onUploadClick }) => {
  const [videos, setVideos] = useState([])
  const [hoveredVideo, setHoveredVideo] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use propVideos if provided, otherwise fetch from API
    if (propVideos) {
      setVideos(propVideos)
      setLoading(false)
    } else {
      loadVideos()
    }
  }, [propVideos])

  const loadVideos = () => {
    setLoading(true)
    try {
      const fetchedVideos = getVideos()
      setVideos(fetchedVideos)
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (videoId) => {
    setDeleteConfirm(videoId)
  }

  const confirmDelete = (videoId) => {
    setIsAnimating(true)
    const success = deleteVideo(videoId)
    
    if (success) {
      setTimeout(() => {
        const updatedVideos = videos.filter(v => (v._id || v.id) !== videoId)
        setVideos(updatedVideos)
        setDeleteConfirm(null)
        setIsAnimating(false)
        
        if (onVideoDelete) onVideoDelete(videoId)
      }, 300)
    } else {
      setIsAnimating(false)
      setDeleteConfirm(null)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A'
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB'
    }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) {
    return (
      <div className="video-gallery-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading videos...</p>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="video-gallery-empty">
        <div className="empty-icon">📹</div>
        <h3>No Videos Yet</h3>
        <p>Upload your first video to get started</p>
        {showUploadButton && (
          <button className="btn-empty-upload" onClick={onUploadClick}>
            <span>📤</span> Upload Video
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`video-gallery ${isAnimating ? 'animating' : ''}`}>
      {showUploadButton && (
        <div className="gallery-header">
          <h2>My Videos</h2>
          <button className="btn-add-video" onClick={onUploadClick}>
            <span>+</span> Upload New
          </button>
        </div>
      )}

      <div className="videos-grid">
        {videos.map((video, index) => (
          <div 
            key={video._id || video.id}
            className={`video-card ${deleteConfirm === (video._id || video.id) ? 'deleting' : ''}`}
            onMouseEnter={() => setHoveredVideo(video._id || video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onVideoSelect && onVideoSelect(video)}
          >
            {/* Thumbnail */}
            <div className="video-thumbnail">
              {video.thumbnail ? (
                <img src={video.thumbnail} alt={video.title} />
              ) : (
                <div className="thumbnail-placeholder">
                  <span>🎬</span>
                </div>
              )}
              
              {/* Duration badge */}
              {video.duration > 0 && (
                <span className="duration-badge">
                  {formatDuration(video.duration)}
                </span>
              )}

              {/* Play overlay on hover */}
              <div className="play-overlay">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              {video.description && (
                <p className="video-description">{video.description}</p>
              )}
              
              <div className="video-meta">
                <span className="video-date">
                  📅 {formatDate(video.createdAt)}
                </span>
                {video.fileSize && (
                  <span className="video-size">
                    📦 {formatFileSize(video.fileSize)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className={`video-actions ${hoveredVideo === (video._id || video.id) ? 'visible' : ''}`}>
                {onVideoSelect && (
                  <button 
                    className="btn-action btn-watch"
                    title="Watch Video"
                    onClick={(e) => {
                      e.stopPropagation()
                      onVideoSelect(video)
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Watch
                  </button>
                )}
                <button 
                  className="btn-action btn-delete"
                  title="Delete Video"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(video._id || video.id)
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* Delete confirmation */}
            {deleteConfirm === (video._id || video.id) && (
              <div className="delete-confirm-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="delete-confirm-box">
                  <span className="confirm-icon">🗑️</span>
                  <h4>Delete Video?</h4>
                  <p>"{video.title}" will be permanently removed.</p>
                  <div className="confirm-actions">
                    <button className="btn-cancel-delete" onClick={cancelDelete}>
                      Cancel
                    </button>
                    <button 
                      className="btn-confirm-delete" 
                      onClick={() => confirmDelete(video._id || video.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Videos count */}
      <div className="gallery-footer">
        <span className="video-count">
          {videos.length} video{videos.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default VideoGallery

