# Deploy Steps — Lujan TV OS

1. **Verify `src/index.html`:** `src/index.html` contains the brand-aligned Lujan TV OS launcher (`Geist Pixel` + `Geist Mono`, D-pad spatial navigation, Web Audio API ambient sound layer, and channel inspector). If wrapping inside an Android WebView project, place your Gradle/Android project files alongside `src/`.
2. **Audit before pushing:** Confirm no `.keystore`/`.jks` files, credentials, or local IP addresses are committed. The included `.gitignore` blocks signing keys and build artifacts automatically.
3. **Create the GitHub repository:** Visit `github.com/new` under `karlujan` > Repository name: `lujan-tv-os`, Public, License: **Apache License 2.0**. Push or upload this folder.
4. **Publish the APK:** In the repository, go to **Releases > Create a new release**, tag `v1.0.0`, and attach `lujan-tv-os.apk`.
5. **Link on `lujan.design`:** Add a project card under Work / Research linking to `https://github.com/karlujan/lujan-tv-os` and the latest release.

Lujan Creative Agency LLC · Garland, TX
