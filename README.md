# Pixel Flags

[![CI](https://github.com/alyldas/pixel-flags/actions/workflows/ci.yml/badge.svg)](.github/workflows/ci.yml)
[![Deploy Pages](https://github.com/alyldas/pixel-flags/actions/workflows/pages.yml/badge.svg)](.github/workflows/pages.yml)
[![Release](https://github.com/alyldas/pixel-flags/actions/workflows/release.yml/badge.svg)](.github/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/alyldas/pixel-flags?style=flat&logo=github&label=release)](https://github.com/alyldas/pixel-flags/releases)
[![License](https://img.shields.io/github/license/alyldas/pixel-flags?style=flat&label=license)](LICENSE)

Pixel-art country flags with a `flag-icons`-style CSS API.

```html
<link rel="stylesheet" href="./css/pixel-flags.css" />
<span class="pf pf-ru" role="img" aria-label="Russia"></span>
```

## Installation

This package is published to GitHub Packages. GitHub Packages requires an access token for npm installs, including public packages.

Create or edit `.npmrc` in the consuming project:

```ini
@alyldas:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then install with a classic personal access token that has `read:packages`:

```bash
NODE_AUTH_TOKEN=github_pat_... npm install @alyldas/pixel-flags
```

In GitHub Actions, use `GITHUB_TOKEN` when the workflow repository has package access:

```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
run: npm install @alyldas/pixel-flags
```

For an already authenticated npm setup:

```bash
npm install @alyldas/pixel-flags
```

## Package Registry

- Registry: `https://npm.pkg.github.com`
- Package: `@alyldas/pixel-flags`
- Access: public GitHub package, authenticated npm install

## Usage

### CSS Imports

```js
import "@alyldas/pixel-flags/css/pixel-flags.css";
```

```js
import "@alyldas/pixel-flags/css/pixel-flags.min.css";
```

### Plain HTML

```html
<link rel="stylesheet" href="./css/pixel-flags.css" />
<span class="pf pf-ru" role="img" aria-label="Russia"></span>
```

### Sizing

Flags scale with surrounding `font-size`, or you can set an explicit CSS variable:

```html
<span class="pf pf-ru" style="font-size: 2rem" role="img" aria-label="Russia"></span>
<span class="pf pf-ru" style="--pf-height: 2rem" role="img" aria-label="Russia"></span>
```

### Accessibility

If a flag conveys meaning, add `role="img"` and an `aria-label`:

```html
<span class="pf pf-ru" role="img" aria-label="Russia"></span>
```

If it is decorative only:

```html
<span class="pf pf-ru" aria-hidden="true"></span>
```

## What's Included

- `css/pixel-flags.css` for readable production usage
- `css/pixel-flags.min.css` for compact delivery
- `flags/*.png` for direct asset access
- `flags/provenance.json` for bundled asset hashes and local source provenance

## What It Does Not Include

- square flag variants
- aliases for missing territories
- a JavaScript runtime API

## Browser Support

Current Chrome, Edge, Firefox, Safari, and iOS Safari. The CSS expects `background-image`, `calc()`, and `image-rendering: pixelated`.

## Coverage

<!-- coverage:start -->

- ISO total: `250`
- Available flags: `250`
- Missing ISO codes: `0`
- ISO coverage: `100.0%`

<!-- coverage:end -->

## Asset Licensing

Repository code, build scripts, generated CSS, tests, documentation, and bundled PNG flag assets are MIT-licensed.

Bundled PNG assets are original native 32x18 pixel-art drawings generated from the local asset script. They are not resized from larger flag images and do not bundle upstream PNG files.

- Asset notice: [NOTICE.md](NOTICE.md)
- Local asset provenance: [flags/provenance.json](flags/provenance.json)
- Local asset registry: [scripts/flag-art/flags/index.js](scripts/flag-art/flags/index.js)
- Flag recipes: [scripts/flag-art/flags](scripts/flag-art/flags)

## Development

Editable sources:

- `scripts/flag-art/` stores the local pixel-art flag recipes.
- `site-src/` stores the demo site source.

Generated package artifacts:

- `flags/`
- `css/`

Ignored local artifacts:

- `site/`
- `badges/`
- `reports/`
- `_site/`
- `draft/`
- `.npm-cache/`

```bash
npm run clean
npm run draw:flags:preview
npm run draw:flags
npm run build:package
npm run build:site
npm run build:pages
npm run verify:package
npm run verify:site
npm run verify:site:smoke
npm run verify
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development and release command list.

Release Please maintains the version, changelog, tag, and GitHub release. The release workflow
publishes one verified tarball to GitHub Packages. See
[CONTRIBUTING.md](CONTRIBUTING.md#release-checklist).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Security

See [SECURITY.md](SECURITY.md).

## Community

- Support: [SUPPORT.md](SUPPORT.md)
- Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

## Credits

- API inspiration: [flag-icons](https://github.com/lipis/flag-icons)
- Visual format inspiration: [R74n PixelFlags](https://r74n.com/pixelflags/)
- PNG sources: [scripts/flag-art/flags](scripts/flag-art/flags)
