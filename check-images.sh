#!/bin/bash
# Debug script for VPS - Check gallery images
# Run this on your VPS: bash check-images.sh

echo "=== Checking Gallery Images ==="
echo ""

echo "1. Files in public/uploads:"
ls -lah public/uploads/ 2>/dev/null || echo "Directory doesn't exist!"
echo ""

echo "2. Docker container uploads (if using Docker):"
docker exec law-firm-web ls -lah /app/public/uploads/ 2>/dev/null || echo "Container not found or path doesn't exist"
echo ""

echo "3. Checking MongoDB for image URLs:"
echo "You'll need to manually query MongoDB to see what URLs are stored."
echo "Connect to MongoDB Atlas and run:"
echo "  db.galleries.find({}, {title: 1, url: 1})"
echo ""

echo "4. File permissions check:"
ls -la public/ 2>/dev/null | grep uploads
echo ""

echo "=== Recommendations ==="
echo "- If files are missing: Re-upload those images"
echo "- If permissions wrong: Run 'chmod 755 public/uploads'"
echo "- If container path wrong: Check docker-compose volume mount"
