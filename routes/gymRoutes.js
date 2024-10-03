// routes/gymRoutes.js
const express = require('express');
const router = express.Router();
const { createGym, getGyms, getGymById } = require('../controllers/gymController');
const auth = require('../middleware/auth');

// Existing routes
router.post('/', auth, createGym);
router.get('/', auth, getGyms);

// Add the route to get a gym by ID
router.get('/:gymId', auth, getGymById);

module.exports = router;

