---
name: fix
description: "Use when fixing lint errors, formatting issues, or validating changes before committing."
---

# Fix Lint and Formatting

## Instructions

1.  Run `npm run lint:changed` to lint staged JavaScript files.
2.  Run `npm run format:changed` to format staged files with Prettier.
3.  Fix the reported issues in the affected files.
4.  Run `npm run lint:changed` and `npm run format:changed` again to verify the fixes.
5.  Run `npm run build` to confirm the project still builds.
6.  Report any remaining manual fixes needed.

## Common Mistakes

- **Ignoring lint errors** - These can fail CI; fix them before committing.
- **Skipping the build check** - Lint passing does not guarantee that the Vite build succeeds.
