const fs = require('fs')
const path = require('path')

// Remove tests directory
const testsDir = path.join(__dirname, '..', 'tests')
if (fs.existsSync(testsDir)) {
  fs.rmSync(testsDir, { recursive: true, force: true })
  console.log('Deleted tests directory')
} else {
  console.log('No tests directory found')
}

// Remove scripts/clean-tests.js (self)
const self = __filename
fs.unlinkSync(self)
console.log('Removed clean script')

// NOTE: This script does not automatically edit package.json to remove devDeps.
// After running, you may want to manually remove test deps from package.json and run `npm prune` or reinstall.
