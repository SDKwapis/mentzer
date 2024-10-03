// src/components/auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register({ history }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      history.push('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='username'
        value={username}
        onChange={onChange}
        required
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={onChange}
        required
      />
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;
