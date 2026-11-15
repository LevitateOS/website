# Contributing to the LevitateOS website

## Setup

```bash
git clone https://github.com/LevitateOS/website.git
cd website
bun install
bun run dev
```

## Changing the site

The repository has one branch, `main`. Make the change, then run:

```bash
bun run typecheck
bun run build
```

Commit with a short plain sentence that says what changed, and push to `main`.

## Wording

Page text lives in the content package (`docs/content` in the LevitateOS checkout), not here. Three rules apply to every page:

- LevitateOS and AcornOS are independent operating systems. Their userlands are built from Fedora and Alpine packages. Never write "based on".
- An A/B install has two roots. The booted root is locked and the other root is unlocked. recab makes the other root a copy of the booted root and chooses which root starts at the next boot.
- Software comes through Recipe. Do not name another package manager or app store as an option.

## Code style

- TypeScript.
- Follow the patterns already in the code.
- Keep components small and single-purpose.

## Questions

Open an issue on the main [LevitateOS repository](https://github.com/LevitateOS/LevitateOS).
