import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Call login
    const success = login(username, password);

    if (!success) {
      setError('Invalid username or password');
      return;
    }

    // Get current user role after login
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setError('Failed to retrieve user information');
      return;
    }

    // Navigate based on user role
    if (currentUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>Booking Book</h1>
        <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>Login to your account</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '4px',
              border: '1px solid #f5c6cb',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}>
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: 'bold' }}>Demo Accounts:</p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          <strong>Admin:</strong> admin / admin123
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          <strong>User:</strong> yahya / user123
        </p>
      </div>
    </div>
  );
};

export default Login;