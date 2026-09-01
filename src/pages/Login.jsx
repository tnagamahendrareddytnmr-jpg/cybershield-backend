import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ZomatoLogin({ setIsAuthenticated }) {
  const [step, setStep] = useState(1); // Step 1: Phone, Step 2: OTP, Step 3: Name Registration (if new)
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handler for Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { phone });
      alert(`[Dev Hint] Your test OTP is: ${res.data.mockOtp}`);
      setStep(2); // Move to OTP input screen
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
    }
  };

  // Handler for Step 2 & 3: Verify OTP & Handle Registration if new
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp, name });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.name || name);
      setIsAuthenticated(true);
      navigate('/'); // Instantly redirects to the main page dashboard!
    } catch (err) {
      if (err.response?.data?.requiresRegistration) {
        setStep(3); // Switch to Name registration step for new users
      } else {
        setError(err.response?.data?.error || 'Verification failed.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a', color: '#fff' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '12px', width: '400px', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#0ea5e9', marginBottom: '8px' }}>CyberShield 360</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Log in or sign up to access your security vault</p>
        </div>

        {error && <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px' }}>{error}</div>}

        {/* STEP 1: Enter Phone Number */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Phone Number</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter mobile number" 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#0284c7', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              Send OTP
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>OTP sent to <strong>{phone}</strong> <span style={{ color: '#38bdf8', cursor: 'pointer' }} onClick={() => setStep(1)}>(Edit)</span></p>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Enter 4-Digit OTP</label>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="1234" 
                maxLength="4"
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', letterSpacing: '4px', textAlign: 'center', fontSize: '18px' }}
              />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#10b981', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              Verify & Continue
            </button>
          </form>
        )}

        {/* STEP 3: Complete Profile (Name Entry for New Users) */}
        {step === 3 && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', fontSize: '13px', color: '#38bdf8' }}>
              New account detected! Please enter your name to complete registration.
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#0284c7', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
              Complete Registration & Enter
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default ZomatoLogin;