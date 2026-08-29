import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const destinations = { subscriber: '/tracker', employee: '/support', admin: '/admin' };
const allowedRoutes = { subscriber: ['/tracker', '/account', '/help'], employee: ['/support'], admin: ['/admin', '/admin/inbox', '/support'] };

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const portalDemoEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_PORTAL_DEMO === 'true';

  if (user) return <Navigate to={destinations[user.role]} replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const result = login(username, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    const requested = location.state?.from;
    const allowedRequested = requested && allowedRoutes[result.user.role]?.includes(requested);
    navigate(allowedRequested ? requested : destinations[result.user.role], { replace: true });
  };

  const fillDemo = (role) => {
    const accounts = {
      subscriber: ['maya.student', 'demo123'],
      employee: ['alex.support', 'demo123'],
      admin: ['admin', 'admin123'],
    };
    setUsername(accounts[role][0]);
    setPassword(accounts[role][1]);
    setError('');
  };

  return (
    <main className="login-page">
      <section className="login-story">
        <Link className="portal-brand login-brand" to="/">
          <span className="brand-mark"><Icon name="layers" size={19} /></span>
          <span>OPTBridge<small>Secure member portal</small></span>
        </Link>
        <div className="login-story-copy">
          <span className="login-kicker"><Icon name="shield" size={16} /> Private by design</span>
          <h1>Your search work.<br />One clear view.</h1>
          <p>Track supported opportunities, review next actions, and stay aligned throughout your 30-day sprint.</p>
          <div className="login-preview-card">
            <div><span className="company-mark green">A</span><span><strong>Business Intelligence Analyst</strong><small>Resume aligned · Ready for review</small></span></div>
            <span className="status-pill status-update">Ready</span>
          </div>
        </div>
        <p className="login-legal">Access is limited by subscription and assigned role. OPTBridge does not guarantee employment outcomes.</p>
      </section>

      <section className="login-form-side">
        <div className="login-form-wrap">
          <div className="login-heading"><p>Welcome back</p><h2>Sign in to your workspace</h2><span>Use the username provided with your account.</span></div>
          {import.meta.env.PROD && <div className="login-release-note"><Icon name="shield" size={16} /><span><strong>Early-access release</strong> Member accounts are activated personally. The public preview contains sample student data only.</span></div>}
          {error && <div className="login-error" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <button className="btn btn-primary btn-lg w-100" type="submit">Sign in <Icon name="arrow" size={18} /></button>
          </form>
          {portalDemoEnabled && <div className="demo-access">
            <span>Prototype access</span>
            <div>
              <button type="button" onClick={() => fillDemo('subscriber')}>Student portal demo</button>
              {import.meta.env.DEV && <button type="button" onClick={() => fillDemo('employee')}>Employee</button>}
              {import.meta.env.DEV && <button type="button" onClick={() => fillDemo('admin')}>Admin</button>}
            </div>
            <small>Sample data only. Demo access is not a real customer account.</small>
          </div>}
          <p className="login-help">Need account help? <Link to="/contact?topic=account-access">Contact support</Link></p>
        </div>
      </section>
    </main>
  );
}

export default Login;
