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
- regenerate public assets through the build scripts instead of editing generated CSS or site files by hand

## Useful Commands

```bash
npm run build
npm run coverage
npm run docs:check
npm run validate:assets
npm run lint:workflows
npm test
npm run smoke
npm run test:all
npm run verify
npm run release:notes
```

## Coverage Outputs

`npm run coverage` updates:

- `reports/coverage.md`
- `badges/coverage.svg`
- the coverage block inside `README.md`

## Release Checklist

Before the first public release:

1. Confirm `package.json` version is the intended release version.
2. Update `CHANGELOG.md` for that version.
3. Run `npm run verify`.
4. Run `npm run smoke` in an environment where Playwright Chromium can launch.
5. Review `NOTICE.md`, `README.md`, and `SECURITY.md`.
6. Make sure the release commit is on `main`.
7. Push a matching semver tag such as `v1.0.0`.

If `NPM_TOKEN` is configured, `.github/workflows/release.yml` will publish to npm. If not, the workflow will still validate the release and create a GitHub release entry.

## GitHub Hardening

After creating the GitHub repository, apply baseline branch/tag protections:

```bash
npm run github:hardening -- owner/repo
```
