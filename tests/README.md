# API Consistency Tests

This directory contains tests to ensure that the exposed APIs remain consistent across changes. These tests verify the presence of all expected objects, methods, and properties in the window.ReactLibs object.

## What These Tests Verify

The tests check for:

1. **Presence of all expected objects in window.ReactLibs**
   - ReactHotToast
   - NovuReact
   - NovuSessionInterceptor

2. **ReactHotToast API**
   - Existence of window.ReactHotToast
   - Presence of all expected methods (success, error, loading, etc.)
   - Presence of all expected properties in window.ReactLibs.ReactHotToast

3. **NovuReact API**
   - Existence of window.NovuReact
   - Presence of all expected methods and components (Inbox, renderInbox, clearInbox)
   - Absence of removed properties (NovuProvider, Notifications, etc.)

4. **NovuSessionInterceptor API**
   - Existence of window.NovuSessionInterceptor
   - Presence of all expected methods (initialize, getSessionData, etc.)

## Running the Tests

To run the tests, use the following commands:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

This will execute all tests in the `tests` directory.

## Adding New Tests

When adding new functionality or modifying existing APIs, make sure to:

1. Update the tests to reflect the changes
2. Run the tests to ensure all APIs remain consistent
3. If removing functionality, add tests to verify the removal

## Test Structure

- `setup.js`: Sets up the testing environment with Vitest
- `api-consistency.test.js`: Contains the API consistency tests

## Technology

These tests use:
- **Vitest**: A Vite-native testing framework
- **JSDOM**: For simulating a browser environment
- **Testing Library**: For additional testing utilities

## Best Practices

- Always run tests before and after making changes to the API
- Keep the tests up to date with the current API
- Use these tests as documentation for the expected API structure
