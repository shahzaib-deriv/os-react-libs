# React Libraries Bundle

This project bundles popular React libraries into a single UMD/ESM package that can be easily included in any web project. It exposes these libraries through the global `window.ReactLibs` object.

## Included Libraries

- **ReactHotToast**: Toast notifications for React
- **NovuReact**: Inbox component from the Novu notification center
- **NovuSessionInterceptor**: Session management for Novu API calls

## Usage

Include the bundled script in your HTML:

```html
<script src="./dist/react-libs.umd.js"></script>
```

Then use the libraries through the global `window.ReactLibs` object:

```javascript
// Using React Hot Toast
window.ReactLibs.ReactHotToast.toast.success('Success!');

// Using Novu Inbox
window.ReactLibs.NovuReact.renderInbox(document.getElementById('inbox-container'));

// Using NovuSessionInterceptor
window.ReactLibs.NovuSessionInterceptor.initialize({ ttl: 3600000 });
```

## Development

### Installation

```bash
npm install
```

### Building

```bash
npm run build
```

This will create the bundled files in the `dist` directory.

### Testing

The project includes API consistency tests to ensure that the exposed APIs remain consistent across changes. These tests verify the presence of all expected objects, methods, and properties.

To run the tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

To run a complete API consistency check (build + test):

```bash
npm run check-api
```

This is useful for CI/CD pipelines to ensure API consistency before deployment.

See the [tests/README.md](tests/README.md) file for more information about the tests.

### Demo

Open `test.html` in a browser to see a demo of the bundled libraries.

## API Consistency

When making changes to the codebase, it's important to maintain API consistency. The test suite will help ensure that all expected APIs are available and functioning correctly.

If you need to modify the API:

1. Update the tests to reflect the changes
2. Run the tests to ensure all APIs remain consistent
3. Update the documentation if necessary

## License

MIT
