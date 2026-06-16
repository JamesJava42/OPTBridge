import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Terms() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-4">Terms</h1>
            <p>
              These placeholder terms describe the general use of OPTBridge while final legal language is being prepared.
            </p>
            <p>
              OPTBridge provides job-search support services including resume assistance, application organization,
              updates, and tracking. OPTBridge does not guarantee interviews, employment, visa outcomes, or employer
              decisions.
            </p>
            <p className="mb-0">
              By using the service, students agree to provide accurate information, review submitted materials, and make
              their own career and immigration decisions with qualified professional advice when needed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Terms;

