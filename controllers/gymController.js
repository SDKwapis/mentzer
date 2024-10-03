// controllers/gymController.js
const Gym = require('../models/Gym');

exports.createGym = async (req, res) => {
  const { name } = req.body;
  try {
    const gym = await Gym.create(req.user.id, name);
    res.status(201).json(gym);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGyms = async (req, res) => {
  try {
    const gyms = await Gym.findByUserId(req.user.id);
    res.json(gyms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
