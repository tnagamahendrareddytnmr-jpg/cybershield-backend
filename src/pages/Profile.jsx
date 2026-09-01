import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({ name: '', phone: '', created_at: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function fetchProfile() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch {
      setError('Failed to load operative profile telemetry.');
    }
  }

  useEffect(() => {
    const loadProfileTimeout = setTimeout(fetchProfile, 0);
    return () => clearTimeout(loadProfileTimeout);
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update credentials.');
    }
  };

  return (
    <div style={{ padding: '40px 20px', color: '#fff', maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>👤 Operative Profile & Settings</h2>
        <p style={{ color: '#94a3b8', fontSize: '15px' }}>Manage your account credentials, security telemetry, and session preferences.</p>
      </div>

      {error && <div style={{ background: 'rgba(127, 29, 29, 0.8)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '14px', borderRadius: '8px', marginBottom: '20px', color: '#fca5a5' }}>{error}</div>}
      {message && <div style={{ background: 'rgba(6, 95, 70, 0.8)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '14px', borderRadius: '8px', marginBottom: '20px', color: '#6ee7b7' }}>{message}</div>}

      {/* Account Details Grid Card */}
      <div style={{ background: 'rgba(30, 41, 59, 0.75)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '14px', marginBottom: '30px', border: '1px solid rgba(51, 65, 85, 0.8)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ fontSize: '20px' }}>🛡️</span>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Account Telemetry & Credentials</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              <span>🏷️</span> Operative Name
            </div>
            <strong style={{ fontSize: '17px', color: '#f8fafc' }}>{profile.name || 'N/A'}</strong>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              <span>📱</span> Registered Phone
            </div>
            <strong style={{ fontSize: '17px', color: '#f8fafc' }}>{profile.phone || 'N/A'}</strong>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              <span>📅</span> Account Created
            </div>
            <strong style={{ fontSize: '17px', color: '#f8fafc' }}>{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</strong>
          </div>

        </div>
      </div>

      {/* Security & Master Password Card with Glowing Focus States */}
      <div style={{ background: 'rgba(30, 41, 59, 0.75)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '14px', border: '1px solid rgba(51, 65, 85, 0.8)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Security & Master Password</h3>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '25px' }}>Update your master password regularly to secure your digital evidence and vault records.</p>

        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              placeholder="Enter current password"
              required 
              style={{ width: '100%', padding: '13px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s ease' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0ea5e9';
                e.target.style.boxShadow = '0 0 0 2px rgba(14, 165, 233, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Enter new password (min. 6 characters)"
              required 
              style={{ width: '100%', padding: '13px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #334155', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s ease' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0ea5e9';
                e.target.style.boxShadow = '0 0 0 2px rgba(14, 165, 233, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button type="submit" style={{ padding: '14px', background: '#0284c7', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s ease', marginTop: '5px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}>
            🔐 Update Master Password
          </button>
        </form>
      </div>

    </div>
  );
}

export default Profile;