import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
})

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)
  const { data } = await api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const analyzeResume = async ({ resumeText, jobDescription }) => {
  const { data } = await api.post('/resume/analyze', {
    resumeText,
    jobDescription,
  })
  return data
}

export const rewriteBullet = async ({ original, jobDescription }) => {
  const { data } = await api.post('/resume/rewrite', {
    original,
    jobDescription,
  })
  return data
}

export const generateCoverLetter = async ({ resumeText, jobDescription }) => {
  const { data } = await api.post('/resume/cover-letter', {
    resumeText,
    jobDescription,
  })
  return data
}