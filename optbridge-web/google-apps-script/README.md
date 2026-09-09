# Google Sheets form handler

This is the no-database submission handler for the public Contact and Fit Review forms. Both forms write to one private Google Sheet. Contact requests receive one confirmation; consented fit-review requests also receive the scheduled 2, 4, 24, and 34-hour updates.

## Install

1. Sign in as `optbridgesupport@gmail.com` and create a private Google Sheet named `OPTBridge Submissions`.
2. In that Sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with [`Code.gs`](./Code.gs).
4. Check `CONFIG.OWNER_EMAIL` and `CONFIG.FRONTEND_ORIGIN` at the top of the file.
5. In Apps Script **Project Settings**, set the time zone to `America/Los_Angeles` (or the owner's actual time zone).
6. Select `setupOptBridge` in the function menu, click **Run**, and approve the Sheet, trigger, and email permissions. This creates the header row and one hourly trigger.
7. Select **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Deploy and copy the production URL ending in `/exec`. Do not use the `/dev` test URL.
9. In Vercel, add `VITE_FORM_WEBHOOK_URL` to the Production environment with that `/exec` URL, then redeploy.
10. Submit one Contact request and one Fit Review from an incognito window. Verify the rows, both immediate emails, and the Apps Script **Executions** log.

When `Code.gs` changes, create a new Web App version from **Deploy → Manage deployments → Edit → New version**, then deploy it. Saving the editor alone does not update the production `/exec` deployment. The `/exec` URL normally remains the same.

## Operating the sheet

- Set `Status` to `Replied`, `Closed`, `Not a fit`, `Do not contact`, or `Unsubscribed` to stop future scheduled emails for that row.
- The four follow-up columns contain timestamps after delivery. If the trigger was down long enough to miss a stage, older messages are marked as skipped so several emails are not sent together.
- Check `Last Email Error` and **Apps Script → Executions** daily during the pilot.
- Keep the spreadsheet private. Do not put passwords, SSNs, card details, or immigration documents in it.
- Treat the public Web App URL as a public endpoint. The handler validates fields, ignores a honeypot, blocks formula injection, and deduplicates submissions, but determined abuse can still consume quota.

## Capacity and launch limits

Google Sheets is free for this pilot but is not literally unlimited: a spreadsheet has a cell limit. Apps Script and Gmail also have quotas. A fit review can use up to six email recipients (confirmation, owner alert, and four follow-ups), so monitor quota closely before sharing broadly. If the pilot grows, add stronger bot protection and move the webhook behind a server-side endpoint.

The browser integration uses a hidden native form plus a verified `postMessage` response. This avoids JSON-fetch CORS/preflight problems while retaining the direct browser-to-Apps-Script architecture.
