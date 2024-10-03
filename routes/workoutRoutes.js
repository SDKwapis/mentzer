// routes/workoutRoutes.js
const express = require('express');
const router = express.Router();
const { generateWorkouts } = require('../controllers/workoutController');
const auth = require('../middleware/auth');

// @route   POST api/workouts/generate
// @desc    Generate workouts
// @access  Private
router.post('/generate', auth, generateWorkouts);

module.exports = router;
