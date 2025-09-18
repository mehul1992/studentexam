/**
 * Time utility functions
 * Follows Single Responsibility Principle - only handles time-related operations
 * Follows DRY principle - reusable time formatting functions
 */

/**
 * Format seconds into readable time string
 * @param {number} seconds - Number of seconds to format
 * @returns {string} Formatted time string (HH:MM:SS or MM:SS)
 */
export const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) {
    return '00:00'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Calculate remaining time from start time and duration
 * @param {string|Date} startTime - Start time
 * @param {number} duration - Duration in seconds
 * @returns {number} Remaining seconds
 */
export const calculateRemainingTime = (startTime, duration) => {
  try {
    const now = new Date().getTime()
    const start = new Date(startTime).getTime()
    const elapsed = Math.floor((now - start) / 1000)
    return Math.max(0, duration - elapsed)
  } catch (error) {
    console.error('Error calculating remaining time:', error)
    return 0
  }
}

/**
 * Check if time is running low (less than 5 minutes)
 * @param {number} seconds - Remaining seconds
 * @returns {boolean} True if time is running low
 */
export const isTimeRunningLow = (seconds) => {
  return seconds < 300 // 5 minutes
}

/**
 * Parse time string to seconds
 * @param {string} timeString - Time string in format "HH:MM:SS" or "MM:SS"
 * @returns {number} Total seconds
 */
export const parseTimeToSeconds = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return 0
  }

  const parts = timeString.split(':').map(Number)
  
  if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts
    return minutes * 60 + seconds
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts
    return hours * 3600 + minutes * 60 + seconds
  }
  
  return 0
}
