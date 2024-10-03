// client/src/components/auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      await axios.post('/api/auth/register', formData);

      // Log the user in automatically
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      // Redirect to 'My Gyms' page
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          value={username}
          onChange={onChange}
          placeholder='Username'
          required
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          placeholder='Password'
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
