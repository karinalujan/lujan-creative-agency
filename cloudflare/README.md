# Branded 5xx pages (Cloudflare Worker)

GitHub Pages only lets you customize the 404 page. This Worker sits in front of
lujan.design and replaces failed page loads (5xx responses, or the origin being
unreachable) with a branded error page. Only page navigations are replaced;
scripts, images, 404s, redirects and non-GET requests pass through unchanged.

The page is the 5xx design from the Lujan motion kit: a flashing I-35 arrow board,
the pixel status code, the site header and footer, and the visitor's saved color theme.
Copy for 500 to 505 lives in `MESSAGES` at the top of `error-worker.js`. 503 sends
`Retry-After: 60`. The 404 page is `404.html` at the repo root, which GitHub Pages serves itself.

## Deploy

1. Add lujan.design to Cloudflare and move the nameservers. Keep the DNS record
   that points at GitHub Pages proxied (orange cloud).
2. From this folder: `npx wrangler deploy` (uses `wrangler.toml`).
3. Confirm the route `lujan.design/*` is attached to the `lujan-error-pages` Worker.

## Limits

- Errors Cloudflare generates itself (the 52x family, such as 521 when the origin is
  down) never reach a Worker. Customize those in the Cloudflare dashboard under
  Custom Pages.
- Not yet run on the real Workers runtime; the logic was tested in Chromium with a
  stubbed `fetch`.
