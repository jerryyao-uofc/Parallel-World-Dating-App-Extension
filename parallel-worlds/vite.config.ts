import { createReadStream, existsSync, statSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const datingRoot = join(import.meta.dirname, '../dating');
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.mp4': 'video/mp4',
};

function byteRange(header: string, size: number) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header.trim());
  if (!match) return null;
  const startText = match[1];
  const endText = match[2];
  if (!startText && !endText) return null;
  if (!startText) {
    const suffix = Number(endText);
    if (!Number.isFinite(suffix) || suffix <= 0) return null;
    return { start: Math.max(0, size - suffix), end: size - 1 };
  }
  const start = Number(startText);
  const end = endText ? Number(endText) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= size || end < start) return null;
  return { start, end: Math.min(end, size - 1) };
}

function sendFile(req: IncomingMessage, res: ServerResponse, filePath: string, type: string) {
  const size = statSync(filePath).size;
  const rangeHeader = Array.isArray(req.headers.range) ? req.headers.range[0] : req.headers.range;
  res.setHeader('Content-Type', type);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'no-store');
  if (rangeHeader) {
    const range = byteRange(rangeHeader, size);
    if (!range) {
      res.statusCode = 416;
      res.setHeader('Content-Range', `bytes */${size}`);
      res.end();
      return;
    }
    res.statusCode = 206;
    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${size}`);
    res.setHeader('Content-Length', String(range.end - range.start + 1));
    createReadStream(filePath, { start: range.start, end: range.end }).on('error', () => res.end()).pipe(res);
    return;
  }
  res.setHeader('Content-Length', String(size));
  createReadStream(filePath).on('error', () => res.end()).pipe(res);
}

function emberStatic(): Plugin {
  return {
    name: 'ember-static',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = (req.url ?? '/').split('?')[0];
        if (
          raw.startsWith('/practice') ||
          raw.startsWith('/api') ||
          raw.startsWith('/@') ||
          raw.startsWith('/src') ||
          raw.startsWith('/node_modules')
        ) return next();
        let decoded = raw;
        try { decoded = decodeURIComponent(raw); } catch { res.statusCode = 400; res.end(); return; }
        const parts = decoded.split('/');
        if (decoded.includes('\0') || parts.some((part) => part === '..' || part.startsWith('.') || part === 'boson_api_key')) {
          res.statusCode = 404;
          res.end();
          return;
        }
        const rel = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
        const filePath = normalize(join(datingRoot, rel));
        if (filePath !== datingRoot && !filePath.startsWith(datingRoot + sep)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        const ext = extname(filePath).toLowerCase();
        if (!existsSync(filePath) || !statSync(filePath).isFile() || !types[ext]) return next();
        sendFile(req, res, filePath, types[ext]);
      });
    },
  };
}

export default defineConfig({
  base: '/practice/',
  plugins: [react(), emberStatic()],
  server: {
    host: '127.0.0.1',
    allowedHosts: ['.trycloudflare.com'],
    proxy: { '/api': 'http://127.0.0.1:3000' },
  },
});
