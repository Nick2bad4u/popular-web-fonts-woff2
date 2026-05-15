---
name: "Codex-Instructions-Popular-Web-Fonts-WOFF2"
description: "Project-wide guidance for the popular-web-fonts-woff2 CLI, scripts, assets, and tests."
applyTo: "**"
---

# Project Guide

## Scope and goals

- This repository is a Node.js + TypeScript CLI pipeline for downloading popular web fonts and converting TTF/OTF sources into WOFF2 assets.
- Prioritize correctness, reproducibility, and cross-platform behavior (Windows + Linux + macOS).
- Keep changes aligned with current repository behavior unless the task explicitly requests behavior changes.

## Source of truth

- Treat `src/` and `scripts/` as source.
- Do not hand-edit `dist/` outputs.
- Do not edit generated/font payloads unless the task explicitly asks to regenerate or update them.

## Runtime and style constraints

- Node version target is `>=22.18.0`.
- Use ESM only (`import`/`export`).
- Keep TypeScript strict and avoid `any`.
- Prefer async filesystem APIs for runtime code where practical.
- Preserve existing CLI contracts:
  - mode/flags semantics
  - confirm/dry-run behavior
  - documented exit codes and JSON/text output shape

## Verification expectations

- Default validation after meaningful code changes:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
- For release-readiness checks, prefer:
  - `npm run release:check`
- For full local asset pipeline verification (when requested):
  - `npm run fonts:local`

## Safety and performance

- Avoid introducing expensive filesystem rescans, unstable sorting, or nondeterministic output.
- Keep script output actionable and explicit on failures.
- Avoid network-heavy or large file regeneration work unless requested.
