import fs from 'fs'
import path from 'path'

const from = path.join('dist/assets/remoteEntry.js')
const to = path.join('dist/remoteEntry.js')

if (fs.existsSync(from)) {
  fs.copyFileSync(from, to)
  console.log('✅ remoteEntry.js moved to dist/')
} else {
  console.error('❌ remoteEntry.js not found in dist/assets/')
}
