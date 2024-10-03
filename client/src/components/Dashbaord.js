// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/gyms', {
          headers: { 'x-auth-token': token },
        });
        setGyms(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchGyms();
  }, []);

  return (
    <div>
      <h1>Your Gyms</h1>
      <ul>
        {gyms.map((gym) => (
          <li key={gym.id}>{gym.name}</li>
        ))}
      </ul>
      {/* Add forms to create gyms, add equipment, generate workouts */}
    </div>
  );
}

export default Dashboard;
