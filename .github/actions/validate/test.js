// Simple test file to validate the validateDateVer function
// Run with: node test.js

// Mock @actions/core since we're testing locally
const core = {
  info: (msg) => console.log('INFO:', msg),
  setFailed: (msg) => console.error('FAIL:', msg),
  getInput: () => null // Not used in tests
};

// Load the validation function by requiring the index file and extracting the function
const fs = require('fs');
const indexContent = fs.readFileSync('./index.js', 'utf8');

// Extract and eval the validateDateVer function
const funcMatch = indexContent.match(/function validateDateVer[\s\S]*?^}/m);
if (!funcMatch) {
  console.error('Could not extract validateDateVer function');
  process.exit(1);
}
eval(funcMatch[0]);

// Test cases
const tests = [
  // Valid versions
  { version: '2025', expected: true, desc: 'Year only' },
  { version: '202511', expected: true, desc: 'Year-month' },
  { version: '20251116', expected: true, desc: 'Year-month-day' },
  { version: '2025.11.16', expected: true, desc: 'With dots' },
  { version: '2025-11-16', expected: true, desc: 'With hyphens' },
  { version: '2025/11/16', expected: true, desc: 'With slashes' },
  { version: '20251116.1', expected: true, desc: 'With sequence number' },
  { version: '20251116.alpha', expected: true, desc: 'With pre-release' },
  { version: '20251116.alpha.1', expected: true, desc: 'With pre-release and number' },
  { version: '2025-11-16-rc-2', expected: true, desc: 'With hyphens throughout' },

  // Invalid versions
  { version: '2025.11-16', expected: false, desc: 'Mixed separators' },
  { version: '20251301', expected: false, desc: 'Invalid month (13)' },
  { version: '20250231', expected: false, desc: 'Invalid day (Feb 31)' },
  { version: '20251116.01', expected: false, desc: 'Leading zero in identifier' },
  { version: '20251116..1', expected: false, desc: 'Empty component' },
  { version: '20251116@alpha', expected: false, desc: 'Invalid character in identifier' },
  { version: '', expected: false, desc: 'Empty string' },
  { version: '999', expected: false, desc: 'Year too short' },
];

console.log('Running Date-Ver validation tests...\n');

let passed = 0;
let failed = 0;

for (const test of tests) {
  const result = validateDateVer(test.version);
  const success = result.valid === test.expected;

  if (success) {
    console.log(`✓ ${test.desc}: "${test.version}"`);
    passed++;
  } else {
    console.log(`✗ ${test.desc}: "${test.version}"`);
    console.log(`  Expected: ${test.expected}, Got: ${result.valid}`);
    if (result.error) {
      console.log(`  Error: ${result.error}`);
    }
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
