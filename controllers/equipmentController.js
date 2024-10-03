// controllers/equipmentController.js
const Equipment = require('../models/Equipment');

exports.addEquipment = async (req, res) => {
  const { gymId, name } = req.body;
  try {
    const equipment = await Equipment.create(gymId, name);
    res.status(201).json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEquipment = async (req, res) => {
  const { gymId } = req.params;
  try {
    const equipment = await Equipment.findByGymId(gymId);
    res.json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
