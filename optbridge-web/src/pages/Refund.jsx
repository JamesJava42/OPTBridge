import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

function Refund() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-2">Refund Policy</h1>
            <p className="legal-updated">Last updated: August 29, 2026</p>
            <p>The public OPTBridge website does not currently collect payment. A fit-review or contact-form submission is free and does not create a paid subscription.</p>
            <h2>Before a paid sprint</h2>
            <p>Before accepting payment, OPTBridge will provide the plan price, service scope, start date, renewal terms, and the refund or cancellation terms that apply to that purchase. Please review those details before paying.</p>
            <h2>After work begins</h2>
            <p>Because resume review, search setup, job research, or other personalized work may begin soon after activation, refund eligibility may depend on the approved terms, timing of the request, and work already completed.</p>
            <h2>Billing questions</h2>
            <p>Contact us promptly if you believe a charge is incorrect or if you need to stop a future renewal. We may verify account ownership before discussing or changing billing information.</p>
            <h2>Contact</h2>
            <p className="mb-0">Send refund or billing questions to <a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Refund;
