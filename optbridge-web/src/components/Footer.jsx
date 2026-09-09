import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

function Footer() {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-5">
            <Link className="footer-brand" to="/">
              <span className="brand-mark"><Icon name="layers" size={18} /></span> OPTBridge
            </Link>
            <p className="text-secondary mb-3">
              A transparent AI + human job-search copilot for international graduates navigating OPT and STEM OPT.
            </p>
            <span className="footer-badge"><Icon name="shield" size={15} /> Candidate-led. Human-reviewed.</span>
            <a className="footer-support-email" href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="footer-title">Service</h2>
            <a className="footer-link" href="/#how-it-works">
              How it works
            </a>
            <a className="footer-link" href="/#batch">
              Tracker
            </a>
            <a className="footer-link" href="/#plans">
              Pricing
            </a>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="footer-title">Join</h2>
            <Link className="footer-link" to="/join">
              Free fit review
            </Link>
            <a className="footer-link" href="/#faq">
              FAQ
            </a>
            <Link className="footer-link" to="/contact">
              Contact
            </Link>
          </div>
          <div className="col-lg-3">
            <h2 className="footer-title">Legal</h2>
            <Link className="footer-link" to="/terms">
              Terms
            </Link>
            <Link className="footer-link" to="/privacy">
              Privacy
            </Link>
            <Link className="footer-link" to="/refund">
              Refund
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>OPTBridge</span>
          <span>© 2026 · Not immigration or legal advice.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
