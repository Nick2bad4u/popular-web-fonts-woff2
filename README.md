# popular-web-fonts-woff2

[![npm license.](https://flat.badgen.net/npm/license/popular-web-fonts-woff2?color=purple)](https://github.com/Nick2bad4u/popular-web-fonts-woff2/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/popular-web-fonts-woff2?color=pink)](https://www.npmjs.com/package/popular-web-fonts-woff2) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/popular-web-fonts-woff2?color=cyan)](https://github.com/Nick2bad4u/popular-web-fonts-woff2/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/popular-web-fonts-woff2?color=yellow)](https://github.com/Nick2bad4u/popular-web-fonts-woff2/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/popular-web-fonts-woff2?color=green)](https://github.com/Nick2bad4u/popular-web-fonts-woff2/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/popular-web-fonts-woff2?color=red)](https://github.com/Nick2bad4u/popular-web-fonts-woff2/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/popular-web-fonts-woff2?color=blue)](https://codecov.io/gh/Nick2bad4u/popular-web-fonts-woff2)

Ready-to-use **popular web fonts in WOFF2 format** — use them in any website or app via CDN link.

No build step needed. No tools to install. Just copy a URL.

> Fonts are committed directly to this repository and served from a stable CDN (jsDelivr, GitHub raw, unpkg).
> The npm package ships the **CLI tool only** — see [CLI usage](#cli-usage) if you want to run the pipeline yourself.

---

## Quick start — add a font to your website

Pick any font from the [available families](#available-font-families) below and add a `@font-face` rule to your CSS.

### jsDelivr CDN (recommended — global CDN, fast, always available)

```css
@font-face {
  font-family: "Inter";
  src: url("https://cdn.jsdelivr.net/gh/Nick2bad4u/popular-web-fonts-woff2@v1.0.0/fonts/woff2/Inter/Inter-regular.woff2")
    format("woff2");
  font-display: swap;
}
```

Then use it in your CSS:

```css
body {
  font-family: "Inter", sans-serif;
}
```

### Raw GitHub URL

```css
@font-face {
  font-family: "Inter";
  src: url("https://raw.githubusercontent.com/Nick2bad4u/popular-web-fonts-woff2/v1.0.0/fonts/woff2/Inter/Inter-regular.woff2")
    format("woff2");
  font-display: swap;
}
```

> **Tip:** Always pin a version tag (`v1.0.0`) rather than using `main` so your fonts never change unexpectedly.

---

## URL pattern

All font files follow this pattern:

```text
https://cdn.jsdelivr.net/gh/Nick2bad4u/popular-web-fonts-woff2@<version>/fonts/woff2/<Family>/<FileName>.woff2
```

| Part         | Example         |
| ------------ | --------------- |
| `<version>`  | `v1.0.0`        |
| `<Family>`   | `Inter`         |
| `<FileName>` | `Inter-regular` |

Find available files by browsing the [`fonts/woff2/`](./fonts/woff2) folder in this repository, or see the full [asset index](./fonts/woff2/index.json).

You can also browse a searchable index page on GitHub Pages: [`/index.html`](./index.html)

---

## Install via npm (CLI tool)

The npm package ships the **CLI pipeline only** — the font files themselves are **not bundled**.
Fonts are served from CDN; use the URLs above in your CSS directly.

```bash
npm install --save-dev popular-web-fonts-woff2
```

or run it without installing:

```bash
npx popular-web-fonts-woff2 --help
```

The CLI lets you download source fonts and convert them to WOFF2 in your own project.
See [CLI usage](#cli-usage) for all available flags.

> **Why not bundle the fonts?**
> The full font set is several GB — far too large for an npm package.
> CDN delivery via jsDelivr / GitHub raw is faster, cheaper, and versioned.
> Pin a release tag in your URL and you get the same file forever.

---

## CLI usage

### Usage

```bash
npx popular-web-fonts-woff2 --source-dir ./fonts/original [options]
```

### Execution flags

- `--convert` enable conversion mode (default is plan mode)
- `--confirm` / `--yes` required safety gate for non-dry-run conversion
- `--dry-run` plan only, no conversion writes
- `--concurrency <n>` max parallel conversions (default: `1`)
- `--timeout <ms>` per-file converter timeout (default: `60000` / `60s`)
- `--index-file <path>` output index file path (default: `<out-dir>/index.json`)
- `--verbose` more detailed progress output
- `--debug` debug output (implies `--verbose`)
- `--json` machine-readable summary output

### Examples

```bash
# Plan only (safe default)
npx popular-web-fonts-woff2 --source-dir ./fonts/original

# Convert with explicit safety confirmation
npx popular-web-fonts-woff2 --source-dir ./fonts/original --convert --confirm

# Faster conversion with custom concurrency and timeout
npx popular-web-fonts-woff2 --source-dir ./fonts/original --convert --confirm --concurrency 4 --timeout 120000

# JSON summary and explicit index file
npx popular-web-fonts-woff2 --source-dir ./fonts/original --convert --confirm --json --index-file ./fonts/woff2/index.json
```

---

## Available font families

All popular web font families are included.
Browse the full list in the [`fonts/woff2/`](./fonts/woff2) directory, or search the [interactive browser](./index.html).

Selected families:

| Family        | Folder name     |
| ------------- | --------------- |
| ABeeZee       | `ABeeZee`       |
| Anton         | `Anton`         |
| Archivo       | `Archivo`       |
| Arimo         | `Arimo`         |
| Barlow        | `Barlow`        |
| Bitter        | `Bitter`        |
| Cabin         | `Cabin`         |
| Cairo         | `Cairo`         |
| Caveat        | `Caveat`        |
| Comfortaa     | `Comfortaa`     |
| DancingScript | `DancingScript` |
| DMSans        | `DMSans`        |
| Dosis         | `Dosis`         |
| EBGaramond    | `EBGaramond`    |
| Exo2          | `Exo2`          |
| FiraSans      | `FiraSans`      |
| Geist         | `Geist`         |
| Heebo         | `Heebo`         |
| IBMPlexMono   | `IBMPlexMono`   |
| IBMPlexSans   | `IBMPlexSans`   |
| Inconsolata   | `Inconsolata`   |
| Inter         | `Inter`         |
| JetBrainsMono | `JetBrainsMono` |
| Kanit         | `Kanit`         |
| Karla         | `Karla`         |
| Lato          | `Lato`          |
| Lexend        | `Lexend`        |
| Lora          | `Lora`          |
| Manrope       | `Manrope`       |
| MaterialIcons | `MaterialIcons` |
| MavenPro      | `MavenPro`      |

---

## About popular web fonts

Popular web fonts are widely-used open-source typefaces distributed through [Google Fonts](https://fonts.google.com/) and other open font registries.
They are used across millions of websites for body text, headings, UI elements, and code blocks.

---

## Releases and versioning

Font assets are updated on each tagged release. Check the [Releases page](https://github.com/Nick2bad4u/popular-web-fonts-woff2/releases) for the latest version and changelog.

Pin the version in your CDN URLs to avoid unexpected changes.

---

## License

Fonts are distributed under their respective upstream licenses (see each family's source on [Google Fonts](https://fonts.google.com/) or the upstream project page).
This project's tooling and scripts are licensed under the [MIT License](./LICENSE).

---

## Links

- [Releases](https://github.com/Nick2bad4u/popular-web-fonts-woff2/releases)
- [npm package](https://www.npmjs.com/package/popular-web-fonts-woff2)
- [Asset index](./fonts/woff2/index.json)
- [Google Fonts](https://fonts.google.com/)
- [Contributing](./CONTRIBUTING.md)
- [Security](./SECURITY.md)
- [Developer guide](./CONTRIBUTING.md#in-depth-developer-documentation)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors.](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/Nick2bad4u"><img src="https://avatars.githubusercontent.com/u/20943337?v=4?s=80" width="80px;" alt="Nick2bad4u"/><br /><sub><b>Nick2bad4u</b></sub></a><br /><a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/issues?q=author%3ANick2bad4u" title="Bug reports">🐛</a> <a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/commits?author=Nick2bad4u" title="Code">💻</a> <a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/commits?author=Nick2bad4u" title="Documentation">📖</a> <a href="#ideas-Nick2bad4u" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Nick2bad4u" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Nick2bad4u" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/pulls?q=is%3Apr+reviewed-by%3ANick2bad4u" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/commits?author=Nick2bad4u" title="Tests">⚠️</a> <a href="#tool-Nick2bad4u" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://snyk.io/"><img src="https://avatars.githubusercontent.com/u/19733683?v=4?s=80" width="80px;" alt="Snyk bot"/><br /><sub><b>Snyk bot</b></sub></a><br /><a href="#security-snyk-bot" title="Security">🛡️</a> <a href="#infra-snyk-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-snyk-bot" title="Maintenance">🚧</a> <a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/pulls?q=is%3Apr+reviewed-by%3Asnyk-bot" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="25%"><a href="https://www.stepsecurity.io/"><img src="https://avatars.githubusercontent.com/u/89328645?v=4?s=80" width="80px;" alt="StepSecurity Bot"/><br /><sub><b>StepSecurity Bot</b></sub></a><br /><a href="#security-step-security-bot" title="Security">🛡️</a> <a href="#infra-step-security-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-step-security-bot" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=80" width="80px;" alt="dependabot[bot]"/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#infra-dependabot[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#security-dependabot[bot]" title="Security">🛡️</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/apps/github-actions"><img src="https://avatars.githubusercontent.com/in/15368?v=4?s=80" width="80px;" alt="github-actions[bot]"/><br /><sub><b>github-actions[bot]</b></sub></a><br /><a href="https://github.com/Nick2bad4u/popular-web-fonts-woff2/commits?author=github-actions[bot]" title="Code">💻</a> <a href="#infra-github-actions[bot]" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
