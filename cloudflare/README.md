# Branded 5xx pages (Cloudflare Worker)

GitHub Pages only lets you customize the 404 page. This Worker sits in front of
lujan.design and replaces failed page loads (5xx responses, or the origin being
unreachable) with a branded error page. Only page navigations are replaced;
scripts, images, 404s, redirects and non-GET requests pass through unchanged.

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
