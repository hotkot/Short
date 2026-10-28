# Short

A calm, browser-based word processor. Built with JavaScript, CSS, and Vite.

## Build and open without a terminal

1. Open [Build Short in GitHub Actions](https://github.com/hotkot/Short/actions/workflows/build.yml).
2. Click **Run workflow**, select **main**, and click **Run workflow** again. Builds also run automatically whenever changes reach `main`.
3. Open the completed run. Under **Artifacts**, download **Short** (GitHub sign-in is required).
4. Extract the ZIP and double-click **Short.html**. It opens directly in your browser, with no installation or server.

Downloads remain available for 90 days; run the workflow again whenever you need a fresh copy. GitHub Actions must be enabled for this repository.

The build also produces the usual `dist` website for web hosting. The standalone file works offline. Documents stay in the browser, not inside the downloaded HTML file. Export important documents before replacing or moving `Short.html`, because storage for local files varies between browsers and locations. Downloads do not include documents you wrote in another browser or hosted copy.

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
