import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Package Vite's output into a file that opens directly, without a web server.
const output = path.resolve('dist');
let html = await readFile(path.join(output, 'index.html'), 'utf8');
const script = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/);
const style = html.match(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (!script || !style) throw new Error('Expected one Vite JavaScript and CSS bundle.');
const assetPath = url => path.join(output, url.replace(/^\//, ''));
const js = await readFile(assetPath(script[1]), 'utf8');
const css = await readFile(assetPath(style[1]), 'utf8');
html = html.replace(script[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(style[0], () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
await writeFile(path.join(output, 'Short.html'), html);
console.log('Created dist/Short.html — double-click to open Short.');
