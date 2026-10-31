/* Static-hosting shim for the client intake form.
   GitHub Pages can't receive a form post, and the original form was method="get" (which would put a client's
   answers in the URL). So: after the browser's own validation passes, build a text summary and hand it to the
   visitor's email app. Nothing is sent by this script itself. The summary is also shown on the page to copy. */
(function () {
  var form = document.getElementById('lcs-intake');
  if (!form || form.hasAttribute('data-static-intake')) return;
  form.setAttribute('data-static-intake', '');

  var TO = 'hello@karinalujan.design';
  var SUBJECT = 'Client intake';

  function summary() {
    var lines = [];
    [].slice.call(form.elements).forEach(function (f) {
      if (!f.name || f.type === 'submit' || f.type === 'button') return;
      var v;
      if (f.type === 'checkbox') v = f.checked ? 'Yes' : '';
      else if (f.type === 'radio') {
        if (!f.checked) return;
        v = f.value;
      } else v = String(f.value || '').trim();
      if (v === '' ) return;
      lines.push(f.name + ': ' + v);
    });
    return lines.join('\n');
  }

  var panel = document.createElement('div');
  panel.id = 'lcs-static-done';
  panel.className = 'lcs-static-done';
  panel.tabIndex = -1;
  panel.setAttribute('role', 'status');
  panel.hidden = true;
  panel.innerHTML =
    '<h2 class="lcs-static-done__h">One more step: send it from your email</h2>' +
    '<p>Your email app should have opened with your answers filled in. Press send there to finish. ' +
    'If it didn’t open, use the button below or copy your answers and email them to ' +
    '<a href="mailto:' + TO + '">' + TO + '</a>. Nothing has been sent yet.</p>' +
    '<p><a class="lcs-btn lcs-static-done__btn" id="lcs-static-mail" href="#">Open email app</a> ' +
    '<button type="button" class="lcs-ghost" id="lcs-static-copy">Copy my answers</button></p>' +
    '<label for="lcs-static-text" class="lcs-static-done__l">Your answers</label>' +
    '<textarea id="lcs-static-text" readonly rows="10"></textarea>' +
    '<p class="lcs-static-done__s" id="lcs-static-live" aria-live="polite"></p>';
  form.parentNode.insertBefore(panel, form.nextSibling);

  var mailLink = panel.querySelector('#lcs-static-mail');
  var text = panel.querySelector('#lcs-static-text');
  var live = panel.querySelector('#lcs-static-live');

  function mailto(body) {
    var max = 1500, enc = encodeURIComponent(body);
    if (enc.length > max) {
      var cut = body;
      while (encodeURIComponent(cut).length > max - 60) cut = cut.slice(0, Math.floor(cut.length * 0.9));
      body = cut.replace(/\n[^\n]*$/, '') + '\n\n[Truncated. Please paste your full answers from the page.]';
    }
    return 'mailto:' + TO + '?subject=' + encodeURIComponent(SUBJECT) + '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var body = summary();
    var href = mailto(body);
    text.value = body;
    mailLink.setAttribute('href', href);
    panel.hidden = false;
    panel.scrollIntoView({ block: 'start' });
    panel.focus({ preventScroll: true });
    window.location.href = href;
  });

  panel.querySelector('#lcs-static-copy').addEventListener('click', function () {
    var done = function () { live.textContent = 'Copied.'; };
    var fail = function () { text.focus(); text.select(); live.textContent = 'Select the text and copy it.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text.value).then(done, fail);
    else fail();
  });
})();
