import * as esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgrPlugin from 'esbuild-plugin-svgr';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: [path.resolve(__dirname, '..', 'src/index.tsx')],

  outdir: path.resolve(__dirname, '..', 'dist'),

  bundle: true,
  format: 'esm',
  splitting: true,
  platform: 'browser',
  target: ['es2022'],

  jsx: 'automatic',

  sourcemap: !isProd,
  minify: isProd,

  entryNames: 'static/js/[name]-[hash]',
  chunkNames: 'static/js/[name]-[hash]',
  assetNames: 'static/assets/[name]-[hash]',

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

  // alias: {
  //   app: path.resolve(__dirname, 'src/app'),
  //   pages: path.resolve(__dirname, 'src/pages'),
  //   widgets: path.resolve(__dirname, 'src/widgets'),
  //   features: path.resolve(__dirname, 'src/features'),
  //   entities: path.resolve(__dirname, 'src/entities'),
  //   shared: path.resolve(__dirname, 'src/shared'),
  // },

  define: {
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
  },

  publicPath: '/',
  logLevel: 'info',
});

if (isWatch) {
  await ctx.watch();

  await ctx.serve({
    servedir: 'dist',
    port: 3000,
  });

  console.log('🚀 http://localhost:3000');
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
