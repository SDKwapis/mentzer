// models/Workout.js
const pool = require('../config/db');

class Workout {
  static async create(userId, gymId, date, routine) {
    const result = await pool.query(
      'INSERT INTO workouts (user_id, gym_id, date, routine) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, gymId, date, routine]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query('SELECT * FROM workouts WHERE user_id = $1', [userId]);
    return result.rows;
  }
}

module.exports = Workout;
