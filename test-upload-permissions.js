// Quick test script for upload functionality
// Run: node test-upload-permissions.js

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'public/uploads');

console.log('Testing upload directory permissions...\n');
console.log('Upload directory path:', uploadDir);
console.log('Directory exists:', fs.existsSync(uploadDir));

if (fs.existsSync(uploadDir)) {
    try {
        // Try writing a test file
        const testFile = path.join(uploadDir, 'test.txt');
        fs.writeFileSync(testFile, 'test');
        console.log('✅ Write permission: OK');

        // Clean up
        fs.unlinkSync(testFile);
        console.log('✅ Delete permission: OK');
    } catch (error) {
        console.error('❌ Permission error:', error.message);
    }
} else {
    console.log('⚠️  Directory does not exist. It should be created automatically by the API.');
}

console.log('\n--- Environment Variables ---');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '❌ Not set');
