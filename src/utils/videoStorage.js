// Video Storage Utility - Handles localStorage operations for videos

const STORAGE_KEY = 'zenith_guru_videos';

// Get all videos from localStorage
export const getVideos = () => {
  try {
    const videos = localStorage.getItem(STORAGE_KEY);
    return videos ? JSON.parse(videos) : [];
  } catch (error) {
    console.error('Error reading videos from storage:', error);
    return [];
  }
};

// Save videos to localStorage
export const saveVideos = (videos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    return true;
  } catch (error) {
    console.error('Error saving videos to storage:', error);
    return false;
  }
};

// Add a new video
export const addVideo = (videoData) => {
  const videos = getVideos();
  const newVideo = {
    id: Date.now().toString(),
    ...videoData,
    createdAt: new Date().toISOString(),
  };
  videos.unshift(newVideo); // Add to beginning
  return saveVideos(videos) ? newVideo : null;
};

// Delete a video by ID
export const deleteVideo = (videoId) => {
  const videos = getVideos();
  const filteredVideos = videos.filter(v => v.id !== videoId);
  return saveVideos(filteredVideos);
};

// Get a single video by ID
export const getVideoById = (videoId) => {
  const videos = getVideos();
  return videos.find(v => v.id === videoId) || null;
};

// Generate thumbnail from video file
export const generateThumbnail = (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);
    
    video.onloadedmetadata = () => {
      video.currentTime = 1; // Seek to 1 second
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnail = canvas.toDataURL('image/jpeg', 0.7);
      URL.revokeObjectURL(video.src);
      resolve(thumbnail);
    };
    
    video.onerror = (error) => {
      URL.revokeObjectURL(video.src);
      reject(error);
    };
  });
};

// Get video duration formatted
export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Check file size and return warning if too large
export const checkVideoSize = (file) => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const warningSize = 20 * 1024 * 1024; // 20MB
  
  if (file.size > maxSize) {
    return { valid: false, message: 'File size exceeds 50MB limit' };
  }
  if (file.size > warningSize) {
    return { valid: true, warning: 'Large file may slow down your browser' };
  }
  return { valid: true };
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

// Clear all videos
export const clearAllVideos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing videos:', error);
    return false;
  }
};
