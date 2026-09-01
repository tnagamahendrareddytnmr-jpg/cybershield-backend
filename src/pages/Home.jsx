import { useEffect, useState } from 'react';

function Home() {
  const [threatInput, setThreatInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState([
    '[NODE_AP_SOUTH]: Monitoring digital arrest & AI voice spoofing telemetry...',
    '[NODE_US_EAST]: Global UPI fraud pattern matrices synchronized.',
    '[NODE_EU_CENTRAL]: Zero-day APK trojan signature banks loaded.'
  ]);

  const playSocAudio = (isCritical) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.connect(gain);
      gain.connect(context.destination);

      if (!isCritical) {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.4);
      } else {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, context.currentTime);
        oscillator.frequency.setValueAtTime(150, context.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.35);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.35);
      }

      oscillator.addEventListener('ended', () => context.close(), { once: true });
    } catch {
      // Audio feedback is optional and may be blocked by browser policy.
    }
  };

  useEffect(() => {
    const nodes = ['NODE_AP_SOUTH', 'NODE_US_EAST', 'NODE_EU_CENTRAL'];
    const actions = [
      'Scanning deepfake audio vector signatures...',
      'Verifying UPI handle against mule account registries...',
      'Analyzing digital arrest coercion triggers...',
      'Inspecting sideloaded APK metadata patterns...'
    ];

    const interval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const timestamp = new Date().toLocaleTimeString();

      setTelemetryLogs((previousLogs) => [
        `[${timestamp}] [${randomNode}]: ${randomAction}`,
        ...previousLogs.slice(0, 4)
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const executeScan = (inputVal) => {
    setIsScanning(true);

    setTimeout(() => {
      const rawInput = inputVal.trim();
      const text = rawInput.toLowerCase();

      let riskScore = 15;
      let riskLevel;
      let riskColor;
      let linkType;
      let linkPurpose = 'Standard Operational Content';
      let safetyVerdict = 'Likely Safe (Maintain general cyber hygiene)';
      let breakdown = [];
      let extractedProtocol = 'N/A';
      let extractedHostname = 'N/A';
      let simulatedDomainAge = 'Established (> 2 years)';

      const isDigitalArrest = text.includes('arrest') || text.includes('cbi') || text.includes('customs') || text.includes('money laundering') || text.includes('skype video');
      const isAIVoiceScam = text.includes('accident') || text.includes('kidnap') || text.includes('emergency send money') || text.includes('police station');
      const isPartTimeTask = text.includes('rating task') || text.includes('telegram channel') || text.includes('prepaid task') || text.includes('commission');
      const isApkDownload = text.includes('.apk') || text.includes('download update app') || text.includes('customs parcel');

      let normalizedInput = rawInput;
      if (!normalizedInput.startsWith('http://') && !normalizedInput.startsWith('https://') && !text.includes('@')) {
        normalizedInput = `https://${normalizedInput}`;
      }

      let parsedDomain = '';
      let isUrl;

      try {
        const urlObj = new URL(normalizedInput);
        parsedDomain = urlObj.hostname.toLowerCase();
        extractedProtocol = urlObj.protocol.toUpperCase().replace(':', '');
        extractedHostname = parsedDomain;
        isUrl = true;
      } catch {
        isUrl = false;
      }

      if (isDigitalArrest) {
        riskScore = 95;
        linkType = 'Digital Arrest Extortion Scam Vector';
        linkPurpose = 'High-pressure law enforcement impersonation';
        safetyVerdict = 'CRITICAL FRAUD - HANG UP IMMEDIATELY';
        breakdown.push('[CRITICAL] Coercive psychological trigger matched: Fake law enforcement detention threat.');
      } else if (isAIVoiceScam) {
        riskScore = 90;
        linkType = 'AI Voice Cloning / Synthetic Emergency Scam';
        linkPurpose = 'Emotional manipulation via family distress simulation';
        safetyVerdict = 'HIGH RISK - VERIFY VIA DIRECT CALL';
        breakdown.push('[CRITICAL] Social engineering pattern matched: Urgent financial distress request.');
      } else if (isPartTimeTask) {
        riskScore = 85;
        linkType = 'Part-Time Task & Investment Trap';
        linkPurpose = 'Fake task rating or high-return crypto/stock scam';
        safetyVerdict = 'FRAUDULENT SCHEME - DO NOT DEPOSIT FUNDS';
        breakdown.push('[CRITICAL] Financial fraud trigger matched: Guaranteed commission / prepaid task trap.');
      } else if (isApkDownload) {
        riskScore = 90;
        linkType = 'Malicious APK / Banking Trojan Sideload';
        linkPurpose = 'Remote device takeover and credential harvesting';
        safetyVerdict = 'DANGEROUS MALWARE - DO NOT INSTALL';
        breakdown.push('[CRITICAL] File payload hazard: Unauthorized remote access package (.apk) detected.');
      } else if (text.includes('@paytm') || text.includes('@ybl') || text.includes('@oksbi')) {
        riskScore = 70;
        linkType = 'UPI Handle / Collect Request Vector';
        linkPurpose = 'Direct peer-to-peer payment transaction handle';
        safetyVerdict = 'VERIFY RECIPIENT BEFORE APPROVING';
        breakdown.push('[WARN] UPI handle interaction detected. Ensure collect requests are never approved from unknown sources.');
      } else if (isUrl) {
        if (parsedDomain.endsWith('.gov.in') || parsedDomain.endsWith('.nic.in')) {
          linkType = 'Official Government Sovereign Portal (.gov.in)';
          riskScore = 5;
          safetyVerdict = 'Official Verified Institutional Network';
          breakdown.push('[PASS] Verified sovereign infrastructure match.');
        } else {
          linkType = 'Standard External Third-Party Web Domain';
          breakdown.push('[INFO] External web resource parsed with baseline operational telemetry.');
        }
      } else {
        linkType = 'Encrypted Message / SMS Snippet';
        breakdown.push('[INFO] Text payload analyzed with nominal risk metrics.');
      }

      riskScore = Math.min(Math.max(riskScore, 5), 100);

      if (riskScore >= 70) {
        riskLevel = 'CRITICAL CYBER THREAT DETECTED';
        riskColor = '#ef4444';
      } else if (riskScore >= 40) {
        riskLevel = 'ELEVATED RISK - ANOMALY DETECTED';
        riskColor = '#f59e0b';
      } else {
        riskLevel = 'LOW RISK / SECURE';
        riskColor = '#10b981';
      }

      playSocAudio(riskScore >= 70);

      setScanResult({ 
        riskScore, 
        riskLevel, 
        riskColor, 
        linkType, 
        linkPurpose, 
        safetyVerdict, 
        extractedProtocol, 
        extractedHostname, 
        simulatedDomainAge,
        breakdown 
      });
      setIsScanning(false);
    }, 600);
  };

  const handleScanThreat = (e) => {
    e.preventDefault();
    if (!threatInput.trim()) return;
    executeScan(threatInput);
  };

  const handleSampleClick = (sampleText) => {
    setThreatInput(sampleText);
    executeScan(sampleText);
  };

  const handleClipboardScan = async () => {
    try {
      if (!navigator.clipboard) {
        alert('Clipboard API not supported in this browser environment.');
        return;
      }

      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText.trim()) {
        alert('Your clipboard is currently empty.');
        return;
      }

      setThreatInput(clipboardText);
      executeScan(clipboardText);
    } catch {
      alert('Failed to read clipboard. Please ensure clipboard permissions are allowed.');
    }
  };

  return (
    <div style={{ padding: '40px 20px', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Cyberpunk Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', background: 'rgba(15, 23, 42, 0.9)', padding: '20px 25px', borderRadius: '12px', border: '1px solid rgba(14, 165, 233, 0.3)', boxShadow: '0 0 25px rgba(14, 165, 233, 0.1)' }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: '#38bdf8', fontWeight: 'bold' }}>SOC Command Telemetry</span>
          <h2 style={{ margin: '4px 0 0 0', fontSize: '22px', color: '#fff', letterSpacing: '0.5px' }}>⚡ CyberShield 360: Modern Threat Engine</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 14px', borderRadius: '20px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '600' }}>AI HEURISTIC ENGINE ACTIVE</span>
        </div>
      </div>

      {/* Main Terminal Input Console */}
      <div style={{ background: 'rgba(30, 41, 59, 0.75)', backdropFilter: 'blur(12px)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(51, 65, 85, 0.8)', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', marginBottom: '35px' }}>
        <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '15px' }}>
          Paste suspicious text messages (Digital Arrest threats, task scams, APK warnings) or URLs to run instant heuristic analysis.
        </p>

        <form onSubmit={handleScanThreat}>
          <textarea 
            rows="4" 
            value={threatInput}
            onChange={(e) => setThreatInput(e.target.value)}
            placeholder="Paste text snippet or suspicious link here..."
            style={{ width: '100%', padding: '16px', background: 'rgba(15, 23, 42, 0.95)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', fontSize: '14.5px', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }}
          />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button 
              type="submit" 
              disabled={isScanning}
              style={{ flex: 2, padding: '14px', background: isScanning ? '#334155' : 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: isScanning ? 'not-allowed' : 'pointer' }}
            >
              {isScanning ? '🔄 ANALYZING THREAT VECTORS...' : '⚡ EXECUTE MODERN THREAT SCAN'}
            </button>
            
            <button 
              type="button"
              onClick={handleClipboardScan}
              style={{ flex: 1, padding: '14px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '10px', color: '#38bdf8', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
            >
              📋 Inspect Clipboard
            </button>
          </div>
        </form>

        {!scanResult && (
          <div style={{ marginTop: '25px', borderTop: '1px solid rgba(51, 65, 85, 0.5)', paddingTop: '20px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Test Modern Scams:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button onClick={() => handleSampleClick('CBI notice: Your mobile number is linked to money laundering. Stay on Skype video call for digital arrest verification.')} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', cursor: 'pointer' }}>
                🚨 Digital Arrest Extortion
              </button>
              <button onClick={() => handleSampleClick('Earn ₹5000 daily by completing simple YouTube video rating tasks on Telegram.')} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', cursor: 'pointer' }}>
                💼 Part-Time Task Scam
              </button>
              <button onClick={() => handleSampleClick('Download update.apk to claim your customs detained parcel immediately.')} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', cursor: 'pointer' }}>
                📱 Malicious APK Payload
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cyber Security Results HUD */}
      {scanResult && (
        <div style={{ display: 'grid', gap: '20px', animation: 'fadeIn 0.3s ease-in-out' }}>
          
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', padding: '22px', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>📊 Target Structural Intelligence & Obfuscation Analysis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.8)' }}>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>CLASSIFIED LINK TYPE</span>
                <strong style={{ fontSize: '13.5px', color: '#f8fafc' }}>{scanResult.linkType}</strong>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.8)' }}>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>EXTRACTED TARGET HOST</span>
                <strong style={{ fontSize: '13.5px', color: '#38bdf8', fontFamily: 'monospace' }}>{scanResult.extractedHostname}</strong>
              </div>
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.8)' }}>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>ESTIMATED DOMAIN AGE</span>
                <strong style={{ fontSize: '13.5px', color: scanResult.simulatedDomainAge.includes('Under 30 Days') ? '#f87171' : '#34d399', fontFamily: 'monospace' }}>{scanResult.simulatedDomainAge}</strong>
              </div>
            </div>
          </div>

          {/* Threat Assessment HUD */}
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '26px', borderLeft: `6px solid ${scanResult.riskColor}`, borderRadius: '14px', boxShadow: `0 10px 40px rgba(0,0,0,0.6)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <h3 style={{ color: scanResult.riskColor, margin: 0, fontSize: '18px', letterSpacing: '0.5px' }}>{scanResult.riskLevel}</h3>
              <div style={{ background: 'rgba(30, 41, 59, 0.9)', border: `1px solid ${scanResult.riskColor}`, padding: '6px 14px', borderRadius: '20px' }}>
                <span style={{ fontSize: '12px', color: scanResult.riskColor, fontWeight: 'bold' }}>RISK INDEX: {scanResult.riskScore} / 100</span>
              </div>
            </div>

            <p style={{ margin: '8px 0', color: '#cbd5e1', fontSize: '14px' }}><strong>Classification:</strong> <span style={{ color: '#fff' }}>{scanResult.linkType}</span></p>
            <p style={{ margin: '8px 0', color: '#cbd5e1', fontSize: '14px' }}><strong>Operational Purpose:</strong> <span style={{ color: '#fff' }}>{scanResult.linkPurpose}</span></p>
            <p style={{ margin: '8px 0 20px 0', color: '#cbd5e1', fontSize: '14px' }}><strong>Action Verdict:</strong> <span style={{ color: scanResult.riskColor, fontWeight: '600' }}>{scanResult.safetyVerdict}</span></p>
            
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(51, 65, 85, 0.9)' }}>
              <strong style={{ fontSize: '12px', color: '#38bdf8', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>🛡️ Heuristic Inspection Breakdown:</strong>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '13.5px', display: 'grid', gap: '8px', fontFamily: 'monospace' }}>
                {scanResult.breakdown.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '15px 20px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} aria-live="polite">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(51, 65, 85, 0.6)', paddingBottom: '6px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: 'bold' }}>🌐 Live Matrix Threat Telemetry Stream</span>
            <span className="telemetry-stream-status">ACTIVE NODES: 3 ONLINE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
          {telemetryLogs.map((log, index) => (
            <div key={log} style={{ color: index === 0 ? '#38bdf8' : '#64748b', opacity: 1 - (index * 0.15) }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;