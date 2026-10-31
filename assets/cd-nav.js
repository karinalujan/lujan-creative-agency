/* Lujan CD nav: a spinning-CD button that opens a Myspace/SoundCloud-style
   full-screen tracklist menu. Self-injecting (styles + DOM). Links resolve
   relative to this script's own URL, so it works from any folder depth. */
(function () {
  'use strict';
  if (window.__ljCdNav) return;
  window.__ljCdNav = true;

  var script = document.currentScript;
  var scriptUrl = script && script.src ? script.src : (function () {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) if (/cd-nav\.js(\?|#|$)/.test(all[i].src)) return all[i].src;
    return location.href;
  })();
  var ROOT = new URL('../', scriptUrl);

  var TRACKS = [
    { title: 'Home', tag: 'Index', href: './' },
    { title: 'Lujan Americas', tag: 'Lineage', href: 'lujan-design-package%283%29/lujan-americas.html' },
    { title: 'Research', tag: 'Research', href: 'research/' },
    { title: 'Mapping Inner Experience', tag: 'Research', href: 'research/mapping-inner-experience/' },
    { title: 'Color Grading Game', tag: 'Play', href: 'color-grading-game/' },
    { title: 'Dark UX Patterns Web Audit', tag: 'Audit', href: 'dark-ux-patterns-web-audit/' },
    { title: 'The Printable Web', tag: 'Project', href: 'LCA_Deploy_Ready/lca-web-architecture/' },
    { title: 'Printable Web print edition', tag: 'Print', href: 'lujan-design-package%283%29/lca-printable-web.html' },
    { title: 'Lujan TV OS', tag: 'Interface', href: 'lujan-design-package%283%29/lujan-tv-os.html' },
    { title: 'Removed Post Log', tag: 'Log', href: 'logs.html' },
    { title: 'Pollinator Meadow', tag: 'Garden', href: 'pollinators.html' },
    { title: 'The Iconic Playlist', tag: 'Audio', href: 'playlist.html' },
    { title: 'Book & Pay', tag: 'Checkout', href: 'checkout.html' },
    { title: 'Heritage Blueprint', tag: 'Guide', href: 'heritage-blueprint.html' },
    { title: 'Garden Gate', tag: 'App', href: 'garden-gate/' },
    { title: 'Motion Kit', tag: 'Kit', href: 'motion-kit/' },
    { title: 'Inquire', tag: 'Start', href: 'inquire/' }
  ];

  var CSS = [
    '.ljcd-fab,.ljcd-root *{box-sizing:border-box}',
    '.ljcd-fab{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483000;',
    'width:64px;height:64px;min-width:44px;min-height:44px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;',
    'box-shadow:0 0 0 2px var(--lcs-accent,#dd0070),0 8px 24px rgba(0,0,0,.6)}',
    '.ljcd-fab:hover{box-shadow:0 0 0 3px var(--lcs-accent-2,#fc8dc1),0 8px 24px rgba(0,0,0,.6)}',
    '.ljcd-disc{display:block;position:relative;border-radius:50%;',
    'background:radial-gradient(circle,#111 0 9%,rgba(255,255,255,.55) 9% 10.5%,rgba(255,255,255,.12) 10.5% 17%,#cfcfd4 17% 18%,transparent 18%),',
    'repeating-radial-gradient(circle,rgba(255,255,255,.05) 0 1px,transparent 1px 3px),',
    'conic-gradient(from 20deg,#d9dbe0,var(--lcs-accent-2,#fc8dc1) 8%,#cfd6ff 16%,#e8e8ec 24%,#9fe3d6 32%,#f2f2f4 40%,var(--lcs-accent,#dd0070) 47%,#d9dbe0 54%,#fff3b0 62%,#c9c9cf 70%,var(--lcs-accent-2,#fc8dc1) 80%,#bfe1ff 90%,#d9dbe0);',
    'animation:ljcd-spin 4.5s linear infinite}',
    '.ljcd-fab .ljcd-disc{width:100%;height:100%}',
    '.ljcd-fab:focus-visible,.ljcd-root a:focus-visible,.ljcd-root button:focus-visible{outline:3px solid var(--lcs-accent-2,#fc8dc1);outline-offset:4px}',
    '.ljcd-root{position:fixed;inset:0;z-index:2147483001;display:none;background:var(--lcs-paper,#111);color:#fefefe;overflow-y:auto;overscroll-behavior:contain;',
    'font-family:var(--lcs-mono,"Geist Mono"),ui-monospace,Menlo,monospace;font-size:15px;line-height:1.5}',
    '.ljcd-root.is-open{display:block}',
    '.ljcd-panel{position:relative;width:min(100% - 2rem,64rem);margin:0 auto;padding:4.5rem 0 2.5rem;display:grid;grid-template-columns:minmax(0,22rem) minmax(0,1fr);gap:2rem 3rem;align-items:start}',
    '.ljcd-close{position:absolute;top:1rem;right:0;min-width:44px;min-height:44px;padding:0 1rem;border:2px solid #fefefe;border-radius:0;background:transparent;color:#fefefe;font:inherit;cursor:pointer}',
    '.ljcd-close:hover{background:#fefefe;color:#111}',
    '.ljcd-player{text-align:left}',
    '.ljcd-big{width:min(100%,20rem);aspect-ratio:1;margin:0 auto 1.25rem}',
    '.ljcd-big .ljcd-disc{width:100%;height:100%;box-shadow:0 0 0 1px #2e2e2e,0 18px 40px rgba(0,0,0,.55)}',
    '.ljcd-eyebrow{margin:0;color:var(--lcs-accent-2,#fc8dc1);font-size:12px;letter-spacing:.14em;text-transform:uppercase}',
    '.ljcd-title{margin:.25rem 0 1rem;font-family:var(--lcs-display,"Geist Pixel"),"Geist Mono",ui-monospace,monospace;font-size:clamp(1.75rem,5vw,2.5rem);font-weight:400;line-height:1.05;letter-spacing:-.03em}',
    '.ljcd-wave{display:block;width:100%;height:56px;color:var(--lcs-accent,#dd0070)}',
    '.ljcd-wave rect{fill:currentColor}',
    '.ljcd-wave .ljcd-played{color:var(--lcs-accent-2,#fc8dc1)}',
    '.ljcd-list{margin:0;padding:0;list-style:none;border-top:1px solid #454545}',
    '.ljcd-list li{margin:0;border-bottom:1px solid #2e2e2e}',
    '.ljcd-track{display:flex;align-items:center;gap:1rem;min-height:48px;padding:.5rem .75rem;color:#fefefe;text-decoration:none}',
    '.ljcd-track:hover{background:#1e1e1e}',
    '.ljcd-num{flex:none;width:2.2ch;color:#bdbdbd;font-variant-numeric:tabular-nums}',
    '.ljcd-name{flex:1;min-width:0;overflow-wrap:anywhere}',
    '.ljcd-tag{flex:none;margin-left:auto;padding:.1rem .45rem;border:1px solid #666;color:#bdbdbd;font-size:11px;letter-spacing:.08em;text-transform:uppercase;text-align:right}',
    '.ljcd-track[aria-current="page"]{background:#1e1e1e;box-shadow:inset 4px 0 0 var(--lcs-accent,#dd0070)}',
    '.ljcd-track[aria-current="page"] .ljcd-num,.ljcd-track[aria-current="page"] .ljcd-name{color:var(--lcs-accent-2,#fc8dc1)}',
    '.ljcd-track[aria-current="page"] .ljcd-tag{border-color:var(--lcs-accent-2,#fc8dc1);color:var(--lcs-accent-2,#fc8dc1)}',
    '.ljcd-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '@keyframes ljcd-spin{to{transform:rotate(360deg)}}',
    '@media (max-width:720px){.ljcd-panel{grid-template-columns:minmax(0,1fr)}.ljcd-big{width:min(60vw,14rem)}}',
    '@media (max-height:520px){.ljcd-big{width:9rem}}',
    '@media (prefers-reduced-motion:reduce){.ljcd-disc{animation:none}}'
  ].join('');

  function norm(pathname) {
    var p;
    try { p = decodeURIComponent(pathname); } catch (e) { p = pathname; }
    // GitHub Pages serves /logs for logs.html and /folder for /folder/, so compare without those differences
    p = p.replace(/index\.html$/, '').replace(/\.html$/, '');
    return p.length > 1 ? p.replace(/\/$/, '') : p;
  }
  function esc(s) { return s.replace(/&/g, '&amp;'); }

  function wave() {
    var heights = [10, 22, 34, 18, 40, 28, 14, 36, 44, 24, 12, 30, 38, 20, 46, 26, 16, 34, 42, 22, 12, 28, 36, 18, 44, 30, 14, 24, 40, 20, 32, 46, 16, 26, 38, 12, 34, 22, 42, 18];
    var out = '<svg class="ljcd-wave" viewBox="0 0 160 56" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
    for (var i = 0; i < heights.length; i++) {
      var h = heights[i];
      out += '<rect' + (i < 14 ? ' class="ljcd-played"' : '') + ' x="' + (i * 4) + '" y="' + ((56 - h) / 2) + '" width="2.4" height="' + h + '"/>';
    }
    return out + '</svg>';
  }

  function build() {
    if (document.getElementById('ljcd-root')) return;

    var style = document.createElement('style');
    style.setAttribute('data-ljcd', '');
    style.textContent = CSS;
    document.head.appendChild(style);

    var here = norm(location.pathname);
    var current = null;
    var items = TRACKS.map(function (t, i) {
      var url = new URL(t.href, ROOT);
      var isHere = norm(url.pathname) === here;
      if (isHere) current = t;
      return '<li><a class="ljcd-track" href="' + url.href + '"' + (isHere ? ' aria-current="page"' : '') + '>' +
        '<span class="ljcd-num" aria-hidden="true">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
        '<span class="ljcd-name">' + esc(t.title) + '</span>' +
        '<span class="ljcd-tag">' + t.tag + '</span></a></li>';
    }).join('');

    var fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'ljcd-fab';
    fab.id = 'ljcd-fab';
    fab.setAttribute('aria-label', 'Open site menu');
    fab.setAttribute('aria-haspopup', 'dialog');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<span class="ljcd-disc" aria-hidden="true"></span>';

    var root = document.createElement('div');
    root.className = 'ljcd-root';
    root.id = 'ljcd-root';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'ljcd-title');
    root.innerHTML =
      '<div class="ljcd-panel">' +
      '<button type="button" class="ljcd-close">Close<span class="ljcd-sr"> site menu</span></button>' +
      '<div class="ljcd-player">' +
      '<div class="ljcd-big"><span class="ljcd-disc" aria-hidden="true"></span></div>' +
      '<p class="ljcd-eyebrow">Now playing</p>' +
      '<h2 class="ljcd-title" id="ljcd-title">' + esc(current ? current.title : 'Lujan Creative Agency') + '</h2>' +
      wave() +
      '</div>' +
      '<nav aria-label="Site"><ol class="ljcd-list">' + items + '</ol></nav>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(root);

    // Pages that don't load the kit stylesheet still follow the visitor's saved color theme
    var THEMES = {
      bluebonnet: ['#0D1120', '#4F7DFF', '#B7C8FF'], nopal: ['#0E1511', '#2FB574', '#B5E7C9'],
      monarca: ['#15100B', '#FF8A1F', '#FFD29A'], tulipan: ['#170D10', '#E3243F', '#FF9EAA']
    };
    try {
      var saved = localStorage.getItem('lcs-theme');
      if (THEMES[saved] && !getComputedStyle(document.documentElement).getPropertyValue('--lcs-accent').trim()) {
        [fab, root].forEach(function (el) {
          el.style.setProperty('--lcs-paper', THEMES[saved][0]);
          el.style.setProperty('--lcs-accent', THEMES[saved][1]);
          el.style.setProperty('--lcs-accent-2', THEMES[saved][2]);
        });
      }
    } catch (e) { /* storage unavailable: keep the default colors */ }

    var closeBtn = root.querySelector('.ljcd-close');
    var prevOverflow = '';
    var lastFocus = null;

    function open() {
      if (root.classList.contains('is-open')) return;
      lastFocus = document.activeElement;
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      root.classList.add('is-open');
      fab.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    }
    function close() {
      if (!root.classList.contains('is-open')) return;
      root.classList.remove('is-open');
      fab.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = prevOverflow;
      (lastFocus && document.contains(lastFocus) ? lastFocus : fab).focus();
    }

    fab.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    root.addEventListener('click', function (e) {
      if (e.target === root || e.target.classList.contains('ljcd-panel')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!root.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = root.querySelectorAll('a[href],button:not([disabled])');
      var first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (!root.contains(a)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
