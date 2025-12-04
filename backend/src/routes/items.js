const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.getAll()
    res.json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

// Get items by status
router.get('/status/:status', async (req, res) => {
  try {
    const items = await Item.getByStatus(req.params.status)
    res.json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
})

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.getById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

// Create item
router.post('/', async (req, res) => {
  try {
    const { name, quantity, category, status, expiration_date } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Item name is required' })
    }
    const item = await Item.create({
      name,
      quantity,
      category,
      status,
      expiration_date
    })
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create item' })
  }
})

// Update item
router.put('/:id', async (req, res) => {
  try {
    const { name, quantity, category, status, expiration_date } = req.body
    const item = await Item.update(req.params.id, {
      name,
      quantity,
      category,
      status,
      expiration_date
    })
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update item' })
  }
})

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.delete(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

module.exports = router
