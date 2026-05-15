---
name: "Popular-Web-Fonts-WOFF2-Tests"
description: "Testing guidance for Vitest suites under test/."
applyTo: "test/**"
---

# `test/` Guide

## Purpose

- Tests validate CLI parsing, conversion flow behavior, summary/output contracts, and edge-case handling.
- Keep tests fast, deterministic, and platform-safe.

## Test conventions

- Use Vitest (`npm test`) and existing test helpers/fixtures.
- Prefer temporary directories/files for filesystem operations.
- Do not depend on external network services in unit/integration tests unless explicitly intended.
- Assert observable behavior:
  - exit codes
  - stdout/stderr output
  - generated file expectations
  - JSON payload shape

## Quality bar

- Add coverage for regressions and edge cases introduced by code changes.
- Keep assertions explicit and readable.
- Avoid brittle path assumptions; normalize path differences where needed.

## Validation

- After changing tests or behavior tested by them:
  - `npm test`
  - `npm run typecheck`
  - `npm run lint`
