const API_ENDPOINT =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:1501'

module.exports = {
  BASE_API_URL: `${API_ENDPOINT}/api`,
}
