function BatchModel() {
  return (
    <section className="section-space bg-white" id="batch">
      <div className="container">
        <div className="batch-panel border">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <p className="section-eyebrow">Monthly batch model</p>
              <h2 className="section-title mb-3">Built around one focused month of job-search support.</h2>
              <p className="text-secondary mb-0">
                Students join, submit their resume, choose a plan, and receive structured support until month-end.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="mini-card">
                    <span className="mini-label">Start</span>
                    <strong>Resume intake</strong>
                    <p>Collect resume details and plan preferences.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mini-card">
                    <span className="mini-label">Middle</span>
                    <strong>Applications and tailoring</strong>
                    <p>Use AI speed, human review, or both.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mini-card">
                    <span className="mini-label">Updates</span>
                    <strong>Email progress notes</strong>
                    <p>Keep students informed without a heavy dashboard.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mini-card">
                    <span className="mini-label">Close</span>
                    <strong>Month-end report</strong>
                    <p>Review batch progress and next steps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BatchModel;
