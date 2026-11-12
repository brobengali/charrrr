const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port resolution: CLI argument (e.g. `node server.js 8080` or `--port 8080`) > PORT env var > default 8080
function getPort() {
  const args = process.argv.slice(2);
  const portFlagIdx = args.findIndex(arg => arg === '--port' || arg === '-p');
  if (portFlagIdx !== -1 && args[portFlagIdx + 1]) {
    return parseInt(args[portFlagIdx + 1], 10);
  }
  const numericArg = args.find(arg => /^\d+$/.test(arg));
  if (numericArg) {
    return parseInt(numericArg, 10);
  }
  if (process.env.PORT) {
    return parseInt(process.env.PORT, 10);
  }
  return 8080;
}

const PORT = getPort();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.vrm': 'model/gltf-binary',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Redirect /signin to / since sign in is removed and full access is open
  if (pathname === '/signin' || pathname === '/signin/' || pathname === '/welcome' || pathname === '/welcome/') {
    res.writeHead(302, { 'Location': '/' });
    res.end();
    return;
  }

  // Handle API mock endpoints for local/offline resilience
  if (pathname === '/api/onboarding' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, data: { ok: true } }));
    });
    return;
  }

  if (pathname === '/api/account/delete' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, data: { ok: true } }));
    return;
  }

  if (pathname === '/api/livekit/token') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, data: { reason: 'voice_not_configured' } }));
    return;
  }

  // Resolve file path
  let filePath = path.join(__dirname, pathname);

  // Check if direct file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return serveFile(filePath, res);
  }

  // If path is a directory or path without extension, check for index.html or route.html
  if (fs.existsSync(path.join(filePath, 'index.html'))) {
    return serveFile(path.join(filePath, 'index.html'), res);
  }

  if (fs.existsSync(filePath + '.html')) {
    return serveFile(filePath + '.html', res);
  }

  // Dynamic route matches
  if (pathname.startsWith('/hall/')) {
    const hallId = pathname.replace('/hall/', '').replace(/\/$/, '');
    const specificHall = path.join(__dirname, 'hall', hallId, 'index.html');
    if (fs.existsSync(specificHall)) {
      return serveFile(specificHall, res);
    }
    return serveFile(path.join(__dirname, 'hall', 'main-reading', 'index.html'), res);
  }

  if (pathname.startsWith('/n/')) {
    if (fs.existsSync(path.join(__dirname, 'note_token.html'))) {
      return serveFile(path.join(__dirname, 'note_token.html'), res);
    }
  }

  // 404 fallback to index.html
  if (fs.existsSync(path.join(__dirname, 'index.html'))) {
    return serveFile(path.join(__dirname, 'index.html'), res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`\n  Hush Hall · a quiet virtual library`);
  console.log(`  > Local:   http://localhost:${PORT}/\n`);
});

