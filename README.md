Hello! 

Karina Lujan here. I'm a Brand Designer and Accessibility Specialist, Founder of Lujan Creative Agency.

# [https://lujan.design]

# A responsive agency site and design portfolio, hosted on GitHub Pages.

###

## Features
* **Fully Responsive Design:** Optimized for seamless viewing across desktops, tablets, and smartphones.
* **Fast Performance:** Optimized images and lightweight code for fast loading times.
* **Modern Layout:** Built using modern CSS standards for a clean look and feel.

## Built With
* **HTML5:** Semantic markup structure.
* **CSS3:** Custom styles and layouts (including Flexbox/Grid).
* **JavaScript:** Interactive functionality and animations.

## Project Structure
The repository is organized as follows:
```text
├── index.html                         # Landing page: pixel field, dissolving headline, glitch wordmark, Lab cards
├── assets/lujan-kit.css               # Shared motion-kit skin: tokens, header, footer, color themes, effects
├── assets/lujan-kit.js                # Shared effects + theme switcher (every effect honors reduced motion)
├── assets/cd-nav.js                   # Spinning-CD site menu (self-injecting, loaded on every page)
├── assets/intake-static.js            # Hands the client intake off to the visitor's email app (no server needed)
├── assets/favicon.svg                 # Site icon
├── inquire/                           # Client intake form
├── research/                          # Research index, plus research/mapping-inner-experience/
├── color-grading-game/                # Color Grading Game
├── dark-ux-patterns-web-audit/        # Dark UX Patterns Web Audit working paper
├── motion-kit/                        # Every effect previewed, with copy-paste embeds
├── 404.html                           # Custom not-found page (GitHub Pages serves it automatically)
├── cloudflare/                        # Optional Worker for branded 5xx pages (not used by Pages itself)
├── logs.html                          # Removed Post Log
├── pollinators.html                   # Pollinator Meadow
├── playlist.html                      # The Iconic Playlist
├── checkout.html                      # Book & Pay (Square)
├── heritage-blueprint.html            # Heritage Blueprint (with JSON-LD)
├── garden-gate/                       # Garden Gate PWA (own service worker, scoped to this folder)
├── CNAME                              # Custom domain for GitHub Pages
├── .github/workflows/pages.yml        # Publishes the site on pushes to main
├── LCA_Deploy_Ready/                  # Printable Web and Lujan TV OS projects
├── lujan-design-package(3)/           # Lujan Américas, Lujan TV OS, Printable Web print edition, embeds
└── README.md
```

## Color themes and motion
Visitors pick a color theme in the footer: Rosa mexicano (default), Bluebonnet, Nopal, Monarca or Tulipán.
The choice is saved in `localStorage` (`lcs-theme`) and applied before the page paints, so it follows
the visitor from page to page. Themes are CSS variables (`--lcs-accent`, `--lcs-accent-2`, ...) set in
`assets/lujan-kit.css`. The pages in `lujan-design-package(3)/` and `LCA_Deploy_Ready/` have their own
styles and keep the default colors.

Every animated effect (pixel field, dissolve, typing cursor, glitch wordmark, ribbon, I-35 arrow board)
holds still when the visitor has `prefers-reduced-motion` set. The `motion-kit/` page previews all of them.

## Client intake
GitHub Pages can't receive form posts. `inquire/` validates the form in the browser, then opens the
visitor's email app with their answers filled in (to `hello@karinalujan.design`) and shows the same text
on the page to copy. To receive submissions directly instead, point the form's `action` at a form service
and remove `assets/intake-static.js` from `inquire/index.html`.

## Local Development
If you want to download this project and run it locally on your computer:

1. Clone the repository:
   ```bash
   git clone https://github.com/karinalujan/lujan-creative-agency.git
   ```
2. Navigate into the project folder:
   ```bash
   cd lujan-creative-agency
   ```
3. Open `index.html` in a browser. GitHub Pages deploys the root site automatically on pushes to `main`.

---

## 📝 License

This project is open-source and licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. 

Under this license, you are free to copy, modify, and distribute this web application. However, **if you modify this code and host it live on a server (such as GitHub Pages or a cloud server) for other people to use over a network, you must make your modified source code publicly available under this same license.**

See the [LICENSE](LICENSE) file for the full text.
