import React, { useState, useEffect } from 'react'
import './PDFGallery.css'
import { getPDFs, deletePDF } from '../utils/pdfStorage'

const PDFGallery = ({ pdfs: propPDFs, onPDFSelect, onPDFDelete, showUploadButton, onUploadClick }) => {
  const [pdfs, setPdfs] = useState([])
  const [hoveredPDF, setHoveredPDF] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    // Use propPDFs if provided, otherwise fetch from storage
    if (propPDFs) {
      setPdfs(propPDFs)
    } else {
      loadPDFs()
    }
  }, [propPDFs])

  const loadPDFs = () => {
    const storedPdfs = getPDFs()
    setPdfs(storedPdfs)
  }

  const handleDeleteClick = (pdfId) => {
    setDeleteConfirm(pdfId)
  }

  const confirmDelete = (pdfId) => {
    setIsAnimating(true)
    deletePDF(pdfId)
    
    setTimeout(() => {
      const updatedPdfs = pdfs.filter(p => p.id !== pdfId)
      setPdfs(updatedPdfs)
      setDeleteConfirm(null)
      setIsAnimating(false)
      
      if (onPDFDelete) onPDFDelete(pdfId)
    }, 300)
  }

  const cancelDelete = () => {
    setDeleteConfirm(null)
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

  const handlePDFClick = (pdf) => {
    if (onPDFSelect) {
      onPDFSelect(pdf)
    } else if (pdf.pdfData) {
      // Open PDF in new tab if it's base64 data
      const pdfWindow = window.open('', '_blank')
      pdfWindow.document.write(`
        <iframe src="${pdf.pdfData}" style="width:100%;height:100%;" frameborder="0"></iframe>
      `)
    }
  }

  if (pdfs.length === 0) {
    return (
      <div className="pdf-gallery-empty">
        <div className="empty-icon">📄</div>
        <h3>No PDFs Yet</h3>
        <p>Upload your first PDF to get started</p>
        {showUploadButton && (
          <button className="btn-empty-upload" onClick={onUploadClick}>
            <span>📤</span> Upload PDF
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`pdf-gallery ${isAnimating ? 'animating' : ''}`}>
      {showUploadButton && (
        <div className="gallery-header">
          <h2>My PDFs</h2>
          <button className="btn-add-pdf" onClick={onUploadClick}>
            <span>+</span> Upload New
          </button>
        </div>
      )}

      <div className="pdfs-grid">
        {pdfs.map((pdf, index) => (
          <div 
            key={pdf.id}
            className={`pdf-card ${deleteConfirm === pdf.id ? 'deleting' : ''}`}
            onMouseEnter={() => setHoveredPDF(pdf.id)}
            onMouseLeave={() => setHoveredPDF(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handlePDFClick(pdf)}
          >
            {/* PDF Thumbnail */}
            <div className="pdf-thumbnail">
              <div className="thumbnail-placeholder">
                <span>📄</span>
              </div>
              
              {/* PDF overlay on hover */}
              <div className="pdf-overlay">
                <div className="view-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  View
                </div>
              </div>
            </div>

            {/* PDF Info */}
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

              {/* Actions */}
              <div className={`pdf-actions ${hoveredPDF === pdf.id ? 'visible' : ''}`}>
                <button 
                  className="btn-action btn-view"
                  title="View PDF"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePDFClick(pdf)
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  View
                </button>
                <button 
                  className="btn-action btn-delete"
                  title="Delete PDF"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(pdf.id)
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
            {deleteConfirm === pdf.id && (
              <div className="delete-confirm-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="delete-confirm-box">
                  <span className="confirm-icon">🗑️</span>
                  <h4>Delete PDF?</h4>
                  <p>"{pdf.title}" will be permanently removed.</p>
                  <div className="confirm-actions">
                    <button className="btn-cancel-delete" onClick={cancelDelete}>
                      Cancel
                    </button>
                    <button 
                      className="btn-confirm-delete" 
                      onClick={() => confirmDelete(pdf.id)}
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

      {/* PDFs count */}
      <div className="gallery-footer">
        <span className="pdf-count">
          {pdfs.length} PDF{pdfs.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default PDFGallery
