# Fix: Images Not Loading After Upload (Standalone Mode Issue)

## Problem
When uploading images through the admin panel, they don't load until the Docker container is restarted.

## Root Cause
Next.js standalone mode caches the `public` folder at build time. Newly uploaded files aren't detected without a restart.

## Solution
Created a dynamic file serving API route that bypasses Next.js static caching.

### Changes Made

1. **Created API Route**: `src/app/api/uploads/[...path]/route.ts`
   - Serves files directly from `public/uploads/` 
   - Reads files dynamically from filesystem
   - Returns proper Content-Type headers
   - Sets cache headers for performance

2. **Updated Next.js Config**: `next.config.ts`
   - Added rewrites rule to route `/uploads/*` to `/api/uploads/*`
   - This makes all upload URLs go through the API route
   - Existing URLs keep working (backward compatible)

## Deployment Steps

```bash
# 1. On local machine - commit changes
git add .
git commit -m "Fix image serving in standalone mode with dynamic API route"
git push origin main

# 2. On VPS - pull and rebuild
ssh root@72.62.227.160
cd /var/www/Chowdhry-Law-Chambers
git pull origin main

# 3. Rebuild Docker container (required for next.config changes)
docker compose down
docker compose up -d --build

# 4. Monitor logs
docker compose logs -f app

# Wait for "Ready on http://0.0.0.0:3000"
```

## Testing

After deployment:

1. **Upload a new image** through admin panel
2. **Verify it loads immediately** without restart
3. **Check existing images** still work (Sarvesh, logo, etc.)

## How It Works

**Before:**
```
Browser → /uploads/image.jpg → Next.js static cache → ❌ File not found (until restart)
```

**After:**
```
Browser → /uploads/image.jpg → Rewrite to /api/uploads/image.jpg → API reads file → ✅ File served
```

## Benefits

- ✅ No server restart needed after upload
- ✅ Works with Docker volumes
- ✅ Backward compatible with existing URLs
- ✅ Proper caching headers for performance
- ✅ Supports all image formats (.jpg, .png, .webp, etc.)
