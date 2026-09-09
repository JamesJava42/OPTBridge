import { Link } from 'react-router-dom';
import { plans } from '../data/plans.js';
import Icon from './Icon.jsx';

function Plans() {
  return (
    <section className="section-space plans-section" id="plans">
      <div className="container">
        <div className="row justify-content-center text-center section-heading">
          <div className="col-lg-8">
            <p className="section-eyebrow">Simple 30-day pricing</p>
            <h2 className="section-title">Choose how hands-on you want us to be.</h2>
            <p className="section-subtitle">Start with a fit review. We confirm scope before you pay.</p>
          </div>
        </div>
        <div className="row g-4 align-items-stretch">
          {plans.map((plan) => (
            <div className="col-lg-4" key={plan.name}>
              <div className={`plan-card h-100 ${plan.popular ? 'plan-card-popular' : ''}`}>
                {plan.popular && <span className="popular-label">Most complete</span>}
                <span className="plan-eyebrow">{plan.eyebrow}</span>
                <h3 className="h4">{plan.name}</h3>
                <p className="text-secondary">{plan.description}</p>
                {plan.sale && <span className="sale-price-label">Sale price</span>}
                <div className="d-flex align-items-end gap-1 mb-4">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-billing">{plan.billing}</span>
                </div>
                <ul className="list-unstyled d-grid gap-3 mb-4">
                  {plan.features.map((feature) => (
                    <li className="d-flex gap-2" key={feature}>
                      <span className="checkmark" aria-hidden="true"><Icon name="check" size={14} /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link className={`btn w-100 mt-auto ${plan.popular ? 'btn-primary' : 'btn-outline-dark'}`} to={`/join?plan=${encodeURIComponent(plan.name)}`}>
                  Check fit for {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="pricing-note"><Icon name="shield" size={16} /> No job, interview, or sponsorship guarantee. Scope depends on profile fit, role availability, and candidate responsiveness.</p>
      </div>
    </section>
  );
}

export default Plans;
