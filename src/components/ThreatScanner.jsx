import { useState } from 'react';
import axios from 'axios';

function CommunityBroadcast() {
  const [scamTitle, setScamTitle] = useState('');
  const [scamCategory, setScamCategory] = useState('Phishing Link');
  const [scamLink, setScamLink] = useState('');
  const [scamDescription, setScamDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/broadcast-scam', {
        title: scamTitle,
        category: scamCategory,
        targetLink: scamLink,
        description: scamDescription
      });

      if (response.data.success) {
        alert('Scam alert broadcasted successfully!');
        setScamTitle('');
        setScamLink('');
        setScamDescription('');
      }
    } catch (err) {
      console.error('Broadcast error:', err);
      alert('Server connection failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.75)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.8)', maxWidth: '600px', margin: '20px auto', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      <h3 style={{ fontSize: '16px', color: '#38bdf8', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        🚨 Broadcast Modern Cyber Scam Alert
      </h3>

      <form onSubmit={handleBroadcastSubmit}>
        
        {/* Scam Title Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Alert Title</label>
          <input 
            type="text" 
            required
            value={scamTitle}
            onChange={(e) => setScamTitle(e.target.value)}
            placeholder="e.g., Fake Digital Arrest Scam Link"
            style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {/* Category Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Threat Category</label>
          <select 
            value={scamCategory}
            onChange={(e) => setScamCategory(e.target.value)}
            style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '14px' }}
          >
            <option value="Phishing Link">Phishing Link</option>
            <option value="Financial Fraud">Financial Fraud</option>
            <option value="Fake APK / Malware">Fake APK / Malware</option>
            <option value="Digital Arrest Threat">Digital Arrest Threat</option>
          </select>
        </div>

        {/* Target Link Input */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Suspicious URL / Target Link</label>
          <input 
            type="text" 
            required
            value={scamLink}
            onChange={(e) => setScamLink(e.target.value)}
            placeholder="https://suspicious-domain.com"
            style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {/* Description Textarea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Incident Description & Details</label>
          <textarea 
            rows="3"
            required
            value={scamDescription}
            onChange={(e) => setScamDescription(e.target.value)}
            placeholder="Describe how the scam operates..."
            style={{ width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid #334155', color: '#fff', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
        >
          {loading ? 'Broadcasting Alert...' : '🔗 Submit Broadcast'}
        </button>

      </form>
    </div>
  );
}

export default CommunityBroadcast;