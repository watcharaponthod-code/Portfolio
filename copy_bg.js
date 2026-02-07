
import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'imge', 'backgroud');
const dest = path.join(process.cwd(), 'public', 'images', 'hero-bg.png');

console.log(`Copying ${src} to ${dest}`);

if (!fs.existsSync(src)) {
    console.error(`Source file not found: ${src}`);
    process.exit(1);
}

const destDir = path.dirname(dest);
if (!fs.existsSync(destDir)) {
    console.log(`Creating directory: ${destDir}`);
    fs.mkdirSync(destDir, { recursive: true });
}

try {
    fs.copyFileSync(src, dest);
    console.log('Copy successful!');
} catch (err) {
    console.error('Copy failed:', err);
    process.exit(1);
}
