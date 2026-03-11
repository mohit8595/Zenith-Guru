import React, { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Globe,
  Palette,
  Database,
  Mail,
  Shield,
  Save,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import './AdminSettings.css';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  return (
    <div className="admin-settings">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              <p className="section-description">Update your personal information</p>
              
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue="Admin User" />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue="admin@zenithguru.com" />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue="+91 9876543210" />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <input type="text" defaultValue="Super Admin" disabled />
              </div>

              <button className="save-btn">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <p className="section-description">Manage your password and security options</p>
              
              <div className="security-option">
                <div className="option-info">
                  <Lock size={20} />
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your password regularly for security</p>
                  </div>
                </div>
                <button className="option-btn">Change</button>
              </div>
              
              <div className="security-option">
                <div className="option-info">
                  <Shield size={20} />
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="security-option">
                <div className="option-info">
                  <Mail size={20} />
                  <div>
                    <h4>Login Notifications</h4>
                    <p>Get notified of new login attempts</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <p className="section-description">Choose how you want to be notified</p>
              
              <div className="notification-option">
                <div className="option-info">
                  <Bell size={20} />
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive updates via email</p>
                  </div>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-option">
                <div className="option-info">
                  <Bell size={20} />
                  <div>
                    <h4>Push Notifications</h4>
                    <p>Receive push notifications on your device</p>
                  </div>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="notification-option">
                <div className="option-info">
                  <Bell size={20} />
                  <div>
                    <h4>SMS Notifications</h4>
                    <p>Receive important updates via SMS</p>
                  </div>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <p className="section-description">Customize the look and feel</p>
              
              <div className="theme-options">
                <h4>Theme</h4>
                <div className="theme-grid">
                  <button 
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={24} />
                    <span>Light</span>
                  </button>
                  <button 
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={24} />
                    <span>Dark</span>
                  </button>
                  <button 
                    className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    <Monitor size={24} />
                    <span>System</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Language Settings */}
          {activeTab === 'language' && (
            <div className="settings-section">
              <h2>Language Settings</h2>
              <p className="section-description">Choose your preferred language</p>
              
              <div className="form-group">
                <label>Select Language</label>
                <select defaultValue="en">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                  <option value="gu">Gujarati</option>
                </select>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="settings-section">
              <h2>Backup Settings</h2>
              <p className="section-description">Manage your data backups</p>
              
              <div className="backup-option">
                <div className="option-info">
                  <Database size={20} />
                  <div>
                    <h4>Auto Backup</h4>
                    <p>Automatically backup your data daily</p>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <button className="backup-btn">
                <Database size={18} />
                Manual Backup Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
