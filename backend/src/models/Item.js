const pool = require('../db/connection')

class Item {
  static async getAll() {
    const result = await pool.query(
      'SELECT * FROM items ORDER BY created_at DESC'
    )
    return result.rows
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id])
    return result.rows[0]
  }

  static async getByStatus(status) {
    const result = await pool.query(
      'SELECT * FROM items WHERE status = $1 ORDER BY created_at DESC',
      [status]
    )
    return result.rows
  }

  static async create({ name, quantity, category, status, expiration_date }) {
    const result = await pool.query(
      'INSERT INTO items (name, quantity, category, status, expiration_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, quantity || 1, category, status || 'have', expiration_date || null]
    )
    return result.rows[0]
  }

  static async update(
    id,
    { name, quantity, category, status, expiration_date }
  ) {
    const result = await pool.query(
      'UPDATE items SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), category = COALESCE($3, category), status = COALESCE($4, status), expiration_date = COALESCE($5, expiration_date), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [name, quantity, category, status, expiration_date, id]
    )
    return result.rows[0]
  }

  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [id]
    )
    return result.rows[0]
  }
}

module.exports = Item
