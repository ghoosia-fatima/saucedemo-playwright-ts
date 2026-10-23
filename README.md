# SauceDemo UI Automation (Playwright + TypeScript)

Personal project: a small, simple UI test suite for [SauceDemo](https://www.saucedemo.com), a public demo shop made for practising test automation.

Built with Playwright, TypeScript and the Page Object Model. Each area has a couple of working tests plus `TODO (you)` comments listing the tests still to write.

## Structure

```
src/
  pages/   page objects (locators + actions)
  data/    test data
tests/     one spec file per feature: login, inventory, cart, checkout
```

## Run it

```bash
npm install
npx playwright install chromium
npm test
npm run report   # open the HTML report
```

Other commands: `npm run test:headed`, `npm run test:ui`, `npm run typecheck`.

## How to add a test

1. Add any missing locator or action to the page object in `src/pages`.
2. Write the test in the matching file in `tests/`, next to the `TODO (you)` hint.
3. Keep it short: arrange, act, assert.

## Test status

Not recorded yet. Update this section after your first full local run.
