const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🚀 Starting Backend Verification Tests...\n');

  // Test 1: 404 Error Handler
  try {
    console.log('Test 1: GET /api/non-existent (404)');
    await axios.get(`${API_URL}/non-existent`);
  } catch (error) {
    console.log('✅ Status:', error.response.status);
    console.log('✅ Response:', JSON.stringify(error.response.data, null, 2));
  }
  console.log('\n-------------------\n');

  // Test 2: Validation Error (Missing fields for register)
  try {
    console.log('Test 2: POST /api/auth/register (Validation Error)');
    await axios.post(`${API_URL}/auth/register`, {
      email: 'invalid-email',
      password: '123'
    });
  } catch (error) {
    console.log('✅ Status:', error.response.status);
    console.log('✅ Response:', JSON.stringify(error.response.data, null, 2));
  }
  console.log('\n-------------------\n');

  // Test 3: Root Route
  try {
    console.log('Test 3: GET / (Root)');
    const res = await axios.get('http://localhost:5000/');
    console.log('✅ Status:', res.status);
    console.log('✅ Response:', res.data);
  } catch (error) {
    console.error('❌ Root test failed:', error.message);
  }
  console.log('\n-------------------\n');

  console.log('🏁 Verification tests completed.');
}

runTests();
