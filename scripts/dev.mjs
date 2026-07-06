import net from 'node:net';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 2026;
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const tester = net
            .createServer()
            .once('error', () => resolve(false))
            .once('listening', () => tester.close(() => resolve(true)))
            .listen(port, '127.0.0.1');
    });
}

const available = await isPortAvailable(PORT);

if (!available) {
    console.error(`\nPort ${PORT} is already in use.`);
    console.error(`Close the other process using that port, then run npm run dev again.\n`);
    process.exit(1);
}

console.log(`\nPort ${PORT} is available.`);
console.log(`Starting dev server at http://localhost:${PORT}/\n`);

const astroBin = path.join(root, 'node_modules', 'astro', 'astro.js');
const child = spawn(process.execPath, [astroBin, 'dev', '--port', String(PORT), '--strictPort'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 0));
