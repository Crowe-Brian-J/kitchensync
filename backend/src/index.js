require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { initializeDb } = require('./db/setup')
const itemRoutes = require('./routes/items')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize database
initializeDb().catch((err) => {
  console.error('Failed to initialize database:', err)
  process.exit(1)
})

// Routes
app.use('/api/items', itemRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`KitchenSync backend running on port ${PORT}`)
})
