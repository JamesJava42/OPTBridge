/**
 * OPTBridge form webhook
 *
 * Install this as a script bound to the Google Sheet that will own the leads.
 * Update the three values below, run setupOptBridge() once, then deploy as a
 * Web App that executes as you and is available to anyone.
 */
var CONFIG = {
  SHEET_NAME: 'Submissions',
  OWNER_EMAIL: 'optbridgesupport@gmail.com',
  FRONTEND_ORIGIN: 'https://opt-bridge.vercel.app',
  SENDER_NAME: 'OPTBridge Support'
};

var HEADERS = [
  'Received At', 'Request ID', 'Client Submission ID', 'Form Type', 'Status',
  'Full Name', 'Email', 'Phone', 'Topic', 'Subject', 'Details', 'Portal Username',
  'Authorization', 'OPT End Date', 'Location', 'Plan', 'Preferred Batch',
  'Experience', 'Work Mode', 'Target Roles', 'LinkedIn URL', 'Resume URL',
  'Notes', 'Consent', 'Source', 'User Confirmation Sent At', 'Owner Alert Sent At', '2hr Followup Sent?',
  '4hr Followup Sent?', '24hr Followup Sent?', '34hr Followup Sent?',
  'Unsubscribed At', 'Last Email Error'
];

var FOLLOWUPS = [
  { hours: 2, column: '2hr Followup Sent?', subject: 'Your OPTBridge fit review: what happens next', body: followup2Hour_ },
  { hours: 4, column: '4hr Followup Sent?', subject: 'A quick preparation checklist for your fit review', body: followup4Hour_ },
  { hours: 24, column: '24hr Followup Sent?', subject: 'Your OPTBridge fit review is in our queue', body: followup24Hour_ },
  { hours: 34, column: '34hr Followup Sent?', subject: 'Checking in on your OPTBridge request', body: followup34Hour_ }
];

function doGet(e) {
  if (!e || e.parameter.action !== 'unsubscribe') {
    return HtmlService.createHtmlOutput('OPTBridge form webhook is ready.');
  }

  var requestId = cleanText_(e.parameter.id, 100);
  var token = cleanText_(e.parameter.token, 200);
  if (!requestId || !safeEqual_(token, sign_(requestId))) {
    return HtmlService.createHtmlOutput('<h2>Invalid unsubscribe link</h2><p>Please contact ' + CONFIG.OWNER_EMAIL + ' for help.</p>');
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);
    var columns = headerMap_();
    if (sheet.getLastRow() >= 2) {
      var match = sheet.getRange(2, columns['Request ID'] + 1, sheet.getLastRow() - 1, 1)
        .createTextFinder(requestId).matchEntireCell(true).findNext();
      if (match) {
        sheet.getRange(match.getRow(), columns.Status + 1).setValue('Unsubscribed');
        sheet.getRange(match.getRow(), columns['Unsubscribed At'] + 1).setValue(new Date());
      }
    }
  } finally {
    lock.releaseLock();
  }
  return HtmlService.createHtmlOutput('<h2>You are unsubscribed</h2><p>No more automated OPTBridge follow-up emails will be sent for this request.</p>');
}

function doPost(e) {
  var clientSubmissionId = '';

  try {
    var payload = parsePayload_(e);
    clientSubmissionId = cleanText_(payload.clientSubmissionId, 100);

    // Silently accept bot-filled honeypots without storing or emailing them.
    if (cleanText_(payload.website, 200)) {
      return responsePage_(true, clientSubmissionId, 'IGNORED');
    }

    var submission = validateSubmission_(payload);
    var result = saveSubmission_(submission, clientSubmissionId);

    if (!result.duplicate) {
      sendInitialEmails_(result.row, submission, result.requestId);
    }

    return responsePage_(true, clientSubmissionId, result.requestId);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return responsePage_(false, clientSubmissionId, '', 'We could not process this submission. Please review the form and try again.');
  }
}

/** Run once from the Apps Script editor and approve the requested permissions. */
function setupOptBridge() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) throw new Error('Open this script from the target Google Sheet before running setup');
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', activeSpreadsheet.getId());
  var sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0b3b32').setFontColor('#ffffff');
  sheet.autoResizeColumns(1, HEADERS.length);

  var properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('UNSUBSCRIBE_SECRET')) {
    properties.setProperty('UNSUBSCRIBE_SECRET', Utilities.getUuid() + Utilities.getUuid());
  }

  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'sendDueFollowups') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('sendDueFollowups').timeBased().everyHours(1).create();
}

/** Hourly trigger. Follow-ups apply only to consented fit-review requests. */
function sendDueFollowups() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);
    if (sheet.getLastRow() < 2) return;

    var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    var columns = headerMap_();
    var now = new Date();

    for (var rowIndex = 0; rowIndex < values.length; rowIndex += 1) {
      var row = values[rowIndex];
      if (row[columns['Form Type']] !== 'fit_review' || row[columns.Consent] !== 'accepted') continue;
      if (shouldStopFollowups_(row[columns.Status])) continue;

      var email = String(row[columns.Email] || '').trim();
      var receivedAt = new Date(row[columns['Received At']]);
      if (!isValidEmail_(email) || isNaN(receivedAt.getTime())) continue;

      var elapsedHours = (now.getTime() - receivedAt.getTime()) / 3600000;
      var due = FOLLOWUPS.filter(function (followup) {
        return elapsedHours >= followup.hours && !row[columns[followup.column]];
      });
      if (!due.length) continue;

      // If the trigger was unavailable for a long period, send only the newest
      // relevant message instead of delivering several old emails together.
      var selected = due[due.length - 1];
      due.slice(0, -1).forEach(function (skipped) {
        var skippedCell = sheet.getRange(rowIndex + 2, columns[skipped.column] + 1);
        skippedCell.setValue('Skipped (later stage already due)');
        row[columns[skipped.column]] = 'Skipped (later stage already due)';
      });

      if (MailApp.getRemainingDailyQuota() < 1) return;

      try {
        var name = firstName_(row[columns['Full Name']]);
        var requestId = row[columns['Request ID']];
        sendEmail_(email, selected.subject, selected.body(name, requestId));
        sheet.getRange(rowIndex + 2, columns[selected.column] + 1).setValue(new Date());
        sheet.getRange(rowIndex + 2, columns['Last Email Error'] + 1).clearContent();
      } catch (error) {
        sheet.getRange(rowIndex + 2, columns['Last Email Error'] + 1).setValue(new Date() + ': ' + safeError_(error));
      }
    }
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(e) {
  if (!e || !e.parameter || !e.parameter.payload) throw new Error('Missing payload');
  if (String(e.parameter.payload).length > 30000) throw new Error('Payload too large');
  return JSON.parse(e.parameter.payload);
}

function validateSubmission_(payload) {
  var formType = cleanText_(payload.formType, 30);
  if (formType !== 'contact' && formType !== 'fit_review') throw new Error('Unknown form type');

  var submission = {
    formType: formType,
    fullName: cleanText_(payload.fullName || payload.name, 120),
    email: cleanText_(payload.email, 254).toLowerCase(),
    phone: cleanText_(payload.phone, 40),
    topic: cleanText_(payload.topic, 80),
    subject: cleanText_(payload.subject, 180),
    details: cleanText_(payload.details, 3000),
    username: cleanText_(payload.username, 120),
    authorization: cleanText_(payload.authorization, 80),
    optEndDate: cleanText_(payload.optEndDate, 30),
    location: cleanText_(payload.location, 160),
    plan: cleanText_(payload.plan, 80),
    batchMonth: cleanText_(payload.batchMonth, 80),
    experience: cleanText_(payload.experience, 80),
    workMode: cleanText_(payload.workMode, 80),
    roles: cleanText_(payload.roles, 500),
    linkedin: cleanUrl_(payload.linkedin, false),
    resume: cleanUrl_(payload.resume, formType === 'fit_review'),
    notes: cleanText_(payload.notes, 3000),
    consent: cleanText_(payload.consent, 30),
    source: formType === 'contact' ? 'OPTBridge public contact form' : 'OPTBridge fit review form'
  };

  if (!submission.fullName || !isValidEmail_(submission.email)) throw new Error('Name and valid email are required');
  if (formType === 'contact' && (!submission.topic || !submission.subject || !submission.details)) throw new Error('Incomplete contact request');
  if (formType === 'fit_review') {
    var required = ['authorization', 'location', 'plan', 'batchMonth', 'experience', 'workMode', 'roles', 'resume'];
    required.forEach(function (field) {
      if (!submission[field]) throw new Error('Missing required fit-review field: ' + field);
    });
    if (submission.consent !== 'accepted') throw new Error('Consent is required');
  }
  return submission;
}

function saveSubmission_(submission, clientSubmissionId) {
  if (!clientSubmissionId) throw new Error('Missing submission identifier');
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);
    var columns = headerMap_();
    var lastRow = sheet.getLastRow();

    if (lastRow >= 2) {
      var match = sheet.getRange(2, columns['Client Submission ID'] + 1, lastRow - 1, 1)
        .createTextFinder(clientSubmissionId).matchEntireCell(true).findNext();
      if (match) {
        return {
          duplicate: true,
          requestId: String(sheet.getRange(match.getRow(), columns['Request ID'] + 1).getValue()),
          row: match.getRow()
        };
      }
    }

    var requestId = createRequestId_(submission.formType);
    var row = new Array(HEADERS.length).fill('');
    row[columns['Received At']] = new Date();
    row[columns['Request ID']] = requestId;
    row[columns['Client Submission ID']] = clientSubmissionId;
    row[columns['Form Type']] = submission.formType;
    row[columns.Status] = 'New';
    row[columns['Full Name']] = sheetSafe_(submission.fullName);
    row[columns.Email] = sheetSafe_(submission.email);
    row[columns.Phone] = sheetSafe_(submission.phone);
    row[columns.Topic] = sheetSafe_(submission.topic);
    row[columns.Subject] = sheetSafe_(submission.subject);
    row[columns.Details] = sheetSafe_(submission.details);
    row[columns['Portal Username']] = sheetSafe_(submission.username);
    row[columns.Authorization] = sheetSafe_(submission.authorization);
    row[columns['OPT End Date']] = sheetSafe_(submission.optEndDate);
    row[columns.Location] = sheetSafe_(submission.location);
    row[columns.Plan] = sheetSafe_(submission.plan);
    row[columns['Preferred Batch']] = sheetSafe_(submission.batchMonth);
    row[columns.Experience] = sheetSafe_(submission.experience);
    row[columns['Work Mode']] = sheetSafe_(submission.workMode);
    row[columns['Target Roles']] = sheetSafe_(submission.roles);
    row[columns['LinkedIn URL']] = sheetSafe_(submission.linkedin);
    row[columns['Resume URL']] = sheetSafe_(submission.resume);
    row[columns.Notes] = sheetSafe_(submission.notes);
    row[columns.Consent] = submission.consent;
    row[columns.Source] = submission.source;
    sheet.appendRow(row);
    return { duplicate: false, requestId: requestId, row: sheet.getLastRow() };
  } finally {
    lock.releaseLock();
  }
}

function sendInitialEmails_(rowNumber, submission, requestId) {
  var sheet = getOrCreateSheet_();
  var columns = headerMap_();

  try {
    if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Daily email quota is too low for the user confirmation');
    var firstName = firstName_(submission.fullName);
    var userSubject = submission.formType === 'contact'
      ? 'We received your OPTBridge request (' + requestId + ')'
      : 'We received your OPTBridge fit review (' + requestId + ')';
    var userBody = submission.formType === 'contact'
      ? contactConfirmation_(firstName, requestId)
      : fitReviewConfirmation_(firstName, requestId);
    sendEmail_(submission.email, userSubject, userBody);
    sheet.getRange(rowNumber, columns['User Confirmation Sent At'] + 1).setValue(new Date());

    if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Daily email quota is too low for the owner alert');
    var ownerSubject = submission.formType === 'contact'
      ? '[OPTBridge] New contact request ' + requestId
      : '[OPTBridge] New fit review ' + requestId;
    sendEmail_(CONFIG.OWNER_EMAIL, ownerSubject, ownerNotification_(submission, requestId), submission.email);
    sheet.getRange(rowNumber, columns['Owner Alert Sent At'] + 1).setValue(new Date());
  } catch (error) {
    sheet.getRange(rowNumber, columns['Last Email Error'] + 1).setValue(new Date() + ': ' + safeError_(error));
  }
}

function sendEmail_(to, subject, htmlBody, replyTo) {
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: stripHtml_(htmlBody),
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME,
    replyTo: replyTo || CONFIG.OWNER_EMAIL
  });
}

function responsePage_(ok, clientSubmissionId, requestId, errorMessage) {
  var message = {
    source: 'optbridge-form-webhook',
    ok: Boolean(ok),
    clientSubmissionId: clientSubmissionId || '',
    requestId: requestId || '',
    error: errorMessage || ''
  };
  var script = '<!doctype html><meta charset="utf-8"><script>' +
    'window.parent.postMessage(' + JSON.stringify(message).replace(/</g, '\\u003c') + ',' +
    JSON.stringify(CONFIG.FRONTEND_ORIGIN) + ');<\/script>';
  return HtmlService.createHtmlOutput(script).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getOrCreateSheet_() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  var spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Run setupOptBridge from the target Google Sheet first');
  return spreadsheet.getSheetByName(CONFIG.SHEET_NAME) || spreadsheet.insertSheet(CONFIG.SHEET_NAME);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    return;
  }
  var existing = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (existing.join('|') !== HEADERS.join('|')) {
    throw new Error('Sheet headers do not match Code.gs. Use a new sheet or restore the expected header row.');
  }
}

function headerMap_() {
  var result = {};
  HEADERS.forEach(function (header, index) { result[header] = index; });
  return result;
}

function createRequestId_(formType) {
  var prefix = formType === 'contact' ? 'INQ' : 'FIT';
  var date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
  var suffix = Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
  return prefix + '-' + date + '-' + suffix;
}

function cleanText_(value, maxLength) {
  return String(value == null ? '' : value).trim().slice(0, maxLength);
}

function cleanUrl_(value, required) {
  var url = cleanText_(value, 1000);
  if (!url && !required) return '';
  if (!/^https:\/\//i.test(url)) throw new Error('Links must use https://');
  return url;
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''));
}

function sheetSafe_(value) {
  var text = String(value || '');
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function shouldStopFollowups_(status) {
  return /^(closed|replied|not a fit|do not contact|unsubscribed)$/i.test(String(status || '').trim());
}

function firstName_(fullName) {
  return cleanText_(fullName, 120).split(/\s+/)[0] || 'there';
}

function safeError_(error) {
  return cleanText_(error && error.message ? error.message : error, 300);
}

function stripHtml_(html) {
  return String(html).replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
}

function emailShell_(name, content, requestId, includeUnsubscribe) {
  return '<p>Hi ' + htmlEscape_(name) + ',</p>' + content +
    '<p>Request ID: <strong>' + htmlEscape_(requestId) + '</strong></p>' +
    '<p>Please do not email passwords, Social Security numbers, card details, or immigration documents.</p>' +
    (includeUnsubscribe ? '<p><a href="' + htmlEscape_(unsubscribeUrl_(requestId)) + '">Stop automated follow-up emails</a></p>' : '') +
    '<p>— OPTBridge Support<br><a href="mailto:' + CONFIG.OWNER_EMAIL + '">' + CONFIG.OWNER_EMAIL + '</a></p>';
}

function contactConfirmation_(name, requestId) {
  return emailShell_(name, '<p>Thanks for contacting OPTBridge. Your message is in our support queue, and a person will review it. We aim to reply within one business day.</p>', requestId, false);
}

function fitReviewConfirmation_(name, requestId) {
  return emailShell_(name, '<p>Thanks for requesting a free OPTBridge fit review. We received your information and will review your goals before recommending a next step. No payment has been collected, and this request does not guarantee interviews, sponsorship, or employment.</p>', requestId, true);
}

function followup2Hour_(name, requestId) {
  return emailShell_(name, '<p>Your fit review is safely in our queue. A person will check your target roles, location, experience, and the support you need before replying.</p>', requestId, true);
}

function followup4Hour_(name, requestId) {
  return emailShell_(name, '<p>While we review your request, please make sure your resume link can be opened by anyone with the link. You do not need to send identity or immigration documents.</p>', requestId, true);
}

function followup24Hour_(name, requestId) {
  return emailShell_(name, '<p>We are following up on your fit-review request. If your goals have changed, reply to this email with the update so our recommendation reflects your current search.</p>', requestId, true);
}

function followup34Hour_(name, requestId) {
  return emailShell_(name, '<p>This is the final automated update for your fit review. A human response will come from this support address.</p>', requestId, true);
}

function unsubscribeUrl_(requestId) {
  return ScriptApp.getService().getUrl() + '?action=unsubscribe&id=' + encodeURIComponent(requestId) + '&token=' + encodeURIComponent(sign_(requestId));
}

function sign_(value) {
  var secret = PropertiesService.getScriptProperties().getProperty('UNSUBSCRIBE_SECRET');
  if (!secret) throw new Error('Run setupOptBridge before sending email');
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(String(value), secret)).replace(/=+$/, '');
}

function safeEqual_(left, right) {
  left = String(left || '');
  right = String(right || '');
  if (left.length !== right.length) return false;
  var mismatch = 0;
  for (var index = 0; index < left.length; index += 1) mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return mismatch === 0;
}

function ownerNotification_(submission, requestId) {
  var rows = [
    ['Request ID', requestId], ['Type', submission.formType], ['Name', submission.fullName],
    ['Email', submission.email], ['Phone', submission.phone], ['Topic', submission.topic],
    ['Subject', submission.subject], ['Plan', submission.plan], ['Target roles', submission.roles],
    ['Location', submission.location], ['Details / notes', submission.details || submission.notes]
  ];
  return '<p>A new OPTBridge submission was added to the Submissions sheet.</p><table cellpadding="6" cellspacing="0" border="1">' +
    rows.filter(function (row) { return row[1]; }).map(function (row) {
      return '<tr><th align="left">' + htmlEscape_(row[0]) + '</th><td>' + htmlEscape_(row[1]) + '</td></tr>';
    }).join('') + '</table>';
}

function htmlEscape_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
