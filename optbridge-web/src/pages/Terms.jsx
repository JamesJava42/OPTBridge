import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

function Terms() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-2">Terms of Service</h1>
            <p className="legal-updated">Last updated: August 29, 2026</p>
            <p>These terms apply when you visit OPTBridge, submit a request, or use an OPTBridge service. Submitting a public form does not purchase a plan or guarantee acceptance into a service sprint.</p>
            <h2>Service scope</h2>
            <p>OPTBridge provides job-search support that may include search planning, job discovery, resume assistance, application organization, progress tracking, and related support. The exact scope, timing, price, and candidate responsibilities are confirmed before paid work begins.</p>
            <h2>No outcome or legal guarantee</h2>
            <p>OPTBridge does not guarantee interviews, job offers, employer sponsorship, immigration outcomes, or employer decisions. OPTBridge is not a law firm and does not provide immigration or legal advice. Candidates should consult a qualified professional for legal or immigration questions.</p>
            <h2>Your responsibilities</h2>
            <p>You agree to provide accurate information, review candidate-specific answers and materials, protect your account credentials, and make your own career decisions. You must not use the service for unlawful, deceptive, abusive, or unauthorized activity.</p>
            <h2>Plans and payment</h2>
            <p>Website prices describe current offers but do not create a contract by themselves. Before payment, you will receive or approve the applicable plan, service scope, billing timing, and refund terms. Access may be limited to an active subscription or service period.</p>
            <h2>Availability and changes</h2>
            <p>Features may change as the early service improves. We may suspend access when necessary for security, misuse, nonpayment, or service maintenance. We will aim to communicate material changes that affect active customers.</p>
            <h2>Contact</h2>
            <p className="mb-0">Questions about these terms can be sent to <a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Terms;
