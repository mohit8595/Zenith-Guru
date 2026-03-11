// PDF Storage Utility - Handles localStorage operations for PDFs

const STORAGE_KEY = 'zenith_guru_pdfs';

// Get all PDFs from localStorage
export const getPDFs = () => {
  try {
    const pdfs = localStorage.getItem(STORAGE_KEY);
    return pdfs ? JSON.parse(pdfs) : [];
  } catch (error) {
    console.error('Error reading PDFs from storage:', error);
    return [];
  }
};

// Save PDFs to localStorage
export const savePDFs = (pdfs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pdfs));
    return true;
  } catch (error) {
    console.error('Error saving PDFs to storage:', error);
    return false;
  }
};

// Add a new PDF
export const addPDF = (pdfData) => {
  const pdfs = getPDFs();
  const newPDF = {
    id: Date.now().toString(),
    ...pdfData,
    createdAt: new Date().toISOString(),
  };
  pdfs.unshift(newPDF); // Add to beginning
  return savePDFs(pdfs) ? newPDF : null;
};

// Delete a PDF by ID
export const deletePDF = (pdfId) => {
  const pdfs = getPDFs();
  const filteredPDFs = pdfs.filter(p => p.id !== pdfId);
  return savePDFs(filteredPDFs);
};

// Get a single PDF by ID
export const getPDFById = (pdfId) => {
  const pdfs = getPDFs();
  return pdfs.find(p => p.id === pdfId) || null;
};

// Convert file to base64 for storage
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Check file size
export const checkPDFSize = (file) => {
  const maxSize = 20 * 1024 * 1024; // 20MB
  const warningSize = 10 * 1024 * 1024; // 10MB
  
  if (file.size > maxSize) {
    return { valid: false, message: 'File size exceeds 20MB limit' };
  }
  if (file.size > warningSize) {
    return { valid: true, warning: 'Large file may slow down your browser' };
  }
  return { valid: true };
};

// Clear all PDFs
export const clearAllPDFs = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing PDFs:', error);
    return false;
  }
};
