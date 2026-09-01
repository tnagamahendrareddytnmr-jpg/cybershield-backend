import { useState, useEffect } from 'react';
import axios from 'axios';

function ScamIntelligence() {
  const [scams, setScams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Phishing');
  const [newTarget, setNewTarget] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchCommunityScams() {
    try {
      const response = await axios.get('http://localhost:5000/api/community-scams');
      const enhancedData = response.data.map((item) => ({
        ...item,
        upvotes: item.upvotes || Math.floor(Math.random() * 15) + 3
      }));
      setScams(enhancedData);
    } catch (err) {
      console.error('Failed to fetch community threat feeds:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadScamsTimeout = setTimeout(fetchCommunityScams, 0);
    return () => clearTimeout(loadScamsTimeout);
  }, []);

  const handleBroadcastThreat = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/community-scams', {
        title: newTitle,
        category: newCategory,
        targetInfo: newTarget,
        description: newDescription
      });

      alert('Threat successfully broadcasted to the global community grid.');
      setShowModal(false);
      setNewTitle('');
      setNewTarget('');
      setNewDescription('');
      fetchCommunityScams();
    } catch (err) {
      console.error('Broadcast error:', err);
      alert('Failed to broadcast threat warning. Please verify your backend server connection.');
    }
  };

  const handleUpvote = (id) => {
    setScams(prevScams => 
      prevScams.map(scam => scam.id === id ? { ...scam, upvotes: scam.upvotes + 1 } : scam)
    );
  };

  const filteredScams = scams.filter(scam => {
    const matchesSearch =
      scam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scam.target_info?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scam.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scam.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'ALL' ||
      scam.category.toUpperCase() === selectedCategoryFilter.toUpperCase();

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeStyle = (cat) => {
    let color = '#38bdf8';
    let bg = 'rgba(14, 165, 233, 0.12)';
    let border = 'rgba(14, 165, 233, 0.35)';

    if (cat === 'Phishing') {
      color = '#f87171'; bg = 'rgba(239, 68, 68, 0.12)'; border = 'rgba(239, 68, 68, 0.35)';
    } else if (cat === 'Crypto' || cat === 'Financial Fraud') {
      color = '#fbbf24'; bg = 'rgba(245, 158, 11, 0.12)'; border = 'rgba(245, 158, 11, 0.35)';
    } else if (cat === 'Digital Arrest') {
      color = '#c084fc'; bg = 'rgba(168, 85, 247, 0.12)'; border = 'rgba(168, 85, 247, 0.35)';
    }

    return {
      fontSize: '11px',
      background: bg,
      color: color,
      border: `1px solid ${border}`,
      padding: '4px 12px',
      borderRadius: '8px',
      fontWeight: '700',
      letterSpacing: '0.6px',
      textTransform: 'uppercase',
      boxShadow: `0 0 12px ${bg}`
    };
  };

  return (
    <div style={{ padding: '40px 24px', color: '#f8fafc', maxWidth: '1300px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Top Header Telemetry Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)', padding: '24px 30px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 10px #38bdf8', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2.5px', color: '#38bdf8', fontWeight: '800' }}>Crowdsourced Modern Threat Defense Matrix</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', background: 'linear-gradient(90deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📡 Community Scam Intelligence Grid</h2>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '13px 22px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', border: '1px solid rgba(248, 113, 113, 0.4)', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '13.5px', cursor: 'pointer', boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)', transition: 'all 0.3s ease' }}>🚨 Broadcast New Threat Warning</button>
      </div>

      {/* Advanced Pre-Check Search HUD */}
      <div style={{ background: 'rgba(30, 41, 59, 0.65)', backdropFilter: 'blur(16px)', padding: '22px 26px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.7)', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <label style={{ fontSize: '11.5px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '10px', fontWeight: '700' }}>🔍 Proactive Pre-Check Engine (Live Threat Intelligence Index)</label>
        <div style={{ position: 'relative' }}>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Query phone numbers, suspicious domains, scam handles, or keywords..." style={{ width: '100%', padding: '15px 18px', background: 'rgba(15, 23, 42, 0.85)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'monospace', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} />
        </div>
      </div>

      {/* Filter Category Pills */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', overflowX: 'auto', paddingBottom: '6px' }}>
        {['ALL', 'PHISHING', 'FINANCIAL FRAUD', 'DIGITAL ARREST', 'MALWARE APK'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategoryFilter(cat)}
            style={{
              padding: '9px 18px',
              borderRadius: '24px',
              background: selectedCategoryFilter === cat ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'rgba(30, 41, 59, 0.7)',
              border: selectedCategoryFilter === cat ? '1px solid #38bdf8' : '1px solid rgba(51, 65, 85, 0.8)',
              color: selectedCategoryFilter === cat ? '#fff' : '#94a3b8',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: selectedCategoryFilter === cat ? '0 0 15px rgba(14, 165, 233, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Broadcast Modal Overlay */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '580px', boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(14, 165, 233, 0.15)' }}>
            <h3 style={{ margin: '0 0 18px 0', color: '#38bdf8', fontSize: '19px', fontWeight: '800' }}>🚨 Broadcast Modern Cyber Scam Alert</h3>
            <form onSubmit={handleBroadcastThreat}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Alert Title</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g., Fake CBI Skype Video 'Digital Arrest' Extortion" style={{ width: '100%', padding: '13px 15px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Threat Classification</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} style={{ width: '100%', padding: '13px 15px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
                  <option value="Phishing">Phishing Link</option>
                  <option value="Financial Fraud">Financial Fraud</option>
                  <option value="Digital Arrest">Digital Arrest Extortion</option>
                  <option value="Malware APK">Malware / APK Sideload</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Target Handle / Vector / URL</label>
                <input type="text" required value={newTarget} onChange={(e) => setNewTarget(e.target.value)} placeholder="e.g., @skype_cbi_fake or update.apk" style={{ width: '100%', padding: '13px 15px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'monospace' }} />
              </div>
              <div style={{ marginBottom: '22px' }}>
                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Incident Tactical Breakdown</label>
                <textarea rows="3" required value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Explain how the scam operates so community members stay protected..." style={{ width: '100%', padding: '13px 15px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', color: '#fff', borderRadius: '10px', fontSize: '14px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '800', cursor: 'pointer', boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)' }}>🚀 Submit Broadcast</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', background: 'rgba(51, 65, 85, 0.8)', border: 'none', borderRadius: '10px', color: '#cbd5e1', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Feeds Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '14px' }}>🔄 Synchronizing global threat intelligence feeds...</div>
      ) : filteredScams.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '16px', border: '1px dashed #334155', color: '#94a3b8' }}>No threat alerts matching your active filter criteria were found.</div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredScams.map((scam) => (
            <div key={scam.id} style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.75) 100%)', borderLeft: '5px solid #ef4444', padding: '24px', borderRadius: '16px', borderTop: '1px solid rgba(51, 65, 85, 0.8)', borderRight: '1px solid rgba(51, 65, 85, 0.8)', borderBottom: '1px solid rgba(51, 65, 85, 0.8)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.2s ease' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#fff', fontWeight: '800', letterSpacing: '0.3px' }}>{scam.title}</h3>
                <span style={getCategoryBadgeStyle(scam.category)}>{scam.category}</span>
              </div>

              <div style={{ display: 'flex', gap: '24px', fontSize: '12.5px', color: '#94a3b8', marginBottom: '16px', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.5)' }}>
                <span><strong>Target Vector:</strong> <code style={{ color: '#38bdf8', background: 'rgba(14, 165, 233, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>{scam.target_info || 'N/A'}</code></span>
                <span><strong>Reported By:</strong> <span style={{ color: '#cbd5e1' }}>{scam.reporter}</span></span>
                <span><strong>Timestamp:</strong> <span style={{ color: '#cbd5e1' }}>{new Date(scam.created_at).toLocaleString()}</span></span>
              </div>

              <p style={{ margin: '0 0 18px 0', color: '#cbd5e1', fontSize: '14px', background: 'rgba(30, 41, 59, 0.4)', padding: '14px', borderRadius: '10px', lineHeight: '1.6', border: '1px solid rgba(51, 65, 85, 0.4)' }}>{scam.description}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(51, 65, 85, 0.6)', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <button onClick={() => handleUpvote(scam.id)} style={{ background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', padding: '9px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(14, 165, 233, 0.1)' }}>👍 Confirm Dangerous ({scam.upvotes})</button>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" style={{ color: '#f87171', fontSize: '12.5px', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>🚨 Report Fraud to National Cyber Cell (1930) →</a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ScamIntelligence;