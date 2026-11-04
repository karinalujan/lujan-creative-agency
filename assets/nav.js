/* Lujan shared nav: one source of truth for the header menu on every page.
   Fills <nav class="ljn-nav" aria-label="Main"></nav> with the same links and dropdown. Links resolve relative to this script's URL, so it works
   from any folder depth. To add or move a page, edit MENU below. */
(function () {
  'use strict';
  if (window.__ljNav) return;
  window.__ljNav = true;

  var script = document.currentScript;
  var scriptUrl = script && script.src ? script.src : (function () {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) if (/\/nav\.js(\?|#|$)/.test(all[i].src)) return all[i].src;
    return location.href;
  })();
  var ROOT = new URL('../', scriptUrl);
  var DESIGN = 'lujan-design-package%283%29/';

  var MENU = [
    { field: 'Art', items: [
      { t: 'Color Grading Game', h: 'color-grading-game/' },
      { t: 'Motion Kit', h: 'motion-kit/' },
      { t: 'Lujan Américas', h: DESIGN + 'lujan-americas.html' },
      { t: 'The Iconic Playlist', h: 'playlist.html' }
    ] },
    { field: 'Science', items: [
      { sub: 'Botany' },
      { t: 'Pollinator Meadow', h: 'pollinators.html' },
      { t: 'Garden Gate', h: 'garden-gate/' },
      { sub: 'Mind' },
      { t: 'Research', h: 'research/' },
      { t: 'Mapping Inner Experience', h: 'research/mapping-inner-experience/' }
    ] },
    { field: 'Code', items: [
      { t: 'The Printable Web', h: 'LCA_Deploy_Ready/lca-web-architecture/' },
      { t: 'Printable Web print edition', h: DESIGN + 'lca-printable-web.html' },
      { t: 'Lujan TV OS', h: DESIGN + 'lujan-tv-os.html' },
      { t: 'Removed Post Log', h: 'logs.html' },
      { t: 'Heritage Blueprint', h: 'heritage-blueprint.html' }
    ] },
    { field: 'AI', items: [
      { t: 'Dark UX Patterns Web Audit', h: 'dark-ux-patterns-web-audit/' }
    ] },
    { field: 'Business', items: [
      { t: 'Book & Pay', h: 'checkout.html' }
    ] }
  ];

  function url(h) { return new URL(h, ROOT).href; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function norm(p) { return p.replace(/index\.html$/, '').replace(/\/+$/, ''); }
  var here = norm(decodeURIComponent(location.pathname));

  function isCurrent(h) { return norm(decodeURIComponent(new URL(h, ROOT).pathname)) === here; }

  var menuHtml = '', hasCurrent = false;
  MENU.forEach(function (g, gi) {
    var id = 'ljn-f' + gi;
    menuHtml += '<li class="ljn-group"><span class="ljn-field" id="' + id + '">' + esc(g.field) + '</span><ul aria-labelledby="' + id + '">';
    g.items.forEach(function (it) {
      if (it.sub) { menuHtml += '<li class="ljn-sub" aria-hidden="true">' + esc(it.sub) + '</li>'; return; }
      var cur = isCurrent(it.h);
      if (cur) hasCurrent = true;
      menuHtml += '<li><a href="' + url(it.h) + '"' + (cur ? ' aria-current="page"' : '') + '>' + esc(it.t) + '</a></li>';
    });
    menuHtml += '</ul></li>';
  });

  var NAV_HTML =
    '<a class="ljn-link" href="' + url('./#about') + '">About</a>' +
    '<div class="ljn-menu">' +
      '<button class="ljn-link ljn-btn' + (hasCurrent ? ' is-current' : '') + '" type="button" aria-expanded="false" aria-controls="ljn-list">Work' +
      '<svg class="ljn-caret" viewBox="0 0 5 3" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h5v1H0zM1 1h3v1H1zM2 2h1v1H2z"/></svg></button>' +
      '<ul class="ljn-list" id="ljn-list" hidden>' + menuHtml + '</ul>' +
    '</div>' +
    '<a class="ljn-cta" href="' + url('inquire/') + '"' + (isCurrent('inquire/') ? ' aria-current="page"' : '') + '>Inquire</a>';

  var CSS = [
    '.ljn-nav{display:flex;flex-wrap:wrap;align-items:center;gap:1.4em;font-family:var(--lcs-mono,"Geist Mono"),ui-monospace,Menlo,monospace;font-size:15px}',
    '.ljn-nav *{box-sizing:border-box}',
    '.ljn-link{position:relative;color:var(--lcs-ink,#fff);text-decoration:none;padding:0 0 .35em;background:none;border:0;border-radius:0;font:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:.45em;min-height:44px}',
    '.ljn-link::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:3px;background:var(--lcs-accent,#E4007C);clip-path:inset(0 100% 0 0);transition:clip-path .2s steps(4)}',
    '.ljn-link:hover::after,.ljn-link:focus-visible::after,.ljn-link[aria-current="page"]::after,.ljn-btn.is-current::after,.ljn-btn[aria-expanded="true"]::after{clip-path:inset(0)}',
    '.ljn-caret{width:.7em;height:.42em;fill:currentColor}',
    '.ljn-btn[aria-expanded="true"] .ljn-caret{transform:rotate(180deg)}',
    '.ljn-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 1.1em;border:2px solid var(--lcs-ink,#fff);color:var(--lcs-ink,#fff);text-decoration:none}',
    '.ljn-cta:hover,.ljn-cta:focus-visible,.ljn-cta[aria-current="page"]{background:var(--lcs-ink,#fff);color:var(--lcs-paper,#111)}',
    '.ljn-link:focus-visible,.ljn-cta:focus-visible,.ljn-list a:focus-visible{outline:2px solid var(--lcs-accent,#E4007C);outline-offset:4px}',
    '.ljn-menu{position:relative}',
    '.ljn-list{position:absolute;top:calc(100% + 6px);right:-16px;z-index:2147482000;width:max-content;min-width:260px;max-width:340px;max-height:calc(100vh - 100px);overflow-y:auto;margin:0;padding:6px 0;list-style:none;background:var(--lcs-paper,#111);border:2px solid var(--lcs-ink,#fff)}',
    '.ljn-list[hidden]{display:none}',
    '.ljn-group ul{margin:0;padding:0;list-style:none}',
    '.ljn-field{display:block;padding:12px 16px 4px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--lcs-accent-2,#FF9ACB)}',
    '.ljn-group+.ljn-group{margin-top:6px;border-top:1px solid #454545}',
    '.ljn-sub{padding:6px 16px 2px;font-size:12px;color:#bdbdbd}',
    '.ljn-list a{display:flex;align-items:center;min-height:44px;padding:6px 16px;color:var(--lcs-ink,#fff);text-decoration:none}',
    '.ljn-list a:hover,.ljn-list a:focus-visible{background:var(--lcs-ink,#fff);color:var(--lcs-paper,#111)}',
    '.ljn-list a[aria-current="page"]{box-shadow:inset 4px 0 0 var(--lcs-accent,#E4007C)}',
    '.ljn-bar{position:relative;z-index:50;background:var(--lcs-paper,#111);color:var(--lcs-ink,#fff)}',
    '.ljn-bar__in{max-width:75pc;margin:0 auto;padding:1.25pc 1.25pc 1pc;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5pc 1.5pc}',
    '.ljn-logo{display:inline-flex;align-items:center;min-height:44px;color:var(--lcs-ink,#fff);text-decoration:none;font-family:var(--lcs-display,"Geist Pixel"),"Geist Mono",ui-monospace,monospace;font-size:36px;letter-spacing:.04em;line-height:1}',
    '.ljn-logo:focus-visible{outline:2px solid var(--lcs-accent,#E4007C);outline-offset:4px}',
    '@media (max-width:480px){.ljn-logo{font-size:28px}.ljn-bar__in{padding:1pc}}',
    '@media print{.ljn-bar,.ljn-nav{display:none!important}}',
    '@media (max-width:480px){.ljn-nav{font-size:14px;gap:.9em}}',
    '@media (max-width:640px){.ljn-menu{position:static}.ljn-list{top:auto;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));width:auto;max-width:none;margin-top:6px}}',
    '@media (prefers-reduced-motion:reduce){.ljn-link::after{transition:none}}'
  ].join('');

  function init() {
    var old = document.querySelector('nav.ljn-nav');
    if (!old) return;
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var nav = old;
    nav.innerHTML = NAV_HTML;
    if (!nav.parentNode.querySelector('.lcs-glitch,.lcs-err__logo')) {
      var bar = document.createElement('header');
      bar.className = 'ljn-bar';
      var inner = document.createElement('div');
      inner.className = 'ljn-bar__in';
      var logo = document.createElement('a');
      logo.className = 'ljn-logo';
      logo.href = url('./');
      logo.setAttribute('aria-label', 'Lujan, home');
      logo.textContent = 'LUJAN';
      nav.parentNode.insertBefore(bar, nav);
      inner.appendChild(logo);
      inner.appendChild(nav);
      bar.appendChild(inner);
    }

    var m = nav.querySelector('.ljn-menu'),
        b = m.querySelector('.ljn-btn'),
        l = m.querySelector('.ljn-list'),
        t = 0, byHover = false;
    function set(o, focusFirst) {
      b.setAttribute('aria-expanded', String(o));
      l.hidden = !o;
      if (o && focusFirst) { var f = l.querySelector('a'); if (f) f.focus(); }
    }
    b.addEventListener('click', function () {
      if (byHover) { byHover = false; return; }
      set(b.getAttribute('aria-expanded') !== 'true');
    });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); set(true, true); }
    });
    m.addEventListener('keydown', function (e) {
      var items = [].slice.call(l.querySelectorAll('a')), i = items.indexOf(document.activeElement);
      if (e.key === 'Escape' && !l.hidden) { set(false); b.focus(); }
      else if (i > -1 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus();
      }
    });
    m.addEventListener('focusout', function (e) { if (!m.contains(e.relatedTarget)) set(false); });
    document.addEventListener('click', function (e) { if (!m.contains(e.target)) set(false); });
    if (window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches) {
      m.addEventListener('mouseenter', function () { clearTimeout(t); if (l.hidden) { byHover = true; set(true); } });
      m.addEventListener('mouseleave', function () {
        byHover = false;
        t = setTimeout(function () { if (!m.querySelector(':focus-visible')) set(false); }, 250);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
