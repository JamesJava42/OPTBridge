import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Icon from '../components/Icon.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';
import { submitFormToWebhook } from '../services/formWebhook.js';
import { track } from '@vercel/analytics';

const CONTACT_KEY = 'optbridge-demo-contact-requests';

const topicLabels = {
  'account-access': 'Account access',
  'before-joining': 'Question before joining',
  billing: 'Billing or subscription',
  partnership: 'Partnership',
  other: 'Other',
};

function Contact() {
  const [searchParams] = useSearchParams();
  const requestedTopic = searchParams.get('topic');
  const [topic, setTopic] = useState(topicLabels[requestedTopic] ? requestedTopic : 'before-joining');
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const request = {
      ...data,
      id: `INQ-${Date.now().toString().slice(-6)}`,
      status: 'New',
      received: 'Just now',
      source: 'OPTBridge public contact form',
      _subject: `[OPTBridge] ${topicLabels[data.topic]}: ${data.subject}`,
    };
    const endpoint = import.meta.env.VITE_FORM_WEBHOOK_URL;
    setState('submitting');
    setMessage('');

    if (endpoint) {
      try {
        const response = await submitFormToWebhook(endpoint, 'contact', request);
        track('Contact Request Submitted', { topic: data.topic });
        setState('success');
        setMessage(`Your request ${response.requestId} was received. We’ll reply using the email you provided.`);
        form.reset();
        setTopic('before-joining');
        return;
      } catch {
        setState('error');
        setMessage('We could not send your request. Please try again.');
        return;
      }
    }

    if (import.meta.env.PROD) {
      setState('error');
      setMessage('The online form is temporarily unavailable. Please email our support team directly.');
      return;
    }

    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(CONTACT_KEY)) || []; } catch { saved = []; }
    localStorage.setItem(CONTACT_KEY, JSON.stringify([request, ...saved]));
    setState('preview');
    setMessage(`Demo request ${request.id} was saved to the private admin inbox for preview. No external message was sent.`);
    form.reset();
    setTopic('before-joining');
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-copy"><span className="hero-badge"><Icon name="human" size={16} /> Talk to a real person</span><h1>How can we help?</h1><p>Ask about account access, plans, billing, or whether OPTBridge fits your search. Please never send passwords or sensitive identity documents.</p></div>
          </div>
        </section>
        <section className="section-space contact-content">
          <div className="container">
            <div className="contact-layout">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-heading"><p>Send a request</p><h2>Tell us what you need.</h2><span>Fields marked required help us route your question correctly.</span></div>
                {message && <div className={`contact-message ${state}`} role="status">{message} {state === 'error' && <a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>}</div>}
                <div className="row g-3">
                  <div className="col-md-6"><label htmlFor="contactName">Full name</label><input id="contactName" name="name" required /></div>
                  <div className="col-md-6"><label htmlFor="contactEmail">Email</label><input id="contactEmail" name="email" type="email" required /></div>
                  <div className="col-md-6"><label htmlFor="contactTopic">What can we help with?</label><select id="contactTopic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)} required>{Object.entries(topicLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
                  <div className="col-md-6"><label htmlFor="contactUsername">Portal username <small>Optional</small></label><input id="contactUsername" name="username" autoComplete="off" placeholder="Never enter your password" /></div>
                  <div className="col-12"><label htmlFor="contactSubject">Subject</label><input id="contactSubject" name="subject" placeholder="Short summary" required /></div>
                  <div className="col-12"><label htmlFor="contactDetails">Details</label><textarea id="contactDetails" name="details" rows="6" maxLength="3000" placeholder="What happened, what did you expect, and what have you already tried?" required /></div>
                  <div className="form-honeypot" aria-hidden="true"><label htmlFor="contactWebsite">Website</label><input id="contactWebsite" name="website" tabIndex="-1" autoComplete="off" /></div>
                </div>
                <div className="contact-form-footer"><span><Icon name="shield" size={16} /> Do not include passwords, SSNs, immigration documents, or card numbers.</span><button className="btn btn-primary" type="submit" disabled={state === 'submitting'}>{state === 'submitting' ? 'Sending…' : 'Send request'} <Icon name="arrow" size={17} /></button></div>
              </form>
              <aside className="contact-aside">
                <div className="contact-method"><span><Icon name="clock" size={20} /></span><div><strong>Expected response</strong><p>Within one business day for account questions.</p></div></div>
                <div className="contact-method"><span><Icon name="document" size={20} /></span><div><strong>Email support</strong><p><a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a></p></div></div>
                <div className="contact-method"><span><Icon name="shield" size={20} /></span><div><strong>Account verification</strong><p>We may verify account ownership before changing access or billing.</p></div></div>
                <div className="contact-method"><span><Icon name="human" size={20} /></span><div><strong>Already signed in?</strong><p>Use the private member help form so your request is connected to your workspace.</p><Link to="/help">Open member help <Icon name="arrow" size={14} /></Link></div></div>
                <div className="contact-owner-note"><p>How requests are routed</p><strong>Sensitive account questions receive restricted review.</strong><span>Account and billing requests go to authorized administrators. Member product issues use private member support.</span></div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
