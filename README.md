# OPTBridge

OPTBridge is a React + Vite landing website for a monthly OPT job-search support service for international students.

## Run Locally

```bash
cd optbridge-web
npm install
npm run dev
```

## Portal Prototype

The site includes a role-based portal preview at `/login`.

| Role | Username | Password | Access |
| --- | --- | --- | --- |
| Subscriber | `maya.student` | `demo123` | Own application tracker |
| Employee | `alex.support` | `demo123` | Read-only customer issue desk |
| Admin | `admin` | `admin123` | Employee access management and issue desk |

Admins can create, suspend, and restore employee accounts in the prototype. Demo sessions use browser storage so the flows can be reviewed without a backend.

Subscriber demo flow:

1. Sign in and review role-level activity in **My tracker**.
2. Approve opportunities that need candidate review.
3. Review plan benefits, renewal settings, payment summary, and discounts in **Plan & access**.
4. Use `BRIDGE20` to preview a valid next-sprint discount.
5. Create a request in **Get help**, then sign in as an employee to see it in the read-only issue queue.

Public account and pre-sale help is routed through `/contact`. In demo mode those requests appear only in the admin **Owner inbox**. Set `VITE_CONTACT_ENDPOINT` to deliver them to a real backend before production.

### Required Before Production

The browser-based demo authentication is not a production security boundary. Before handling real customer or payment data, replace it with server-side authentication and authorization that includes:

- Password hashing and secure, HTTP-only sessions
- Server-enforced role checks on every protected API request
- Subscription status sourced from verified billing webhooks
- Tenant-scoped queries so subscribers can access only their own records
- Admin audit logs, password reset, rate limiting, and optional MFA
- Encrypted storage, retention rules, backups, and privacy review
- Removal of demo credentials and browser-stored staff passwords

The intake form also requires a production `VITE_INTAKE_ENDPOINT` before it can deliver submissions.

## First Release

See [FIRST_RELEASE.md](./FIRST_RELEASE.md) for the Vercel deployment steps, Formspree notification setup, launch checklist, support workflow, and group-message pitch.
