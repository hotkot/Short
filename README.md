# Short

A calm, browser-based word processor. Built with JavaScript, CSS, and Vite.

## Develop

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev -- --port 5173
```

## Verify

```sh
npm run build
# With the development server running:
npm test
```

The browser smoke test uses Playwright with `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another Chromium executable if needed, and `SHORT_TEST_URL` to test another server. Tests run in an isolated browser profile and do not change your documents.

## Features

- Create, rename, search, star, duplicate, and delete documents.
- Rich text: headings, fonts, color, bold, italic, underline, alignment, bullet lists, links, and uploaded images.
- Automatic local saving, word counts, reading time, and zoom.
- Export formatted HTML or plain text; print or save as PDF using your browser.
- Responsive workspace with a collapsible document sidebar.

Documents are stored in this browser’s local storage, with no account or server. Export important work before clearing browser data. Storage capacity is limited; images are limited to 2 MB each, and saving errors are surfaced. This first version does not support DOCX import/export, collaboration, cloud sync, or automatic page breaks. Pasted content is inserted as plain text.
