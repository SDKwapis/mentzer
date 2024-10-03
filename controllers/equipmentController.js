// controllers/equipmentController.js
const Equipment = require('../models/Equipment');
const Gym = require('../models/Gym');

exports.addEquipment = async (req, res) => {
  const { gymId, name } = req.body;
  try {
    // Check if the gym exists and belongs to the user
    const gym = await Gym.findById(gymId);
    if (!gym || gym.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Gym not found or unauthorized' });
    }

    // Add equipment
    const equipment = await Equipment.create(gymId, name);
    res.status(201).json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEquipmentByGymId = async (req, res) => {
  const { gymId } = req.params;
  try {
    // Check if the gym exists and belongs to the user
    const gym = await Gym.findById(gymId);
    if (!gym || gym.user_id !== req.user.id) {
      return res.status(404).json({ message: 'Gym not found or unauthorized' });
    }

    // Get equipment
    const equipmentList = await Equipment.findByGymId(gymId);
    res.json(equipmentList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteEquipment = async (req, res) => {
  const { equipmentId } = req.params;
  try {
    // Get the equipment and verify ownership
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    const gym = await Gym.findById(equipment.gym_id);
    if (!gym || gym.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Delete equipment
    await Equipment.delete(equipmentId);
    res.json({ message: 'Equipment deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


