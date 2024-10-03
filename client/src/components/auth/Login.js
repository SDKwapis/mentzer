// src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login({ history }) {
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
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard');
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
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
