import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';

function CTA() {
  return (
    <section className="section-space cta-section" id="join">
      <div className="container">
        <div className="join-panel text-center">
          <p className="section-eyebrow">Your next search can run differently</p>
          <h2 className="section-title mb-3">Start with a free, honest fit review.</h2>
          <p className="mx-auto mb-4">
            Tell us about your goals and work authorization. We’ll recommend a scope only if OPTBridge can genuinely help.
          </p>
          <Link className="btn btn-light btn-lg" to="/join">
            Check your fit <Icon name="arrow" size={18} />
          </Link>
          <small>No payment today · No long-term commitment</small>
        </div>
      </div>
    </section>
  );
}

export default CTA;
