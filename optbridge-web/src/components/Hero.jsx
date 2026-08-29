import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 hero-copy">
            <span className="hero-badge"><span className="pulse-dot" /> Enrollment open for the next 30-day sprint</span>
            <h1>Your OPT job search, <span>run with focus.</span></h1>
            <p className="hero-lead">
              An AI + human job-search copilot for international graduates. We help you find better-fit roles, tailor your story, and keep every application organized.
            </p>
            <div className="hero-points">
              <span><Icon name="check" size={15} /> Sponsorship-aware screening</span>
              <span><Icon name="check" size={15} /> Human quality review</span>
              <span><Icon name="check" size={15} /> Transparent tracking</span>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/join">
                Check your fit <Icon name="arrow" size={18} />
              </Link>
              <a className="btn btn-quiet btn-lg" href="#how-it-works">
                See how it works
              </a>
            </div>
            <p className="hero-note">No long-term contract · Candidate approval stays in your hands</p>
          </div>
          <div className="col-lg-6">
            <div className="copilot-window">
              <div className="window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>My search sprint</span>
                <span className="live-label"><span className="pulse-dot" /> Active</span>
              </div>
              <div className="window-body">
                <div className="sprint-header">
                  <div>
                    <span className="overline">WEEK 2 OF 4</span>
                    <strong>Data & analytics search</strong>
                  </div>
                  <div className="progress-ring"><span>54%</span></div>
                </div>
                <div className="metric-grid">
                  <div>
                    <span>Roles reviewed</span><strong>42</strong><small>12 this week</small>
                  </div>
                  <div>
                    <span>Ready to review</span><strong>6</strong><small>Needs your approval</small>
                  </div>
                  <div>
                    <span>Follow-ups</span><strong>3</strong><small>Scheduled</small>
                  </div>
                </div>
                <div className="tracker-preview">
                  <div className="tracker-preview-head"><strong>Priority roles</strong><span>View tracker</span></div>
                  <div className="role-row">
                    <span className="company-mark blue">N</span>
                    <div><strong>Product Data Analyst</strong><small>New York · Resume v3</small></div>
                    <span className="status-pill status-review">Review</span>
                  </div>
                  <div className="role-row">
                    <span className="company-mark green">A</span>
                    <div><strong>Business Intelligence Analyst</strong><small>Remote · Resume v2</small></div>
                    <span className="status-pill status-update">Ready</span>
                  </div>
                  <div className="role-row muted-row">
                    <span className="company-mark gold">F</span>
                    <div><strong>Operations Analyst</strong><small>Chicago · Match check</small></div>
                    <span className="status-pill status-sent">Screening</span>
                  </div>
                </div>
                <div className="quality-note">
                  <span className="quality-icon"><Icon name="shield" size={18} /></span>
                  <div><strong>Human quality check complete</strong><small>Skills, work authorization language, and resume alignment reviewed.</small></div>
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
