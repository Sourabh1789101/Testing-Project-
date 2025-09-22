import React, { useState } from 'react';

function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    } else {
      alert('Please select a role');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🏢</span>
          <h2>Office Pantry Management</h2>
          <p>Select your role to continue</p>
        </div>
        
        <div className="role-selection">
          <div 
            className={`role-card ${selectedRole === 'Company Admin' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('Company Admin')}
          >
            <span className="role-icon">👨‍💼</span>
            <h3>Company Admin</h3>
            <p>Manage inventory, vendors, and view reports</p>
          </div>
          
          <div 
            className={`role-card ${selectedRole === 'Vendor' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('Vendor')}
          >
            <span className="role-icon">🚚</span>
            <h3>Vendor</h3>
            <p>Update inventory and manage deliveries</p>
          </div>
        </div>
        
        <button 
          className="login-btn"
          onClick={handleLogin}
          disabled={!selectedRole}
        >
          Continue as {selectedRole || 'User'}
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;