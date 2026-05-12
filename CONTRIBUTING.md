# Contributing

## Setup

```bash
npm ci
npm run hooks:install
npm run playwright:install
npm run verify
```

## Project Rules

- keep country assets in `flags/` using lower-case ISO2 file names such as `ru.png`
- keep every flag image at `32x18`
- do not add square variants
- regenerate package artifacts through the build scripts instead of editing generated CSS by hand
- edit the demo site in `site-src/`; `site/` is generated

## Useful Commands

```bash
npm run build
npm run build:package
npm run build:pages
npm run build:site
npm run coverage
npm run clean
npm run check:assets
npm run check:docs
npm run check:flag-index
npm run check:package
npm run check:registry
npm run check:provenance
npm run generate:flag-index
npm run generate:provenance
npm test
npm run smoke
npm run test:all
npm run verify:package
npm run verify:site
npm run verify:site:smoke
npm run verify
```

## Coverage Outputs

`npm run coverage` updates:

- the coverage block inside `README.md`

It also writes ignored local artifacts under `reports/` and `badges/`.

## Command Groups

- `npm run check:assets` validates flag asset names, dimensions, and ISO coverage eligibility.
- `npm run check:docs` checks repository Markdown links.
- `npm run check:flag-index` validates the generated flag drawing index.
- `npm run check:package` parses `npm pack --json --dry-run` and rejects unexpected packed files.
- `npm run check:provenance` validates `flags/provenance.json`.
- `npm run check:registry` installs the published package from GitHub Packages. It requires `NODE_AUTH_TOKEN` or `GITHUB_TOKEN` with `read:packages`.
- `npm run generate:flag-index` regenerates `scripts/flag-art/flags/index.js`.
- `npm run generate:provenance` regenerates `flags/provenance.json`.
- `npm run verify:package` runs static checks, asset validation, coverage, package tests, and tarball validation.
- `npm run verify:site` builds and checks generated site artifacts.
- `npm run verify:site:smoke` runs site verification and then browser smoke without rebuilding the site.
- `npm run smoke` runs the browser smoke test against the generated static site.

## Release Checklist

Releases are rare and manual. The tag is the release trigger.

1. Confirm `package.json` version is the intended release version.
2. Update `CHANGELOG.md` for that version.
3. Run `npm run verify`.
4. Run `npm run verify:site:smoke` where Playwright Chrome for Testing can launch.
5. Make sure the release commit is on `main`.
6. Push a matching semver tag such as `v1.0.0`.
7. After the release workflow finishes, run `npm run check:registry` with a package read token.

`.github/workflows/release.yml` validates the tag, publishes to GitHub Packages with `GITHUB_TOKEN`, and creates the GitHub release entry.
