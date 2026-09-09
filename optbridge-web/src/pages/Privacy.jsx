import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../config/site.js';

function Privacy() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-2">Privacy Policy</h1>
            <p className="legal-updated">Last updated: August 29, 2026</p>
            <p>OPTBridge respects the privacy of students and visitors. This policy explains the information we collect, why we use it, and the choices available to you.</p>
            <h2>Information we collect</h2>
            <p>We may collect contact information, work-authorization context, target roles and locations, resume or LinkedIn links, support messages, plan preferences, and job-search information you choose to submit. We may also receive basic website usage and device information from hosting or analytics providers.</p>
            <h2>How we use information</h2>
            <p>We use information to respond to questions, review service fit, provide job-search support, organize application tracking, maintain account access, improve the service, prevent misuse, and meet applicable business obligations.</p>
            <h2>Sharing and selling</h2>
            <p>OPTBridge does not sell personal information. Public contact and fit-review submissions may be stored in a private Google Sheet and processed by Google Apps Script to notify our team and send the emails described on the form. Information may also be shared with service providers that support hosting, analytics, payments, or service delivery, only as needed for those functions. We may disclose information when required by law or necessary to protect users and the service.</p>
            <h2>Retention and security</h2>
            <p>We retain information only as reasonably needed for the service, support, recordkeeping, and legal obligations. No online system is completely secure, so please do not submit passwords, Social Security numbers, payment card numbers, or immigration documents through public forms.</p>
            <h2>Your choices</h2>
            <p>You may ask to access, correct, or delete information associated with your request, subject to applicable recordkeeping requirements. Fit-review emails include a link that stops the remaining automated follow-ups, and you may opt out of non-essential marketing messages at any time.</p>
            <h2>Contact</h2>
            <p className="mb-0">For privacy questions or requests, email <a href={SUPPORT_MAILTO}>{SUPPORT_EMAIL}</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Privacy;
