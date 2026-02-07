
import fs from 'fs';
import path from 'path';

const imgeDir = path.join(process.cwd(), 'imge');
const destDir = path.join(process.cwd(), 'public', 'images');
const destFile = path.join(destDir, 'hero-bg.png');

console.log('--- Debugging Copy Process ---');

if (!fs.existsSync(imgeDir)) {
    console.error(`Source directory not found: ${imgeDir}`);
    process.exit(1);
}

const files = fs.readdirSync(imgeDir);
console.log(`Files in ${imgeDir}:`, files);

if (files.length === 0) {
    console.error('No files found in source directory.');
    process.exit(1);
}

// Find the likely background image file
const bgFile = files.find(f => f.startsWith('backgroud'));

if (!bgFile) {
    console.error('Could not find file starting with "backgroud" in source directory.');
    process.exit(1);
}

const srcPath = path.join(imgeDir, bgFile);
console.log(`Found source file: ${srcPath}`);

if (!fs.existsSync(destDir)) {
    console.log(`Creating destination directory: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
}

try {
    fs.copyFileSync(srcPath, destFile);
    console.log(`Successfully copied ${srcPath} to ${destFile}`);
} catch (err) {
    console.error('Copy failed:', err);
}

const destFiles = fs.readdirSync(destDir);
console.log(`Files in ${destDir}:`, destFiles);
console.log('--- End Debug ---');
