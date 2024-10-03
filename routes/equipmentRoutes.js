// routes/equipmentRoutes.js
const express = require('express');
const router = express.Router();
const { addEquipment, getEquipmentByGymId } = require('../controllers/equipmentController');
const auth = require('../middleware/auth');

// @route   POST api/equipment
// @desc    Add equipment to a gym
// @access  Private
router.post('/', auth, addEquipment);

// @route   GET api/equipment/:gymId
// @desc    Get all equipment for a gym
// @access  Private
router.get('/:gymId', auth, getEquipmentByGymId );

module.exports = router;
