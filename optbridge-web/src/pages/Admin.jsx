import { useMemo, useState } from 'react';
import PortalLayout from '../components/PortalLayout.jsx';
import Icon from '../components/Icon.jsx';
import { initialEmployees } from '../data/portalData.js';

const STAFF_KEY = 'optbridge-demo-staff-accounts';

function readManagedStaff() {
  try {
    const saved = JSON.parse(localStorage.getItem(STAFF_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch { /* use initial demo data */ }
  return initialEmployees.map((employee) => ({ ...employee, role: 'employee', password: employee.username === 'alex.support' ? 'demo123' : 'temporary' }));
}

function Admin() {
  const [employees, setEmployees] = useState(readManagedStaff);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('');

  const activeCount = useMemo(() => employees.filter((employee) => employee.status === 'active').length, [employees]);

  const persist = (next) => {
    setEmployees(next);
    localStorage.setItem(STAFF_KEY, JSON.stringify(next));
  };

  const toggleStatus = (id) => {
    const next = employees.map((employee) => employee.id === id ? { ...employee, status: employee.status === 'active' ? 'suspended' : 'active' } : employee);
    persist(next);
    const changed = next.find((employee) => employee.id === id);
    setNotice(`${changed.name} is now ${changed.status}.`);
  };

  const addEmployee = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (employees.some((employee) => employee.username.toLowerCase() === data.username.toLowerCase())) {
      setNotice('That username is already in use.');
      return;
    }
    const employee = {
      id: `employee-${Date.now()}`,
      name: data.name,
      username: data.username,
      password: data.password,
      role: 'employee',
      access: 'Support read-only',
      status: 'active',
      lastActive: 'Not yet signed in',
    };
    persist([...employees, employee]);
    event.currentTarget.reset();
    setShowForm(false);
    setNotice(`Access granted to ${employee.name}.`);
  };

  return (
    <PortalLayout
      eyebrow="Administration · Role-based access"
      title="Access control"
      actions={<button className="btn btn-primary" type="button" onClick={() => setShowForm(true)}><span>+</span> Add employee</button>}
    >
      {notice && <div className="admin-notice" role="status"><Icon name="check" size={17} />{notice}<button type="button" onClick={() => setNotice('')}>×</button></div>}
      <section className="admin-summary-grid">
        <article><span className="admin-summary-icon"><Icon name="human" size={20} /></span><div><small>Active employees</small><strong>{activeCount}</strong></div></article>
        <article><span className="admin-summary-icon"><Icon name="shield" size={20} /></span><div><small>Permission policy</small><strong>Least privilege</strong></div></article>
        <article><span className="admin-summary-icon"><Icon name="clock" size={20} /></span><div><small>Access review</small><strong>Due Sep 1</strong></div></article>
      </section>

      <section className="portal-panel access-panel">
        <div className="portal-panel-heading"><div><h2>Employee access</h2><p>Only administrators can grant, suspend, or restore staff access.</p></div><span className="readonly-pill"><Icon name="shield" size={14} /> Admin only</span></div>
        <div className="access-table-head"><span>Employee</span><span>Username</span><span>Permission</span><span>Last active</span><span>Status</span><span>Action</span></div>
        <div className="access-table">
          {employees.map((employee) => (
            <div className="access-row" key={employee.id}>
              <span className="employee-cell"><span className="portal-avatar">{employee.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><strong>{employee.name}</strong></span>
              <span>{employee.username}</span>
              <span><span className="permission-pill">{employee.access}</span></span>
              <span>{employee.lastActive}</span>
              <span><span className={`account-status ${employee.status}`}><i />{employee.status}</span></span>
              <span><button className="access-action" type="button" onClick={() => toggleStatus(employee.id)}>{employee.status === 'active' ? 'Suspend' : 'Restore'}</button></span>
            </div>
          ))}
        </div>
      </section>

      <section className="permission-explainer">
        <div><Icon name="document" size={21} /><span><strong>Employees: support visibility only</strong><small>Can read issue context and customer-reported product problems. Cannot alter applications, payments, accounts, or permissions.</small></span></div>
        <div><Icon name="shield" size={21} /><span><strong>Admins: access management</strong><small>Can grant and suspend employee accounts and inspect the support workspace.</small></span></div>
      </section>

      {showForm && (
        <div className="portal-modal-backdrop" role="presentation" onMouseDown={() => setShowForm(false)}>
          <div className="portal-modal" role="dialog" aria-modal="true" aria-labelledby="add-employee-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="portal-modal-heading"><div><span className="admin-summary-icon"><Icon name="human" size={20} /></span><div><h2 id="add-employee-title">Add employee access</h2><p>Creates a read-only support account.</p></div></div><button type="button" aria-label="Close" onClick={() => setShowForm(false)}>×</button></div>
            <form onSubmit={addEmployee}>
              <label htmlFor="employeeName">Full name</label><input id="employeeName" name="name" required />
              <label htmlFor="employeeUsername">Username</label><input id="employeeUsername" name="username" pattern="[a-zA-Z0-9._-]+" required />
              <label htmlFor="temporaryPassword">Temporary password</label><input id="temporaryPassword" name="password" type="password" minLength="8" required />
              <div className="grant-preview"><Icon name="shield" size={17} /><span><strong>Support read-only</strong><small>No customer editing, billing, application, or admin permission.</small></span></div>
              <div className="modal-actions"><button className="btn btn-quiet" type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="btn btn-primary" type="submit">Grant access</button></div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}

export default Admin;
