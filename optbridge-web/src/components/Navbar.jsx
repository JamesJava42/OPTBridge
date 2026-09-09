import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top service-nav">
      <div className="container">
        <Link className="navbar-brand service-brand" to="/" onClick={closeMenu}>
          <span className="brand-mark"><Icon name="layers" size={19} /></span>
          <span>
            OPTBridge
            <small>Job search copilot</small>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <a className="nav-link" href="/#features" onClick={closeMenu}>
              Features
            </a>
            <a className="nav-link" href="/#how-it-works" onClick={closeMenu}>
              How it works
            </a>
            <a className="nav-link" href="/#plans" onClick={closeMenu}>
              Pricing
            </a>
            <a className="nav-link" href="/#faq" onClick={closeMenu}>
              FAQ
            </a>
            <NavLink className="nav-link portal-login-link" to="/login" onClick={closeMenu}>
              Tracker login
            </NavLink>
            <NavLink className="btn btn-primary ms-lg-2" to="/join" onClick={closeMenu}>
              Check your fit <Icon name="arrow" size={16} />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
