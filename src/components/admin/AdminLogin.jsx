import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../utils/firebaseAdmin';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-wrapper">
      <div className="site-content">
        <div style={{ maxWidth: 420, margin: '40px auto', padding: 20 }}>
          <h2>Admin Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 8 }}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
              />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ padding: '8px 14px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
