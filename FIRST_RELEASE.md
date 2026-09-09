# OPTBridge First Release Plan

## Release objective

The first release is not about proving that every portal feature is finished. Its goal is to earn one genuine conversation from the first 1–10 interested students and learn why they did or did not continue.

Primary conversion: **Fit review submitted**

Secondary conversion: **Contact request submitted**

## Recommended launch stack

- **Frontend and traffic analytics:** Vercel
- **Contact and fit-review delivery:** Google Sheets + Google Apps Script
- **Notification inbox:** `optbridgesupport@gmail.com`
- **Source control and automatic deployments:** GitHub `main` branch

Do not publish the personal phone number for the first release. The support email creates one consistent contact channel and avoids exposing personal information in public groups.

## One-time setup before sharing

1. Secure `optbridgesupport@gmail.com` with recovery information and two-factor authentication.
2. Create the private Google Sheet and deploy the Apps Script handler by following `optbridge-web/google-apps-script/README.md`.
3. Import the GitHub repository into Vercel.
4. Set the Vercel project root directory to `optbridge-web`.
5. Add these Production environment variables in Vercel:
   - `VITE_FORM_WEBHOOK_URL`
   - `VITE_ENABLE_PORTAL_DEMO=true`
6. Enable Vercel Web Analytics in the project dashboard.
7. Deploy, then submit both forms from an incognito mobile browser.
8. Confirm both emails reach the support inbox and that replies go to the student's submitted email.
9. Test `/`, `/join`, `/contact`, `/login`, `/terms`, `/privacy`, and `/refund` from the deployed URL.

Never launch with the placeholder endpoint values from `.env.example`.

## Support inbox workflow

Create Gmail labels:

- `OPTBridge / New lead`
- `OPTBridge / Fit review`
- `OPTBridge / Needs reply`
- `OPTBridge / Replied`
- `OPTBridge / Not a fit`

Use a notification on the `OPTBridge / Needs reply` label. Reply within one business day. Do not request Social Security numbers, passwords, card numbers, or immigration documents through email.

For an initial fit review, confirm only what is needed:

- Name and preferred email
- Current OPT or STEM OPT context
- Target roles and locations
- Experience level
- Resume link with intentional sharing permission
- What support the student needs most

## Short group pitch

> Job searching on OPT can become a full-time job by itself. OPTBridge is an early AI + human job-search copilot that helps international graduates organize better-fit roles, resume versions, approvals, and follow-ups in one transparent workflow. Explore the student portal preview and request a free fit review—no payment or job guarantee. [YOUR LINK]

Short version:

> On OPT and struggling to keep your job search organized? OPTBridge combines AI-assisted discovery, human quality review, and a private application tracker. We are inviting a small first group to review the product and request a free fit check: [YOUR LINK]

## First reply template

Subject: `Thanks for contacting OPTBridge`

> Hi [First name],
>
> Thanks for reaching out to OPTBridge. I received your request about [topic]. I will review the information you submitted and reply with either a recommended next step or an honest note if the current service is not the right fit. Please do not send passwords, SSNs, payment card details, or immigration documents by email.
>
> — OPTBridge Support

## What a student must believe

Before submitting, a student should be able to answer:

1. Who is this for? International graduates navigating OPT or STEM OPT.
2. What does it do? Improves job-search organization, targeting, resume workflow, and visibility.
3. What does it not promise? Interviews, offers, sponsorship, or immigration outcomes.
4. What happens after submission? A human reviews fit and replies through the support email.
5. Is payment collected now? No payment is collected by the public website.
6. Can I see the product? Yes, through a sample student portal containing demo data.
7. How is my information handled? The privacy policy and form warnings explain the current boundaries.

## Metrics for the first 7 days

Record only these numbers:

- Unique visitors
- Visits to Plans
- Visits to Join
- Student portal preview opens
- Contact submissions
- Fit-review submissions
- Replies sent within one business day
- Qualified conversations

Do not optimize for likes or group-message views. The first meaningful success is one qualified student conversation.

## Known boundaries

- The public website and forms are suitable for gathering early interest after the endpoints are configured.
- The student portal is a sample-data product preview, not secure customer infrastructure.
- Do not place real student, billing, employee, or application data in the demo portal.
- Real subscriber accounts require backend authentication, database authorization, verified subscription status, audit logging, and password recovery.
- Have the legal pages reviewed by a qualified professional before accepting payment or scaling beyond an early pilot.
