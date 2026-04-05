const axios = require('axios');

const testAdminLogin = async () => {
  try {
    const email = 'angelthivi9@gmail.com';
    const password = 'sentira666';
    const apiUrl = 'http://localhost:5000';

    console.log('--- Logging in ---');
    const loginRes = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
    
    if (loginRes.data.success) {
      console.log('Login Success!');
      const token = loginRes.data.data.token;
      const user = loginRes.data.data.user;
      console.log('User Role:', user.role);

      console.log('--- Fetching users list ---');
      const usersRes = await axios.get(`${apiUrl}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Users Response Data:', JSON.stringify(usersRes.data, null, 2));
    } else {
      console.log('Login failed despite valid credentials');
    }
  } catch (err) {
    console.error('Test Failed:', err.response?.data || err.message);
  }
};

testAdminLogin();
