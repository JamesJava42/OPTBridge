export const demoAccounts = [
  {
    id: 'student-1',
    username: 'maya.student',
    password: 'demo123',
    name: 'Maya Patel',
    role: 'subscriber',
    subscription: 'active',
    plan: 'Copilot',
  },
  {
    id: 'employee-1',
    username: 'alex.support',
    password: 'demo123',
    name: 'Alex Morgan',
    role: 'employee',
    status: 'active',
  },
  {
    id: 'admin-1',
    username: 'admin',
    password: 'admin123',
    name: 'Jordan Lee',
    role: 'admin',
    status: 'active',
  },
];

export const applications = [
  { id: 1, company: 'Northstar Health', role: 'Product Data Analyst', location: 'New York, NY', fit: 92, resume: 'Analytics v3', status: 'Needs review', date: 'Aug 22', next: 'Approve tailored resume', source: 'Company careers' },
  { id: 2, company: 'Arc Labs', role: 'Business Intelligence Analyst', location: 'Remote', fit: 88, resume: 'BI v2', status: 'Ready', date: 'Aug 21', next: 'Candidate application questions', source: 'LinkedIn' },
  { id: 3, company: 'Fieldwork Systems', role: 'Operations Analyst', location: 'Chicago, IL', fit: 84, resume: 'Core v4', status: 'Applied', date: 'Aug 19', next: 'Follow up Aug 27', source: 'Handshake' },
  { id: 4, company: 'Veridian', role: 'Junior Data Analyst', location: 'Austin, TX', fit: 81, resume: 'Analytics v3', status: 'Sourced', date: 'Aug 18', next: 'Sponsorship language check', source: 'Company careers' },
  { id: 5, company: 'Kindred Commerce', role: 'Growth Analyst', location: 'Boston, MA', fit: 79, resume: 'Growth v1', status: 'Screening', date: 'Aug 14', next: 'Recruiter screen Aug 26', source: 'Referral' },
];

export const supportIssues = [
  { id: 'OB-1042', student: 'Maya P.', subject: 'Resume link needs permission', category: 'Documents', priority: 'High', status: 'Open', updated: '8 min ago', owner: 'Unassigned' },
  { id: 'OB-1041', student: 'Daniel K.', subject: 'Tracker status clarification', category: 'Tracker', priority: 'Normal', status: 'In review', updated: '31 min ago', owner: 'Alex M.' },
  { id: 'OB-1039', student: 'Sara N.', subject: 'Update preferred locations', category: 'Search profile', priority: 'Normal', status: 'Waiting', updated: '2 hr ago', owner: 'Priya S.' },
  { id: 'OB-1037', student: 'Ethan W.', subject: 'Application question needs input', category: 'Application', priority: 'High', status: 'Open', updated: '3 hr ago', owner: 'Unassigned' },
  { id: 'OB-1034', student: 'Aisha R.', subject: 'Weekly report not received', category: 'Delivery', priority: 'Normal', status: 'Resolved', updated: 'Yesterday', owner: 'Alex M.' },
];

export const initialEmployees = [
  { id: 'employee-1', name: 'Alex Morgan', username: 'alex.support', access: 'Support read-only', status: 'active', lastActive: '12 min ago' },
  { id: 'employee-2', name: 'Priya Shah', username: 'priya.support', access: 'Support read-only', status: 'active', lastActive: '1 hr ago' },
  { id: 'employee-3', name: 'Noah Williams', username: 'noah.ops', access: 'Support read-only', status: 'suspended', lastActive: 'Aug 18' },
];
