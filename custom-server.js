// Custom server.js for Next.js standalone with proper static file serving
// This file should replace the default server.js in standalone mode
// Place this in the root directory

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

// Build app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            // Serve static files from /uploads
            if (pathname.startsWith('/uploads/')) {
                const filePath = path.join(__dirname, 'public', pathname);

                if (fs.existsSync(filePath)) {
                    const stat = fs.statSync(filePath);

                    if (stat.isFile()) {
                        const ext = path.extname(filePath).toLowerCase();
                        const contentType = {
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg',
                            '.png': 'image/png',
                            '.gif': 'image/gif',
                            '.webp': 'image/webp',
                            '.svg': 'image/svg+xml'
                        }[ext] || 'application/octet-stream';

                        res.writeHead(200, {
                            'Content-Type': contentType,
                            'Content-Length': stat.size,
                            'Cache-Control': 'public, max-age=31536000, immutable'
                        });

                        const fileStream = fs.createReadStream(filePath);
                        fileStream.pipe(res);
                        return;
                    }
                }

                // File not found
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }

            // Handle everything else with Next.js
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    })
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
