# Copilot instructions

## Commands

- Start the Vite development server: `npm run dev`
- Create a production build: `npm run build`
- Lint the project: `npm run lint`
- Run the Vitest suite: `npm test`
- Run one test file: `npm test -- <path-to-test-file>`
- Run tests matching a name: `npm test -- -t "<test name>"`

Vitest is configured in `vite.config.js` to use jsdom and references `tests/setup.js`. There are currently no test files in the repository.

## Architecture

This is a client-rendered React 19 app built with Vite. `src/main.jsx` mounts `App` and loads Bootstrap; `src/App.jsx` provides the shared header/footer shell and owns the dark-mode preference, persisting it in `localStorage` and applying the `data-theme` attribute.

The main content flow is `Home` → `ThreadList` → `ThreadPage` → comment components. `Home` loads threads through `src/services/threadService.js`; selecting a thread switches to its detail view, which loads comments through `src/services/commentService.js`. These services currently read from `data/dummyData.js`; author names are resolved through `src/services/userService.js`. Keep data access behind the service modules when extending this mock-data flow.

## Codebase conventions

- Keep page-level views in `src/pages/` and reusable UI in `src/components/`, grouped by feature. Component-specific styles live beside their component; global styles and theme variables are in `src/index.css` and `src/App.css`.
- Prefer React-Bootstrap components (`Card`, `Button`, `Form`, `Container`, `Row`, `Col`) and Bootstrap utility classes for layout and spacing. Use local CSS for project-specific presentation, and preserve responsive behavior and accessible labels when extending controls.
- The UI reads IDs and relationships from the mock data: records use `_id`, threads refer to authors by ID, and comments associate to threads via `thread`. Preserve those shapes when changing the services or fixtures.
- Current authentication, voting, and comment submission handlers are UI placeholders; follow the existing service boundary rather than treating alerts or console messages as persisted behavior.

#### Styling
1. React-Bootstrap components over raw HTML:
   - Card instead of div wrappers
   - Button instead of button
   - Badge instead of span with badge classes
   - Form components instead of raw inputs
   - Container / Row / Col for layout

2. Prefer Bootstrap utility classes over custom CSS:
   - Spacing: m-*, p-*, gap-*, mb-*, mt-*
   - Layout: d-flex, justify-content-*, align-items-*
   - Typography: fw-bold, text-muted, small
   - Borders: border, rounded, shadow-sm
   - Backgrounds: bg-light, bg-body-tertiary

3. Do NOT:
   - Invent unnecessary custom CSS classes
   - Use inline styles unless unavoidable
   - Add unnecessary wrapper divs
   - Over-nest layout structures

4. Maintain:
   - Responsiveness
   - Proper spacing rhythm (prefer gap-2, gap-3, mb-3)
   - Clear visual hierarchy and semantic structure
   - Accessibility (aria-label, proper button types)
   - Consistent theming with Bootstrap variables and classes
   - Avoid conflicting custom styles that override Bootstrap defaults unless absolutely necessary