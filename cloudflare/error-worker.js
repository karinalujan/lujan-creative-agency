// Lujan Creative Agency: branded 5xx pages for GitHub Pages, via a Cloudflare Worker.
// GitHub Pages can't serve custom 5xx pages, so this Worker sits in front of the site
// and replaces failed page loads (5xx, or the origin being unreachable) with a branded page.
// Only page navigations are replaced; scripts, styles, images and 404s pass through untouched.

const MESSAGES = {
  500: ['Something broke on our end', 'The server hit an unexpected error. It is not you. Please try again in a few minutes.'],
  501: ['Not implemented', 'The server does not support what this page needs.'],
  502: ['Bad gateway', 'A server between you and the site sent back a bad response. Please try again shortly.'],
  503: ['Back in a moment', 'The site is briefly unavailable, likely for maintenance or high traffic. Please try again soon.'],
  504: ['Gateway timeout', 'A server took too long to respond. Please try again shortly.'],
  505: ['HTTP version not supported', 'The server cannot handle the protocol version your browser used. Try a different or updated browser.']
};
const GENERIC = ['Something went wrong', 'This page could not be shown. Please try again shortly.'];
const RETRY_AFTER = '60';

export function isDocumentRequest(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  const dest = request.headers.get('Sec-Fetch-Dest');
  if (dest) return dest === 'document';
  return (request.headers.get('Accept') || '').includes('text/html');
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function errorPage(status) {
  const [title, message] = MESSAGES[status] || GENERIC;
  const code = esc(status);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#111111">
<title>${code} ${esc(title)} · Lujan Creative Agency</title>
<link href="https://fonts.googleapis.com/css2?family=Geist+Pixel&family=Geist+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{color-scheme:dark;font-family:"Geist Mono",ui-monospace,Menlo,monospace;background:#111;color:#fefefe}
*{box-sizing:border-box}body{min-width:320px;margin:0;line-height:1.65;background:#111;color:#fefefe}
a,button{color:inherit}a:focus-visible,button:focus-visible{outline:3px solid #fc8dc1;outline-offset:4px}
.wrap{width:min(100% - 2rem,72rem);margin-inline:auto}
header{padding-block:1.25rem;border-bottom:1px solid #454545;color:#fc8dc1;font-weight:600;letter-spacing:.16em}
main{padding-block:clamp(3rem,10vw,7rem)}
.eyebrow{color:#fc8dc1;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase}
h1{margin:.5rem 0 1.25rem;font-family:"Geist Pixel","Geist Mono",ui-monospace,Menlo,monospace;font-size:clamp(2.2rem,9vw,5rem);font-weight:400;line-height:1;letter-spacing:-.05em}
p{max-width:40rem;color:#bdbdbd;font-size:clamp(1rem,2.5vw,1.2rem)}
.actions{display:flex;flex-wrap:wrap;gap:1rem;margin-top:2rem}
.btn{display:inline-flex;min-height:44px;align-items:center;padding:0 1.25rem;border:2px solid #fefefe;background:transparent;font:inherit;text-decoration:none;cursor:pointer}
.btn.primary{border-color:#dd0070;background:#dd0070}
.btn:hover{background:#fefefe;border-color:#fefefe;color:#111}
footer{padding-block:1.5rem;border-top:1px solid #454545;color:#bdbdbd;font-size:.85rem}
</style>
</head>
<body>
<header><div class="wrap">LUJAN</div></header>
<main class="wrap">
<p class="eyebrow">Error ${code}</p>
<h1>${esc(title)}</h1>
<p>${esc(message)}</p>
<div class="actions">
<button class="btn primary" type="button" onclick="location.reload()">Try again</button>
<a class="btn" href="/">Back to home</a>
</div>
</main>
<footer><div class="wrap">Lujan Creative Agency LLC · Garland, Texas</div></footer>
</body>
</html>`;
}

function brandedResponse(request, status) {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex'
  };
  if (status === 503 || status === 429) headers['Retry-After'] = RETRY_AFTER;
  return new Response(request.method === 'HEAD' ? null : errorPage(status), { status, headers });
}

export default {
  async fetch(request) {
    let response;
    try {
      response = await fetch(request);
    } catch (err) {
      return isDocumentRequest(request)
        ? brandedResponse(request, 503)
        : new Response('Service unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } });
    }
    if (response.status >= 500 && response.status <= 599 && isDocumentRequest(request)) {
      return brandedResponse(request, response.status);
    }
    return response;
  }
};
