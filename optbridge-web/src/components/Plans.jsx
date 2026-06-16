import { Link } from 'react-router-dom';
import { plans } from '../data/plans.js';

function Plans() {
  return (
    <section className="section-space section-tint" id="plans">
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-8">
            <p className="section-eyebrow">Plans</p>
            <h2 className="section-title">Choose the batch support level that fits this month.</h2>
          </div>
        </div>
        <div className="row g-4 align-items-stretch">
          {plans.map((plan) => (
            <div className="col-lg-4" key={plan.name}>
              <div className={`plan-card h-100 ${plan.popular ? 'plan-card-popular' : ''}`}>
                {plan.popular && <span className="badge text-bg-success mb-3">Best overall</span>}
                <h3 className="h4">{plan.name}</h3>
                <p className="text-secondary">{plan.description}</p>
                <div className="d-flex align-items-end gap-1 mb-4">
                  <span className="plan-price">{plan.price}</span>
                  <span className="text-secondary pb-2">{plan.billing}</span>
                </div>
                <ul className="list-unstyled d-grid gap-3 mb-4">
                  {plan.features.map((feature) => (
                    <li className="d-flex gap-2" key={feature}>
                      <span className="checkmark" aria-hidden="true">
                        +
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link className="btn btn-primary w-100 mt-auto" to={`/join?plan=${encodeURIComponent(plan.name)}`}>
                  Join Next Batch
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Plans;
