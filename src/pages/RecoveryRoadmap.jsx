import { useState, useEffect } from 'react';

function RecoveryRoadmap() {
  const [checkedSteps, setCheckedSteps] = useState(() => {
    const saved = localStorage.getItem('recovery_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('recovery_progress', JSON.stringify(checkedSteps));
  }, [checkedSteps]);

  const steps = [
    {
      id: 1,
      phase: 'Immediate Containment (0 - 1 Hours)',
      title: 'Disconnect & Secure Devices',
      description: 'Immediately disconnect infected or compromised devices from Wi-Fi and cellular networks to halt unauthorized remote access or data exfiltration.'
    },
    {
      id: 2,
      phase: 'Immediate Containment (0 - 1 Hours)',
      title: 'Freeze Bank & Credit Cards',
      description: 'Contact your financial institutions immediately to freeze compromised debit/credit cards, stop pending unauthorized wire transfers, and report fraudulent transactions.'
    },
    {
      id: 3,
      phase: 'Credential Revocation (1 - 3 Hours)',
      title: 'Change Passwords & Enable MFA',
      description: 'Log out of all active sessions and update your master passwords across primary email, banking, and social accounts. Enforce Multi-Factor Authentication (MFA) everywhere.'
    },
    {
      id: 4,
      phase: 'Evidence & Reporting (3 - 24 Hours)',
      title: 'Preserve Digital Evidence',
      description: 'Take screenshots of fraudulent messages, transaction IDs, scammer profiles, and log them into your CyberShield 360 Digital Evidence Vault.'
    },
    {
      id: 5,
      phase: 'Evidence & Reporting (3 - 24 Hours)',
      title: 'File Cybercrime Complaints',
      description: 'Report the incident to local cybercrime authorities (e.g., National Cyber Crime Reporting Portal) and ICANN/domain registrars if phishing sites were involved.'
    },
    {
      id: 6,
      phase: 'Long-term Remediation',
      title: 'Run Antivirus & Audit Devices',
      description: 'Perform a deep system scan using reputable antimalware software, review connected third-party app permissions, and monitor your credit report regularly.'
    }
  ];

  const toggleStep = (id) => {
    setCheckedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div style={{ padding: '40px', color: '#fff', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Incident Recovery Roadmap</h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
        Follow this step-by-step containment and remediation protocol to secure your digital footprint following a security breach.
      </p>

      {/* Progress Bar Card */}
      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Recovery Progress</span>
          <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{progressPercent}% Complete ({completedCount}/{steps.length} Steps)</span>
        </div>
        <div style={{ width: '100%', background: '#0f172a', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, background: '#0ea5e9', height: '100%', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {steps.map((step) => {
          const isChecked = !!checkedSteps[step.id];
          return (
            <div 
              key={step.id} 
              onClick={() => toggleStep(step.id)}
              style={{ 
                background: '#1e293b', 
                padding: '20px', 
                borderRadius: '8px', 
                border: `1px solid ${isChecked ? '#10b981' : '#334155'}`,
                cursor: 'pointer',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                transition: 'all 0.2s ease'
              }}
            >
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={() => toggleStep(step.id)}
                style={{ width: '20px', height: '20px', marginTop: '3px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0ea5e9', fontWeight: 'bold', letterSpacing: '1px' }}>
                  {step.phase}
                </span>
                <h4 style={{ fontSize: '18px', margin: '5px 0 8px 0', textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? '#94a3b8' : '#fff' }}>
                  {step.title}
                </h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecoveryRoadmap;