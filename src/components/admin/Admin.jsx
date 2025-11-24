import React, { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { onAuthStateChanged } from '../../utils/firebaseAdmin';

function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub && unsub();
  }, []);

  if (loading) {
    return (
      <div className="site-wrapper">
        <div className="site-content">
          <h2 style={{ padding: 40 }}>Checking authentication...</h2>
        </div>
      </div>
    );
  }

  return user ? <AdminDashboard user={user} /> : <AdminLogin />;
}

export default Admin;
