import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@zenithguru.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Demo login - accept demo credentials
    if (email === 'admin@zenithguru.com' && password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      localStorage.setItem('adminUser', JSON.stringify({ email: 'admin@zenithguru.com', name: 'Admin' }));
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please use demo credentials.');
    }
    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      {/* Back to Home Button */}
      <Link to="/" className="back-to-home">
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="login-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <span className="logo-icon">🎓</span>
              <span className="logo-text">Zenith Admin</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to manage your platform</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="spin" size={18} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo Credentials: <strong>admin@zenithguru.com / admin123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
