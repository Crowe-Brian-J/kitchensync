import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555'

function App() {
  const [items, setItems] = useState([])
  const [activeTab, setActiveTab] = useState('have')
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    category: '',
    status: 'have',
    expiration_date: ''
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/items`)
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value
    }))
  }

  const handleAddItem = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      await axios.post(`${API_URL}/api/items`, formData)
      setFormData({
        name: '',
        quantity: 1,
        category: '',
        status: 'have',
        expiration_date: ''
      })
      fetchItems()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/items/${id}`, { status: newStatus })
      fetchItems()
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/items/${id}`)
      fetchItems()
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const filteredItems = items.filter((item) => item.status === activeTab)

  return (
    <div className="App">
      <header className="header">
        <h1>🥕 KitchenSync</h1>
        <p>Keep track of your groceries</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Add Item</h2>
          <form onSubmit={handleAddItem} className="add-item-form">
            <input
              type="text"
              name="name"
              placeholder="Item name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Produce, Dairy)"
              value={formData.category}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleInputChange}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="have">Have</option>
              <option value="need">Need to Buy</option>
              <option value="expired">Expired</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </form>
        </section>

        <section className="items-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'have' ? 'active' : ''}`}
              onClick={() => setActiveTab('have')}
            >
              Have ({items.filter((i) => i.status === 'have').length})
            </button>
            <button
              className={`tab ${activeTab === 'need' ? 'active' : ''}`}
              onClick={() => setActiveTab('need')}
            >
              Need to Buy ({items.filter((i) => i.status === 'need').length})
            </button>
            <button
              className={`tab ${activeTab === 'expired' ? 'active' : ''}`}
              onClick={() => setActiveTab('expired')}
            >
              Expired ({items.filter((i) => i.status === 'expired').length})
            </button>
          </div>

          <div className="items-list">
            {filteredItems.length === 0 ? (
              <p className="empty-state">No items in this category</p>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="quantity">Qty: {item.quantity}</p>
                    {item.category && (
                      <p className="category">{item.category}</p>
                    )}
                    {item.expiration_date && (
                      <p className="expiration">
                        Exp:{' '}
                        {new Date(item.expiration_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="item-actions">
                    {activeTab !== 'have' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleStatusChange(item.id, 'have')}
                      >
                        ✓ Have
                      </button>
                    )}
                    {activeTab !== 'need' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleStatusChange(item.id, 'need')}
                      >
                        🛒 Need
                      </button>
                    )}
                    {activeTab !== 'expired' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleStatusChange(item.id, 'expired')}
                      >
                        ⚠️ Expired
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
