import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Operative';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload();
  };

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    background: isActive ? '#0284c7' : 'transparent',
    color: '#fff',
    transition: 'all 0.2s ease',
  });

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 40px', 
      background: 'rgba(30, 41, 59, 0.85)', 
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(51, 65, 85, 0.6)', 
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>🛡️</span>
        <h3 style={{ margin: 0, color: '#38bdf8', letterSpacing: '0.5px', fontSize: '18px' }}>CyberShield 360</h3>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <NavLink to="/" style={navLinkStyle}>🏠 Home</NavLink>
        <NavLink to="/scams" style={navLinkStyle}>📡 Scam Intel</NavLink>
        <NavLink to="/evidence" style={navLinkStyle}>📁 Vault</NavLink>
        <NavLink to="/roadmap" style={navLinkStyle}>🗺️ Roadmap</NavLink>
        <NavLink to="/profile" style={navLinkStyle}>👤 {username}</NavLink>
        
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            background: 'rgba(127, 29, 29, 0.8)', 
            border: '1px solid rgba(239, 68, 68, 0.4)', 
            borderRadius: '8px', 
            color: '#fca5a5', 
            cursor: 'pointer', 
            fontWeight: '600',
            fontSize: '14px',
            marginLeft: '10px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#dc2626'}
          onMouseOut={(e) => e.target.style.background = 'rgba(127, 29, 29, 0.8)'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;