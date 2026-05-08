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
Browse the full list in the [`fonts/woff2/`](./fonts/woff2) directory, or search the [interactive browser](https://nick2bad4u.github.io/popular-web-fonts-woff2/).

Selected families:

| Family                                                                                     | Folder name                                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **[ABeeZee](https://fonts.google.com/specimen/ABeeZee)**                                   | [`ABeeZee`](./fonts/woff2/ABeeZee)                                 |
| **[Abel](https://fonts.google.com/specimen/Abel)**                                         | [`Abel`](./fonts/woff2/Abel)                                       |
| **[AbrilFatface](https://fonts.google.com/specimen/Abril+Fatface)**                        | [`AbrilFatface`](./fonts/woff2/AbrilFatface)                       |
| **[AlfaSlabOne](https://fonts.google.com/specimen/Alfa+Slab+One)**                         | [`AlfaSlabOne`](./fonts/woff2/AlfaSlabOne)                         |
| **[Almarai](https://fonts.google.com/specimen/Almarai)**                                   | [`Almarai`](./fonts/woff2/Almarai)                                 |
| **[AnekTelugu](https://fonts.google.com/specimen/Anek+Telugu)**                            | [`AnekTelugu`](./fonts/woff2/AnekTelugu)                           |
| **[Anton](https://fonts.google.com/specimen/Anton)**                                       | [`Anton`](./fonts/woff2/Anton)                                     |
| **[Archivo](https://fonts.google.com/specimen/Archivo)**                                   | [`Archivo`](./fonts/woff2/Archivo)                                 |
| **[ArchivoBlack](https://fonts.google.com/specimen/Archivo+Black)**                        | [`ArchivoBlack`](./fonts/woff2/ArchivoBlack)                       |
| **[Arimo](https://fonts.google.com/specimen/Arimo)**                                       | [`Arimo`](./fonts/woff2/Arimo)                                     |
| **[Arvo](https://fonts.google.com/specimen/Arvo)**                                         | [`Arvo`](./fonts/woff2/Arvo)                                       |
| **[Asap](https://fonts.google.com/specimen/Asap)**                                         | [`Asap`](./fonts/woff2/Asap)                                       |
| **[Assistant](https://fonts.google.com/specimen/Assistant)**                               | [`Assistant`](./fonts/woff2/Assistant)                             |
| **[Barlow](https://fonts.google.com/specimen/Barlow)**                                     | [`Barlow`](./fonts/woff2/Barlow)                                   |
| **[BarlowCondensed](https://fonts.google.com/specimen/Barlow+Condensed)**                  | [`BarlowCondensed`](./fonts/woff2/BarlowCondensed)                 |
| **[BarlowSemiCondensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed)**         | [`BarlowSemiCondensed`](./fonts/woff2/BarlowSemiCondensed)         |
| **[BebasNeue](https://fonts.google.com/specimen/Bebas+Neue)**                              | [`BebasNeue`](./fonts/woff2/BebasNeue)                             |
| **[Bitter](https://fonts.google.com/specimen/Bitter)**                                     | [`Bitter`](./fonts/woff2/Bitter)                                   |
| **[BodoniModa](https://fonts.google.com/specimen/Bodoni+Moda)**                            | [`BodoniModa`](./fonts/woff2/BodoniModa)                           |
| **[BricolageGrotesque](https://fonts.google.com/specimen/Bricolage+Grotesque)**            | [`BricolageGrotesque`](./fonts/woff2/BricolageGrotesque)           |
| **[Bungee](https://fonts.google.com/specimen/Bungee)**                                     | [`Bungee`](./fonts/woff2/Bungee)                                   |
| **[Cabin](https://fonts.google.com/specimen/Cabin)**                                       | [`Cabin`](./fonts/woff2/Cabin)                                     |
| **[Cairo](https://fonts.google.com/specimen/Cairo)**                                       | [`Cairo`](./fonts/woff2/Cairo)                                     |
| **[Caveat](https://fonts.google.com/specimen/Caveat)**                                     | [`Caveat`](./fonts/woff2/Caveat)                                   |
| **[ChakraPetch](https://fonts.google.com/specimen/Chakra+Petch)**                          | [`ChakraPetch`](./fonts/woff2/ChakraPetch)                         |
| **[ChangaOne](https://fonts.google.com/specimen/Changa+One)**                              | [`ChangaOne`](./fonts/woff2/ChangaOne)                             |
| **[Cinzel](https://fonts.google.com/specimen/Cinzel)**                                     | [`Cinzel`](./fonts/woff2/Cinzel)                                   |
| **[Comfortaa](https://fonts.google.com/specimen/Comfortaa)**                               | [`Comfortaa`](./fonts/woff2/Comfortaa)                             |
| **[CormorantGaramond](https://fonts.google.com/specimen/Cormorant+Garamond)**              | [`CormorantGaramond`](./fonts/woff2/CormorantGaramond)             |
| **[CrimsonText](https://fonts.google.com/specimen/Crimson+Text)**                          | [`CrimsonText`](./fonts/woff2/CrimsonText)                         |
| **[DMMono](https://fonts.google.com/specimen/DM+Mono)**                                    | [`DMMono`](./fonts/woff2/DMMono)                                   |
| **[DMSans](https://fonts.google.com/specimen/DM+Sans)**                                    | [`DMSans`](./fonts/woff2/DMSans)                                   |
| **[DMSerifDisplay](https://fonts.google.com/specimen/DM+Serif+Display)**                   | [`DMSerifDisplay`](./fonts/woff2/DMSerifDisplay)                   |
| **[DancingScript](https://fonts.google.com/specimen/Dancing+Script)**                      | [`DancingScript`](./fonts/woff2/DancingScript)                     |
| **[Domine](https://fonts.google.com/specimen/Domine)**                                     | [`Domine`](./fonts/woff2/Domine)                                   |
| **[Dosis](https://fonts.google.com/specimen/Dosis)**                                       | [`Dosis`](./fonts/woff2/Dosis)                                     |
| **[EBGaramond](https://fonts.google.com/specimen/EB+Garamond)**                            | [`EBGaramond`](./fonts/woff2/EBGaramond)                           |
| **[Exo2](https://fonts.google.com/specimen/Exo+2)**                                        | [`Exo2`](./fonts/woff2/Exo2)                                       |
| **[Figtree](https://fonts.google.com/specimen/Figtree)**                                   | [`Figtree`](./fonts/woff2/Figtree)                                 |
| **[FiraSans](https://fonts.google.com/specimen/Fira+Sans)**                                | [`FiraSans`](./fonts/woff2/FiraSans)                               |
| **[FiraSansCondensed](https://fonts.google.com/specimen/Fira+Sans+Condensed)**             | [`FiraSansCondensed`](./fonts/woff2/FiraSansCondensed)             |
| **[FjallaOne](https://fonts.google.com/specimen/Fjalla+One)**                              | [`FjallaOne`](./fonts/woff2/FjallaOne)                             |
| **[Fraunces](https://fonts.google.com/specimen/Fraunces)**                                 | [`Fraunces`](./fonts/woff2/Fraunces)                               |
| **[Fredoka](https://fonts.google.com/specimen/Fredoka)**                                   | [`Fredoka`](./fonts/woff2/Fredoka)                                 |
| **[Geist](https://fonts.google.com/specimen/Geist)**                                       | [`Geist`](./fonts/woff2/Geist)                                     |
| **[GoogleSans](https://fonts.google.com/specimen/Google+Sans)**                            | [`GoogleSans`](./fonts/woff2/GoogleSans)                           |
| **[GoogleSansCode](https://fonts.google.com/specimen/Google+Sans+Code)**                   | [`GoogleSansCode`](./fonts/woff2/GoogleSansCode)                   |
| **[GoogleSansFlex](https://fonts.google.com/specimen/Google+Sans+Flex)**                   | [`GoogleSansFlex`](./fonts/woff2/GoogleSansFlex)                   |
| **[GravitasOne](https://fonts.google.com/specimen/Gravitas+One)**                          | [`GravitasOne`](./fonts/woff2/GravitasOne)                         |
| **[Heebo](https://fonts.google.com/specimen/Heebo)**                                       | [`Heebo`](./fonts/woff2/Heebo)                                     |
| **[Hind](https://fonts.google.com/specimen/Hind)**                                         | [`Hind`](./fonts/woff2/Hind)                                       |
| **[HindSiliguri](https://fonts.google.com/specimen/Hind+Siliguri)**                        | [`HindSiliguri`](./fonts/woff2/HindSiliguri)                       |
| **[IBMPlexMono](https://fonts.google.com/specimen/IBM+Plex+Mono)**                         | [`IBMPlexMono`](./fonts/woff2/IBMPlexMono)                         |
| **[IBMPlexSans](https://fonts.google.com/specimen/IBM+Plex+Sans)**                         | [`IBMPlexSans`](./fonts/woff2/IBMPlexSans)                         |
| **[Inconsolata](https://fonts.google.com/specimen/Inconsolata)**                           | [`Inconsolata`](./fonts/woff2/Inconsolata)                         |
| **[InstrumentSans](https://fonts.google.com/specimen/Instrument+Sans)**                    | [`InstrumentSans`](./fonts/woff2/InstrumentSans)                   |
| **[InstrumentSerif](https://fonts.google.com/specimen/Instrument+Serif)**                  | [`InstrumentSerif`](./fonts/woff2/InstrumentSerif)                 |
| **[Inter](https://fonts.google.com/specimen/Inter)**                                       | [`Inter`](./fonts/woff2/Inter)                                     |
| **[InterTight](https://fonts.google.com/specimen/Inter+Tight)**                            | [`InterTight`](./fonts/woff2/InterTight)                           |
| **[JetBrainsMono](https://fonts.google.com/specimen/JetBrains+Mono)**                      | [`JetBrainsMono`](./fonts/woff2/JetBrainsMono)                     |
| **[JosefinSans](https://fonts.google.com/specimen/Josefin+Sans)**                          | [`JosefinSans`](./fonts/woff2/JosefinSans)                         |
| **[Jost](https://fonts.google.com/specimen/Jost)**                                         | [`Jost`](./fonts/woff2/Jost)                                       |
| **[Kanit](https://fonts.google.com/specimen/Kanit)**                                       | [`Kanit`](./fonts/woff2/Kanit)                                     |
| **[Karla](https://fonts.google.com/specimen/Karla)**                                       | [`Karla`](./fonts/woff2/Karla)                                     |
| **[Lato](https://fonts.google.com/specimen/Lato)**                                         | [`Lato`](./fonts/woff2/Lato)                                       |
| **[Lexend](https://fonts.google.com/specimen/Lexend)**                                     | [`Lexend`](./fonts/woff2/Lexend)                                   |
| **[LexendDeca](https://fonts.google.com/specimen/Lexend+Deca)**                            | [`LexendDeca`](./fonts/woff2/LexendDeca)                           |
| **[LibreBaskerville](https://fonts.google.com/specimen/Libre+Baskerville)**                | [`LibreBaskerville`](./fonts/woff2/LibreBaskerville)               |
| **[LibreFranklin](https://fonts.google.com/specimen/Libre+Franklin)**                      | [`LibreFranklin`](./fonts/woff2/LibreFranklin)                     |
| **[LilitaOne](https://fonts.google.com/specimen/Lilita+One)**                              | [`LilitaOne`](./fonts/woff2/LilitaOne)                             |
| **[Lobster](https://fonts.google.com/specimen/Lobster)**                                   | [`Lobster`](./fonts/woff2/Lobster)                                 |
| **[LobsterTwo](https://fonts.google.com/specimen/Lobster+Two)**                            | [`LobsterTwo`](./fonts/woff2/LobsterTwo)                           |
| **[Lora](https://fonts.google.com/specimen/Lora)**                                         | [`Lora`](./fonts/woff2/Lora)                                       |
| **[MPLUS1p](https://fonts.google.com/specimen/MPLU+1p)**                                   | [`MPLUS1p`](./fonts/woff2/MPLUS1p)                                 |
| **[MPLUSRounded1c](https://fonts.google.com/specimen/MPLUS+Rounded+1c)**                   | [`MPLUSRounded1c`](./fonts/woff2/MPLUSRounded1c)                   |
| **[Manrope](https://fonts.google.com/specimen/Manrope)**                                   | [`Manrope`](./fonts/woff2/Manrope)                                 |
| **[MaterialIcons](https://fonts.google.com/specimen/Material+Icons)**                      | [`MaterialIcons`](./fonts/woff2/MaterialIcons)                     |
| **[MaterialIconsOutlined](https://fonts.google.com/specimen/Material+Icons+Outlined)**     | [`MaterialIconsOutlined`](./fonts/woff2/MaterialIconsOutlined)     |
| **[MaterialIconsRound](https://fonts.google.com/specimen/Material+Icons+Round)**           | [`MaterialIconsRound`](./fonts/woff2/MaterialIconsRound)           |
| **[MaterialIconsSharp](https://fonts.google.com/specimen/Material+Icons+Sharp)**           | [`MaterialIconsSharp`](./fonts/woff2/MaterialIconsSharp)           |
| **[MaterialIconsTwoTone](https://fonts.google.com/specimen/Material+Icons+Two+Tone)**      | [`MaterialIconsTwoTone`](./fonts/woff2/MaterialIconsTwoTone)       |
| **[MaterialSymbolsOutlined](https://fonts.google.com/specimen/Material+Symbols+Outlined)** | [`MaterialSymbolsOutlined`](./fonts/woff2/MaterialSymbolsOutlined) |
| **[MaterialSymbolsRounded](https://fonts.google.com/specimen/Material+Symbols+Rounded)**   | [`MaterialSymbolsRounded`](./fonts/woff2/MaterialSymbolsRounded)   |
| **[MavenPro](https://fonts.google.com/specimen/Maven+Pro)**                                | [`MavenPro`](./fonts/woff2/MavenPro)                               |
| **[Merriweather](https://fonts.google.com/specimen/Merriweather)**                         | [`Merriweather`](./fonts/woff2/Merriweather)                       |
| **[MerriweatherSans](https://fonts.google.com/specimen/Merriweather+Sans)**                | [`MerriweatherSans`](./fonts/woff2/MerriweatherSans)               |
| **[Montserrat](https://fonts.google.com/specimen/Montserrat)**                             | [`Montserrat`](./fonts/woff2/Montserrat)                           |
| **[Mukta](https://fonts.google.com/specimen/Mukta)**                                       | [`Mukta`](./fonts/woff2/Mukta)                                     |
| **[Mulish](https://fonts.google.com/specimen/Mulish)**                                     | [`Mulish`](./fonts/woff2/Mulish)                                   |
| **[NanumGothic](https://fonts.google.com/specimen/Nanum+Gothic)**                          | [`NanumGothic`](./fonts/woff2/NanumGothic)                         |
| **[NotoColorEmoji](https://fonts.google.com/specimen/Noto+Color+Emoji)**                   | [`NotoColorEmoji`](./fonts/woff2/NotoColorEmoji)                   |
| **[NotoSans](https://fonts.google.com/specimen/Noto+Sans)**                                | [`NotoSans`](./fonts/woff2/NotoSans)                               |
| **[NotoSansArabic](https://fonts.google.com/specimen/Noto+Sans+Arabic)**                   | [`NotoSansArabic`](./fonts/woff2/NotoSansArabic)                   |
| **[NotoSansJP](https://fonts.google.com/specimen/Noto+Sans+JP)**                           | [`NotoSansJP`](./fonts/woff2/NotoSansJP)                           |
| **[NotoSansKR](https://fonts.google.com/specimen/Noto+Sans+KR)**                           | [`NotoSansKR`](./fonts/woff2/NotoSansKR)                           |
| **[NotoSansSC](https://fonts.google.com/specimen/Noto+Sans+SC)**                           | [`NotoSansSC`](./fonts/woff2/NotoSansSC)                           |
| **[NotoSansTC](https://fonts.google.com/specimen/Noto+Sans+TC)**                           | [`NotoSansTC`](./fonts/woff2/NotoSansTC)                           |
| **[NotoSansTelugu](https://fonts.google.com/specimen/Noto+Sans+Telugu)**                   | [`NotoSansTelugu`](./fonts/woff2/NotoSansTelugu)                   |
| **[NotoSansThai](https://fonts.google.com/specimen/Noto+Sans+Thai)**                       | [`NotoSansThai`](./fonts/woff2/NotoSansThai)                       |
| **[NotoSerif](https://fonts.google.com/specimen/Noto+Serif)**                              | [`NotoSerif`](./fonts/woff2/NotoSerif)                             |
| **[NotoSerifJP](https://fonts.google.com/specimen/Noto+Serif+JP)**                         | [`NotoSerifJP`](./fonts/woff2/NotoSerifJP)                         |
| **[Nunito](https://fonts.google.com/specimen/Nunito)**                                     | [`Nunito`](./fonts/woff2/Nunito)                                   |
| **[NunitoSans](https://fonts.google.com/specimen/Nunito+Sans)**                            | [`NunitoSans`](./fonts/woff2/NunitoSans)                           |
| **[OpenSans](https://fonts.google.com/specimen/Open+Sans)**                                | [`OpenSans`](./fonts/woff2/OpenSans)                               |
| **[Orbitron](https://fonts.google.com/specimen/Orbitron)**                                 | [`Orbitron`](./fonts/woff2/Orbitron)                               |
| **[Oswald](https://fonts.google.com/specimen/Oswald)**                                     | [`Oswald`](./fonts/woff2/Oswald)                                   |
| **[Outfit](https://fonts.google.com/specimen/Outfit)**                                     | [`Outfit`](./fonts/woff2/Outfit)                                   |
| **[Overpass](https://fonts.google.com/specimen/Overpass)**                                 | [`Overpass`](./fonts/woff2/Overpass)                               |
| **[Oxygen](https://fonts.google.com/specimen/Oxygen)**                                     | [`Oxygen`](./fonts/woff2/Oxygen)                                   |
| **[PTSans](https://fonts.google.com/specimen/PT+Sans)**                                    | [`PTSans`](./fonts/woff2/PTSans)                                   |
| **[PTSansNarrow](https://fonts.google.com/specimen/PT+Sans+Narrow)**                       | [`PTSansNarrow`](./fonts/woff2/PTSansNarrow)                       |
| **[PTSerif](https://fonts.google.com/specimen/PT+Serif)**                                  | [`PTSerif`](./fonts/woff2/PTSerif)                                 |
| **[Pacifico](https://fonts.google.com/specimen/Pacifico)**                                 | [`Pacifico`](./fonts/woff2/Pacifico)                               |
| **[PlayfairDisplay](https://fonts.google.com/specimen/Playfair+Display)**                  | [`PlayfairDisplay`](./fonts/woff2/PlayfairDisplay)                 |
| **[PlusJakartaSans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)**                 | [`PlusJakartaSans`](./fonts/woff2/PlusJakartaSans)                 |
| **[Poppins](https://fonts.google.com/specimen/Poppins)**                                   | [`Poppins`](./fonts/woff2/Poppins)                                 |
| **[Prompt](https://fonts.google.com/specimen/Prompt)**                                     | [`Prompt`](./fonts/woff2/Prompt)                                   |
| **[PublicSans](https://fonts.google.com/specimen/Public+Sans)**                            | [`PublicSans`](./fonts/woff2/PublicSans)                           |
| **[Questrial](https://fonts.google.com/specimen/Questrial)**                               | [`Questrial`](./fonts/woff2/Questrial)                             |
| **[Quicksand](https://fonts.google.com/specimen/Quicksand)**                               | [`Quicksand`](./fonts/woff2/Quicksand)                             |
| **[Rajdhani](https://fonts.google.com/specimen/Rajdhani)**                                 | [`Rajdhani`](./fonts/woff2/Rajdhani)                               |
| **[Raleway](https://fonts.google.com/specimen/Raleway)**                                   | [`Raleway`](./fonts/woff2/Raleway)                                 |
| **[Ramabhadra](https://fonts.google.com/specimen/Ramabhadra)**                             | [`Ramabhadra`](./fonts/woff2/Ramabhadra)                           |
| **[RedHatDisplay](https://fonts.google.com/specimen/Red+Hat+Display)**                     | [`RedHatDisplay`](./fonts/woff2/RedHatDisplay)                     |
| **[Roboto](https://fonts.google.com/specimen/Roboto)**                                     | [`Roboto`](./fonts/woff2/Roboto)                                   |
| **[RobotoCondensed](https://fonts.google.com/specimen/Roboto+Condensed)**                  | [`RobotoCondensed`](./fonts/woff2/RobotoCondensed)                 |
| **[RobotoFlex](https://fonts.google.com/specimen/Roboto+Flex)**                            | [`RobotoFlex`](./fonts/woff2/RobotoFlex)                           |
| **[RobotoMono](https://fonts.google.com/specimen/Roboto+Mono)**                            | [`RobotoMono`](./fonts/woff2/RobotoMono)                           |
| **[RobotoSlab](https://fonts.google.com/specimen/Roboto+Slab)**                            | [`RobotoSlab`](./fonts/woff2/RobotoSlab)                           |
| **[Rubik](https://fonts.google.com/specimen/Rubik)**                                       | [`Rubik`](./fonts/woff2/Rubik)                                     |
| **[Saira](https://fonts.google.com/specimen/Saira)**                                       | [`Saira`](./fonts/woff2/Saira)                                     |
| **[Satisfy](https://fonts.google.com/specimen/Satisfy)**                                   | [`Satisfy`](./fonts/woff2/Satisfy)                                 |
| **[SchibstedGrotesk](https://fonts.google.com/specimen/Schibsted+Grotesk)**                | [`SchibstedGrotesk`](./fonts/woff2/SchibstedGrotesk)               |
| **[ShadowsIntoLight](https://fonts.google.com/specimen/Shadows+Into+Light)**               | [`ShadowsIntoLight`](./fonts/woff2/ShadowsIntoLight)               |
| **[ShareTech](https://fonts.google.com/specimen/Share+Tech)**                              | [`ShareTech`](./fonts/woff2/ShareTech)                             |
| **[Slabo27px](https://fonts.google.com/specimen/Slabo+27px)**                              | [`Slabo27px`](./fonts/woff2/Slabo27px)                             |
| **[SmoochSans](https://fonts.google.com/specimen/Smooch+Sans)**                            | [`SmoochSans`](./fonts/woff2/SmoochSans)                           |
| **[Sora](https://fonts.google.com/specimen/Sora)**                                         | [`Sora`](./fonts/woff2/Sora)                                       |
| **[SourceCodePro](https://fonts.google.com/specimen/Source+Code+Pro)**                     | [`SourceCodePro`](./fonts/woff2/SourceCodePro)                     |
| **[SourceSans3](https://fonts.google.com/specimen/Source+Sans+3)**                         | [`SourceSans3`](./fonts/woff2/SourceSans3)                         |
| **[SourceSerif4](https://fonts.google.com/specimen/Source+Serif+4)**                       | [`SourceSerif4`](./fonts/woff2/SourceSerif4)                       |
| **[SpaceGrotesk](https://fonts.google.com/specimen/Space+Grotesk)**                        | [`SpaceGrotesk`](./fonts/woff2/SpaceGrotesk)                       |
| **[SupermercadoOne](https://fonts.google.com/specimen/Supermercado+One)**                  | [`SupermercadoOne`](./fonts/woff2/SupermercadoOne)                 |
| **[Tajawal](https://fonts.google.com/specimen/Tajawal)**                                   | [`Tajawal`](./fonts/woff2/Tajawal)                                 |
| **[Teko](https://fonts.google.com/specimen/Teko)**                                         | [`Teko`](./fonts/woff2/Teko)                                       |
| **[TitilliumWeb](https://fonts.google.com/specimen/Titillium+Web)**                        | [`TitilliumWeb`](./fonts/woff2/TitilliumWeb)                       |
| **[Ubuntu](https://fonts.google.com/specimen/Ubuntu)**                                     | [`Ubuntu`](./fonts/woff2/Ubuntu)                                   |
| **[Urbanist](https://fonts.google.com/specimen/Urbanist)**                                 | [`Urbanist`](./fonts/woff2/Urbanist)                               |
| **[VarelaRound](https://fonts.google.com/specimen/Varela+Round)**                          | [`VarelaRound`](./fonts/woff2/VarelaRound)                         |
| **[WorkSans](https://fonts.google.com/specimen/Work+Sans)**                                | [`WorkSans`](./fonts/woff2/WorkSans)                               |

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
