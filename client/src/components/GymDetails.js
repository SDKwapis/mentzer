// client/src/components/GymDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function GymDetails() {
  const { gymId } = useParams();
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentName, setEquipmentName] = useState('');
  const [gymName, setGymName] = useState('');

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        // Get Gym Details
        const gymRes = await api.get(`/api/gyms/${gymId}`);
        setGymName(gymRes.data.name);

        // Get Equipment List
        const res = await api.get(`/api/equipment/${gymId}`);
        setEquipmentList(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchGymDetails();
  }, [gymId]);

  const onChange = (e) => {
    setEquipmentName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/equipment', {
        gymId,
        name: equipmentName,
      });
      setEquipmentList([...equipmentList, res.data]);
      setEquipmentName('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>{gymName}</h1>
      <h2>Equipment Inventory</h2>
      <ul>
        {equipmentList.map((equipment) => (
          <li key={equipment.id}>{equipment.name}</li>
        ))}
      </ul>

      <h2>Add Equipment</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="equipmentName"
          value={equipmentName}
          onChange={onChange}
          placeholder="Equipment Name"
          required
        />
        <button type="submit">Add Equipment</button>
      </form>
    </div>
  );
}

export default GymDetails;
