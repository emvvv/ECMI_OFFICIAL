import { useState, useEffect } from 'react';

export default function PrayerRequestList() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerRequests();
  }, []);

  const fetchPrayerRequests = async () => {
    try {
      const response = await fetch('/api/admin/prayer-requests');
      const data = await response.json();
      setPrayers(data);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (rowIndex, status) => {
    try {
      await fetch('/api/admin/update-prayer-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rowIndex, status })
      });
      fetchPrayerRequests(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Prayer Requests Admin</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Request</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prayers.map((prayer, index) => (
              <tr key={index}>
                <td>{prayer.timestamp}</td>
                <td>{prayer.name}</td>
                <td>{prayer.phone}</td>
                <td>{prayer.request}</td>
                <td>{prayer.status}</td>
                <td>
                  <button onClick={() => updateStatus(index + 2, 'Prayed For')}>
                    Mark as Prayed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}