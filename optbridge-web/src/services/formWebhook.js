const RESPONSE_SOURCE = 'optbridge-form-webhook';
const RESPONSE_TIMEOUT_MS = 15000;

function createSubmissionId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function submitFormToWebhook(endpoint, formType, fields) {
  if (!endpoint) return Promise.reject(new Error('The form webhook is not configured.'));

  return new Promise((resolve, reject) => {
    const clientSubmissionId = createSubmissionId();
    const frameName = `optbridge-form-${clientSubmissionId.replace(/[^a-zA-Z0-9]/g, '')}`;
    const iframe = document.createElement('iframe');
    const form = document.createElement('form');
    const payloadInput = document.createElement('input');
    let settled = false;

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timeoutId);
      form.remove();
      iframe.remove();
    };

    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback(value);
    };

    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== RESPONSE_SOURCE || data.clientSubmissionId !== clientSubmissionId) return;

      if (data.ok) {
        finish(resolve, data);
      } else {
        finish(reject, new Error(data.error || 'The submission could not be processed.'));
      }
    };

    const timeoutId = window.setTimeout(() => {
      finish(reject, new Error('The submission service did not respond in time.'));
    }, RESPONSE_TIMEOUT_MS);

    iframe.name = frameName;
    iframe.title = 'Form submission response';
    iframe.hidden = true;

    form.action = endpoint;
    form.method = 'POST';
    form.target = frameName;
    form.hidden = true;

    payloadInput.type = 'hidden';
    payloadInput.name = 'payload';
    payloadInput.value = JSON.stringify({
      ...fields,
      formType,
      clientSubmissionId,
      submittedFrom: window.location.origin,
    });

    form.appendChild(payloadInput);
    document.body.append(iframe, form);
    window.addEventListener('message', handleMessage);
    form.submit();
  });
}
