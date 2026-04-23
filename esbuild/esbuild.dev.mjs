import * as esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import svgrPlugin from 'esbuild-plugin-svgr';
import open from 'open';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicHtml = path.resolve(__dirname, 'public/index.html');
const distHtml = path.resolve(__dirname, 'dist/index.html');

const ctx = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  entryNames: 'static/[name]',
  chunkNames: 'static/[name]-[hash]',
  assetNames: 'static/assets/[name]-[hash]',
  format: 'esm',
  bundle: true,
  outdir: 'dist',
  sourcemap: true,
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
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
  },
});

fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync(path.resolve('public/index.html'), path.resolve('dist/index.html'));

await ctx.watch();

const { port } = await ctx.serve({
  servedir: 'dist',
  port: 3000,
});

await open(`http://localhost:${port}`);
