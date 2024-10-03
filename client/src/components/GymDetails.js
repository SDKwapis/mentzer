// client/src/components/GymDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

// Material-UI components
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function GymDetails() {
  const { gymId } = useParams();
  const navigate = useNavigate();
  const [gymName, setGymName] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        // Get Gym Details
        const gymRes = await api.get(`/api/gyms/${gymId}`);
        setGymName(gymRes.data.name);

        // Get Equipment List
        const equipmentRes = await api.get(`/api/equipment/${gymId}`);
        setEquipmentList(equipmentRes.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Failed to load gym details");
      } finally {
        setLoading(false);
      }
    };
    fetchGymDetails();
  }, [gymId]);

  const onChange = (e) => {
    setEquipmentName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!equipmentName.trim()) {
      setError("Equipment name cannot be empty");
      return;
    }
    try {
      const res = await api.post("/api/equipment", {
        gymId,
        name: equipmentName,
      });
      setEquipmentList([...equipmentList, res.data]);
      setEquipmentName("");
      setError(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to add equipment");
    }
  };

  const handleDelete = async (equipmentId) => {
    try {
      await api.delete(`/api/equipment/${equipmentId}`);
      setEquipmentList(equipmentList.filter((item) => item.id !== equipmentId));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to delete equipment");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
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

  return (
    <Container>
      <Box mt={5}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Typography variant="h4" component="h1" gutterBottom>
          {gymName}
        </Typography>

        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back to My Gyms
        </Button>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Equipment Inventory
          </Typography>
          {equipmentList.length === 0 ? (
            <Typography>No equipment added yet.</Typography>
          ) : (
            <List>
              {equipmentList.map((equipment) => (
                <ListItem
                  key={equipment.id}
                  divider
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(equipment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={equipment.name} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <Box mt={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Add Equipment
          </Typography>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <TextField
              label="Equipment Name"
              value={equipmentName}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Equipment
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default GymDetails;
