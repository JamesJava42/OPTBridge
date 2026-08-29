import Icon from './Icon.jsx';

function BatchModel() {
  return (
    <section className="section-space workspace-section" id="batch">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <p className="section-eyebrow">Visibility by default</p>
            <h2 className="section-title mb-3">Know where every opportunity stands.</h2>
            <p className="workspace-lead">
              A job-search service should never feel like a black box. Your tracker makes the work visible at the role level.
            </p>
            <ul className="workspace-points">
              <li><Icon name="check" size={17} /><span><strong>Source and fit notes</strong> for each shortlisted role</span></li>
              <li><Icon name="check" size={17} /><span><strong>Exact resume version</strong> tied to priority opportunities</span></li>
              <li><Icon name="check" size={17} /><span><strong>Status and next action</strong> kept in one place</span></li>
              <li><Icon name="check" size={17} /><span><strong>Weekly summary</strong> of progress and search adjustments</span></li>
            </ul>
          </div>
          <div className="col-lg-7">
            <div className="tracker-window">
              <div className="tracker-toolbar">
                <div><span className="tracker-logo"><Icon name="layers" size={17} /></span><strong>Application tracker</strong></div>
                <span className="updated-pill"><Icon name="clock" size={14} /> Updated today</span>
              </div>
              <div className="tracker-tabs"><span className="active">All roles <b>18</b></span><span>Needs review <b>4</b></span><span>Follow-ups <b>3</b></span></div>
              <div className="data-table">
                <div className="data-row data-head"><span>Company / role</span><span>Fit</span><span>Resume</span><span>Status</span></div>
                <div className="data-row"><span><strong>Northstar</strong><small>Product Data Analyst</small></span><span className="fit-score">92%</span><span>Analytics v3</span><span><i className="dot amber" /> Review</span></div>
                <div className="data-row"><span><strong>Arc Labs</strong><small>Business Intelligence Analyst</small></span><span className="fit-score">88%</span><span>BI v2</span><span><i className="dot green" /> Ready</span></div>
                <div className="data-row"><span><strong>Fieldwork</strong><small>Operations Analyst</small></span><span className="fit-score">84%</span><span>Core v4</span><span><i className="dot blue" /> Screening</span></div>
                <div className="data-row"><span><strong>Veridian</strong><small>Junior Data Analyst</small></span><span className="fit-score">81%</span><span>Analytics v3</span><span><i className="dot gray" /> Sourced</span></div>
              </div>
              <div className="tracker-footer"><span><Icon name="shield" size={16} /> Candidate approval required</span><span>Last sync: 10:24 AM</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BatchModel;
