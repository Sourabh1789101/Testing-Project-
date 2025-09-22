import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import AdminDashboard from './components/AdminDashboard';
import LogConsumption from './components/LogConsumption';
import VendorDashboard from './components/VendorDashboard';
import Reports from './components/Reports';
import './styles/styles.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === 'Company Admin') {
      setCurrentScreen('admin-dashboard');
    } else {
      setCurrentScreen('vendor-dashboard');
    }
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    setUserRole(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigation} />;
      case 'log-consumption':
        return <LogConsumption onNavigate={handleNavigation} />;
      case 'vendor-dashboard':
        return <VendorDashboard onNavigate={handleNavigation} />;
      case 'reports':
        return <Reports userRole={userRole} onNavigate={handleNavigation} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {userRole && currentScreen !== 'login' && (
        <nav className="app-navigation">
          <div className="nav-container">
            <div className="nav-brand">
              <span>🏢</span>
              <h3>Pantry Management</h3>
            </div>
            <div className="nav-user">
              <span>Welcome, {userRole}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      {renderScreen()}
    </div>
  );
}

export default App;