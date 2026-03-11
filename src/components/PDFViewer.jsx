import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPDFs } from '../utils/pdfStorage'
import './PDFViewer.css'

const PDFViewer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pdf, setPdf] = useState(null)
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(1.0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadPDF()
  }, [id])

  const loadPDF = () => {
    try {
      const pdfs = getPDFs()
      const foundPDF = pdfs.find(p => p.id === id)
      
      if (foundPDF) {
        setPdf(foundPDF)
      } else {
        // If not found by id, try to find by index
        const pdfIndex = parseInt(id) - 1
        if (pdfs[pdfIndex]) {
          setPdf(pdfs[pdfIndex])
        }
      }
    } catch (error) {
      console.error('Error loading PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleResetZoom = () => {
    setScale(1.0)
  }

  if (loading) {
    return (
      <div className="pdf-viewer-loading">
        <div className="loading-spinner"></div>
        <p>Loading PDF...</p>
      </div>
    )
  }

  if (!pdf) {
    return (
      <div className="pdf-viewer-not-found">
        <div className="not-found-icon">📄</div>
        <h2>PDF Not Found</h2>
        <p>The PDF you're looking for doesn't exist or has been removed.</p>
        <button className="btn-back-home" onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="pdf-viewer-container">
      {/* Header */}
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title">
          <button className="btn-back" onClick={handleGoBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <h1>{pdf.title}</h1>
        </div>
        
        {/* PDF Controls */}
        <div className="pdf-viewer-controls">
          <div className="zoom-controls">
            <button className="control-btn" onClick={handleZoomOut} title="Zoom Out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M8 11h6"/>
              </svg>
            </button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button className="control-btn" onClick={handleZoomIn} title="Zoom In">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </button>
            <button className="control-btn" onClick={handleResetZoom} title="Reset Zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="pdf-viewer-content">
        <div className="pdf-viewer-wrapper" style={{ transform: `scale(${scale})` }}>
          {pdf.pdfData ? (
            <iframe 
              src={pdf.pdfData}
              title={pdf.title}
              className="pdf-frame"
            />
          ) : pdf.fileUrl ? (
            <iframe 
              src={pdf.fileUrl}
              title={pdf.title}
              className="pdf-frame"
            />
          ) : (
            <div className="pdf-no-content">
              <p>No PDF content available</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {pdf.description && (
        <div className="pdf-viewer-footer">
          <p>{pdf.description}</p>
        </div>
      )}
    </div>
  )
}

export default PDFViewer
