import { Link } from 'react-router-dom';
import { useIntakeCounter } from '../hooks/useIntakeCounter.js';

function Hero() {
  const requestCount = useIntakeCounter();

  return (
    <section className="hero-section py-5">
      <div className="container py-lg-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge text-bg-info-subtle text-info-emphasis border border-info-subtle mb-3">
              AI speed + human support for OPT job search
            </span>
            <h1 className="display-4 fw-bold mb-4">Monthly OPT Job Search Support for International Students</h1>
            <p className="lead text-secondary mb-4">
              Join a focused monthly batch, submit your resume details, choose a plan, and receive service-based support through email and simple tracking.
            </p>
            <div className="hero-points mb-4">
              <span>Resume support</span>
              <span>Email updates</span>
              <span>No portal required</span>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link className="btn btn-primary btn-lg" to="/join">
                Join Next Batch
              </Link>
              <a className="btn btn-outline-secondary btn-lg" href="#plans">
                View Plans
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="service-visual shadow-sm border bg-white">
              <div className="service-visual-top">
                <span className="pulse-dot" />
                <span>Next batch intake</span>
              </div>
              <div className="counter-orbit">
                <div className="counter-core">
                  <strong>{requestCount}</strong>
                  <span>requests submitted</span>
                </div>
              </div>
              <div className="bot-card">
                <div className="bot-heading">
                  <span className="bot-avatar">AI</span>
                  <div>
                    <strong>Batch guide</strong>
                    <small>Service intake assistant</small>
                  </div>
                </div>
                <div className="bot-bubble">Tell us your OPT status, target roles, and resume link.</div>
                <div className="bot-bubble bot-bubble-alt">Choose AI, Human Tailored, or Hybrid support.</div>
                <div className="bot-action-row">
                  <span>Step 1</span>
                  <span>Step 2</span>
                  <span>Step 3</span>
                </div>
              </div>
              <div className="service-strip">
                <div>
                  <strong>1 month</strong>
                  <span>batch cycle</span>
                </div>
                <div>
                  <strong>3 plans</strong>
                  <span>simple choice</span>
                </div>
                <div>
                  <strong>Email</strong>
                  <span>updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
