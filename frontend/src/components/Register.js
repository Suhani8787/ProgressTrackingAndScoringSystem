import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    const user = { name, email, password };

    try {
      // Send POST request to backend for registration
      const response = await axios.post('http://localhost:5005/api/auth/register', user);
      setSuccessMessage(response.data.message); // Use message from server response
      setError('');
      // Add a small delay before navigating to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Candidate Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;