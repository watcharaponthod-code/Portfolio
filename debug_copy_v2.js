
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'copy_status.txt');
const log = (msg) => {
    fs.appendFileSync(logFile, msg + '\n');
};

try {
    fs.writeFileSync(logFile, 'Starting copy process...\n');

    const imgeDir = path.join(process.cwd(), 'imge');
    const destDir = path.join(process.cwd(), 'public', 'images');
    const destFile = path.join(destDir, 'hero-bg.png');

    if (!fs.existsSync(imgeDir)) {
        log(`ERROR: Source directory not found: ${imgeDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(imgeDir);
    log(`Files in imge: ${JSON.stringify(files)}`);

    const bgFile = files.find(f => f.startsWith('backgroud'));

    if (!bgFile) {
        log('ERROR: Could not find file starting with "backgroud"');
        process.exit(1);
    }

    const srcPath = path.join(imgeDir, bgFile);

    if (!fs.existsSync(destDir)) {
        log(`Creating directory: ${destDir}`);
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(srcPath, destFile);
    log(`SUCCESS: Copied ${bgFile} to ${destFile}`);

    const newFiles = fs.readdirSync(destDir);
    log(`Files in public/images: ${JSON.stringify(newFiles)}`);

} catch (err) {
    log(`CRITICAL ERROR: ${err.message}`);
}
