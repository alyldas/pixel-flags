# Contributing

## Setup

```bash
npm ci
npm run hooks:install
npx playwright install chrome-for-testing
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
npm run build:site
npm run coverage
npm run check:assets
npm run check:docs
npm run check:package
npm run check:provenance
npm run generate:provenance
npm test
npm run smoke
npm run test:all
npm run verify:package
npm run verify:site
npm run verify
```

## Coverage Outputs

`npm run coverage` updates:

- the coverage block inside `README.md`

It also writes ignored local artifacts under `reports/` and `badges/`.

## Command Groups

- `npm run check:assets` validates flag asset names, dimensions, and ISO coverage eligibility.
- `npm run check:docs` checks repository Markdown links.
- `npm run check:package` parses `npm pack --json --dry-run` and rejects unexpected packed files.
- `npm run check:provenance` validates `flags/provenance.json`.
- `npm run generate:provenance` regenerates `flags/provenance.json`.
- `npm run verify:package` runs static checks, asset validation, coverage, package tests, and tarball validation.
- `npm run verify:site` builds and checks generated site artifacts.
- `npm run smoke` runs the browser smoke test against the generated static site.

## Release Checklist

Before the first public release:

1. Confirm `package.json` version is the intended release version.
2. Update `CHANGELOG.md` for that version.
3. Run `npm run verify`.
4. Run `npm run smoke` in an environment where Playwright Chromium can launch.
5. Review `NOTICE.md`, `README.md`, and `SECURITY.md`.
6. Make sure the release commit is on `main`.
7. Push a matching semver tag such as `v1.0.0`.

`.github/workflows/release.yml` validates the tag, publishes to GitHub Packages with `GITHUB_TOKEN`, and creates the GitHub release entry.
