import React, { useState, useRef } from 'react'
import './PDFUploadModal.css'
import { addPDF, fileToBase64, checkPDFSize } from '../utils/pdfStorage'

const PDFUploadModal = ({ isOpen, onClose, onPDFUploaded }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (file) => {
    if (!file) return

    // Check file type
    if (file.type !== 'application/pdf') {
      setError('Please select a valid PDF file')
      return
    }

    // Check file size
    const sizeCheck = checkPDFSize(file)
    if (!sizeCheck.valid) {
      setError(sizeCheck.message)
      return
    }

    setError('')
    setSelectedFile(file)
    
    // Create preview URL for PDF
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError('Please select a PDF file')
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
        setUploadProgress(prev => Math.min(prev + 20, 90))
      }, 200)

      // Convert PDF to base64
      const pdfData = await fileToBase64(selectedFile)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Save PDF data to localStorage
      const newPDF = addPDF({
        title: title.trim(),
        description: description.trim(),
        pdfData: pdfData,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      })

      if (newPDF) {
        setSuccess(true)
        setTimeout(() => {
          handleClose()
          if (onPDFUploaded) onPDFUploaded(newPDF)
        }, 1500)
      } else {
        setError('Failed to save PDF. Storage may be full.')
      }
    } catch (err) {
      console.error('Error uploading PDF:', err)
      setError('Error uploading PDF. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setSelectedFile(null)
    setPreviewUrl(null)
    setIsDragging(false)
    setIsUploading(false)
    setUploadProgress(0)
    setError('')
    setSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB'
    }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-icon">📄</div>
          <h2>Upload PDF</h2>
          <p>Share study materials with your students</p>
        </div>

        {success ? (
          <div className="upload-success">
            <div className="success-icon">✅</div>
            <h3>PDF Uploaded Successfully!</h3>
            <p>Your PDF is ready to share</p>
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
                accept="application/pdf"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="file-input"
              />

              {selectedFile ? (
                <div className="file-preview">
                  <div className="preview-placeholder">📄</div>
                  <div className="preview-info">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">
                      {formatFileSize(selectedFile.size)}
                    </span>
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
                  <h3>Drag & Drop PDF</h3>
                  <p>or click to browse</p>
                  <span className="supported-formats">PDF (Max 20MB)</span>
                </div>
              )}
            </div>

            {/* PDF metadata */}
            <div className="form-group">
              <label htmlFor="title">PDF Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter PDF title"
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
                placeholder="Describe your PDF (optional)"
                rows={3}
                maxLength={500}
              />
              <span className="char-count">{description.length}/500</span>
            </div>

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
                {isUploading ? 'Uploading...' : 'Upload PDF'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default PDFUploadModal
