import * as esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import svgrPlugin from 'esbuild-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const srcEntry = path.resolve(root, 'src/index.tsx');
const publicHtml = path.resolve(root, 'public/index.html');
const distDir = path.resolve(root, 'dist');
const distHtml = path.resolve(distDir, 'index.html');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const result = await esbuild.build({
  entryPoints: [srcEntry],
  outdir: distDir,
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'esm',
  splitting: true,
  target: ['es2022'],
  jsx: 'automatic',
  entryNames: 'static/[name]-[hash]',
  chunkNames: 'static/chunks/[name]-[hash]',
  assetNames: 'static/assets/[name]-[hash]',
  metafile: true,
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.webp': 'file',

    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',

    '.css': 'css',
  },
  plugins: [svgrPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.API_URL': JSON.stringify(process.env.API_URL ?? ''),
  },

  alias: {
    app: path.resolve(root, 'src/app'),
    pages: path.resolve(root, 'src/pages'),
    widgets: path.resolve(root, 'src/widgets'),
    features: path.resolve(root, 'src/features'),
    entities: path.resolve(root, 'src/entities'),
    shared: path.resolve(root, 'src/shared'),
  },
});

const outputs = result.metafile.outputs;

let jsFile = '';
let cssFile = '';

for (const filePath of Object.keys(outputs)) {
  if (outputs[filePath].entryPoint && filePath.endsWith('.js')) {
    jsFile = filePath.replace(/^dist[\\/]/, '');
  }

  if (outputs[filePath].entryPoint && filePath.endsWith('.css')) {
    cssFile = filePath.replace(/^dist[\\/]/, '');
  }
}

let html = fs.readFileSync(publicHtml, 'utf-8');

if (cssFile) {
  html = html.replace('</head>', `  <link rel="stylesheet" href="/${cssFile}" />\n</head>`);
}

html = html.replace('</body>', `  <script type="module" src="/${jsFile}"></script>\n</body>`);

fs.writeFileSync(distHtml, html);

console.log('Production build complete');
