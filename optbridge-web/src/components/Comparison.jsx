import Icon from './Icon.jsx';

const rows = [
  ['Job selection', 'Hours of manual browsing', 'Broad auto-apply filters', 'Fit + authorization preferences'],
  ['Resume workflow', 'One resume reused often', 'Keyword changes at scale', 'Priority roles aligned and reviewed'],
  ['Candidate control', 'Full control, high effort', 'Often limited visibility', 'Approval rules set at intake'],
  ['Tracking', 'Multiple tabs and inboxes', 'Tool activity dashboard', 'Shared role-level tracker'],
  ['Human judgment', 'You do everything', 'Limited or none', 'Human QA on supported work'],
];

function Comparison() {
  return (
    <section className="section-space comparison-section">
      <div className="container">
        <div className="row align-items-end g-4 comparison-heading">
          <div className="col-lg-7">
            <p className="section-eyebrow">The practical difference</p>
            <h2 className="section-title">Automation should remove busywork—not your judgment.</h2>
          </div>
          <div className="col-lg-5">
            <p>OPTBridge combines useful automation with a visible, candidate-led process.</p>
          </div>
        </div>
        <div className="comparison-table-wrap">
          <div className="comparison-table" role="table" aria-label="Job search approach comparison">
            <div className="comparison-row comparison-table-head" role="row">
              <span role="columnheader">Workflow</span>
              <span role="columnheader">DIY search</span>
              <span role="columnheader">One-click bots</span>
              <span className="opt-column" role="columnheader"><Icon name="spark" size={17} /> OPTBridge</span>
            </div>
            {rows.map((row) => (
              <div className="comparison-row" role="row" key={row[0]}>
                <strong role="cell">{row[0]}</strong>
                <span role="cell">{row[1]}</span>
                <span role="cell">{row[2]}</span>
                <span className="opt-column" role="cell"><Icon name="check" size={17} /> {row[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comparison;
