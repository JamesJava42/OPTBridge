import { useMemo, useState } from 'react';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';
import { supportIssues } from '../data/portalData.js';
import { useAuth } from '../context/AuthContext.jsx';

function readIssues() {
  try {
    const customerIssues = JSON.parse(localStorage.getItem('optbridge-demo-customer-issues')) || [];
    return [...customerIssues, ...supportIssues];
  } catch {
    return supportIssues;
  }
}

function SupportDesk() {
  const { user } = useAuth();
  const [allIssues] = useState(readIssues);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(() => readIssues()[0]);

  const issues = useMemo(() => allIssues.filter((issue) => `${issue.id} ${issue.student} ${issue.subject} ${issue.category}`.toLowerCase().includes(query.toLowerCase())), [allIssues, query]);

  return (
    <PortalLayout
      eyebrow="Internal workspace · Read-only customer view"
      title="Customer issues"
      actions={<span className="readonly-pill"><Icon name="shield" size={15} /> Read only</span>}
    >
      <div className="staff-notice"><Icon name="human" size={18} /><span><strong>Minimum access is active.</strong> Customer records are visible for issue investigation only. Editing applications, subscriptions, or personal data is disabled for employees.</span></div>
      <section className="support-layout">
        <div className="portal-panel issues-panel">
          <div className="portal-panel-heading">
            <div><h2>Issue queue</h2><p>{allIssues.filter((issue) => issue.status !== 'Resolved').length} active customer issues</p></div>
            <div className="portal-search compact"><Icon name="compass" size={16} /><input aria-label="Search issues" placeholder="Search issues" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          </div>
          <div className="issue-list-head"><span>Issue</span><span>Customer</span><span>Priority</span><span>Status</span><span>Updated</span></div>
          <div className="issue-list">
            {issues.map((issue) => (
              <button className={`issue-row ${selected.id === issue.id ? 'selected' : ''}`} type="button" key={issue.id} onClick={() => setSelected(issue)}>
                <span><small>{issue.id} · {issue.category}</small><strong>{issue.subject}</strong></span>
                <span>{issue.student}</span>
                <span className={`priority ${issue.priority.toLowerCase()}`}>{issue.priority}</span>
                <span className={`issue-status ${issue.status.toLowerCase().replace(' ', '-')}`}>{issue.status}</span>
                <span>{issue.updated}</span>
              </button>
            ))}
          </div>
        </div>
        <aside className="portal-panel issue-detail">
          <div className="detail-label">{selected.id}</div>
          <h2>{selected.subject}</h2>
          <div className="issue-meta"><span>{selected.category}</span><span className={`priority ${selected.priority.toLowerCase()}`}>{selected.priority}</span></div>
          <div className="customer-summary"><span className="portal-avatar">{selected.student[0]}</span><div><strong>{selected.student}</strong><small>Active Career Accelerator subscriber</small></div></div>
          <div className="issue-detail-block"><small>Customer note</small><p>{selected.message || 'I updated the document link, but the tracker still says the file cannot be opened. Can someone verify the permission?'}</p></div>
          <dl className="detail-list"><div><dt>Owner</dt><dd>{selected.owner}</dd></div><div><dt>Last updated</dt><dd>{selected.updated}</dd></div><div><dt>Your access</dt><dd>{user.role === 'admin' ? 'Administrator' : 'Read only'}</dd></div></dl>
          <div className="readonly-action"><Icon name="shield" size={17} /> Employees can inspect and escalate. Only an admin or assigned service owner can change customer records.</div>
        </aside>
      </section>
    </PortalLayout>
  );
}

export default SupportDesk;
