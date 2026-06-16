import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer border-top">
      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-lg-5">
            <Link className="footer-brand" to="/">
              OPTBridge
            </Link>
            <p className="text-secondary mb-3">
              Monthly OPT job-search support for international students using AI speed, human resume help, email updates, and simple tracking.
            </p>
            <span className="footer-badge">Service mode: no login or dashboard</span>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="footer-title">Service</h2>
            <a className="footer-link" href="/#how-it-works">
              How it works
            </a>
            <a className="footer-link" href="/#batch">
              Batch model
            </a>
            <a className="footer-link" href="/#plans">
              Plans
            </a>
          </div>
          <div className="col-6 col-lg-2">
            <h2 className="footer-title">Join</h2>
            <Link className="footer-link" to="/join">
              Intake form
            </Link>
            <a className="footer-link" href="/#faq">
              FAQ
            </a>
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
          <span>Built for monthly OPT job-search batches.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
