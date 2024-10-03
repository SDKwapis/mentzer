// client/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

// Material-UI components
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Container,
  Box,
} from '@mui/material';

function Dashboard() {
  const [gyms, setGyms] = useState([]);
  const [gymName, setGymName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const res = await api.get('/api/gyms');
        setGyms(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError('Failed to load gyms');
      } finally {
        setLoading(false);
      }
    };
    fetchGyms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const onChange = (e) => {
    setGymName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/gyms', { name: gymName });
      setGyms([...gyms, res.data]);
      setGymName('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Failed to add gym');
    }
  };

  const goToGym = (gymId) => {
    navigate(`/gyms/${gymId}`);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box mt={5}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Gyms
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add a New Gym
          </Typography>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <TextField
              label="Gym Name"
              value={gymName}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Gym
            </Button>
          </form>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Gyms
          </Typography>
          {gyms.length === 0 ? (
            <Typography>No gyms added yet.</Typography>
          ) : (
            <List>
              {gyms.map((gym) => (
                <ListItem
                  button
                  key={gym.id}
                  onClick={() => goToGym(gym.id)}
                  divider
                >
                  <ListItemText primary={gym.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;



