import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Privacy() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <p className="section-eyebrow">Legal</p>
            <h1 className="mb-4">Privacy Policy</h1>
            <p>
              This placeholder privacy policy explains that OPTBridge may collect contact details, resume information,
              plan preferences, and job-search details submitted by students.
            </p>
            <p>
              Information is used to provide batch support, send updates, organize application tracking, and communicate
              about the service. OPTBridge should not sell personal information.
            </p>
            <p className="mb-0">
              Students may request changes or removal of their information by contacting OPTBridge through the official
              service channel once published.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Privacy;

