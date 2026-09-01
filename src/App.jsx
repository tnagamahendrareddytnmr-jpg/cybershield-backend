import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ZomatoLogin from './pages/Login';
import Home from './pages/Home';
import EvidenceVault from './pages/EvidenceVault';
import ScamIntelligence from './pages/ScamIntelligence';
import RecoveryRoadmap from './pages/RecoveryRoadmap';
import Profile from './pages/Profile';

import Navbar from './components/Navbar';
import ThreatScanner from './components/ThreatScanner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('token')
  );

  return (
    <Router>
      <div
        style={{
          background: '#0f172a',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        {isAuthenticated && <Navbar />}

        <Routes>
          {/* Login */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <ZomatoLogin
                  setIsAuthenticated={setIsAuthenticated}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Home */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Threat Scanner */}
          <Route
            path="/scanner"
            element={
              isAuthenticated ? (
                <ThreatScanner />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Scam Intelligence */}
          <Route
            path="/scams"
            element={
              isAuthenticated ? (
                <ScamIntelligence />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Evidence Vault */}
          <Route
            path="/evidence"
            element={
              isAuthenticated ? (
                <EvidenceVault />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Recovery Roadmap */}
          <Route
            path="/roadmap"
            element={
              isAuthenticated ? (
                <RecoveryRoadmap />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;