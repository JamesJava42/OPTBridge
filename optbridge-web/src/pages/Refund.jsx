import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Refund() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-4">Refund Policy</h1>
            <p>
              This placeholder refund policy is intended for early review and should be replaced with final business and
              legal terms before accepting payments.
            </p>
            <p>
              Because batch work may begin soon after intake, refund eligibility may depend on timing, work already
              performed, and the selected monthly plan.
            </p>
            <p className="mb-0">
              OPTBridge should clearly confirm the active refund rules before a student joins a paid monthly batch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Refund;

