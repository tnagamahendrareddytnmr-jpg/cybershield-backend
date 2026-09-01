import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendServer = path.join(__dirname, 'cybershield-backend', 'server.js');

const child = spawn(process.execPath, [backendServer], {
  cwd: __dirname,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT || '5000'
  }
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});
