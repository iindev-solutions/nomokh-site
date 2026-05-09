# AGENTS.md — Vault-First Project

> Build with discipline. Record project truth in `vault/`.

## Hard Rule

`vault/` is the source of truth for agents and maintainers.

## Session Start

Read first:

1. `vault/QUICK_START.md`

Read deep docs only when task needs them:

- `vault/CODE_MAP.md`
- `vault/wiki/architecture/*`
- `vault/wiki/services/*`

## Session End

Before closing meaningful work, update terse:

1. `vault/logs/changelog.md`
2. `vault/QUICK_START.md` if current state or next tasks changed

Update deep docs only when their facts changed.

## Vault Language

All content inside `vault/` must be written in English.

## Project Boundary

Record product/legal/security boundaries in `vault/wiki/architecture/product.md` and enforce them in code reviews.

## Token Rule

Keep vault updates compact. No duplicate long explanations. Prefer short bullets.
