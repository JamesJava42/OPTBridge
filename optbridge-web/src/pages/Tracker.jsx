import { useMemo, useState } from 'react';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';
import { applications } from '../data/portalData.js';

const statusClass = {
  'Needs review': 'amber', Ready: 'green', Applied: 'blue', Sourced: 'gray', Screening: 'purple',
};

function Tracker() {
  const [items, setItems] = useState(applications);
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(applications[0]);
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => items.filter((application) => {
    const matchesStatus = status === 'All' || application.status === status;
    const text = `${application.company} ${application.role} ${application.location}`.toLowerCase();
    return matchesStatus && text.includes(query.toLowerCase());
  }), [items, query, status]);

  const approveOpportunity = () => {
    if (!['Needs review', 'Sourced'].includes(selected.status)) return;
    const updated = { ...selected, status: 'Ready', next: 'Complete candidate-specific questions' };
    setItems((current) => current.map((application) => application.id === selected.id ? updated : application));
    setSelected(updated);
    setNotice(`${selected.role} was approved and marked ready.`);
  };

  const downloadTracker = () => {
    const header = ['Company', 'Role', 'Location', 'Match', 'Resume', 'Status', 'Added', 'Next action'];
    const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = items.map((application) => [application.company, application.role, application.location, `${application.fit}%`, application.resume, application.status, application.date, application.next]);
    const csv = [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'optbridge-application-tracker.csv';
    link.click();
    URL.revokeObjectURL(url);
    setNotice('Your tracker CSV was downloaded.');
  };

  return (
    <PortalLayout
      eyebrow="Career Accelerator · Week 2 of 4"
      title="Good morning, Maya"
      actions={<span className="portal-plan-pill"><span className="pulse-dot" /> Accelerator active</span>}
    >
      {notice && <div className="tracker-notice" role="status"><Icon name="check" size={16} />{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      <section className="portal-metrics">
        <article><span>Roles reviewed</span><strong>42</strong><small><b>+12</b> this week</small></article>
        <article><span>Ready for you</span><strong>6</strong><small>2 need action today</small></article>
        <article><span>Applications</span><strong>18</strong><small>Across 11 companies</small></article>
        <article><span>Follow-ups</span><strong>3</strong><small>Next one on Aug 27</small></article>
      </section>

      <section className="portal-grid-main">
        <div className="portal-panel tracker-panel">
          <div className="portal-panel-heading">
            <div><h2>Application tracker</h2><p>Every supported role and its next action.</p></div>
            <button className="icon-button" type="button" aria-label="Download tracker as CSV" title="Download tracker as CSV" onClick={downloadTracker}><Icon name="document" size={18} /></button>
          </div>
          <div className="tracker-controls">
            <div className="portal-search"><Icon name="compass" size={16} /><input aria-label="Search applications" placeholder="Search company, role, or location" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <select aria-label="Filter applications by status" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option>All</option><option>Needs review</option><option>Ready</option><option>Applied</option><option>Sourced</option><option>Screening</option>
            </select>
          </div>
          <div className="application-list">
            {filtered.map((application) => (
              <button className={`application-item ${selected?.id === application.id ? 'selected' : ''}`} type="button" key={application.id} onClick={() => setSelected(application)}>
                <span className="application-company-mark">{application.company[0]}</span>
                <span className="application-main"><strong>{application.role}</strong><small>{application.company} · {application.location}</small></span>
                <span className="application-fit"><strong>{application.fit}%</strong><small>match</small></span>
                <span className={`portal-status ${statusClass[application.status]}`}><i />{application.status}</span>
                <span className="application-date">{application.date}</span>
              </button>
            ))}
            {!filtered.length && <div className="portal-empty">No applications match this filter.</div>}
          </div>
        </div>

        <aside className="portal-panel detail-panel">
          <div className="detail-label">Selected opportunity</div>
          <span className="detail-company-mark">{selected.company[0]}</span>
          <h2>{selected.role}</h2>
          <p>{selected.company} · {selected.location}</p>
          <div className="match-block"><span><strong>{selected.fit}%</strong> role match</span><div><i style={{ width: `${selected.fit}%` }} /></div></div>
          <dl className="detail-list">
            <div><dt>Status</dt><dd><span className={`portal-status ${statusClass[selected.status]}`}><i />{selected.status}</span></dd></div>
            <div><dt>Resume</dt><dd>{selected.resume}</dd></div>
            <div><dt>Source</dt><dd>{selected.source}</dd></div>
            <div><dt>Added</dt><dd>{selected.date}</dd></div>
          </dl>
          <div className="next-action"><span><Icon name="target" size={18} /></span><div><small>Next action</small><strong>{selected.next}</strong></div></div>
          {['Needs review', 'Sourced'].includes(selected.status) ? (
            <button className="btn btn-primary w-100" type="button" onClick={approveOpportunity}>Approve opportunity <Icon name="check" size={17} /></button>
          ) : (
            <button className="btn btn-outline-dark w-100" type="button" disabled>No action required</button>
          )}
          <p className="detail-disclaimer"><Icon name="shield" size={14} /> You retain final approval for candidate-specific information.</p>
        </aside>
      </section>
    </PortalLayout>
  );
}

export default Tracker;
