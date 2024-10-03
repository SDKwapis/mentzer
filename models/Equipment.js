// models/Equipment.js
const pool = require('../config/db');

class Equipment {
  static async create(gymId, name) {
    const result = await pool.query(
      'INSERT INTO equipment (gym_id, name) VALUES ($1, $2) RETURNING *',
      [gymId, name]
    );
    return result.rows[0];
  }

  static async findByGymId(gymId) {
    const result = await pool.query(
      'SELECT * FROM equipment WHERE gym_id = $1',
      [gymId]
    );
    return result.rows;
  }
  static async findById(id) {
    const result = await pool.query('SELECT * FROM equipment WHERE id = $1', [id]);
    return result.rows[0];
  }
  
  static async delete(id) {
    await pool.query('DELETE FROM equipment WHERE id = $1', [id]);
  }
  
}

module.exports = Equipment;

