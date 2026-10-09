import { createReadStream, promises as fs } from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { cases } from '@/lib/cases';

/**
 * Streams case-study videos with HTTP Range support.
 *
 * Why not plain /public/*.mp4: on production the Traefik proxy gzips video responses and
 * Cloudflare caches that gzipped copy by file extension. A gzipped cached object cannot be
 * served in byte ranges, and iOS Safari only plays video served with 206 Partial Content,
 * so the animation froze after the first chunk. This URL has no file extension (Cloudflare
 * does not cache it and forwards the Range header) and range requests are not compressed
 * by the proxy.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FILES: Record<string, { name: string; type: string }> = {
  'desktop-mp4': { name: 'desktop.mp4', type: 'video/mp4' },
  'mobile-mp4': { name: 'mobile.mp4', type: 'video/mp4' },
  'desktop-webm': { name: 'desktop.webm', type: 'video/webm' },
  'mobile-webm': { name: 'mobile.webm', type: 'video/webm' },
};

const BASE_HEADERS = {
  'Accept-Ranges': 'bytes',
  'Cache-Control': 'public, max-age=86400, no-transform',
  'X-Content-Type-Options': 'nosniff',
};

export async function GET(request: Request, { params }: { params: { slug: string; file: string } }) {
  const file = FILES[params.file];
  if (!file || !cases.some((c) => c.slug === params.slug && c.video)) {
    return new Response('Not found', { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', 'cases', params.slug, file.name);
  let size: number;
  try {
    size = (await fs.stat(filePath)).size;
  } catch {
    return new Response('Not found', { status: 404 });
  }

  const range = request.headers.get('range');
  if (!range) {
    const body = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
    return new Response(body, {
      status: 200,
      headers: { ...BASE_HEADERS, 'Content-Type': file.type, 'Content-Length': String(size) },
    });
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  let start = match && match[1] !== '' ? Number(match[1]) : NaN;
  let end = match && match[2] !== '' ? Number(match[2]) : size - 1;
  if (match && match[1] === '' && match[2] !== '') {
    // suffix range: last N bytes
    start = Math.max(size - Number(match[2]), 0);
    end = size - 1;
  }
  if (!match || Number.isNaN(start) || start > end || start >= size) {
    return new Response(null, { status: 416, headers: { ...BASE_HEADERS, 'Content-Range': `bytes */${size}` } });
  }
  end = Math.min(end, size - 1);

  const body = Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream;
  return new Response(body, {
    status: 206,
    headers: {
      ...BASE_HEADERS,
      'Content-Type': file.type,
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${size}`,
    },
  });
}

