import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="section-space bg-white" id="join">
      <div className="container">
        <div className="join-panel text-center">
          <p className="section-eyebrow">Join next batch</p>
          <h2 className="section-title mb-3">Start the next month with a clearer OPT job-search system.</h2>
          <p className="text-secondary mx-auto mb-4">
            Share your resume, choose a plan, and get organized batch support through month-end.
          </p>
          <Link className="btn btn-light btn-lg" to="/join">
            Join Next Batch
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
