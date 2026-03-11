import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import zenithLogo from '../../zenith.jpeg';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
    setError('');
  };

  // Step 1: Submit email and password - sends OTP
  const handleInitialLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First verify credentials and send OTP
      const response = await authAPI.loginWithOtp({ email, password });
      
      // If credentials are valid, OTP will be sent
      setShowOtpStep(true);
      setMaskedEmail(response.data.email);
      setSuccessMessage(`OTP sent to ${response.data.email}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and complete login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP sent to your email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.verifyOtpLogin({ email, otp });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setOtp('');
    setError('');
    setSuccessMessage('');
    
    setIsLoading(true);
    try {
      const response = await authAPI.loginWithOtp({ email, password });
      setMaskedEmail(response.data.email);
      setSuccessMessage(`New OTP sent to ${response.data.email}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
      setShowOtpStep(false);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setShowOtpStep(false);
    setOtp('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="login-page-simple">
      <div className="login-card-simple">
        <div className="login-header-simple">
          <img src={zenithLogo} alt="Zenith Guru" className="login-logo-simple" />
          <h1>Welcome Back</h1>
          <p>Sign in to continue</p>
        </div>

        {error && (
          <div className="error-simple" style={{ marginBottom: '15px' }}>{error}</div>
        )}

        {successMessage && (
          <div style={{
            padding: '10px 15px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ✓ {successMessage}
          </div>
        )}

        {/* Step 1: Email & Password */}
        {!showOtpStep ? (
          <form onSubmit={handleInitialLogin} className="login-form-simple">
            <div className="form-group-simple">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group-simple">
              <label htmlFor="password">Password</label>
              <div className="password-input-simple">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-simple"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="form-options-simple">
              <label className="remember-simple">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-simple">Forgot password?</Link>
            </div>

            <button type="submit" className="login-btn-simple" disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : 'Sign In with OTP'}
            </button>

            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#fff3cd',
              borderRadius: '5px',
              fontSize: '13px',
              color: '#856404',
              textAlign: 'center'
            }}>
              🔐 You'll receive an OTP on your registered email after clicking Sign In
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="login-form-simple">
            <div style={{
              padding: '20px',
              backgroundColor: '#e7f3ff',
              borderRadius: '8px',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📧</div>
              <div style={{ fontWeight: '600', marginBottom: '5px', fontSize: '16px' }}>
                Verification Required
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                An OTP has been sent to
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333' }}>
                {maskedEmail}
              </div>
            </div>

            <div className="form-group-simple">
              <label htmlFor="otp">Enter 6-digit OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                style={{
                  fontSize: '24px',
                  letterSpacing: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="login-btn-simple" 
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify & Sign In'}
            </button>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '15px',
              fontSize: '13px'
            }}>
              <button
                type="button"
                onClick={goBack}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← Change Credentials
              </button>
              <button
                type="button"
                onClick={resendOtp}
                disabled={isLoading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        <div className="login-footer-simple">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p className="admin-link-text">Are you an admin? <Link to="/admin">Admin Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

