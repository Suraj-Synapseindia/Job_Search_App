import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      router.push('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-container">
            <button type="submit" className="button">Login</button>
          </div>
        </form>
      </div>
      
      {/* Styles */}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .form-container {
          max-width: 400px;
          width: 100%;
          padding: 30px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .input-container {
          margin-bottom: 15px;
        }

        .input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .button-container {
          text-align: center;
        }

        .button {
          padding: 12px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #0056b3;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .error-message {
          color: #dc3545;
          font-size: 14px;
          margin-top: 5px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
