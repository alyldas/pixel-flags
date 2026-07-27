# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-07-27

### Changed

- grouped npm dependency updates into a single automated pull request
- switched browser verification to Playwright-managed Chromium
- updated development dependencies

### Fixed

- updated vulnerable transitive development dependencies

## [1.0.1] - 2026-07-12

### Added

- added visual asset regression checks
- added verification for GitHub Packages installation

### Changed

- consolidated generated-artifact cleanup roots
- added a single provenance CLI behind npm provenance scripts
- added a generated flag recipe index check
- removed legacy provenance and safe-fs script entrypoints
- removed the legacy flag registry wrapper
- consolidated browser site verification behind one npm script
- tightened generated and temporary artifact cleanup guards
- simplified release documentation around manual tag-based publishing
- aligned the Node.js baseline on version 24
- updated development dependencies
- updated GitHub Actions dependencies
- updated Sharp and hardened pixel asset validation

### Fixed

- corrected pixel flag artwork

## [1.0.0] - 2026-05-10

### Added

- documented GitHub Packages authentication and registry installation
- optional registry install smoke check for the published GitHub package
- full ISO flag coverage with 250 native 32x18 pixel-art PNG assets
- MIT-licensed generated flag assets with local provenance metadata
- static demo site source in `site-src/` and generated Pages deployment
- package, site, provenance, asset, smoke, and tarball verification

### Changed

- simplified build scripts into package/site entrypoints and shared `scripts/lib/` modules
- replaced checked-in site and coverage artifacts with ignored generated outputs
- simplified release flow for manual tagged GitHub Packages releases
- made browser smoke checks reuse the site build produced by the preceding site verification
- updated the required Node.js version to `22.22.2`

## [0.1.0]

### Added

- GitHub Packages package with `flag-icons`-style API (`.pf .pf-xx`)
- generated CSS entries in `css/` and PNG assets in `flags/`
- generated demo site in `site/` and GitHub Pages deployment workflow
- ISO coverage report and badge generation
- CI workflows with build/test/smoke verification
- legal split-license docs (`LICENSE` + `NOTICE.md`)
