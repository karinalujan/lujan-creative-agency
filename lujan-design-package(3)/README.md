# lujan.design — Unified Brand & Webflow Package

**Lujan Creative Agency LLC · Garland, TX · [lujan.design](https://www.lujan.design/)**  
*Brand, accessibility, innovation, empathy.*

## Canonical Brand System

- **Typography**:
  - **Display / Wordmark / Numerals**: `Geist Pixel`, fallback `Geist Mono`, `ui-monospace`, `monospace` (`font-weight: 400`)
  - **Body / UI / Tables / Code**: `Geist Mono`, `ui-monospace`, `Menlo`, `monospace`
  - **Secondary Subheads**: `Geist`, `system-ui`, `sans-serif`
- **Color Tokens (`--lj-*` & `:root`)**:
  - **Dark / Embed Surface**: `--lj-bg: #111` · `--lj-paper: #1B1B1B` · `--lj-ink: #FEFEFE` · `--lj-soft: #9B9B9B` · `--lj-rule: #2E2E2E` · `--lj-mag: #DD0070` · `--lj-pink: #FC8DC1`
  - **Light Surface (Full Pages)**: `--bg: #FFFFFF` · `--paper: #F3F3F3` · `--ink: #121212` · `--soft: #5A5A5A` · `--rule: #DDDDDD` · `--cochineal: #C4005F` · `--agave: #B83A7A` · `--marigold: #656565`
- **Grid & Accessibility**:
  - **Pica Scale**: `1pc = 16px` in quarter-pica steps, container `.wrap` max-width `75pc` (`1.25pc` side padding; `1pc` on screens `≤560px`).
  - **Interactive Controls**: Sharp `0px` corners, `2px solid` high-contrast borders, `3px dashed var(--lj-mag)` section dividers, `44×44px` minimum touch targets, `3px solid var(--lj-pink)` focus-visible outlines, and full `prefers-reduced-motion: reduce` support.

## Files in This Package

- **`lujan-americas.html`**: The full "Luján Américas" cultural lineage and ancient DNA research page (self-contained with `.lj-nav` and `.lj-foot`).
- **`lca-printable-web.html`**: "The Printable Web" reference architecture page, unified under the `lujan.design` typography, color system, navigation, footer, embedded removed-posts audit log, and native `@media print` letter-size stylesheet.
- **`lujan-nav-embed.html`**: Standalone Webflow navigation bar embed (`LUJAN` wordmark, `About`, `Work` menu, `Research`, `Inquire` CTA, and `#main` skip link).
- **`lujan-footer-embed.html`**: Standalone Webflow footer embed (`LUJAN`, `Garland, TX`, `Signal NTX`, `Ground’d`, `Brand, accessibility, innovation, empathy.`, and copyright).
- **`lujan-spotify-embed.html`**: Branded CD-style Spotify player for Karina’s iconic playlist; the disc spins while music plays via the Spotify iFrame API.
- **`lujan-pollinators-embed.html`**: Procedural pixel meadow of Texas native wildflowers visited by ruby-throated hummingbirds, monarchs, and bumblebees.
- **`lca-logs-embed.html`**: Branded Webflow embed for the Removed Post Log (`/logs`), styled with `.lj-*` tokens and wired to `karlujan/lca-web-architecture`.
- **`lujan-tv-os.html`**: Brand-aligned Fire TV D-pad launcher interface (`Lujan TV OS`) with Web Audio API ambient synthesis.
- **`lujan-squarespace-head-injection.html`**: Site-wide Squarespace 7.1 Header Code Injection (loads `Geist Pixel`, `Geist Mono`, and `Geist`, zeroes out `.sqs-block-code` padding, and applies the Letter `@media print` stylesheet).
- **`lujan-square-checkout-embed.html`**: Branded Square (`squareup.com`) checkout, invoice, and appointment booking card grid for Squarespace Code Blocks.

## Webflow Setup

1. Load `Geist Pixel`, `Geist Mono`, and `Geist` site-wide.
2. Paste `lujan-nav-embed.html` at the top of the page (or into a global Symbol).
3. Paste `lujan-footer-embed.html` at the bottom of the page (or into a global Symbol).
4. Give the main page wrapper `id="main"` so the skip link (`Skip to content`) targets it cleanly.
5. Replace the `#work` links on the Work dropdown items with their live case-study URLs as they publish.

Lujan Creative Agency LLC · Garland, TX

## Squarespace 7.1 & Square (`squareup.com`) Setup

1. **Header Code Injection**: In Squarespace, go to **Website > Pages > Custom Code > Code Injection > Header** and paste `lujan-squarespace-head-injection.html`.
2. **Global Nav & Footer**: Paste `lujan-nav-embed.html` into the top of **Header Code Injection** (or a top section Code Block) and `lujan-footer-embed.html` into **Footer Code Injection**.
3. **Interactive Embeds**: On any page section, click **Add Block > Code (`</>`)** (keep *Display Source* unchecked and mode set to `HTML`), and paste `lujan-pollinators-embed.html`, `lujan-spotify-embed.html`, `lca-logs-embed.html`, or `lujan-square-checkout-embed.html`.
4. **Square Payment Links & POS**: In your Square Dashboard (`squareup.com/dashboard`), create Payment Links (`https://square.link/u/...`) or copy your Square Appointments embed/URL, and paste those URLs into `lujan-square-checkout-embed.html`. For in-person sales in Garland/DFW, connect your Square account and Square Reader directly inside the Squarespace iOS app (**Point of Sale**) or the Square Point of Sale app.
