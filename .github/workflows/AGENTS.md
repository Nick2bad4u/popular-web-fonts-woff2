---
name: "Popular-Web-Fonts-WOFF2-Workflows"
description: "Repository-specific guidance for GitHub Actions workflows."
applyTo: ".github/workflows/*.yml"
---

# Workflow Guide

## CI goals

- Keep workflows focused on reproducible verification for this package:
  - install
  - lint
  - typecheck
  - test
- Keep release checks aligned with local scripts and package constraints.

## Node and package manager

- Use Node from repository version files (`.node-version` / `.nvmrc`).
- Use npm with lockfile-based installs (`npm ci` in CI).
- Prefer explicit script entrypoints from `package.json` over ad-hoc shell logic.

## Recommended verification flow

- Baseline quality gates:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
- For release validation jobs, prefer:
  - `npm run release:check`

## Security and maintainability

- Keep `GITHUB_TOKEN` permissions minimal.
- Pin external actions to stable versions according to repository policy.
- Cache npm dependencies through `actions/setup-node` where appropriate.
- Avoid workflows that mutate repository content unless explicitly intended.

## Performance

- Parallelize independent jobs (lint/typecheck/test) when useful.
- Keep artifact uploads minimal and relevant.
- Avoid running heavy font download/conversion jobs on every PR unless required.
