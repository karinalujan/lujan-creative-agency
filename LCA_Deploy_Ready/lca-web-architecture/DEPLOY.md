# Deploy Steps — LCA Web Architecture

## A. GitHub Setup (One Time)

1. On `github.com/new` (signed in as `karlujan`), create a new **Public** repository named `lca-web-architecture` with the **GNU GPLv3** license.
2. Upload everything from this folder, including the hidden `.github` directory (press **Cmd + Shift + .** in macOS Finder to reveal hidden files).
3. Commit to `main`.
4. Go to **Settings > Actions > General > Workflow permissions**, select **Read and write permissions**, and click **Save**.
5. Optional GitHub Pages preview: **Settings > Pages** > Source: **Deploy from a branch** > Branch: `main` / `/ (root)`. Your live page will publish at `https://karlujan.github.io/lca-web-architecture/`.

## B. Webflow: The Printable Web Page

1. Create `/printable-web` in Webflow (or deploy `index.html` directly).
2. In **Page settings > Custom code > Inside `<head>` tag**, paste `webflow/print-styles.html`.
3. Optional print trigger: add `<button type="button" class="no-print" onclick="window.print()">Print this page (Letter)</button>`.

## C. Webflow: Removed Post Log Page (`/logs`)

1. Create `/logs` on `lujan.design` with the shared `lujan-nav-embed.html` and `lujan-footer-embed.html` symbols.
2. Add a Webflow **Embed** element and paste `webflow/logs-embed.html` (`GH_USER` is pre-set to `"karlujan"` and `GH_REPO` to `"lca-web-architecture"`).
3. Publish the site to test live JSON fetching.

Lujan Creative Agency LLC · Garland, TX
