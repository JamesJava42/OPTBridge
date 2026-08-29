import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Icon from './Icon.jsx';

const navigation = {
  subscriber: [
    { to: '/tracker', label: 'My tracker', icon: 'layers' },
    { to: '/account', label: 'Plan & access', icon: 'human' },
    { to: '/help', label: 'Get help', icon: 'document' },
  ],
  employee: [
    { to: '/support', label: 'Customer issues', icon: 'document' },
  ],
  admin: [
    { to: '/admin', label: 'Access control', icon: 'shield' },
    { to: '/admin/inbox', label: 'Owner inbox', icon: 'compass' },
    { to: '/support', label: 'Customer issues', icon: 'document' },
  ],
};

const roleLabels = { subscriber: 'Subscriber', employee: 'Support employee', admin: 'Administrator' };

function PortalLayout({ title, eyebrow, actions, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <NavLink className="portal-brand" to="/">
          <span className="brand-mark"><Icon name="layers" size={18} /></span>
          <span>OPTBridge<small>Member portal</small></span>
        </NavLink>
        <nav className="portal-nav" aria-label="Portal navigation">
          <span className="portal-nav-label">Workspace</span>
          {(navigation[user.role] || []).map((item) => (
            <NavLink className={({ isActive }) => `portal-nav-link ${isActive ? 'active' : ''}`} to={item.to} key={item.to}>
              <Icon name={item.icon} size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="portal-sidebar-bottom">
          <div className="portal-user">
            <span className="portal-avatar">{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
            <span><strong>{user.name}</strong><small>{roleLabels[user.role]}</small></span>
          </div>
          <button className="portal-logout" type="button" onClick={handleLogout}>Sign out</button>
        </div>
      </aside>
      <div className="portal-main">
        <header className="portal-mobile-header">
          <NavLink className="portal-brand" to="/"><span className="brand-mark"><Icon name="layers" size={17} /></span><span>OPTBridge</span></NavLink>
          <button className="portal-logout" type="button" onClick={handleLogout}>Sign out</button>
        </header>
        <nav className="portal-mobile-nav" aria-label="Mobile portal navigation">
          {(navigation[user.role] || []).map((item) => (
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={item.to} key={item.to}><Icon name={item.icon} size={15} />{item.label}</NavLink>
          ))}
        </nav>
        <div className="portal-page-header">
          <div><p>{eyebrow}</p><h1>{title}</h1></div>
          {actions && <div className="portal-header-actions">{actions}</div>}
        </div>
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}

export default PortalLayout;
