// Sentira Wellness Background Service Worker
const API_URL = 'http://localhost:5000/api';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'logMood') {
    handleLogMood(request.mood, sendResponse);
    return true; // Keep channel open for async response
  }
});

async function handleLogMood(mood, sendResponse) {
  try {
    const { token } = await chrome.storage.local.get(['token']);
    if (!token) {
      sendResponse({ success: false, message: 'Not logged in' });
      return;
    }

    const response = await fetch(`${API_URL}/mood-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ mood, note: 'Logged via extension' })
    });

    const data = await response.json();
    sendResponse({ success: true, data });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}
