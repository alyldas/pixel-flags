# Pixel Flags

[CI workflow](.github/workflows/ci.yml)

Pixel-art country flags with a `flag-icons`-style CSS API.

```html
<link rel="stylesheet" href="./css/pixel-flags.css" />
<span class="pf pf-ru" role="img" aria-label="Russia"></span>
```

## Installation

```bash
npm config set @alyldas:registry https://npm.pkg.github.com
npm install @alyldas/pixel-flags
```

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
- Local asset registry: [scripts/flag-art/flags.js](scripts/flag-art/flags.js)
- Detailed flag recipes: [scripts/flag-art/detailed-flags.js](scripts/flag-art/detailed-flags.js)

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
npm run draw:flags:preview
npm run draw:flags
npm run build:package
npm run build:site
npm run verify:package
npm run verify:site
npm run verify
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development and release command list.

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
- PNG sources: [scripts/flag-art/flags.js](scripts/flag-art/flags.js) and [scripts/flag-art/detailed-flags.js](scripts/flag-art/detailed-flags.js)
