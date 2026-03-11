import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getVideos, formatDuration } from '../utils/videoStorage'
import './VideoPlayerPage.css'

const VideoPlayerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  const videoRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    loadVideo()
  }, [id])

  const loadVideo = () => {
    try {
      const videos = getVideos()
      const foundVideo = videos.find(v => v.id === id)
      
      if (foundVideo) {
        setVideo(foundVideo)
      } else {
        // Try by index
        const videoIndex = parseInt(id) - 1
        if (videos[videoIndex]) {
          setVideo(videos[videoIndex])
        }
      }
    } catch (error) {
      console.error('Error loading video:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (videoRef.current && video) {
      videoRef.current.src = video.videoData
      videoRef.current.load()
    }
  }, [video])

  useEffect(() => {
    const hideControls = () => {
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    hideControls()

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const progress = e.target.value
    if (videoRef.current) {
      videoRef.current.currentTime = (progress / 100) * duration
      setCurrentTime((progress / 100) * duration)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = vol
      setVolume(vol)
      setIsMuted(vol === 0)
    }
  }

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const formatTime = (seconds) => {
    return formatDuration(seconds)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div className="video-player-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading Video...</p>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="video-player-page-not-found">
        <div className="not-found-icon">🎬</div>
        <h2>Video Not Found</h2>
        <p>The video you're looking for doesn't exist or has been removed.</p>
        <button className="btn-back-home" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="video-player-page">
      {/* Header */}
      <div className="video-player-page-header">
        <button className="btn-back" onClick={handleGoBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1>{video.title}</h1>
      </div>

      {/* Video Container */}
      <div className="video-player-page-container" onMouseMove={handleMouseMove}>
        <video
          ref={videoRef}
          className="video-player-page-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play/Pause Center Button */}
        {!isPlaying && (
          <button 
            className="player-center-play"
            onClick={togglePlay}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        )}

        {/* Controls */}
        <div className={`player-controls ${showControls ? 'visible' : ''}`}>
          {/* Progress Bar */}
          <div className="player-progress-container">
            <input
              type="range"
              className="player-progress"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
            />
          </div>

          {/* Control Buttons */}
          <div className="player-buttons">
            <div className="player-buttons-left">
              <button className="player-btn" onClick={togglePlay}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <button className="player-btn" onClick={() => skip(-10)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                </svg>
                <span className="skip-text">10</span>
              </button>

              <button className="player-btn" onClick={() => skip(10)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 17l5-5-5-5M13 17l5-5-5-5"/>
                </svg>
                <span className="skip-text">10</span>
              </button>

              <div className="player-volume">
                <button className="player-btn" onClick={toggleMute}>
                  {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                />
              </div>

              <span className="player-time">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="video-player-page-info">
        <h2>{video.title}</h2>
        {video.description && (
          <p>{video.description}</p>
        )}
      </div>
    </div>
  )
}

export default VideoPlayerPage

