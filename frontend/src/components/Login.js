import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend for login
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        email,
        password,
      });

      // Log the response to see the token and name
      console.log("Login Response:", response.data);

      // Save token and name in localStorage only if login is successful
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('candidateName', response.data.name);

      // Redirect to candidate dashboard
      navigate('/candidate');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Candidate Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;