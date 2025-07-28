import { renameSync, existsSync } from 'fs';
import { readdirSync } from 'fs';
import path from 'path';

const assetsDir = path.join('dist', 'assets');
const files = readdirSync(assetsDir);
const remoteEntry = files.find(file => file.startsWith('remoteEntry') && file.endsWith('.js'));

if (remoteEntry) {
  const from = path.join(assetsDir, remoteEntry);
  const to = path.join('dist', 'remoteEntry.js');
  renameSync(from, to);
  console.log('remoteEntry.js moved to dist/');
} else {
  console.error('remoteEntry.js not found in dist/assets');
}
