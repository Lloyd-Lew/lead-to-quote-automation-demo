# Changelog

## [1.0.4] - 2026-08-19

### Changed

Added a manual `workflow_dispatch` trigger to the existing CI quality gate. Maintainers can now re-run the same protected default-branch validation on demand after reviewing historical workflow outcomes, without bypassing or weakening the push and pull-request checks.

Updated Supertest to the maintained `7.1.3` release, removing the remaining local test-tool deprecation warning without changing the demonstrator’s runtime behavior.

## [1.0.3] - 2026-08-18

### Security

Added a scheduled and pull-request CodeQL workflow for JavaScript and TypeScript security plus quality analysis. The initial analysis completed successfully on the public default branch.

## [1.0.2] - 2026-08-18

### Security

Updated the direct linting and test tooling to patched releases after the full dependency audit identified a critical development-tool vulnerability. The final full and production dependency audits report zero vulnerabilities.

## [1.0.1] - 2026-08-18

### Changed

Added public contribution templates, a conduct standard, a `CODEOWNERS` control, and main-branch protection that requires the passing CI quality check for normal contributors. Enabled Dependabot security updates and connected the technical showcase to the CompanyConnect business portfolio and sales-team guide.

## [1.0.0] - 2026-08-18

### Added

The initial stable demonstrator: validated lead intake, deterministic qualification, an in-memory CRM adapter, next-action recommendations, quote briefs, structured audit events, API and workflow tests, CI, dependency update configuration, and client-safe technical documentation.
