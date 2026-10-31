# Lujan Creative Agency LLC // Web Architecture

Source code and open data pipeline for two pages on [lujan.design](https://www.lujan.design/):

- **The Printable Web** (`index.html`): A self-demonstrating reference architecture showing how accessible semantic HTML and `@media print` CSS replace proprietary PDF workflows for ADA Title II/III and Section 508 compliance. Styled in the canonical `lujan.design` system (`Geist Pixel`, `Geist Mono`, cochineal `#DD0070` / `#C4005F`, agave `#FC8DC1` / `#B83A7A`, and pica grid).
- **Removed Post Log** (`data/removed-posts.csv` + `webflow/logs-embed.html`): A hand-kept, verifiable record of posts that platforms removed or restricted, each backed by a timestamped screenshot in `evidence/`.

## Adding a Log Entry

1. Save the screenshot to `evidence/` (keep the original file so its creation timestamp metadata survives).
2. Add a row to `data/removed-posts.csv`:
   `date,platform,post_link,what_happened,evidence_file,notes`  
   Example: `2026-10-01,Reddit,https://reddit.com/r/...,Post removed by moderators with no reason given,2026-10-01-reddit.png,`
3. Commit and push. The GitHub Action (`.github/workflows/build-log.yml`) validates the CSV via `scripts/build_log.py` and publishes `data/removed-posts.json`, which `webflow/logs-embed.html` reads live.

Entries describe what happened to my own post; they do not name or characterize other individuals.

## License

GPL-3.0. Maintained by Karina Lujan · Lujan Creative Agency LLC · Garland, TX ([lujan.design](https://www.lujan.design/)).  
*Brand, accessibility, innovation, empathy.*
