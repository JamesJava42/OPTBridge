import { useMemo, useState } from 'react';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';

function readContacts() {
  try { return JSON.parse(localStorage.getItem('optbridge-demo-contact-requests')) || []; } catch { return []; }
}

function OwnerInbox() {
  const [requests, setRequests] = useState(readContacts);
  const [selected, setSelected] = useState(() => readContacts()[0] || null);
  const [filter, setFilter] = useState('All');
  const visible = useMemo(() => requests.filter((request) => filter === 'All' || request.status === filter), [filter, requests]);

  const updateStatus = (id, status) => {
    const next = requests.map((request) => request.id === id ? { ...request, status } : request);
    setRequests(next);
    localStorage.setItem('optbridge-demo-contact-requests', JSON.stringify(next));
    setSelected((current) => current?.id === id ? { ...current, status } : current);
  };

  return (
    <PortalLayout eyebrow="Administration · Private owner workspace" title="Owner inbox" actions={<span className="readonly-pill"><Icon name="shield" size={14} /> Admin only</span>}>
      <div className="staff-notice"><Icon name="shield" size={18} /><span><strong>Owner routing is active.</strong> Public account, billing, partnership, and pre-sale requests appear here. They are not visible to employees.</span></div>
      <section className="owner-inbox-layout">
        <div className="portal-panel owner-inbox-panel">
          <div className="portal-panel-heading"><div><h2>Public requests</h2><p>{requests.filter((request) => request.status === 'New').length} new · {requests.length} total</p></div><select aria-label="Filter owner requests" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>New</option><option>In review</option><option>Closed</option></select></div>
          {visible.length ? <div className="owner-request-list">{visible.map((request) => <button className={`owner-request-row ${selected?.id === request.id ? 'selected' : ''}`} type="button" key={request.id} onClick={() => setSelected(request)}><span className="application-company-mark">{request.name[0]}</span><span><strong>{request.subject}</strong><small>{request.name} · {request.email}</small></span><span className="request-topic">{request.topic.replaceAll('-', ' ')}</span><span className={`account-status ${request.status === 'New' ? 'active' : 'suspended'}`}><i />{request.status}</span><span>{request.received}</span></button>)}</div> : <div className="owner-empty"><span><Icon name="document" size={22} /></span><h3>No requests yet</h3><p>Submit the public contact form to preview the owner workflow.</p></div>}
        </div>
        <aside className="portal-panel owner-request-detail">
          {selected ? <><div className="detail-label">{selected.id}</div><h2>{selected.subject}</h2><p>{selected.name} · {selected.email}</p><dl className="detail-list"><div><dt>Topic</dt><dd>{selected.topic.replaceAll('-', ' ')}</dd></div><div><dt>Username</dt><dd>{selected.username || 'Not provided'}</dd></div><div><dt>Received</dt><dd>{selected.received}</dd></div></dl><div className="issue-detail-block"><small>Request details</small><p>{selected.details}</p></div><div className="owner-detail-actions"><button className="btn btn-primary" type="button" onClick={() => updateStatus(selected.id, 'In review')}>Mark in review</button><button className="btn btn-outline-dark" type="button" onClick={() => updateStatus(selected.id, 'Closed')}>Close</button></div><p className="detail-disclaimer"><Icon name="shield" size={14} /> Verify account ownership before making access or billing changes.</p></> : <div className="owner-empty compact"><span><Icon name="compass" size={22} /></span><h3>Select a request</h3><p>Request details appear here.</p></div>}
        </aside>
      </section>
    </PortalLayout>
  );
}

export default OwnerInbox;
