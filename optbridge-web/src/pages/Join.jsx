import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { plans } from '../data/plans.js';
import { increaseIntakeCounter, useIntakeCounter } from '../hooks/useIntakeCounter.js';

const planNames = plans.map((plan) => plan.name);

function Join() {
  const [searchParams] = useSearchParams();
  const requestedPlan = searchParams.get('plan');
  const startingPlan = planNames.includes(requestedPlan) ? requestedPlan : 'Hybrid Batch';
  const [selectedPlan, setSelectedPlan] = useState(startingPlan);
  const [submitted, setSubmitted] = useState(false);
  const requestCount = useIntakeCounter();

  const plan = useMemo(
    () => plans.find((currentPlan) => currentPlan.name === selectedPlan) || plans[2],
    [selectedPlan]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    increaseIntakeCounter();
    setSubmitted(true);
    event.currentTarget.reset();
    setSelectedPlan(startingPlan);
  };

  return (
    <>
      <Navbar />
      <main className="join-page">
        <section className="join-hero">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="section-eyebrow">Join next batch</p>
                <h1 className="display-5 fw-bold mb-3">Submit your OPTBridge intake details.</h1>
                <p className="lead text-secondary mb-0">
                  Share your plan, work authorization status, target roles, and resume link so the monthly batch can start with clear context.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="join-counter-card">
                  <span>Batch request counter</span>
                  <strong>{requestCount}</strong>
                  <small>Increases after each form submission in this browser.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7">
                <form className="join-form soft-card" onSubmit={handleSubmit}>
                  {submitted && (
                    <div className="alert alert-success" role="alert">
                      Intake saved for preview. Connect this form to Google Forms, Sheets, or email before launch.
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="fullName">
                        Full name
                      </label>
                      <input className="form-control" id="fullName" name="fullName" type="text" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input className="form-control" id="email" name="email" type="email" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="phone">
                        Phone
                      </label>
                      <input className="form-control" id="phone" name="phone" type="tel" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="authorization">
                        Current status
                      </label>
                      <select className="form-select" id="authorization" name="authorization" required>
                        <option value="">Choose one</option>
                        <option>OPT</option>
                        <option>STEM OPT</option>
                        <option>CPT</option>
                        <option>Waiting for OPT approval</option>
                        <option>Other work authorization</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="plan">
                        Plan
                      </label>
                      <select
                        className="form-select"
                        id="plan"
                        name="plan"
                        value={selectedPlan}
                        onChange={(event) => setSelectedPlan(event.target.value)}
                        required
                      >
                        {plans.map((currentPlan) => (
                          <option key={currentPlan.name}>{currentPlan.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="batchMonth">
                        Preferred batch
                      </label>
                      <select className="form-select" id="batchMonth" name="batchMonth" required>
                        <option>Next available batch</option>
                        <option>This month</option>
                        <option>Next month</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label" htmlFor="roles">
                        Target roles
                      </label>
                      <input
                        className="form-control"
                        id="roles"
                        name="roles"
                        type="text"
                        placeholder="Data Analyst, Software Engineer, QA, Business Analyst"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="linkedin">
                        LinkedIn URL
                      </label>
                      <input className="form-control" id="linkedin" name="linkedin" type="url" placeholder="https://" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="resume">
                        Resume link
                      </label>
                      <input className="form-control" id="resume" name="resume" type="url" placeholder="Google Drive or Dropbox link" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label" htmlFor="notes">
                        What do you need most this month?
                      </label>
                      <textarea className="form-control" id="notes" name="notes" rows="4" />
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                    <button className="btn btn-primary btn-lg" type="submit">
                      Submit Intake
                    </button>
                    <Link className="btn btn-outline-secondary btn-lg" to="/#plans">
                      Compare Plans
                    </Link>
                  </div>
                </form>
              </div>

              <div className="col-lg-5">
                <aside className="selected-plan-card">
                  <span className="badge text-bg-success mb-3">Selected plan</span>
                  <h2 className="h3">{plan.name}</h2>
                  <p className="text-secondary">{plan.description}</p>
                  <div className="d-flex align-items-end gap-1 mb-4">
                    <span className="plan-price">{plan.price}</span>
                    <span className="text-secondary pb-2">{plan.billing}</span>
                  </div>
                  <ul className="list-unstyled d-grid gap-3 mb-0">
                    {plan.features.map((feature) => (
                      <li className="d-flex gap-2" key={feature}>
                        <span className="checkmark" aria-hidden="true">
                          +
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Join;

