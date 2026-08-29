import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { plans } from '../data/plans.js';

function Account() {
  const { user } = useAuth();
  const plan = plans.find((candidate) => candidate.name === user.plan) || plans[2];
  const [autoRenew, setAutoRenew] = useState(true);
  const [discount, setDiscount] = useState('');
  const [discountState, setDiscountState] = useState('idle');
  const [notice, setNotice] = useState('');

  const applyDiscount = (event) => {
    event.preventDefault();
    setDiscountState(discount.trim().toUpperCase() === 'BRIDGE20' ? 'success' : 'error');
  };

  const updateRenewal = () => {
    setAutoRenew((current) => !current);
    setNotice(autoRenew ? 'Auto-renewal is off for this demo. Your current sprint remains active through September 1.' : 'Auto-renewal is back on for this demo.');
  };

  return (
    <PortalLayout eyebrow="Membership · Plan and account" title="Plan & access" actions={<Link className="btn btn-outline-dark" to="/#plans">Compare plans</Link>}>
      {notice && <div className="admin-notice" role="status"><Icon name="check" size={17} />{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}

      <section className="membership-hero">
        <div>
          <span className="membership-status"><span className="pulse-dot" /> Active subscription</span>
          <p>Your current plan</p>
          <h2>{plan.name}</h2>
          <span className="membership-cycle">30-day sprint · August 2–September 1, 2026</span>
        </div>
        <div className="membership-price"><strong>{plan.price}</strong><span>per sprint</span><small>{autoRenew ? 'Renews September 1' : 'Ends September 1'}</small></div>
      </section>

      <section className="account-grid">
        <div className="account-main-column">
          <article className="portal-panel account-panel">
            <div className="portal-panel-heading"><div><h2>What your plan includes</h2><p>Your active Copilot support for this sprint.</p></div><span className="portal-plan-pill">5 benefits</span></div>
            <div className="benefit-grid">
              {plan.features.map((feature, index) => (
                <div key={feature}><span><Icon name={['compass', 'document', 'shield', 'human', 'target'][index]} size={18} /></span><div><strong>{feature}</strong><small>{['Targeted around your search profile', 'Aligned to priority opportunities', 'Checked before candidate review', 'Response during the active sprint', 'Performance signals and next steps'][index]}</small></div></div>
              ))}
            </div>
          </article>

          <article className="portal-panel sprint-progress-panel">
            <div className="portal-panel-heading"><div><h2>This sprint</h2><p>Your service milestones and current stage.</p></div><span className="detail-label">Week 2 of 4</span></div>
            <div className="sprint-timeline">
              <div className="complete"><span><Icon name="check" size={14} /></span><div><strong>Search profile confirmed</strong><small>Roles, locations, and authorization context</small></div></div>
              <div className="complete"><span><Icon name="check" size={14} /></span><div><strong>Resume foundation approved</strong><small>Core resume version ready</small></div></div>
              <div className="current"><span>3</span><div><strong>Weekly application workflow</strong><small>Review matches and candidate actions</small></div></div>
              <div><span>4</span><div><strong>Month-end review</strong><small>Results, lessons, and next-sprint decision</small></div></div>
            </div>
          </article>
        </div>

        <aside className="account-side-column">
          <article className="portal-panel billing-panel">
            <div className="portal-panel-heading"><div><h2>Renewal</h2><p>Control your next sprint.</p></div></div>
            <dl className="detail-list"><div><dt>Next date</dt><dd>September 1, 2026</dd></div><div><dt>Plan price</dt><dd>{plan.price}</dd></div><div><dt>Payment</dt><dd>•••• 4242</dd></div></dl>
            <div className="renewal-control"><div><strong>Auto-renew</strong><small>{autoRenew ? 'Your next sprint renews automatically.' : 'Your plan ends after this sprint.'}</small></div><button className={`toggle-control ${autoRenew ? 'active' : ''}`} type="button" role="switch" aria-checked={autoRenew} onClick={updateRenewal}><i /></button></div>
            <button className="btn btn-outline-dark w-100" type="button" onClick={() => setNotice('Billing changes are disabled in this prototype. Connect Stripe Customer Portal before launch.')}>Manage payment method</button>
          </article>

          <article className="portal-panel discount-panel">
            <span className="discount-icon"><Icon name="spark" size={20} /></span>
            <h2>Have a discount?</h2>
            <p>Eligible codes apply to the next sprint, not the current billing period.</p>
            <form onSubmit={applyDiscount}><input aria-label="Discount code" placeholder="Enter code" value={discount} onChange={(event) => { setDiscount(event.target.value); setDiscountState('idle'); }} /><button type="submit">Apply</button></form>
            {discountState === 'success' && <div className="discount-message success"><Icon name="check" size={14} /> BRIDGE20 adds a $20 demo credit.</div>}
            {discountState === 'error' && <div className="discount-message error">That code is not valid.</div>}
          </article>

          <article className="portal-panel profile-summary-panel">
            <div className="portal-panel-heading"><div><h2>Account</h2><p>Information tied to this workspace.</p></div></div>
            <dl className="detail-list"><div><dt>Member</dt><dd>{user.name}</dd></div><div><dt>Username</dt><dd>{user.username}</dd></div><div><dt>Access</dt><dd>Subscriber only</dd></div></dl>
          </article>
        </aside>
      </section>
    </PortalLayout>
  );
}

export default Account;
