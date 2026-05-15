---
name: "Popular-Web-Fonts-WOFF2-Source"
description: "Guidance for TypeScript CLI source modules under src/."
applyTo: "src/**"
---

# `src/` Guide

## Purpose

- `src/` contains the canonical CLI implementation and exported runtime types.
- Package output is built from this folder; keep behavior changes intentional and documented.

## Implementation expectations

- Keep CLI behavior stable:
  - argument parsing and validation
  - dry-run vs convert mode behavior
  - error categories and exit codes
  - JSON output shape consumed by scripts/UI
- Prefer `node:fs/promises` in CLI runtime paths.
- Keep functions deterministic and avoid implicit global state.
- Preserve cross-platform path handling (`path.resolve`, `path.normalize`, explicit separators when needed).

## Types and module boundaries

- Keep strict typing; avoid `any`.
- Use `type-fest` and `ts-extras` utilities where they improve clarity and safety.
- Keep public-facing types in `src/cli-types.ts` coherent with CLI output and tests.

## Validation

- After `src/**` changes, run:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
