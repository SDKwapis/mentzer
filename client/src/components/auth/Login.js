// client/src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
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
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirect to 'My Gyms' page after login
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to='/register'>
          <button>Register</button>
        </Link>
      </p>
    </div>
  );
}

export default Login;
