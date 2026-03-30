export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

export const getScoreColor = (score) => {
  if (score >= 80) return '#34d399'
  if (score >= 60) return '#a78bfa'
  return '#f87171'
}

export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs work'
}

export const truncate = (str, n = 80) =>
  str?.length > n ? str.slice(0, n) + '…' : str