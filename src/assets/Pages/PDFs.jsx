import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPDFs } from '../../utils/pdfStorage'
import './PDFs.css'

const PDFs = () => {
  const [pdfs, setPdfs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadPDFs()
  }, [])

  const loadPDFs = () => {
    try {
      const storedPdfs = getPDFs()
      setPdfs(storedPdfs)
    } catch (error) {
      console.error('Error loading PDFs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePDFClick = (pdf) => {
    // Navigate to PDF viewer
    navigate(`/pdf/${pdf.id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB'
    }
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) {
    return (
      <div className="pdfs-page-loading">
        <div className="loading-spinner"></div>
        <p>Loading PDFs...</p>
      </div>
    )
  }

  return (
    <div className="pdfs-page">
      <div className="pdfs-page-header">
        <h1>📚 PDF Materials</h1>
        <p>Click on any PDF to view it</p>
      </div>

      {pdfs.length === 0 ? (
        <div className="pdfs-page-empty">
          <div className="empty-icon">📄</div>
          <h3>No PDFs Available</h3>
          <p>No PDF materials have been uploaded yet.</p>
        </div>
      ) : (
        <div className="pdfs-grid">
          {pdfs.map((pdf, index) => (
            <div 
              key={pdf.id}
              className="pdf-card"
              onClick={() => handlePDFClick(pdf)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="pdf-thumbnail">
                <div className="thumbnail-placeholder">
                  <span>📄</span>
                </div>
                <div className="pdf-overlay">
                  <div className="view-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    View PDF
                  </div>
                </div>
              </div>
              <div className="pdf-info">
                <h3 className="pdf-title">{pdf.title}</h3>
                {pdf.description && (
                  <p className="pdf-description">{pdf.description}</p>
                )}
                <div className="pdf-meta">
                  <span className="pdf-date">
                    📅 {formatDate(pdf.createdAt)}
                  </span>
                  {pdf.fileSize && (
                    <span className="pdf-size">
                      📦 {formatFileSize(pdf.fileSize)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pdfs-count">
        {pdfs.length} PDF{pdfs.length !== 1 ? 's' : ''} available
      </div>
    </div>
  )
}

export default PDFs

