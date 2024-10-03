// models/Gym.js
const pool = require('../config/db');

class Gym {
  static async create(userId, name) {
    const result = await pool.query(
      'INSERT INTO gyms (user_id, name) VALUES ($1, $2) RETURNING *',
      [userId, name]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query('SELECT * FROM gyms WHERE user_id = $1', [userId]);
    return result.rows;
  }
  static async findById(id) {
    const result = await pool.query('SELECT * FROM gyms WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Gym;
