import React, { useState, useRef } from 'react'
import './VideoUploadModal.css'
import { 
  addVideo, 
  generateThumbnail, 
  fileToBase64, 
  checkVideoSize,
  formatDuration 
} from '../utils/videoStorage'

const VideoUploadModal = ({ isOpen, onClose, onVideoUploaded }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (file) => {
    if (!file) return

    // Check file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file')
      return
    }

    // Check file size
    const sizeCheck = checkVideoSize(file)
    if (!sizeCheck.valid) {
      setError(sizeCheck.message)
      return
    }

    setError('')
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))

    try {
      // Generate thumbnail
      const thumb = await generateThumbnail(file)
      setThumbnail(thumb)
    } catch (err) {
      console.error('Error generating thumbnail:', err)
      // Use default thumbnail
      setThumbnail(null)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    await handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleVideoLoaded = (e) => {
    setDuration(e.target.duration)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError('Please select a video file')
      return
    }

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError('')

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      // Convert video to base64
      const videoData = await fileToBase64(selectedFile)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Save video data to localStorage
      const newVideo = addVideo({
        title: title.trim(),
        description: description.trim(),
        videoData: videoData,
        thumbnail: thumbnail,
        duration: duration,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      })

      if (newVideo) {
        setSuccess(true)
        setTimeout(() => {
          handleClose()
          if (onVideoUploaded) onVideoUploaded(newVideo)
        }, 1500)
      } else {
        setError('Failed to save video. Storage may be full.')
      }
    } catch (err) {
      console.error('Error uploading video:', err)
      setError('Error uploading video. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setSelectedFile(null)
    setPreviewUrl(null)
    setThumbnail(null)
    setDuration(0)
    setIsDragging(false)
    setIsUploading(false)
    setUploadProgress(0)
    setError('')
    setSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-icon">📹</div>
          <h2>Upload Video</h2>
          <p>Share your knowledge with others</p>
        </div>

        {success ? (
          <div className="upload-success">
            <div className="success-icon">✅</div>
            <h3>Video Uploaded Successfully!</h3>
            <p>Your video is ready to share</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="upload-form">
            {/* Drop Zone */}
            <div 
              className={`drop-zone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="file-input"
              />

              {selectedFile ? (
                <div className="file-preview">
                  {thumbnail ? (
                    <img src={thumbnail} alt="Thumbnail" className="preview-thumbnail" />
                  ) : (
                    <div className="preview-placeholder">📹</div>
                  )}
                  <div className="preview-info">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    {duration > 0 && (
                      <span className="file-duration">{formatDuration(duration)}</span>
                    )}
                  </div>
                  <button 
                    type="button" 
                    className="change-file-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="drop-content">
                  <div className="drop-icon">☁️</div>
                  <h3>Drag & Drop Video</h3>
                  <p>or click to browse</p>
                  <span className="supported-formats">MP4, WebM, Ogg (Max 50MB)</span>
                </div>
              )}
            </div>

            {/* Video metadata */}
            <div className="form-group">
              <label htmlFor="title">Video Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                maxLength={100}
              />
              <span className="char-count">{title.length}/100</span>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your video (optional)"
                rows={3}
                maxLength={500}
              />
              <span className="char-count">{description.length}/500</span>
            </div>

            {/* Hidden video element for duration detection */}
            {previewUrl && (
              <video 
                src={previewUrl} 
                className="hidden-video"
                onLoadedMetadata={handleVideoLoaded}
                onEnded={() => URL.revokeObjectURL(previewUrl)}
              />
            )}

            {/* Error message */}
            {error && (
              <div className="error-message">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Upload progress */}
            {isUploading && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="progress-text">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={handleClose}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-upload"
                disabled={!selectedFile || !title.trim() || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default VideoUploadModal
