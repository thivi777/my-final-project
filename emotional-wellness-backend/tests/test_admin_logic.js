const assert = require('assert');

// Mock profile
const profiles = [
  {
    displayName: 'Angel Thivi',
    emails: [{ value: 'angelthivi9@gmail.com' }]
  },
  {
    displayName: 'thiviysa sathananthan',
    emails: [{ value: 'thiviysa@example.com' }]
  },
  {
    displayName: 'Regular User',
    emails: [{ value: 'user@example.com' }]
  }
];

// Re-implement the whitelist logic for testing
const ADMIN_WHITELIST = [
  "angelthivi9@gmail.com", 
  "thiviysa sathananthan"
];

const isWhitelisted = (profile) => {
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value.toLowerCase() : null;
  const name = profile.displayName ? profile.displayName.toLowerCase() : null;
  
  return (email && ADMIN_WHITELIST.includes(email)) || (name && ADMIN_WHITELIST.includes(name));
};

// Test 1: Whitelisted email
assert.strictEqual(isWhitelisted(profiles[0]), true, 'angelthivi9@gmail.com should be whitelisted');

// Test 2: Whitelisted name
assert.strictEqual(isWhitelisted(profiles[1]), true, 'thiviysa sathananthan should be whitelisted');

// Test 3: Regular user
assert.strictEqual(isWhitelisted(profiles[2]), false, 'Regular user should not be whitelisted');

console.log('All tests passed!');
