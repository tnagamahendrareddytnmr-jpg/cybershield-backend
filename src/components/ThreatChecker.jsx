import { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ThreatChecker() {
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = (e) => {
    e.preventDefault();
    if (!inputData.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const lowerText = inputData.toLowerCase();
      let flags = [];
      
      // Heuristic rules for simulation
      if (lowerText.includes('http') || lowerText.includes('www') || lowerText.includes('.com') || lowerText.includes('.xyz')) {
        flags.push('Contains external URL or link pattern');
      }
      if (lowerText.includes('urgent') || lowerText.includes('immediately') || lowerText.includes('verify') || lowerText.includes('suspended') || lowerText.includes('bank')) {
        flags.push('High-pressure or urgency keywords detected (Social Engineering)');
      }
      if (lowerText.includes('otp') || lowerText.includes('password') || lowerText.includes('pin')) {
        flags.push('Sensitive credentials or OTP requested');
      }

      const isThreat = flags.length > 0 || lowerText.length > 20;

      setResult({
        isThreat,
        riskScore: isThreat ? (flags.length > 1 ? 'High Risk' : 'Medium Risk') : 'Low Risk',
        flags: flags.length > 0 ? flags : ['No immediate malicious pattern recognized, but remain cautious.']
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="threat-checker-card">
      <div className="threat-checker-header">
        <ShieldAlert size={24} className="accent-icon" />
        <div>
          <h3>Quick Threat Analyzer</h3>
          <p>Paste a suspicious SMS, email text, or URL to perform an instant heuristic check.</p>
        </div>
      </div>

      <form onSubmit={handleScan} className="threat-form">
        <textarea 
          rows="3"
          placeholder="Paste suspicious text or link here (e.g., 'URGENT: Your bank account is locked, click link...')"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          <Search size={16} /> {loading ? 'Analyzing Heuristics...' : 'Scan for Threats'}
        </button>
      </form>

      {result && (
        <div className={`scan-result-box ${result.isThreat ? 'warning' : 'safe'}`}>
          <div className="scan-result-title">
            {result.isThreat ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
            <span>Analysis Result: <strong>{result.riskScore}</strong></span>
          </div>
          <ul>
            {result.flags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}