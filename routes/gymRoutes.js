// routes/gymRoutes.js
const express = require('express');
const router = express.Router();
const { createGym, getGyms } = require('../controllers/gymController');
const auth = require('../middleware/auth');

// @route   POST api/gyms
// @desc    Create a gym
// @access  Private
router.post('/', auth, createGym);

// @route   GET api/gyms
// @desc    Get all gyms for a user
// @access  Private
router.get('/', auth, getGyms);

module.exports = router;
