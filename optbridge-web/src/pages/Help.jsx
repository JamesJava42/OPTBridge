import { useState } from 'react';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const CUSTOMER_ISSUES_KEY = 'optbridge-demo-customer-issues';

const helpTopics = [
  { icon: 'layers', title: 'Tracker or status', text: 'Ask what a status means or report an update that looks wrong.' },
  { icon: 'document', title: 'Resume or document', text: 'Fix a broken link, permission problem, or resume-version question.' },
  { icon: 'human', title: 'Search preferences', text: 'Request a change to target roles, locations, or work mode.' },
];

function Help() {
  const { user } = useAuth();
  const [submittedId, setSubmittedId] = useState('');

  const submitIssue = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const id = `OB-${Math.floor(1100 + Math.random() * 800)}`;
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem(CUSTOMER_ISSUES_KEY)) || []; } catch { saved = []; }
    const issue = {
      id,
      student: `${user.name.split(' ')[0]} ${user.name.split(' ').at(-1)[0]}.`,
      subject: data.subject,
      category: data.category,
      priority: data.priority,
      status: 'Open',
      updated: 'Just now',
      owner: 'Unassigned',
      message: data.message,
    };
    localStorage.setItem(CUSTOMER_ISSUES_KEY, JSON.stringify([issue, ...saved]));
    setSubmittedId(id);
    event.currentTarget.reset();
  };

  return (
    <PortalLayout eyebrow="Member support · Your active sprint" title="Get help" actions={<span className="portal-plan-pill"><Icon name="clock" size={14} /> Typical reply within 1 business day</span>}>
      {submittedId && <div className="support-success" role="status"><span><Icon name="check" size={17} /></span><div><strong>Request {submittedId} was created.</strong><small>Your support team can now see it in the issue queue.</small></div><button type="button" onClick={() => setSubmittedId('')}>×</button></div>}

      <section className="help-topics">
        {helpTopics.map((topic) => <article key={topic.title}><span><Icon name={topic.icon} size={19} /></span><div><strong>{topic.title}</strong><p>{topic.text}</p></div></article>)}
      </section>

      <section className="help-layout">
        <form className="portal-panel help-form" onSubmit={submitIssue}>
          <div className="portal-panel-heading"><div><h2>Send a support request</h2><p>Describe one issue at a time so the team can investigate quickly.</p></div></div>
          <div className="help-form-body">
            <div className="help-field-row">
              <div><label htmlFor="issueCategory">Category</label><select id="issueCategory" name="category" required><option>Tracker</option><option>Documents</option><option>Search profile</option><option>Application</option><option>Billing</option><option>Other</option></select></div>
              <div><label htmlFor="issuePriority">Priority</label><select id="issuePriority" name="priority" required><option>Normal</option><option>High</option></select></div>
            </div>
            <label htmlFor="issueSubject">Subject</label><input id="issueSubject" name="subject" placeholder="A short summary of the issue" required />
            <label htmlFor="issueMessage">What happened?</label><textarea id="issueMessage" name="message" rows="6" placeholder="Include what you expected, what happened, and any relevant role or document." required />
            <div className="help-form-footer"><span><Icon name="shield" size={15} /> Do not include passwords, SSNs, or payment card details.</span><button className="btn btn-primary" type="submit">Create request <Icon name="arrow" size={16} /></button></div>
          </div>
        </form>

        <aside className="portal-panel help-expectations">
          <div className="detail-label">What happens next</div>
          <ol><li><span>1</span><div><strong>Request enters the queue</strong><small>Support employees can read the issue context.</small></div></li><li><span>2</span><div><strong>The team investigates</strong><small>Employees escalate changes to an authorized owner.</small></div></li><li><span>3</span><div><strong>You receive an update</strong><small>We follow up using the contact information on your account.</small></div></li></ol>
          <div className="help-boundary"><Icon name="shield" size={17} /><span><strong>Account or billing changes</strong><small>Require administrator verification before anything is changed.</small></span></div>
        </aside>
      </section>
    </PortalLayout>
  );
}

export default Help;
