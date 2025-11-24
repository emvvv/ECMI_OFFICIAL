import React from 'react';
import { signOut, auth } from '../../utils/firebaseAdmin';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ user }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Sign out failed', err);
    }
  };

  const email = (user && user.email) || (auth && auth.currentUser && auth.currentUser.email) || '—';

  return (
    <div className="site-wrapper">
      <div className="site-content">
        <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
          <h2>Admin Dashboard</h2>
          <p>Signed in as <strong>{email}</strong></p>
          <div style={{ marginTop: 20 }}>
            <button onClick={handleSignOut} style={{ padding: '8px 14px' }}>
              Sign out
            </button>
          </div>
          <div style={{ marginTop: 24 }}>
            <p>This is a minimal admin dashboard. Add admin features here (posts, uploads, settings).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
