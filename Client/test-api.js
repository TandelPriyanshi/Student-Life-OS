// Test API connectivity
const API_BASE_URL = 'https://localhost:7246/api';

// Test API connection
const testConnection = async () => {
  try {
    console.log('Testing API connection...');
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173' // Your frontend port
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (response.ok) {
      console.log('✅ API is reachable!');
    } else {
      console.log('❌ API connection failed');
      console.log('Error:', await response.text());
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

testConnection();
