import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Icon from '../components/Icon.jsx';
import { plans } from '../data/plans.js';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';
import { submitFormToWebhook } from '../services/formWebhook.js';
import { track } from '@vercel/analytics';

function Join() {
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const plan = plans[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const endpoint = import.meta.env.VITE_FORM_WEBHOOK_URL;
    const fields = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...fields,
      requestId: `FIT-${Date.now().toString().slice(-6)}`,
      source: 'OPTBridge fit review form',
      _subject: `[OPTBridge] New fit review: ${fields.fullName}`,
    };

    setSubmitState('submitting');
    setSubmitMessage('');

    if (!endpoint) {
      if (import.meta.env.PROD) {
        setSubmitState('error');
        setSubmitMessage('Online intake is temporarily unavailable. Please contact support directly.');
        return;
      }
      setSubmitState('preview');
      setSubmitMessage('Preview complete: your information is valid, but no intake endpoint is configured yet, so nothing was sent.');
      return;
    }

    try {
      const response = await submitFormToWebhook(endpoint, 'fit_review', payload);
      track('Fit Review Submitted', { plan: fields.plan });
      setSubmitState('success');
      setSubmitMessage(`Your fit request ${response.requestId} was received. We’ll review it and email you with next steps.`);
      form.reset();
    } catch {
      setSubmitState('error');
      setSubmitMessage('We could not send your request. Please try again or contact support.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="join-page">
        <section className="join-hero">
          <div className="container">
            <div className="join-hero-copy">
              <span className="hero-badge"><Icon name="spark" size={16} /> Free fit review</span>
              <h1>Tell us where you are—and where you want to go.</h1>
              <p>
                We’ll use this profile to assess fit, recommend a sprint, and define the right job-search scope. No payment is collected here.
              </p>
              <div className="join-trust-row">
                <span><Icon name="clock" size={16} /> About 5 minutes</span>
                <span><Icon name="shield" size={16} /> Private intake</span>
                <span><Icon name="human" size={16} /> Reviewed by a person</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <form className="join-form soft-card" onSubmit={handleSubmit}>
                  {submitMessage && (
                    <div className={`alert ${submitState === 'error' ? 'alert-danger' : submitState === 'preview' ? 'alert-warning' : 'alert-success'}`} role="alert">
                      {submitMessage} {submitState === 'error' && <a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>}
                    </div>
                  )}

                  <div className="form-section-heading"><span>01</span><div><h2>About you</h2><p>Basic contact and work authorization context.</p></div></div>
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
                      <label className="form-label" htmlFor="optEndDate">Work authorization end date</label>
                      <input className="form-control" id="optEndDate" name="optEndDate" type="date" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="location">Current location</label>
                      <input className="form-control" id="location" name="location" type="text" placeholder="City, State" required />
                    </div>
                  </div>

                  <div className="form-divider" />
                  <div className="form-section-heading"><span>02</span><div><h2>Your search</h2><p>Help us understand what a good opportunity looks like.</p></div></div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="plan">
                        Plan
                      </label>
                      <input className="form-control" id="plan" name="plan" value={plan.name} readOnly />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="batchMonth">
                        Preferred batch
                      </label>
                      <select className="form-select" id="batchMonth" name="batchMonth" required>
                        <option>Next available sprint</option>
                        <option>Within 2 weeks</option>
                        <option>Next month</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="experience">Years of relevant experience</label>
                      <select className="form-select" id="experience" name="experience" required>
                        <option value="">Choose one</option><option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>5+ years</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="workMode">Preferred work mode</label>
                      <select className="form-select" id="workMode" name="workMode" required>
                        <option value="">Choose one</option><option>Open to any</option><option>On-site</option><option>Hybrid</option><option>Remote</option>
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
                  </div>

                  <div className="form-divider" />
                  <div className="form-section-heading"><span>03</span><div><h2>Your materials</h2><p>Links must be viewable by anyone who has them.</p></div></div>
                  <div className="row g-3">
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
                    <div className="form-honeypot" aria-hidden="true"><label htmlFor="joinWebsite">Website</label><input id="joinWebsite" name="website" tabIndex="-1" autoComplete="off" /></div>
                    <div className="col-12">
                      <div className="form-check consent-check">
                        <input className="form-check-input" id="consent" name="consent" type="checkbox" value="accepted" required />
                        <label className="form-check-label" htmlFor="consent">I confirm that the information is accurate and agree to receive a confirmation and automated fit-review status emails over the next 34 hours. Every email includes an opt-out link. I understand OPTBridge does not guarantee interviews, sponsorship, or employment.</label>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                    <button className="btn btn-primary btn-lg" type="submit" disabled={submitState === 'submitting'}>
                      {submitState === 'submitting' ? 'Sending…' : 'Request my fit review'} <Icon name="arrow" size={18} />
                    </button>
                    <Link className="btn btn-outline-secondary btn-lg" to="/#plans">
                      View offer
                    </Link>
                  </div>
                </form>
              </div>

              <div className="col-lg-4">
                <aside className="selected-plan-card">
                  <span className="plan-eyebrow">Selected sprint</span>
                  <h2 className="h3">{plan.name}</h2>
                  <p className="text-secondary">{plan.description}</p>
                  {plan.sale && <span className="sale-price-label">Sale price</span>}
                  <div className="d-flex align-items-end gap-1 mb-4">
                    {plan.originalPrice && <span className="plan-original-price">{plan.originalPrice}</span>}
                    <span className="plan-price">{plan.price}</span>
                    <span className="plan-billing">{plan.billing}</span>
                  </div>
                  <ul className="list-unstyled d-grid gap-3 mb-0">
                    {plan.features.map((feature) => (
                      <li className="d-flex gap-2" key={feature}>
                        <span className="checkmark" aria-hidden="true"><Icon name="check" size={14} /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="next-steps-box"><strong>What happens next?</strong><ol><li>We review profile fit.</li><li>You receive a scope recommendation.</li><li>You decide whether to start.</li></ol></div>
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
