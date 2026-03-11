import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  UserCheck,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronLeft
} from 'lucide-react';
import './AdminLayout.css';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/courses', icon: BookOpen, label: 'Manage Courses' },
  { path: '/admin/students', icon: Users, label: 'Students' },
  { path: '/admin/instructors', icon: GraduationCap, label: 'Instructors' },
  { path: '/admin/enrollments', icon: UserCheck, label: 'Enrollments' },
  { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Get admin from localStorage
  const getAdmin = () => {
    const adminStr = localStorage.getItem('adminUser');
    return adminStr ? JSON.parse(adminStr) : { name: 'Admin', email: 'admin@zenithguru.com' };
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const admin = getAdmin();

  return (
    <div className={`admin-layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar - Static (always open) */}
      <aside className={`admin-sidebar open ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Zenith Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="header-right">
            <button className="header-btn" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="header-btn notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="admin-profile">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
              <div className="profile-info">
                <span className="profile-name">{admin?.name || 'Admin'}</span>
                <span className="profile-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
