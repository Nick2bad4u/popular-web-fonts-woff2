---
name: "Popular-Web-Fonts-WOFF2-Scripts"
description: "Guidance for automation and asset-pipeline scripts under scripts/."
applyTo: "scripts/**"
---

# `scripts/` Guide

## Purpose

- Scripts in this folder manage converter setup, source downloads, conversion orchestration, verification, and maintenance tasks.
- Keep scripts safe to re-run and explicit about side effects.

## Behavior rules

- Prefer deterministic outputs and stable ordering.
- Keep scripts idempotent where practical.
- Preserve current flag semantics (`--dry-run`, `--force`, limits, output paths).
- Fail with clear error messages and non-zero exit codes.

## Filesystem and network considerations

- Avoid writing outside repository paths unless explicitly needed.
- Keep generated temporary artifacts in `temp/`.
- For network/download scripts, keep timeouts/retry behavior conservative and user-visible.
- Do not silently skip failures that affect correctness.

## Validation

- After script changes, run the relevant script plus baseline checks:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
- For end-to-end pipeline validation when requested:
  - `npm run fonts:setup`
  - `npm run fonts:download`
  - `npm run fonts:convert`
  - `npm run fonts:verify`
